import { motion } from 'framer-motion';
import { Mail, File, Link, MapPin, Globe } from 'lucide-react';
import { Button } from './ui/button';
import type { InputType } from '../types/phishing';

interface InputTypeSelectorProps {
  selectedType: InputType;
  onTypeChange: (type: InputType) => void;
}

const inputTypes = [
  { id: 'email' as InputType, label: 'Email', icon: Mail, description: 'Analyze email content' },
  { id: 'file' as InputType, label: 'File', icon: File, description: 'Upload and scan files' },
  { id: 'url' as InputType, label: 'URL', icon: Link, description: 'Check website links' },
  { id: 'ip' as InputType, label: 'IP Address', icon: MapPin, description: 'Lookup IP reputation' },
  { id: 'domain' as InputType, label: 'Domain', icon: Globe, description: 'Analyze domain reputation' },
];

export const InputTypeSelector = ({ selectedType, onTypeChange }: InputTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {inputTypes.map((type) => (
        <motion.div
          key={type.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={selectedType === type.id ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeChange(type.id)}
            className={`gap-2 transition-all ${
              selectedType === type.id
                ? 'bg-gradient-primary text-primary-foreground shadow-lg'
                : 'hover:bg-secondary/50'
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};
