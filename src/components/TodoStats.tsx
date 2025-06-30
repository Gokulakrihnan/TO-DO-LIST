
import { Progress } from "@/components/ui/progress";

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export const TodoStats = ({ total, completed, active }: TodoStatsProps) => {
  const completionPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-700">
            {Math.round(completionPercentage)}% Complete
          </div>
          <div className="text-sm text-gray-500">Keep going! 🎯</div>
        </div>
      </div>
      
      <Progress value={completionPercentage} className="h-2" />
    </div>
  );
};
