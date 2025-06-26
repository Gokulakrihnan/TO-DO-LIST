
import { useState, useEffect } from "react";
import { TodoHeader } from "./TodoHeader";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoFilters } from "./TodoFilters";
import { TodoStats } from "./TodoStats";
import { Todo, Priority, FilterType } from "@/types/todo";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority = "medium") => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const updatePriority = (id: string, priority: Priority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <TodoHeader />
        
        <div className="p-6 space-y-6">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoStats 
            total={todos.length}
            completed={completedCount}
            active={activeCount}
          />
          
          <TodoFilters 
            currentFilter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={completedCount > 0}
          />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdatePriority={updatePriority}
          />
        </div>
      </div>
    </div>
  );
};
