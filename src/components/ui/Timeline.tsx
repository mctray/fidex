import { ReactNode } from 'react';
import { Badge } from './Badge';

interface TimelineItemProps {
  status: string;
  statusColor: 'default' | 'secondary' | 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  location: string;
  description: string;
  icon: ReactNode;
  isLast?: boolean;
}

export function TimelineItem({
  status,
  statusColor,
  timestamp,
  location,
  description,
  icon,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0 bg-white rounded-full p-2 border-2 border-gray-200 shadow-sm">
          {icon}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-gray-300 to-gray-200 mt-2 min-h-[3rem]"></div>
        )}
      </div>

      <div className="flex-1 pb-8">
        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
          <Badge variant={statusColor} className="text-sm">
            {status}
          </Badge>
          <span className="text-sm text-gray-500 font-medium">{timestamp}</span>
        </div>
        <p className="text-gray-700 mb-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}
        </div>
      </div>
    </div>
  );
}

export function Timeline({ children }: { children: ReactNode }) {
  return <div className="space-y-0">{children}</div>;
}
