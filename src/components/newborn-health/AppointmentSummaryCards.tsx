
import React from "react";
import { Calendar, Hospital, CalendarCheck } from "lucide-react";
import { appointmentSummaryData } from "@/data/healthCheckupData";

const AppointmentSummaryCards: React.FC = () => {
  // Function to get the appropriate icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-10 w-10 text-health-blue p-2 bg-blue-50 rounded-full" />;
      case "hospital":
        return <Hospital className="h-10 w-10 text-health-pink p-2 bg-pink-50 rounded-full" />;
      case "calendar-check":
        return <CalendarCheck className="h-10 w-10 text-health-mint p-2 bg-green-50 rounded-full" />;
      default:
        return <Calendar className="h-10 w-10 text-health-blue p-2 bg-blue-50 rounded-full" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {appointmentSummaryData.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          {getIcon(item.icon)}
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentSummaryCards;
