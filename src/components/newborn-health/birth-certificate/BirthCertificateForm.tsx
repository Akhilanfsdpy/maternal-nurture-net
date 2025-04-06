
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BirthCertificate } from '@/types/newbornHealth';

interface BirthCertificateFormProps {
  formData: {
    childName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    gender: string;
    weight: string;
    height: string;
    parentName1: string;
    parentName2: string;
    address: string;
    contactNumber: string;
    hospitalName: string;
    doctorName: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const BirthCertificateForm: React.FC<BirthCertificateFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleSubmit
}) => {
  return (
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
  );
};

export default BirthCertificateForm;
