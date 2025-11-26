import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-lg">Phishing Analyzer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered phishing analysis to keep you safe from cyber threats.
            </p>
          </div>

          {/* Made with */}
          <div className="space-y-4 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">
              Made with <Heart className="w-3 h-3 inline text-red-500" /> for cybersecurity
            </p>
          </div>

          {/* Connect */}
          <div className="space-y-4 flex items-center justify-end">
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold">Connect</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="p-2">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
