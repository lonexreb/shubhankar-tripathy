import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showChrome?: boolean;
  compact?: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'terminal',
  children,
  className,
  showChrome = true,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-md overflow-hidden',
        className
      )}
    >
      {showChrome && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 border-b border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">
            {title}
          </span>
        </div>
      )}
      <div className={cn('font-mono text-sm', compact ? 'p-3' : 'p-4 md:p-6')}>
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
