
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Bell, BarChart, User, BookOpen, ShieldCheck, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">Welcome, Sarah!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <DashboardCard 
              title="Upcoming Appointment" 
              value="June 15, 2023"
              description="Dr. Emma Wilson"
              icon={<Calendar className="h-8 w-8 text-pink-500" />}
              actionText="View All"
            />
            <DashboardCard 
              title="Baby's Health" 
              value="Normal"
              description="Last checked: 2 days ago"
              icon={<Heart className="h-8 w-8 text-pink-500" />}
              actionText="Details"
            />
            <DashboardCard 
              title="Notifications" 
              value="3 Unread"
              description="2 high priority"
              icon={<Bell className="h-8 w-8 text-pink-500" />}
              actionText="View All"
            />
            <DashboardCard 
              title="Health Metrics" 
              value="8 Tracked"
              description="2 need attention"
              icon={<BarChart className="h-8 w-8 text-pink-500" />}
              actionText="See Metrics"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-pink-500" />
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoItem label="Name" value="Sarah Johnson" />
                <InfoItem label="Due Date" value="July 10, 2023" />
                <InfoItem label="Healthcare Provider" value="Dr. Emma Wilson" />
                <InfoItem label="Blood Type" value="A+" />
                <InfoItem label="Insurance" value="BlueCross #1234567" />
                <Button variant="outline" size="sm" className="w-full mt-2">Edit Information</Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-pink-500" />
                  Your Health Journal
                </CardTitle>
                <CardDescription>Recent entries and notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <JournalEntry 
                  date="June 1, 2023" 
                  title="Morning Sickness"
                  content="Feeling better today. The prescribed medication seems to be working well."
                />
                <JournalEntry 
                  date="May 28, 2023" 
                  title="Checkup Results"
                  content="All tests came back normal. Baby's heartbeat was strong at 145 bpm."
                />
                <JournalEntry 
                  date="May 25, 2023" 
                  title="Feeling Movement"
                  content="Started feeling more consistent movement today! Mostly in the evening."
                />
                <Button variant="outline" size="sm" className="w-full mt-2">View All Entries</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-pink-500" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ActionItem text="Schedule your next prenatal checkup" />
                <ActionItem text="Take your prenatal vitamins" />
                <ActionItem text="Update your nutrition log" />
                <ActionItem text="Review birthing plan options" />
                <Button className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white">Complete Actions</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-pink-500" />
                  Important Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ReminderItem text="Glucose screening test next week" priority="high" />
                <ReminderItem text="Register for childbirth classes" priority="medium" />
                <ReminderItem text="Order nursery furniture" priority="low" />
                <ReminderItem text="Pre-register at hospital" priority="medium" />
                <Button variant="outline" className="w-full mt-2">Add Reminder</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper components
const DashboardCard: React.FC<{
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
}> = ({ title, value, description, icon, actionText }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            {icon}
          </div>
        </div>
        <Button variant="link" className="text-pink-500 p-0 h-auto mt-4">
          {actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const JournalEntry: React.FC<{ date: string; title: string; content: string }> = ({ date, title, content }) => (
  <div className="border-b pb-3">
    <div className="flex justify-between mb-1">
      <h4 className="font-medium">{title}</h4>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    <p className="text-sm text-gray-600">{content}</p>
  </div>
);

const ActionItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center">
    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
      <ShieldCheck className="h-4 w-4 text-pink-500" />
    </div>
    <span>{text}</span>
  </div>
);

const ReminderItem: React.FC<{ text: string; priority: 'low' | 'medium' | 'high' }> = ({ text, priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-orange-500 bg-orange-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };
  
  return (
    <div className="flex items-center">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${getPriorityColor()}`}>
        <AlertTriangle className="h-4 w-4" />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default Dashboard;
