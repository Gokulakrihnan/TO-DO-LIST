
import { TodoItem } from "./TodoItem";
import { Todo, Priority } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}

export const TodoList = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onEdit, 
  onUpdatePriority 
}: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
        <p className="text-gray-500 text-lg">No tasks yet</p>
        <p className="text-gray-400 text-sm mt-1">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdatePriority={onUpdatePriority}
        />
      ))}
    </div>
  );
};
