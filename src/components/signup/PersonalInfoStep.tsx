
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
