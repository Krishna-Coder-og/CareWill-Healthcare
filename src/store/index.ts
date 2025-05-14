import { create } from 'zustand';
import { Message, Doctor, Resource } from '@/types';
import { mockMessages, mockDoctors, mockResources } from '@/data/mockData';
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  sendMessage: (text: string) => Promise<void>;
}

interface DoctorState {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  selectedSpecialty: string | null;
  selectedDistance: number | null;
  filterDoctors: (specialty: string | null, distance: number | null) => void;
}

interface ResourceState {
  resources: Resource[];
  filteredResources: Resource[];
  searchTerm: string;
  selectedCategory: string | null;
  selectedTags: string[];
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  toggleTag: (tag: string) => void;
}

// Chat Store
export const useChatStore = create<ChatState>((set, get) => ({
  messages: mockMessages,
  isLoading: false,
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },
  sendMessage: async (text) => {
    const { addMessage } = get();
    
    // Add user message
    addMessage({
      text,
      sender: 'user',
    });
    
    // Set loading state
    set({ isLoading: true });
    
    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Try to match a mock response
      const responses = [
        "I understand your concern. Based on the symptoms you've described, it could be a mild case of seasonal allergies.",
        "That's a good question. The recommended dosage is typically based on your weight and age.",
        "I'd recommend scheduling an appointment with your primary care physician for a proper evaluation.",
        "Regular exercise, a balanced diet, and proper sleep hygiene can help manage those symptoms.",
        "Those symptoms might indicate a common cold, but it's always best to consult with a healthcare professional for proper diagnosis."
      ];
      
      // Simple FAQ match
      const faqs: Record<string, string> = {
        'fever': 'A fever is a temporary increase in your body temperature, often due to an illness. It is a common sign of infection.',
        'covid-19': 'COVID-19 is a respiratory illness caused by the coronavirus SARS-CoV-2. Symptoms include fever, cough, and shortness of breath.',
        'headache': 'A headache is pain or discomfort in the head or face area. It can have many causes, including stress, dehydration, or illness.',
        'diabetes': 'Diabetes is a chronic health condition that affects how your body turns food into energy. It results in high blood sugar levels.',
        'first aid': 'First aid refers to the immediate care given to someone who is injured or ill before professional help arrives.'
      };
      const keyword = extractMedicalKeyword(text).toLowerCase();
      if (faqs[keyword]) {
        addMessage({ text: faqs[keyword], sender: 'bot' });
      } else {
        // Try Wikipedia
        const summary = await fetchWikipediaSummary(keyword);
        if (summary) {
          addMessage({ text: summary, sender: 'bot' });
        } else {
          addMessage({
            text: "Sorry, I couldn't find information on that topic. Please consult a healthcare professional for more details.",
            sender: 'bot',
          });
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Doctor Store
export const useDoctorStore = create<DoctorState>((set) => ({
  doctors: mockDoctors,
  filteredDoctors: mockDoctors,
  selectedSpecialty: null,
  selectedDistance: null,
  filterDoctors: (specialty, distance) => {
    set((state) => {
      let filtered = state.doctors;
      
      if (specialty) {
        filtered = filtered.filter(doctor => doctor.specialty === specialty);
      }
      
      if (distance) {
        filtered = filtered.filter(doctor => doctor.distance && doctor.distance <= distance);
      }
      
      return {
        filteredDoctors: filtered,
        selectedSpecialty: specialty,
        selectedDistance: distance
      };
    });
  }
}));

// Helper function for resource filtering
async function filterResourcesAsync(
  resources: Resource[],
  searchTerm: string,
  categoryId: string | null,
  tags: string[]
): Promise<Resource[]> {
  let filtered = resources.filter(resource => {
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryId || resource.categoryId === categoryId;
    const matchesTags = tags.length === 0 || 
      tags.some(tag => resource.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });
  if (filtered.length === 0 && searchTerm) {
    // Fetch from Wikipedia
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        filtered = [{
          id: uuidv4(),
          title: wikiData.title,
          description: wikiData.extract,
          type: 'article',
          url: wikiData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`,
          categoryId: 'guides',
          tags: [searchTerm.toLowerCase()],
          date: new Date(),
          thumbnail: wikiData.thumbnail?.source || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }];
      }
    } catch (e) {
      // ignore
    }
  }
  return filtered;
}

// Resource Store
export const useResourceStore = create<ResourceState>((set, get) => ({
  resources: mockResources,
  filteredResources: mockResources,
  searchTerm: '',
  selectedCategory: null,
  selectedTags: [],
  setSearchTerm: (term) => {
    filterResourcesAsync(
      get().resources,
      term,
      get().selectedCategory,
      get().selectedTags
    ).then(filtered => {
      set({ searchTerm: term, filteredResources: filtered });
    });
  },
  setSelectedCategory: (categoryId) => {
    filterResourcesAsync(
      get().resources,
      get().searchTerm,
      categoryId,
      get().selectedTags
    ).then(filtered => {
      set({ selectedCategory: categoryId, filteredResources: filtered });
    });
  },
  toggleTag: (tag) => {
    const selectedTags = get().selectedTags.includes(tag)
      ? get().selectedTags.filter(t => t !== tag)
      : [...get().selectedTags, tag];
    filterResourcesAsync(
      get().resources,
      get().searchTerm,
      get().selectedCategory,
      selectedTags
    ).then(filtered => {
      set({ selectedTags, filteredResources: filtered });
    });
  }
}));

// Fetch summary from Wikipedia API
async function fetchWikipediaSummary(topic: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.extract || null;
  } catch {
    return null;
  }
}

// Extract a likely medical keyword from user input
function extractMedicalKeyword(text: string): string {
  return text
    .replace(/what is|who is|tell me about|explain|define|please|\?/gi, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^./, c => c.toUpperCase());
}