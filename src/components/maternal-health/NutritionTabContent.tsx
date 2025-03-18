
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Apple, Coffee, Wine, Heart, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  food: z.string().min(2, {
    message: "Food item must be at least 2 characters.",
  }),
  portion: z.string().min(1, {
    message: "Please specify a portion size.",
  }),
});

interface FoodItem {
  id: number;
  name: string;
  category: 'fruits' | 'vegetables' | 'proteins' | 'grains' | 'dairy' | 'other';
  time: string;
  calories: number;
  portion: string;
}

interface NutrientProgress {
  name: string;
  current: number;
  target: number;
  color: string;
}

const NutritionTabContent: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      food: '',
      portion: '',
    },
  });

  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: 1, name: 'Spinach Salad', category: 'vegetables', time: '8:30 AM', calories: 120, portion: '2 cups' },
    { id: 2, name: 'Greek Yogurt', category: 'dairy', time: '10:00 AM', calories: 150, portion: '1 cup' },
    { id: 3, name: 'Grilled Chicken', category: 'proteins', time: '1:00 PM', calories: 250, portion: '6 oz' },
    { id: 4, name: 'Quinoa', category: 'grains', time: '1:00 PM', calories: 180, portion: '1 cup' },
    { id: 5, name: 'Apple', category: 'fruits', time: '3:30 PM', calories: 95, portion: '1 medium' },
  ]);

  const nutrients: NutrientProgress[] = [
    { name: 'Protein', current: 65, target: 75, color: 'bg-blue-500' },
    { name: 'Iron', current: 18, target: 30, color: 'bg-red-500' },
    { name: 'Calcium', current: 850, target: 1000, color: 'bg-green-500' },
    { name: 'Folate', current: 400, target: 600, color: 'bg-purple-500' },
    { name: 'Fiber', current: 22, target: 28, color: 'bg-amber-500' },
  ];

  const recommendations = [
    { 
      id: 1, 
      title: 'Increase Iron Intake', 
      description: 'Your iron levels are lower than recommended. Try adding more leafy greens, beans, and lean red meat to your diet.',
      icon: <Heart className="h-5 w-5 text-red-500" />,
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Stay Hydrated', 
      description: 'Aim for 8-10 glasses of water daily to support healthy blood volume and amniotic fluid.',
      icon: <Coffee className="h-5 w-5 text-blue-500" />,
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Avoid Alcohol', 
      description: 'Remember to completely avoid alcohol during pregnancy as it can cause birth defects.',
      icon: <Wine className="h-5 w-5 text-red-600" />,
      priority: 'high'
    },
    { 
      id: 4, 
      title: 'Include More Fruits', 
      description: 'Try to eat at least 2-3 servings of fresh fruits daily for essential vitamins.',
      icon: <Apple className="h-5 w-5 text-green-500" />,
      priority: 'medium'
    },
  ];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const newItem: FoodItem = {
      id: foodItems.length + 1,
      name: values.food,
      category: 'other', // Default category
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: 0, // This would normally be calculated or looked up
      portion: values.portion,
    };
    setFoodItems([newItem, ...foodItems]);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Daily Nutrition Tracker</CardTitle>
          <CardDescription>Track your nutritional intake for optimal pregnancy health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Nutrient Progress</h3>
              <div className="space-y-4">
                {nutrients.map((nutrient, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{nutrient.name}</span>
                      <span className="text-sm text-gray-500">{nutrient.current}/{nutrient.target}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${nutrient.color} rounded-full`}
                        style={{ width: `${Math.min((nutrient.current / nutrient.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.id} className={`p-3 rounded-lg border ${rec.priority === 'high' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3">
                        {rec.priority === 'high' ? <AlertTriangle className="h-5 w-5 text-red-500" /> : rec.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rec.title}</p>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Food Journal</h3>
                    <Button type="submit" size="sm" className="bg-health-pink">
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Add Food
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="food"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Food Item</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Apple, Yogurt" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="portion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portion Size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1 cup, 2 oz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
              
              <div className="h-[400px] overflow-y-auto pr-2">
                <ul className="space-y-2">
                  {foodItems.map((item) => (
                    <li key={item.id} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.portion}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{item.time}</p>
                          {item.calories > 0 && (
                            <p className="text-xs text-gray-500">{item.calories} calories</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Pregnancy Nutrition Guidelines</CardTitle>
          <CardDescription>Recommended nutrition guidelines for your stage of pregnancy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <h4 className="font-medium text-green-800 mb-2">Foods to Embrace</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Leafy greens (spinach, kale)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Lean proteins (chicken, fish, legumes)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Whole grains (brown rice, quinoa)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Dairy products (milk, yogurt, cheese)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Colorful fruits and vegetables</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
              <h4 className="font-medium text-amber-800 mb-2">Foods to Limit</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Caffeine (limit to 200mg per day)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>High-mercury fish (tuna, swordfish)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Processed foods high in sodium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Excessive sugar and sweets</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <h4 className="font-medium text-red-800 mb-2">Foods to Avoid</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Alcohol (all forms)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Raw/undercooked meats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Unpasteurized dairy products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Raw sprouts and unwashed produce</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Excessive liver products (high vitamin A)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Download Complete Nutrition Guide
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NutritionTabContent;
