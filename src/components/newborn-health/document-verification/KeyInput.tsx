
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Eye, EyeOff, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KeyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  colorClass: string;
  placeholder: string;
}

const KeyInput: React.FC<KeyInputProps> = ({
  label,
  value,
  onChange,
  colorClass,
  placeholder,
}) => {
  const [showKey, setShowKey] = React.useState(false);
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium flex items-center">
          <Key className={`h-4 w-4 mr-2 ${colorClass}`} />
          {label}
        </label>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <div className="relative verification-input-container">
        <Input 
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} 
          className={`border-${colorClass}/20 focus:border-${colorClass} pr-8`} 
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => {
            // In a real app, this might open a QR scanner
            toast({
              title: `Scan ${label}`,
              description: "Camera would open to scan QR code in a production app.",
            });
          }}
        >
          <Scan className="h-3.5 w-3.5 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

export default KeyInput;
