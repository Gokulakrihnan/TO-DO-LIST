
import { CheckSquare } from "lucide-react";

export const TodoHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
      <div className="flex items-center justify-center space-x-3">
        <CheckSquare className="w-8 h-8" />
        <h1 className="text-3xl font-bold">My Tasks</h1>
      </div>
      <p className="text-center text-blue-100 mt-2">
        Stay organized, stay productive
      </p>
    </div>
  );
};
