
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
  const [hasStoredKey, setHasStoredKey] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if there's already a stored API key
    const storedKey = localStorage.getItem('image_generator_api_key');
    setHasStoredKey(!!storedKey);
  }, []);
  
  const handleSave = () => {
    if (apiKey.trim()) {
      imageGenerator.setApiKey(apiKey.trim());
      setHasStoredKey(true);
      setIsOpen(false);
      toast({
        title: "API Key Saved",
        description: "Your AI image generator API key has been saved.",
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
    localStorage.removeItem('image_generator_api_key');
    setHasStoredKey(false);
    setApiKey("");
    toast({
      title: "API Key Removed",
      description: "Your AI image generator API key has been removed.",
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
        {hasStoredKey ? "Configure Image AI" : "Set up AI Image Generation"}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Image Generator Setup</DialogTitle>
            <DialogDescription>
              Enter your Runware API key to enable AI-generated images for recipes.
              You can get your API key from <a href="https://runware.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Runware.ai</a>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder={hasStoredKey ? "••••••••••••••••••••••••••" : "Enter your Runware API key"} 
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>
                Without an API key, recipe images will use random stock photos instead.
              </span>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 sm:justify-between">
            {hasStoredKey && (
              <Button variant="outline" onClick={handleRemove}>
                Remove API Key
              </Button>
            )}
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save API Key
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGeneratorConfig;
