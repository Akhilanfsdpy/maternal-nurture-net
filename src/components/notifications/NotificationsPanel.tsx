
import React, { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'maternal' | 'newborn' | 'system';
}

const NotificationsPanel: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'You have a prenatal checkup tomorrow at 10:00 AM',
      time: '2 hours ago',
      isRead: false,
      type: 'maternal'
    },
    {
      id: 2,
      title: 'Vaccination Due',
      message: 'Your baby\'s next vaccination is due in 3 days',
      time: 'Yesterday',
      isRead: false,
      type: 'newborn'
    },
    {
      id: 3,
      title: 'Health Tip',
      message: 'Remember to take your prenatal vitamins daily',
      time: '2 days ago',
      isRead: true,
      type: 'maternal'
    },
    {
      id: 4,
      title: 'Growth Milestone',
      message: 'Your baby has reached the 3-month developmental milestone!',
      time: '3 days ago',
      isRead: true,
      type: 'newborn'
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-health-light-blue text-health-blue">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Stay updated with your health and your baby's health
          </SheetDescription>
        </SheetHeader>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
        <Separator className="my-4" />
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`relative p-4 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-health-blue'}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex justify-end gap-2 mt-2">
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
