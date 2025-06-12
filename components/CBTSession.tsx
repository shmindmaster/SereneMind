'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, Brain, User, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  isExercise?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello, I'm your guide. I'm here to help you work through challenges using proven CBT techniques. When you're ready, let's begin.",
    sender: 'ai',
    timestamp: new Date(),
  },
];

export default function CBTSession() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (content: string, sender: 'ai' | 'user', isExercise = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      isExercise,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let isExercise = false;

      // Simple response logic based on user input
      if (userMessage.toLowerCase().includes('anxious') || userMessage.toLowerCase().includes('anxiety')) {
        response = "I understand you're feeling anxious. Anxiety is a common experience, and there are effective ways to manage it. Can you tell me more about what specifically is making you feel anxious right now?";
      } else if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depression')) {
        response = "I hear that you're feeling sad. It takes courage to share that. Let's explore this together. When did you first notice these feelings, and what thoughts tend to come up when you feel this way?";
      } else if (userMessage.toLowerCase().includes('negative') || userMessage.toLowerCase().includes('thought')) {
        response = "Negative thoughts can feel overwhelming. Let's work on identifying and examining these thoughts together.";
        isExercise = true;
      } else if (messages.length > 4) {
        // After some conversation, introduce an exercise
        response = "Based on what you've shared, I think it would be helpful to try a structured exercise together.";
        isExercise = true;
      } else {
        response = "Thank you for sharing that with me. It's important that you feel comfortable expressing yourself here. Can you tell me more about how this affects your daily life?";
      }

      setIsTyping(false);
      addMessage(response, 'ai', isExercise);

      // Add structured exercise after certain responses
      if (isExercise) {
        setTimeout(() => {
          addStructuredExercise();
        }, 1500);
      }
    }, 1000 + Math.random() * 2000);
  };

  const addStructuredExercise = () => {
    const exercise = `**Cognitive Restructuring: Identifying Negative Thoughts**

Let's practice identifying and challenging negative thought patterns. This exercise will help you recognize when unhelpful thoughts arise and develop more balanced perspectives.

**Step 1:** Think of a recent situation that caused you stress or negative emotions.

**Step 2:** Write down the automatic thoughts that came to mind in that situation.

**Step 3:** Ask yourself:
- Is this thought realistic?
- What evidence do I have for and against this thought?
- What would I tell a friend in this situation?

**Step 4:** Try to reframe the thought in a more balanced way.

Take your time with this exercise. You can work through it step by step, and I'll be here to guide you through each part.`;

    addMessage(exercise, 'ai', true);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage(inputValue, 'user');
      simulateAIResponse(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            CBT Session
          </h1>
          <p className="text-slate-600 mt-1">
            Interactive cognitive behavioral therapy guidance
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          Session Active
        </Badge>
      </div>

      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Therapy Session</CardTitle>
          <CardDescription>
            A safe space to explore your thoughts and feelings with AI-guided CBT techniques
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Chat Area */}
          <div className="chat-container">
            <ScrollArea className="h-96 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start gap-3">
                        {message.sender === 'ai' && (
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        {message.sender === 'user' && (
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                            <User className="w-4 h-4 text-slate-600" />
                          </div>
                        )}
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : message.isExercise
                            ? 'bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20'
                            : 'bg-slate-100 text-slate-800'
                        } ${message.sender === 'user' ? 'order-1' : ''}`}>
                          {message.isExercise && (
                            <div className="flex items-center gap-2 mb-3">
                              <Lightbulb className="w-4 h-4 text-accent" />
                              <span className="text-sm font-semibold text-accent">Structured Exercise</span>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs text-slate-400 mt-1 ${
                        message.sender === 'user' ? 'text-right' : 'text-left ml-11'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-slate-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts or ask a question..."
                  className="min-h-[44px] resize-none border-slate-200 focus:border-primary"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-600"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              This conversation is confidential and encrypted. Press Enter to send.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}