
import { Button } from "@/components/ui/button";
import { FilterType } from "@/types/todo";

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const TodoFilters = ({ 
  currentFilter, 
  onFilterChange, 
  onClearCompleted, 
  hasCompleted 
}: TodoFiltersProps) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Tasks" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2">
        {filters.map(({ key, label }) => (
          <Button
            key={key}
            variant={currentFilter === key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(key)}
            className={currentFilter === key ? "bg-blue-500 hover:bg-blue-600" : ""}
          >
            {label}
          </Button>
        ))}
      </div>

      {hasCompleted && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearCompleted}
          className="hover:bg-red-50 hover:text-red-600"
        >
          Clear Completed
        </Button>
      )}
    </div>
  );
};
