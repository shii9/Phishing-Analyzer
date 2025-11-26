import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const URLScreenshotAnalyzer = ({ onAnalyze }: { onAnalyze: (text: string) => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeScreenshot = async () => {
    if (!image) return;

    setIsProcessing(true);

    // Simulate OCR processing for webpage screenshots
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock extracted text from webpage screenshot - in real implementation, this would use OCR
    const mockExtractedText = `Welcome to Secure Login Portal

Username: __________
Password: __________

[Login Button] [Forgot Password?]

⚠️ Security Alert: Your account will be suspended in 24 hours if you don't verify now.

Click here to verify: http://secure-bank-login.com/verify
Update your payment information immediately.

Important Notice:
- Account verification required
- Unusual activity detected
- Confirm your identity now
- Update credit card details

Don't wait - your account security depends on it!`;

    onAnalyze(mockExtractedText);
    setIsProcessing(false);
    toast.success('Screenshot analyzed! Webpage text extracted and ready for analysis.');
  };

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">URL Screenshot Analysis</h3>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full h-32 border-dashed"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8" />
            <span>Upload Webpage Screenshot</span>
            <span className="text-xs text-muted-foreground">PNG, JPG, or WEBP</span>
          </div>
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img src={image} alt="Webpage screenshot" className="w-full h-auto" />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={analyzeScreenshot}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting Text...
                </>
              ) : (
                'Analyze with OCR'
              )}
            </Button>
            <Button
              onClick={() => setImage(null)}
              variant="outline"
            >
              Remove
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
};
