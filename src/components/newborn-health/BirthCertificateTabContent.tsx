
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import BirthCertificateDisplay from './BirthCertificateDisplay';
import { BirthCertificate } from '@/types/newbornHealth';

const BirthCertificateTabContent: React.FC = () => {
  const [certificate, setCertificate] = useState<BirthCertificate | null>(null);
  const [formData, setFormData] = useState({
    childName: '',
    dateOfBirth: new Date().toISOString().slice(0, 10),
    timeOfBirth: '',
    gender: '',
    weight: '',
    height: '',
    parentName1: '',
    parentName2: '',
    address: '',
    contactNumber: '',
    hospitalName: '',
    doctorName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a certificate object
    const newCertificate: BirthCertificate = {
      childId: `ID-${Date.now().toString().slice(-6)}`,
      childName: formData.childName,
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth,
      gender: formData.gender,
      weight: formData.weight,
      height: formData.height,
      apgarScore: '9/10',
      parentName1: formData.parentName1,
      parentName2: formData.parentName2 || null,
      address: formData.address,
      contactNumber: formData.contactNumber,
      hospitalName: formData.hospitalName || 'Not specified',
      doctorName: formData.doctorName || 'Not specified',
      certificateId: `BC-${Date.now().toString().slice(-8)}`,
      issueDate: new Date().toISOString().split('T')[0],
      issuedBy: 'Digital Health Authority',
    };
    
    setCertificate(newCertificate);
  };
  
  if (certificate) {
    return <BirthCertificateDisplay certificate={certificate} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-health-pink" />
          Digital Birth Certificate
        </CardTitle>
        <CardDescription>
          Create an official digital birth certificate for your child
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-700 mt-0.5 mr-2" />
            <div>
              <AlertTitle className="text-blue-800">Important Information</AlertTitle>
              <AlertDescription className="text-blue-700">
                The information provided will be used to create an official digital birth certificate. 
                Please ensure all details are accurate as they will appear on the official document.
              </AlertDescription>
            </div>
          </div>
        </Alert>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Child Information</h3>
              
              <div className="space-y-2">
                <label htmlFor="childName" className="text-sm font-medium">Child's Full Name</label>
                <Input 
                  id="childName"
                  name="childName"
                  placeholder="Full name as it will appear on certificate"
                  value={formData.childName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</label>
                  <Input 
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="timeOfBirth" className="text-sm font-medium">Time of Birth</label>
                  <Input 
                    id="timeOfBirth"
                    name="timeOfBirth"
                    type="time"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
                  <Input 
                    id="weight"
                    name="weight"
                    placeholder="e.g. 3.2"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
                  <Input 
                    id="height"
                    name="height"
                    placeholder="e.g. 50"
                    value={formData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Parent/Guardian Information</h3>
              
              <div className="space-y-2">
                <label htmlFor="parentName1" className="text-sm font-medium">Parent/Guardian 1 Name</label>
                <Input 
                  id="parentName1"
                  name="parentName1"
                  placeholder="Full name"
                  value={formData.parentName1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="parentName2" className="text-sm font-medium">Parent/Guardian 2 Name (Optional)</label>
                <Input 
                  id="parentName2"
                  name="parentName2"
                  placeholder="Full name"
                  value={formData.parentName2}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Home Address</label>
                <Input 
                  id="address"
                  name="address"
                  placeholder="Full address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contactNumber" className="text-sm font-medium">Contact Number</label>
                <Input 
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Phone number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <h3 className="text-lg font-medium pt-4">Hospital Information</h3>
              
              <div className="space-y-2">
                <label htmlFor="hospitalName" className="text-sm font-medium">Hospital/Birth Center Name</label>
                <Input 
                  id="hospitalName"
                  name="hospitalName"
                  placeholder="Name of facility"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="doctorName" className="text-sm font-medium">Attending Doctor/Midwife</label>
                <Input 
                  id="doctorName"
                  name="doctorName"
                  placeholder="Name of healthcare provider"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-health-pink to-health-light-pink"
          >
            Generate Birth Certificate
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BirthCertificateTabContent;
