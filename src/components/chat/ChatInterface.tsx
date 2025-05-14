import { useState, useRef, useEffect } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store';
import { ChatMessage } from '@/components/chat/ChatMessage';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChatStore();
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userInput = input;
    setInput('');
    await sendMessage(userInput);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <Card className="w-full max-w-3xl mx-auto border shadow-md">
      <CardContent className="p-0">
        <div className="bg-primary px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary-foreground">Medical Assistant</h2>
            <p className="text-xs text-primary-foreground/80">
              Ask questions about your health concerns
            </p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary-foreground/80 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-primary-foreground/80 animate-pulse delay-75"></div>
              <div className="h-2 w-2 rounded-full bg-primary-foreground/80 animate-pulse delay-150"></div>
            </div>
          )}
        </div>
        
        <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-background">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={endOfMessagesRef} />
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg px-4 py-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your health question..."
              className={cn(
                "flex-1",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            This is a simulated medical assistant for demonstration purposes only.
            Please consult a healthcare professional for actual medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}