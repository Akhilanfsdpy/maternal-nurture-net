
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, PlusCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PageHeader: React.FC = () => {
  const { toast } = useToast();
  
  const handleSosClick = () => {
    toast({
      title: "Emergency Alert",
      description: "Emergency contact has been notified. Help is on the way.",
      variant: "destructive",
    });
    // In a real app, this would trigger actual emergency notifications
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Newborn Health</h1>
        <p className="text-gray-500">Track, monitor, and manage your baby's health and development</p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="destructive" 
          className="bg-red-600 hover:bg-red-700"
          onClick={handleSosClick}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          SOS Emergency
        </Button>
        <Button variant="outline" className="border-health-light-pink text-health-pink">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Checkup
        </Button>
        <Button className="bg-gradient-to-r from-health-pink to-health-light-pink">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Growth Data
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
