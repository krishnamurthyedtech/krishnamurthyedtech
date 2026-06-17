
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
    <section id={id} className={`py-12 px-6 sm:px-8 md:px-12 w-full ${className}`}>
      <div className={`max-w-[1600px] mx-auto w-full ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};
