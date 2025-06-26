
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Priority } from "@/types/todo";

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority) => void;
}

export const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim(), priority);
      setText("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-12 text-lg border-2 border-gray-200 focus:border-blue-400 transition-colors"
        />
      </div>
      
      <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
        <SelectTrigger className="w-32 h-12 border-2 border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="high">🔴 High</SelectItem>
          <SelectItem value="medium">🟡 Medium</SelectItem>
          <SelectItem value="low">🟢 Low</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        type="submit" 
        className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Task
      </Button>
    </form>
  );
};
