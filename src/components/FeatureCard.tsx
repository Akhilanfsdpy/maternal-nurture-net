
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Activity, Baby, FileText, Apple, Users, BookOpen,
  Icon as LucideIcon
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color?: string;
  className?: string;
  delay?: number;
}

const iconMap: Record<string, React.ReactNode> = {
  activity: <Activity className="h-6 w-6 text-health-blue" />,
  baby: <Baby className="h-6 w-6 text-health-pink" />,
  fileText: <FileText className="h-6 w-6 text-purple-500" />,
  apple: <Apple className="h-6 w-6 text-green-500" />,
  users: <Users className="h-6 w-6 text-orange-500" />,
  bookOpen: <BookOpen className="h-6 w-6 text-indigo-500" />
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
  className,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'glass-card p-6 flex flex-col items-start',
        'transform transition-all duration-700 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8',
        className
      )}
    >
      <div className="p-3 rounded-lg bg-gradient-to-br from-health-blue/10 to-health-light-blue/10 mb-4">
        {iconMap[icon]}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
