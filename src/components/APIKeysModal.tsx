import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Eye, EyeOff, Trash2, Plus, Save, X, ExternalLink, Shield, Database, Zap, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface APIKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  service: string;
  isVisible: boolean;
}

interface APIService {
  name: string;
  description: string;
  rateLimit: string;
  envVar: string;
  getKeyUrl?: string;
}

const apiServices: APIService[] = [
  {
    name: 'VirusTotal',
    description: 'URL reputation checking and malware detection',
    rateLimit: '500 requests/minute',
    envVar: 'VITE_VIRUSTOTAL_API_KEY',
    getKeyUrl: 'https://www.virustotal.com/gui/join-us'
  },
  {
    name: 'Google Safe Browsing',
    description: 'Real-time malicious URL detection',
    rateLimit: '1000 requests/day',
    envVar: 'VITE_GOOGLE_SAFEBROWSING_API_KEY',
    getKeyUrl: 'https://console.cloud.google.com/apis/credentials'
  },
  {
    name: 'PhishTank',
    description: 'Community-driven phishing database',
    rateLimit: '10,000 requests/day',
    envVar: 'VITE_PHISHTANK_API_KEY',
    getKeyUrl: 'https://phishtank.com/developer_info.php'
  },
  {
    name: 'URLScan.io',
    description: 'URL analysis and screenshot service',
    rateLimit: '100 requests/day',
    envVar: 'VITE_URLSCAN_API_KEY',
    getKeyUrl: 'https://urlscan.io/user/signup'
  }
];

export const APIKeysModal: React.FC<APIKeysModalProps> = ({ isOpen, onClose }) => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [newKeyService, setNewKeyService] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [serviceInputs, setServiceInputs] = useState<Record<string, string>>({});

  const addAPIKey = () => {
    if (!newKeyName.trim() || !newKeyValue.trim() || !newKeyService.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      key: newKeyValue.trim(),
      service: newKeyService.trim(),
      isVisible: false
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyValue('');
    setNewKeyService('');
    setShowAddForm(false);
    toast.success('API key added successfully');
  };

  const saveServiceKey = (serviceName: string) => {
    const keyValue = serviceInputs[serviceName];
    if (!keyValue?.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    const existingKeyIndex = apiKeys.findIndex(key => key.service === serviceName);
    const newKey: APIKey = {
      id: existingKeyIndex >= 0 ? apiKeys[existingKeyIndex].id : Date.now().toString(),
      name: `${serviceName} API`,
      key: keyValue.trim(),
      service: serviceName,
      isVisible: false
    };

    if (existingKeyIndex >= 0) {
      setApiKeys(apiKeys.map((key, index) => index === existingKeyIndex ? newKey : key));
    } else {
      setApiKeys([...apiKeys, newKey]);
    }

    setServiceInputs({ ...serviceInputs, [serviceName]: '' });
    toast.success(`${serviceName} API key saved`);
  };

  const deleteAPIKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success('API key deleted');
  };

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(apiKeys.map(key =>
      key.id === id ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const saveKeys = () => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
    toast.success('API keys saved');
  };

  const loadKeys = () => {
    const saved = localStorage.getItem('apiKeys');
    if (saved) {
      setApiKeys(JSON.parse(saved));
    }
  };

  React.useEffect(() => {
    loadKeys();
  }, []);

  const getServiceKey = (serviceName: string) => {
    return apiKeys.find(key => key.service === serviceName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Key className="w-6 h-6" />
            API Key Manager
          </DialogTitle>
          <DialogDescription className="text-base">
            Enter your API keys to enable threat intelligence features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* How it works section */}
          <Card className="p-4 bg-muted/50">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              How it works:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Keys are stored locally in your browser
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                No data is sent to external servers
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Keys work immediately after saving
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-500" />
                You can clear keys anytime for privacy
              </li>
            </ul>
          </Card>

          {/* API Services */}
          <div className="space-y-4">
            {apiServices.map((service) => {
              const existingKey = getServiceKey(service.name);
              return (
                <Card key={service.name} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{service.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {service.rateLimit}
                      </Badge>
                    </div>
                    {service.getKeyUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(service.getKeyUrl, '_blank')}
                        className="gap-2"
                      >
                        Get Key
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`${service.name}-key`} className="text-sm">
                        Enter your {service.name} API key
                      </Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id={`${service.name}-key`}
                          type="password"
                          placeholder={`Enter ${service.name} API key`}
                          value={serviceInputs[service.name] || existingKey?.key || ''}
                          onChange={(e) => setServiceInputs({
                            ...serviceInputs,
                            [service.name]: e.target.value
                          })}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          onClick={() => saveServiceKey(service.name)}
                          disabled={!serviceInputs[service.name]?.trim() && !existingKey}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <strong>Environment Variable:</strong>
                      <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                        {service.envVar}
                      </code>
                    </div>

                    {existingKey && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-700 dark:text-green-300">
                          API key configured
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Custom API Keys Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Custom API Keys</h3>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Custom Key
              </Button>
            </div>

            {/* Add New Key Form */}
            {showAddForm && (
              <Card className="p-4 border-dashed mb-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="key-name">Key Name</Label>
                      <Input
                        id="key-name"
                        placeholder="e.g., OpenAI API"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="key-service">Service</Label>
                      <Input
                        id="key-service"
                        placeholder="e.g., OpenAI"
                        value={newKeyService}
                        onChange={(e) => setNewKeyService(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="key-value">API Key</Label>
                      <Input
                        id="key-value"
                        type="password"
                        placeholder="sk-..."
                        value={newKeyValue}
                        onChange={(e) => setNewKeyValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewKeyName('');
                        setNewKeyValue('');
                        setNewKeyService('');
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={addAPIKey}>
                      <Save className="w-4 h-4 mr-1" />
                      Add Key
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Custom API Keys List */}
            {apiKeys.filter(key => !apiServices.some(service => service.name === key.service)).length > 0 && (
              <div className="space-y-3">
                {apiKeys.filter(key => !apiServices.some(service => service.name === key.service)).map((apiKey) => (
                  <Card key={apiKey.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {apiKey.service}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded flex-1 font-mono">
                            {apiKey.isVisible
                              ? apiKey.key
                              : `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}`
                            }
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {apiKey.isVisible ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAPIKey(apiKey.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Security Notice */}
          <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Notice:
            </h4>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Keys are stored in your browser's local storage</li>
              <li>• Clear your browser data to remove saved keys</li>
              <li>• Keys are never transmitted to our servers</li>
              <li>• All analysis happens in your browser</li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={saveKeys} className="gap-2">
              <Save className="w-4 h-4" />
              Save API Keys
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeysModal;
