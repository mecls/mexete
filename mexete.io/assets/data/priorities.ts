import { Priorities } from '../types';
import tasks from './tasks';

// Utility function to map priority levels to the 'PriorityLevel' type
const mapPriorityLevel = (priority: string): '1' | '2' | '3' | '' => {
  switch (priority) {
    case '1':
      return '1';
    case '2':
      return '2';
    case '3':
      return '3';
    default:
      return ''; // Default value for missing priority
  }
};

// Map tasks to Priorities structure
const priority: Priorities[] = [
  {
    user_id: 1, // Example user_id, ensure this is dynamic if needed
    priority_item: tasks.map((task) => ({
      tasks_data: {
        id: task.id,
        title: task.title,
        priority_lvl: task.priority_lvl ? [mapPriorityLevel(task.priority_lvl)] : undefined,
        // Handle date, if undefined, use the current date
        date: task.date ? task.date : new Date(), // Ensure it's a valid Date object
      },
    })),
  },
];

export default priority;
