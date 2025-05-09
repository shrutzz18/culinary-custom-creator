
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageGenerator } from "@/utils/recipeUtils";
import { useToast } from "@/hooks/use-toast";
import { Info, Wand2 } from "lucide-react";

const ImageGeneratorConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [hasStoredKey, setHasStoredKey] = useState(true); // Default to true since we have a default key
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if there's a custom stored API key
    const storedKey = localStorage.getItem('image_generator_api_key');
    setHasStoredKey(true); // Always true since we have a default key
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);
  
  const handleSave = () => {
    if (apiKey.trim()) {
      imageGenerator.setApiKey(apiKey.trim());
      setHasStoredKey(true);
      setIsOpen(false);
      toast({
        title: "API Key Saved",
        description: "Your custom AI image generator API key has been saved.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key.",
        variant: "destructive",
      });
    }
  };
  
  const handleRemove = () => {
    // Reset to the default key
    imageGenerator.setApiKey("hUfjGcnwbgecccOgmmUAermmZCSQMBnz");
    localStorage.removeItem('image_generator_api_key');
    setApiKey("");
    toast({
      title: "Custom API Key Removed",
      description: "Using the default API key now.",
    });
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1"
      >
        <Wand2 className="h-4 w-4" />
        Configure Image AI
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Image Generator Setup</DialogTitle>
            <DialogDescription>
              The app uses Runware.ai to generate custom images for recipes. A default API key is already configured, but you can use your own for better reliability.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">Custom API Key (Optional)</Label>
              <Input 
                id="apiKey" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder="Enter your own Runware API key (optional)" 
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>
                You can get your own API key from <a href="https://runware.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Runware.ai</a> for better reliability.
              </span>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:justify-between">
            {apiKey && (
              <Button variant="outline" onClick={handleRemove}>
                Use Default API Key
              </Button>
            )}
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Custom Key
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGeneratorConfig;
