
export interface ScanningOptions {
  enhancedMode?: boolean;
}

export interface ScanProgress {
  progress: number;
  confidence?: number;
  stage?: string;
}

export interface ScannedDocument {
  imagePreview: string;
  scannedText: string;
  confidence?: number;
  fields?: Record<string, string>;
}
