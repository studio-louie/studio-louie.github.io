
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface OracleChatProps {
  onNavigate: (topic: string) => void;
}

export const OracleChat: React.FC<OracleChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      content: (
        <span>
          Greetings Traveler. I am the Oracle of Louie World. What Wisdom do you seek? I can grant you anything from{' '}
          <button 
            onClick={() => onNavigate('video-games')} 
            className="text-yellow-400 font-bold hover:text-yellow-200 hover:underline transition-colors cursor-pointer font-fantasy tracking-wide"
          >
            Video Game
          </button>
          ,{' '}
          <button 
            onClick={() => onNavigate('books')} 
            className="text-yellow-400 font-bold hover:text-yellow-200 hover:underline transition-colors cursor-pointer font-fantasy tracking-wide"
          >
            books
          </button>
          , and{' '}
          <button 
            onClick={() => onNavigate('manga-anime')} 
            className="text-yellow-400 font-bold hover:text-yellow-200 hover:underline transition-colors cursor-pointer font-fantasy tracking-wide"
          >
            manga/anime
          </button>
          {' '}knowledge.
        </span>
      ) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for API Key
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Using gemini-3-flash-preview for quick text responses
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            {
                role: "user",
                parts: [{ text: `You are the mystical Oracle of "Louie World", a fantasy realm. Speak in a wise, slightly archaic, but helpful tone (like a Zelda character). Keep responses concise (under 100 words). The user asks: ${input}` }]
            }
        ],
      });

      const responseText = response.text || "The spirits are silent... (No response)";
      
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (error) {
      console.error("Oracle error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "A dark fog clouds my vision. I cannot answer right now. (Check API Key)" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-slate/80 border-2 border-hylian-gold/30 rounded-lg overflow-hidden backdrop-blur-md shadow-2xl flex flex-col h-[500px]">
      <div className="bg-hylian-blue/90 p-4 border-b border-hylian-gold/50 flex items-center gap-2">
        <Sparkles className="text-hylian-gold w-5 h-5" />
        <h3 className="font-fantasy text-hylian-gold text-xl tracking-wider">Consult the Oracle</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-forest-green/80 text-white rounded-br-none border border-green-600' 
                : 'bg-indigo-950/80 text-gray-200 rounded-bl-none border border-indigo-800'
            }`}>
              <div className="font-body text-sm md:text-base leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-indigo-950/80 p-3 rounded-lg rounded-bl-none border border-indigo-800 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-hylian-gold" />
                <span className="text-gray-400 text-sm italic">Divining...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-black/40 border-t border-hylian-gold/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the legends..."
            className="flex-1 bg-gray-900/50 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-hylian-gold font-body placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-hylian-blue hover:bg-blue-800 text-hylian-gold border border-hylian-gold/50 px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
