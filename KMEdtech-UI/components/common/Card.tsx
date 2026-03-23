
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = true }) => {
  return (
    <div className={`glass-card p-10 rounded-3xl transition-all duration-500 group ${hoverable ? 'hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]' : ''} ${className}`}>
      {children}
    </div>
  );
};
