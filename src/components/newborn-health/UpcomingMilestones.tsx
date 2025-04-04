
import React from 'react';
import { Baby } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Milestone {
  id: number;
  name: string;
  description: string;
  expectedAge: string;
  completed: boolean;
  completedDate: string | null;
}

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

const UpcomingMilestones: React.FC<UpcomingMilestonesProps> = ({ milestones }) => {
  return (
    <Card className="shadow-sm hover-card-effect">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Baby className="mr-2 h-5 w-5 text-health-pink" />
          Upcoming Milestones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {milestones.filter(m => !m.completed).slice(0, 3).map((milestone) => (
            <li key={milestone.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
              <p className="font-medium text-gray-900">{milestone.name}</p>
              <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
              <p className="text-xs text-gray-500">Expected around {milestone.expectedAge}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/newborn-health?tab=milestones" className="w-full">
          <Button variant="outline" className="w-full">
            View All Milestones
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UpcomingMilestones;
