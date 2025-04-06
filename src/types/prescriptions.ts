
export interface ScannedMedication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface PrescriptionData {
  medications: ScannedMedication[];
  patient?: string;
  doctor?: string;
  date?: string;
  notes?: string;
}
