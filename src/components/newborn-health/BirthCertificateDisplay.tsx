
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BirthCertificate } from '@/types/newbornHealth';
import { Download, Printer, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BirthCertificateDisplayProps {
  certificate: BirthCertificate;
}

const BirthCertificateDisplay: React.FC<BirthCertificateDisplayProps> = ({ certificate }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your birth certificate is being downloaded as a PDF.",
    });
    // In a real application, this would generate and download a PDF
  };

  const handlePrint = () => {
    toast({
      title: "Printing",
      description: "Preparing document for printing.",
    });
    window.print();
  };

  const handleShare = () => {
    toast({
      title: "Share Options",
      description: "Sharing options would open here.",
    });
    // In a real application, this would open sharing options
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Digital Birth Certificate</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <Card className="border-2 border-health-pink/20 shadow-md overflow-hidden print:shadow-none">
        <div className="bg-gradient-to-r from-health-pink/10 to-health-light-pink/10 p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-health-pink">CERTIFICATE OF BIRTH</h3>
              <p className="text-gray-500">Official Birth Registration Document</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Certificate ID: {certificate.certificateId}</p>
              <p className="text-sm text-gray-500">Issue Date: {certificate.issueDate}</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Child Information</h4>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Full Name</span>
                  <span className="font-medium">{certificate.childName}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Date of Birth</span>
                    <span className="font-medium">{certificate.dateOfBirth}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Time of Birth</span>
                    <span className="font-medium">{certificate.timeOfBirth}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Gender</span>
                    <span className="font-medium">{certificate.gender}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Weight</span>
                    <span className="font-medium">{certificate.weight} kg</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Height</span>
                    <span className="font-medium">{certificate.height} cm</span>
                  </div>
                </div>
                {certificate.apgarScore && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">APGAR Score</span>
                    <span className="font-medium">{certificate.apgarScore}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Parent/Guardian Information</h4>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Parent/Guardian 1</span>
                  <span className="font-medium">{certificate.parentName1}</span>
                </div>
                {certificate.parentName2 && (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Parent/Guardian 2</span>
                    <span className="font-medium">{certificate.parentName2}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Address</span>
                  <span className="font-medium">{certificate.address}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Contact Number</span>
                  <span className="font-medium">{certificate.contactNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-700">Birth Location</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Hospital/Birth Center</span>
                <span className="font-medium">{certificate.hospitalName}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Attending Doctor/Midwife</span>
                <span className="font-medium">{certificate.doctorName}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-col md:flex-row justify-between items-end">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Certificate Issued By</span>
                <span className="font-medium">{certificate.issuedBy}</span>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="h-20 w-40 border border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-sm text-gray-400">Digital Signature</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="h-24 w-24 border border-gray-300 flex items-center justify-center">
              <span className="text-sm text-gray-400">QR Code</span>
            </div>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            This digital birth certificate is an official document. Verify the authenticity by scanning the QR code or visiting the official portal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthCertificateDisplay;
