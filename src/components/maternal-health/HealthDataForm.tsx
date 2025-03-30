
import React, { useState } from 'react';
import { PlusCircle, X, Check } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const HealthDataForm: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vitals');
  
  // Form states
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [weight, setWeight] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [mood, setMood] = useState('');
  const [symptom, setSymptom] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState('');
  const [symptomNotes, setSymptomNotes] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const resetForm = () => {
    setBloodPressure('');
    setHeartRate('');
    setWeight('');
    setSleepHours('');
    setMood('');
    setSymptom('');
    setSymptomSeverity('');
    setSymptomNotes('');
  };

  const handleSubmit = () => {
    // Validate the form based on the active tab
    if (activeTab === 'vitals') {
      if (!bloodPressure || !heartRate || !weight) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (activeTab === 'symptoms') {
      if (!symptom || !symptomSeverity) {
        toast({
          title: "Missing Information",
          description: "Please select a symptom and severity.",
          variant: "destructive"
        });
        return;
      }
    }

    // In a real app, you would send this data to your backend
    console.log({
      bloodPressure,
      heartRate,
      weight,
      sleepHours,
      mood,
      symptom,
      symptomSeverity,
      symptomNotes
    });

    toast({
      title: "Health Data Logged",
      description: "Your health data has been successfully recorded.",
    });

    resetForm();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-health-blue to-health-light-blue">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Health Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log Health Data</DialogTitle>
          <DialogDescription>
            Record your health metrics and symptoms to monitor your maternal health.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="vitals" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vitals" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood Pressure (mmHg)*</Label>
                  <Input 
                    id="bloodPressure" 
                    placeholder="e.g., 120/80" 
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (bpm)*</Label>
                  <Input 
                    id="heartRate" 
                    type="number" 
                    placeholder="e.g., 72" 
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)*</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g., 65.5" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleepHours">Sleep (hours)</Label>
                  <Input 
                    id="sleepHours" 
                    type="number" 
                    step="0.5" 
                    placeholder="e.g., 7.5" 
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mood">Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="great">Great</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="tired">Tired</SelectItem>
                    <SelectItem value="stressed">Stressed</SelectItem>
                    <SelectItem value="sad">Sad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="symptoms" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="symptom">Symptom*</Label>
                <Select value={symptom} onValueChange={setSymptom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a symptom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nausea">Nausea/Morning Sickness</SelectItem>
                    <SelectItem value="fatigue">Fatigue</SelectItem>
                    <SelectItem value="headache">Headache</SelectItem>
                    <SelectItem value="backPain">Back Pain</SelectItem>
                    <SelectItem value="swelling">Swelling</SelectItem>
                    <SelectItem value="cramping">Cramping</SelectItem>
                    <SelectItem value="heartburn">Heartburn</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="symptomSeverity">Severity*</Label>
                <Select value={symptomSeverity} onValueChange={setSymptomSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="symptomNotes">Notes</Label>
                <Input 
                  id="symptomNotes" 
                  placeholder="Additional details about the symptom" 
                  value={symptomNotes}
                  onChange={(e) => setSymptomNotes(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-4" />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-health-blue to-health-light-blue">
            <Check className="mr-2 h-4 w-4" />
            Save Health Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HealthDataForm;
