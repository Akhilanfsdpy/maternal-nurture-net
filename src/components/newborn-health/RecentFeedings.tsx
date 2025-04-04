
import React from 'react';
import { Utensils, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeedingData {
  time: string;
  duration: string;
  type: string;
  notes: string;
}

interface RecentFeedingsProps {
  feedingData: FeedingData[];
}

const RecentFeedings: React.FC<RecentFeedingsProps> = ({ feedingData }) => {
  return (
    <Card className="shadow-sm hover-card-effect">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-health-pink" />
          Recent Feedings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {feedingData.map((feeding, index) => (
            <li key={index} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{feeding.time}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-health-pink/10 text-health-pink">
                  {feeding.type}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600">{feeding.duration}</p>
                <p className="text-sm text-gray-500">{feeding.notes}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/newborn-health?tab=feeding" className="w-full">
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Log Feeding
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentFeedings;
