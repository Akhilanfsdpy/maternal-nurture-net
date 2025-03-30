
import React, { useState } from 'react';
import { PlusCircle, Check } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const GrowthDataForm: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setDate(new Date());
    setWeight('');
    setHeight('');
    setHeadCircumference('');
    setNotes('');
  };

  const handleSubmit = () => {
    // Validate the form
    if (!weight || !height || !headCircumference) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (weight, height, and head circumference).",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would send this data to your backend
    console.log({
      date,
      weight,
      height,
      headCircumference,
      notes
    });

    toast({
      title: "Growth Data Logged",
      description: "Your baby's growth data has been successfully recorded.",
    });

    resetForm();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-health-pink to-health-light-pink">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Growth Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log Baby Growth Data</DialogTitle>
          <DialogDescription>
            Record your baby's growth measurements to track development over time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Measurement Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)*</Label>
              <Input 
                id="weight" 
                type="number" 
                step="0.01" 
                placeholder="e.g., 3.5" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)*</Label>
              <Input 
                id="height" 
                type="number" 
                step="0.1" 
                placeholder="e.g., 50.5" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headCircumference">Head Circumference (cm)*</Label>
            <Input 
              id="headCircumference" 
              type="number" 
              step="0.1" 
              placeholder="e.g., 35.5" 
              value={headCircumference}
              onChange={(e) => setHeadCircumference(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Additional observations or comments" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <Separator className="my-2" />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-health-pink to-health-light-pink">
            <Check className="mr-2 h-4 w-4" />
            Save Growth Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GrowthDataForm;
