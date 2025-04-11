
import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface IngredientInputProps {
  label: string;
  placeholder: string;
  items: string[];
  onItemsChange: (items: string[]) => void;
  className?: string;
}

const IngredientInput = ({
  label,
  placeholder,
  items,
  onItemsChange,
  className,
}: IngredientInputProps) => {
  const [input, setInput] = useState("");

  const handleAddItem = () => {
    if (input.trim() === "") return;
    
    // Check if item already exists (case insensitive)
    if (!items.some(item => item.toLowerCase() === input.toLowerCase().trim())) {
      onItemsChange([...items, input.trim()]);
    }
    
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onItemsChange(newItems);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={handleAddItem}
          variant="outline"
          size="icon"
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, index) => (
            <Badge
              key={`${item}-${index}`}
              variant="secondary"
              className="px-3 py-1 ingredient-tag flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
