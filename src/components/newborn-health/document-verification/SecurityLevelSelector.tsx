
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Fingerprint, Lock } from 'lucide-react';

type SecurityLevel = 'standard' | 'enhanced' | 'government';

interface SecurityLevelSelectorProps {
  securityLevel: SecurityLevel;
  setSecurityLevel: (level: SecurityLevel) => void;
}

const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = ({
  securityLevel,
  setSecurityLevel,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        onClick={() => setSecurityLevel('standard')}
        variant={securityLevel === 'standard' ? 'default' : 'outline'}
        size="sm"
        className={securityLevel === 'standard' ? 'bg-health-blue' : ''}
      >
        <Shield className="h-3.5 w-3.5 mr-1" />
        Standard
      </Button>
      <Button 
        onClick={() => setSecurityLevel('enhanced')}
        variant={securityLevel === 'enhanced' ? 'default' : 'outline'}
        size="sm"
        className={securityLevel === 'enhanced' ? 'bg-health-blue' : ''}
      >
        <Fingerprint className="h-3.5 w-3.5 mr-1" />
        Enhanced
      </Button>
      <Button 
        onClick={() => setSecurityLevel('government')}
        variant={securityLevel === 'government' ? 'default' : 'outline'}
        size="sm"
        className={securityLevel === 'government' ? 'bg-health-blue' : ''}
      >
        <Lock className="h-3.5 w-3.5 mr-1" />
        Government
      </Button>
    </div>
  );
};

export default SecurityLevelSelector;
