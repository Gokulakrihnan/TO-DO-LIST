
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

export type Priority = "high" | "medium" | "low";

export type FilterType = "all" | "active" | "completed";
