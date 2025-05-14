import { Message, Doctor, Resource, ResourceCategory, TeamMember, Service } from '@/types';

// Mock Chat Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hello, how can I assist you with your health concerns today?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    text: 'I\'ve been experiencing headaches and fatigue lately. Should I be concerned?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: '3',
    text: 'I understand your concern. Headaches and fatigue can have many causes, from stress to dehydration. How long have you been experiencing these symptoms?',
    sender: 'bot',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
];

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    address: '123 Medical Center Blvd, Chicago, IL',
    phone: '(312) 555-1234',
    email: 'sjohnson@medicalcenter.com',
    rating: 4.8,
    availability: ['Mon', 'Wed', 'Fri'],
    position: { lat: 41.878, lng: -87.629 },
    distance: 2.3,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    address: '456 Health Avenue, Chicago, IL',
    phone: '(312) 555-5678',
    email: 'mchen@medicalcenter.com',
    rating: 4.9,
    availability: ['Tue', 'Thu', 'Sat'],
    position: { lat: 41.881, lng: -87.623 },
    distance: 1.8,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'd3',
    name: 'Dr. Amelia Rodriguez',
    specialty: 'Pediatrics',
    address: '789 Wellness Street, Chicago, IL',
    phone: '(312) 555-9012',
    email: 'arodriguez@medicalcenter.com',
    rating: 4.7,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    position: { lat: 41.874, lng: -87.635 },
    distance: 3.1,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    address: '101 Care Lane, Chicago, IL',
    phone: '(312) 555-3456',
    email: 'jwilson@medicalcenter.com',
    rating: 4.6,
    availability: ['Wed', 'Thu', 'Fri'],
    position: { lat: 41.885, lng: -87.642 },
    distance: 2.7,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'd5',
    name: 'Dr. Olivia Park',
    specialty: 'Dermatology',
    address: '222 Healing Court, Chicago, IL',
    phone: '(312) 555-7890',
    email: 'opark@medicalcenter.com',
    rating: 4.9,
    availability: ['Mon', 'Wed', 'Fri'],
    position: { lat: 41.882, lng: -87.618 },
    distance: 1.5,
    image: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

// Resource Categories
export const resourceCategories: ResourceCategory[] = [
  {
    id: 'research',
    name: 'Research Papers',
    description: 'Latest medical research and findings',
    icon: 'scroll',
  },
  {
    id: 'forms',
    name: 'Medical Forms',
    description: 'Essential documents for appointments and procedures',
    icon: 'file-text',
  },
  {
    id: 'guides',
    name: 'Health Guides',
    description: 'Comprehensive guides on various health topics',
    icon: 'book-open',
  },
  {
    id: 'videos',
    name: 'Educational Videos',
    description: 'Visual explanations of medical procedures and conditions',
    icon: 'video',
  },
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'r1',
    title: 'WHO: Cardiovascular Diseases (CVDs) Fact Sheet',
    description: 'World Health Organization fact sheet on cardiovascular diseases, including prevention and statistics.',
    type: 'pdf',
    url: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)',
    categoryId: 'research',
    tags: ['heart health', 'prevention', 'cardiology'],
    date: new Date(2024, 5, 15),
    thumbnail: 'https://www.who.int/images/default-source/imported/cardiovascular-diseases.jpg',
  },
  {
    id: 'r2',
    title: 'Patient Intake Form (Sample)',
    description: 'Standard form required for new patients. Download and fill before your appointment.',
    type: 'form',
    url: 'https://www.cdc.gov/nhsn/forms/57.100-Patient-Form.pdf',
    categoryId: 'forms',
    tags: ['forms', 'new patient'],
    date: new Date(2024, 4, 20),
    thumbnail: 'https://images.pexels.com/photos/3847620/pexels-photo-3847620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r3',
    title: 'Diabetes Self-Management Education and Support',
    description: 'Comprehensive guide for diabetes management from the American Diabetes Association.',
    type: 'article',
    url: 'https://diabetesjournals.org/care/article/43/Supplement_1/S48/30656/Diabetes-Self-management-Education-and-Support-in',
    categoryId: 'guides',
    tags: ['diabetes', 'nutrition', 'lifestyle'],
    date: new Date(2024, 3, 10),
    thumbnail: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r4',
    title: 'MRI Procedure Explained (YouTube)',
    description: 'Video guide to what happens during an MRI scan. Courtesy: RadiologyInfo.org',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=5p5n9GZLwZI',
    categoryId: 'videos',
    tags: ['MRI', 'procedures', 'diagnostic imaging'],
    date: new Date(2024, 6, 5),
    thumbnail: 'https://img.youtube.com/vi/5p5n9GZLwZI/0.jpg',
  },
  {
    id: 'r5',
    title: 'Advances in Cancer Immunotherapy (NEJM)',
    description: 'Review article on the latest advances in cancer immunotherapy from the New England Journal of Medicine.',
    type: 'pdf',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMra1703482',
    categoryId: 'research',
    tags: ['cancer', 'oncology', 'research'],
    date: new Date(2024, 5, 28),
    thumbnail: 'https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r6',
    title: 'Mental Health Self-Assessment (NIMH)',
    description: 'Questionnaire for evaluating mental health status. Provided by the National Institute of Mental Health.',
    type: 'form',
    url: 'https://www.nimh.nih.gov/health/topics/mental-health-medications/mental-health-medications-fact-sheet',
    categoryId: 'forms',
    tags: ['mental health', 'psychology', 'assessment'],
    date: new Date(2024, 7, 3),
    thumbnail: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r7',
    title: 'Wellness Test: Lifestyle Risk Assessment',
    description: 'Online tool to assess your lifestyle risk factors and get personalized wellness tips.',
    type: 'form',
    url: 'https://www.cdc.gov/chronicdisease/resources/infographic/preventive-care.htm',
    categoryId: 'forms',
    tags: ['wellness', 'assessment', 'lifestyle'],
    date: new Date(2024, 7, 10),
    thumbnail: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r8',
    title: 'Nutrition and Healthy Eating (Mayo Clinic)',
    description: 'Mayo Clinic guide to nutrition, healthy eating, and meal planning.',
    type: 'article',
    url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating',
    categoryId: 'guides',
    tags: ['nutrition', 'lifestyle', 'wellness'],
    date: new Date(2024, 2, 15),
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r9',
    title: 'COVID-19: Latest Research and Guidelines (CDC)',
    description: 'CDC resource hub for COVID-19 research, guidelines, and prevention.',
    type: 'pdf',
    url: 'https://www.cdc.gov/coronavirus/2019-ncov/index.html',
    categoryId: 'research',
    tags: ['covid-19', 'prevention', 'research'],
    date: new Date(2024, 1, 20),
    thumbnail: 'https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'r10',
    title: 'Cancer Screening Guidelines (American Cancer Society)',
    description: 'Official screening guidelines for various cancers from the American Cancer Society.',
    type: 'article',
    url: 'https://www.cancer.org/healthy/find-cancer-early/cancer-screening-guidelines.html',
    categoryId: 'guides',
    tags: ['cancer', 'screening', 'oncology'],
    date: new Date(2024, 3, 25),
    thumbnail: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Team Members
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Krishna Shankar Maurya',
    role: 'CEO and Founder',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Krishna is the visionary founder and CEO of CareWill, leading the company with a passion for accessible healthcare and innovative technology.'
  },
  {
    id: '2',
    name: 'Deepak Kumar',
    role: 'CMO and Co-Founder',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    bio: "Deepak drives CareWill marketing and outreach, ensuring our solutions reach those who need them most."
  },
  {
    id: '3',
    name: 'Prashant Singh',
    role: 'CFO',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Prashant manages the financial strategy and growth of CareWill, supporting sustainable innovation.'
  },
  {
    id: '4',
    name: 'Ashok Kumar Yadav',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    bio: 'Ashok leads the technology team, building secure and scalable healthcare solutions for the future.'
  },
];

// Services
export const services: Service[] = [
  {
    id: 's1',
    title: 'AI-Powered Health Assessments',
    description: 'Get preliminary health assessments based on your symptoms with our advanced medical AI.',
    icon: 'brain-circuit',
  },
  {
    id: 's2',
    title: 'Doctor Appointment Scheduling',
    description: 'Easily find and book appointments with specialists in your area.',
    icon: 'calendar',
  },
  {
    id: 's3',
    title: 'Medication Management',
    description: 'Receive reminders and information about your prescriptions and potential interactions.',
    icon: 'pill',
  },
  {
    id: 's4',
    title: 'Health Records Access',
    description: 'Securely access and share your medical records with healthcare providers.',
    icon: 'file-text',
  },
  {
    id: 's5',
    title: '24/7 Virtual Consultations',
    description: 'Connect with healthcare professionals anytime via secure video calls.',
    icon: 'video',
  },
  {
    id: 's6',
    title: 'Wellness Planning',
    description: 'Receive personalized wellness plans based on your health goals and medical history.',
    icon: 'heart-pulse',
  },
];