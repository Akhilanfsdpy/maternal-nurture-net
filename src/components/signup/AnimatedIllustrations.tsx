
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedIllustrationsProps {
  passwordShaking: boolean;
  passwordSmiling: boolean;
  motherImageRef: React.RefObject<HTMLImageElement>;
  babyImageRef: React.RefObject<HTMLImageElement>;
}

const AnimatedIllustrations: React.FC<AnimatedIllustrationsProps> = ({
  passwordShaking,
  passwordSmiling,
  motherImageRef,
  babyImageRef
}) => {
  return (
    <div className="absolute bottom-8 right-8 flex items-end">
      <div className="relative w-32 h-32 mr-4">
        <img 
          src="/mother-illustration.svg" 
          alt="Mother" 
          className="w-full h-full object-contain"
          ref={motherImageRef}
        />
      </div>
      <div className="relative w-24 h-24">
        <img 
          src="/baby-illustration.svg" 
          alt="Baby" 
          className={cn(
            "w-full h-full object-contain transition-all",
            passwordShaking ? "head-shake" : "",
            passwordSmiling ? "head-nod" : ""
          )}
          ref={babyImageRef}
        />
      </div>
    </div>
  );
};

export default AnimatedIllustrations;
