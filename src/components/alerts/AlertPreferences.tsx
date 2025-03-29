
import React, { useState } from 'react';
import { Bell, MessageSquare, Smartphone, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const AlertPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState({
    sms: true,
    whatsapp: false,
    pushNotification: true
  });
  
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleToggle = (channel: 'sms' | 'whatsapp' | 'pushNotification') => {
    setPreferences(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would send the preferences to a backend
    toast({
      title: "Preferences Saved",
      description: "Your alert preferences have been updated successfully.",
    });
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-health-blue" />
          Alert Preferences
        </CardTitle>
        <CardDescription>
          Choose how you'd like to receive important health alerts and reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1 (555) 123-4567" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for SMS and WhatsApp alerts
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-gray-500">Receive text messages for important updates</p>
              </div>
            </div>
            <Switch 
              checked={preferences.sms} 
              onCheckedChange={() => handleToggle('sms')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-gray-500">Get alerts through WhatsApp messages</p>
              </div>
            </div>
            <Switch 
              checked={preferences.whatsapp} 
              onCheckedChange={() => handleToggle('whatsapp')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Mobile app notifications</p>
              </div>
            </div>
            <Switch 
              checked={preferences.pushNotification} 
              onCheckedChange={() => handleToggle('pushNotification')}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full bg-gradient-to-r from-health-blue to-health-light-blue">
          <Check className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlertPreferences;
