
import React, { useState } from 'react';
import { Plus, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSymptoms } from './symptoms/useSymptoms';
import SymptomForm from './symptoms/SymptomForm';
import SymptomList from './symptoms/SymptomList';
import { initialSymptoms } from './symptoms/initialData';

const SymptomsTracker: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { 
    filteredSymptoms, 
    searchTerm, 
    setSearchTerm, 
    addSymptom, 
    deleteSymptom 
  } = useSymptoms(initialSymptoms);

  const handleAddSymptom = (symptom: any) => {
    const success = addSymptom(symptom);
    if (success) {
      setShowAddForm(false);
    }
    return success;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="h-5 w-5 text-health-pink mr-2" />
            Symptoms Tracker
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
          Track and monitor your baby's symptoms over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <SymptomForm 
            onAddSymptom={handleAddSymptom}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <SymptomList 
          symptoms={filteredSymptoms}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onDeleteSymptom={deleteSymptom}
        />
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Tracking symptoms helps recognize patterns and communicate with healthcare providers.
      </CardFooter>
    </Card>
  );
};

export default SymptomsTracker;
