
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Todo, Priority } from "@/types/todo";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}

export const TodoItem = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit, 
  onUpdatePriority 
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50";
      case "low":
        return "border-l-green-500 bg-green-50/50";
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md",
      getPriorityColor(todo.priority),
      todo.completed && "opacity-60"
    )}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="w-5 h-5"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEdit();
                if (e.key === "Escape") handleCancel();
              }}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleEdit} variant="outline">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleCancel} variant="outline">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className={cn(
              "flex-1 text-lg",
              todo.completed && "line-through text-gray-500"
            )}>
              {todo.text}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{getPriorityIcon(todo.priority)}</span>
              <Select 
                value={todo.priority} 
                onValueChange={(value: Priority) => onUpdatePriority(todo.id, value)}
              >
                <SelectTrigger className="w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔴 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="hover:bg-blue-50"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(todo.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
