import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  content: React.ReactNode;
}

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}