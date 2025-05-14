import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy, Check, Brain, User } from 'lucide-react';
import { Message } from '@/types';
import { formatDate } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div
      className={`flex gap-3 ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.sender === 'bot' && (
        <Avatar className="h-8 w-8 bg-secondary">
          <Brain className="h-4 w-4 text-secondary-foreground" />
        </Avatar>
      )}
      
      <div
        className={`group relative max-w-[80%] rounded-lg px-4 py-3 ${
          message.sender === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <div className="space-y-2">
          <div className="prose prose-sm">{message.text}</div>
          <div className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {formatDate(message.timestamp)}
          </div>
        </div>
        
        {message.sender === 'bot' && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
            aria-label="Copy message"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      {message.sender === 'user' && (
        <Avatar className="h-8 w-8 bg-primary">
          <User className="h-4 w-4 text-primary-foreground" />
        </Avatar>
      )}
    </div>
  );
}