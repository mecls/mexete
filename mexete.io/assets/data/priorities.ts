import { Priorities } from '../types';
import tasks from './tasks';
// Utility function to map priority levels to PriorityLevel type
const mapPriorityLevel = (priority: string): 'High Priority' | 'Medium Priority' | 'Low Priority' | 'Default' => {
    switch (priority) {
      case '1':
        return 'High Priority';
      case '2':
        return 'Medium Priority';
      case '3':
        return 'Low Priority';
      default:
        return 'Default';
    }
  };
  
  // Map the tasks to the Priorities structure
  const priority: Priorities[] = [
    {
      user_id: 1, // Example user_id
      priority_item: tasks.map((task) => ({
        tasks_data: {
          id: task.id,
          title: task.title,
          priority_lvl: task.priority_lvl ? [mapPriorityLevel(task.priority_lvl)] : undefined,
        },
      })),
    },
  ];
  
export default priority;
