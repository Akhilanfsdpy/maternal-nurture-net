
import React, { useState } from 'react';
import { FileText, Download, Share2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const MedicalReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<null | {
    date: string;
    summary: string;
    vitals: {
      bloodPressure: string;
      heartRate: string;
      weight: string;
    };
    recommendations: string[];
  }>(null);

  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate report
    setTimeout(() => {
      const generatedReport = {
        date: new Date().toLocaleDateString(),
        summary: "Patient is in good health overall. Pregnancy progressing normally with expected development for gestational age.",
        vitals: {
          bloodPressure: "118/75 mmHg",
          heartRate: "72 bpm",
          weight: "65 kg (+0.5 kg from last visit)"
        },
        recommendations: [
          "Continue prenatal vitamins as prescribed",
          "Maintain moderate physical activity",
          "Schedule follow-up appointment in 4 weeks",
          "Complete recommended blood tests before next visit"
        ]
      };
      
      setReport(generatedReport);
      setIsGenerating(false);
      
      toast({
        title: "Report Generated",
        description: "Medical report has been generated successfully."
      });
    }, 2000);
  };

  const handleShare = () => {
    toast({
      title: "Report Shared",
      description: "Medical report has been shared with your healthcare provider."
    });
  };

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Medical report has been downloaded to your device."
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-health-blue" />
          AI Medical Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!report ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 mb-4">Generate a comprehensive medical report based on your health data</p>
            <Button 
              onClick={generateReport} 
              disabled={isGenerating}
              className="bg-gradient-to-r from-health-blue to-health-light-blue"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>Generate Report</>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Medical Summary Report</h3>
              <span className="text-sm text-gray-500">Generated on {report.date}</span>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm">{report.summary}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Vital Statistics</h4>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span className="text-gray-600">Blood Pressure:</span>
                  <span>{report.vitals.bloodPressure}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Heart Rate:</span>
                  <span>{report.vitals.heartRate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span>{report.vitals.weight}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommendations</h4>
              <ul className="text-sm space-y-1">
                {report.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-health-blue">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      {report && (
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={handleDownload} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button 
            onClick={handleShare}
            size="sm"
            className="bg-gradient-to-r from-health-blue to-health-light-blue"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share with Doctor
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MedicalReportGenerator;
