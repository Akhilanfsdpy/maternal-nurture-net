
import React, { useState } from 'react';
import { Calendar, Plus, Search, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  date: string;
  notes: string;
}

const SymptomsTabContent: React.FC = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { 
      id: '1', 
      name: 'Nausea', 
      severity: 'moderate', 
      date: '2023-05-15', 
      notes: 'Mostly in the morning, subsided after eating crackers.'
    },
    { 
      id: '2', 
      name: 'Fatigue', 
      severity: 'severe', 
      date: '2023-05-14', 
      notes: 'Extremely tired all day, needed to take multiple naps.'
    },
    { 
      id: '3', 
      name: 'Back Pain', 
      severity: 'mild', 
      date: '2023-05-13', 
      notes: 'Lower back discomfort when sitting for extended periods.'
    },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id'>>({
    name: '',
    severity: 'mild',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  const { toast } = useToast();

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSymptom = () => {
    if (!newSymptom.name) {
      toast({
        title: "Error",
        description: "Please enter a symptom name",
        variant: "destructive"
      });
      return;
    }

    const symptomToAdd = {
      ...newSymptom,
      id: Date.now().toString()
    };

    setSymptoms([symptomToAdd, ...symptoms]);
    setNewSymptom({
      name: '',
      severity: 'mild',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAddForm(false);

    toast({
      title: "Symptom Added",
      description: `${symptomToAdd.name} has been added to the tracker.`
    });
  };

  const handleDeleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
    toast({
      title: "Symptom Removed",
      description: "The symptom has been removed from the tracker."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="h-5 w-5 text-health-pink mr-2" />
            Symptom Tracking
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="text-health-pink border-health-light-pink"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <X className="h-4 w-4 mr-1" />
            ) : (
              <Plus className="h-4 w-4 mr-1" />
            )}
            {showAddForm ? 'Cancel' : 'Add Symptom'}
          </Button>
        </CardTitle>
        <CardDescription>
          Monitor and record symptoms throughout your pregnancy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-4">
            <h3 className="font-medium text-sm">Add New Symptom</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Symptom Name</label>
                <Input 
                  placeholder="e.g., Nausea, Headache, Swelling" 
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date Observed</label>
                <Input 
                  type="date" 
                  value={newSymptom.date}
                  onChange={(e) => setNewSymptom({...newSymptom, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Severity</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({
                    ...newSymptom, 
                    severity: e.target.value as 'mild' | 'moderate' | 'severe'
                  })}
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Notes</label>
                <Input 
                  placeholder="Additional details about the symptom" 
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
                />
              </div>
            </div>
            <Button 
              onClick={handleAddSymptom}
              className="w-full mt-2 bg-gradient-to-r from-health-pink to-health-light-pink"
            >
              Add Symptom
            </Button>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search symptoms..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSymptoms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Tag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-sm">No symptoms have been recorded yet.</p>
            <p className="text-xs">Click "Add Symptom" to start tracking.</p>
          </div>
        ) : (
          <ul className="space-y-3 mt-3">
            {filteredSymptoms.map(symptom => (
              <li key={symptom.id} className="border rounded-lg p-3 relative hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium flex items-center">
                      {symptom.name}
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        symptom.severity === 'mild' 
                          ? 'bg-green-100 text-green-800'
                          : symptom.severity === 'moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {symptom.severity}
                      </span>
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(symptom.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => handleDeleteSymptom(symptom.id)}
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
                {symptom.notes && (
                  <p className="text-sm text-gray-600 mt-2">{symptom.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Always consult your healthcare provider about new or worsening symptoms.
      </CardFooter>
    </Card>
  );
};

export default SymptomsTabContent;
