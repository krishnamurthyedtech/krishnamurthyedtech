
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  containerClassName = ''
}) => {
  return (
    <section id={id} className={`py-12 px-6 sm:px-12 md:px-24 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
