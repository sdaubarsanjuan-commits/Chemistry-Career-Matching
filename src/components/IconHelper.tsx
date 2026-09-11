import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5' }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
  return <IconComponent className={className} />;
};
