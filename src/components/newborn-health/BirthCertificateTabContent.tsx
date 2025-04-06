
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BirthCertificateDisplay from './BirthCertificateDisplay';
import { BirthCertificate } from '@/types/newbornHealth';
import BirthCertificateHeader from './birth-certificate/BirthCertificateHeader';
import BirthCertificateAlert from './birth-certificate/BirthCertificateAlert';
import BirthCertificateForm from './birth-certificate/BirthCertificateForm';

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
      <BirthCertificateHeader />
      <CardContent>
        <BirthCertificateAlert />
        <BirthCertificateForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default BirthCertificateTabContent;
