
import React from 'react';
import { Video, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  url: string;
}

const maternalVideos: VideoItem[] = [
  {
    id: "v1",
    title: "Nutrition During Pregnancy",
    thumbnail: "https://placehold.co/320x180",
    duration: "12:45",
    category: "Nutrition",
    url: "#"
  },
  {
    id: "v2",
    title: "Safe Exercises for Expecting Mothers",
    thumbnail: "https://placehold.co/320x180",
    duration: "15:20",
    category: "Fitness",
    url: "#"
  },
  {
    id: "v3",
    title: "Managing Pregnancy Discomfort",
    thumbnail: "https://placehold.co/320x180",
    duration: "10:15",
    category: "Wellness",
    url: "#"
  },
  {
    id: "v4",
    title: "Preparing for Labor and Delivery",
    thumbnail: "https://placehold.co/320x180",
    duration: "18:30",
    category: "Education",
    url: "#"
  }
];

const VideoRecommendations: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Video className="h-5 w-5 text-health-blue" />
          Recommended Videos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maternalVideos.map((video) => (
            <div key={video.id} className="flex cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-2">
              <div className="relative flex-shrink-0 mr-3">
                <img src={video.thumbnail} alt={video.title} className="w-28 h-16 object-cover rounded-md" />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <h5 className="text-sm font-medium line-clamp-2">{video.title}</h5>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{video.category}</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoRecommendations;
