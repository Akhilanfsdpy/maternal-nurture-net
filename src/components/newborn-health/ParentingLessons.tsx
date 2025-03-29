
import React, { useState } from 'react';
import { Book, ChevronRight, Check, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  progress: number;
  completed: boolean;
}

const parentingLessons: Lesson[] = [
  {
    id: "l1",
    title: "Understanding Newborn Sleep Patterns",
    description: "Learn about your baby's sleep cycles and how to establish healthy sleep habits from the start.",
    duration: "15 min",
    category: "Sleep",
    progress: 100,
    completed: true
  },
  {
    id: "l2",
    title: "Breastfeeding Fundamentals",
    description: "Essential techniques for successful breastfeeding and common challenges faced by new mothers.",
    duration: "20 min",
    category: "Feeding",
    progress: 75,
    completed: false
  },
  {
    id: "l3",
    title: "Baby's First Bath: Step by Step Guide",
    description: "Learn how to safely bathe your newborn with confidence.",
    duration: "12 min",
    category: "Care",
    progress: 0,
    completed: false
  },
  {
    id: "l4",
    title: "Understanding Baby Cries and Cues",
    description: "Decode different types of cries and body language to better respond to your baby's needs.",
    duration: "18 min",
    category: "Development",
    progress: 0,
    completed: false
  }
];

const ParentingLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(parentingLessons);
  
  const handleContinueLesson = (lessonId: string) => {
    // In a real app, this would navigate to the lesson content
    console.log(`Continue lesson: ${lessonId}`);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Book className="h-5 w-5 text-health-blue" />
          AI-Powered Parenting Lessons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="border rounded-lg overflow-hidden">
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      {lesson.title}
                      {lesson.completed && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Completed
                        </Badge>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{lesson.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {lesson.category}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant={lesson.completed ? "outline" : "default"}
                    onClick={() => handleContinueLesson(lesson.id)}
                    className={lesson.completed ? "" : "bg-gradient-to-r from-health-blue to-health-light-blue"}
                  >
                    {lesson.completed ? "Review" : lesson.progress > 0 ? "Continue" : "Start"}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                {!lesson.completed && lesson.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentingLessons;
