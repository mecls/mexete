// Define the possible priority levels
export type PriorityLevel = '1' | '2' | '3' | ''; // High, Medium, Low, or No priority

// Define Task type with mandatory 'id', 'title', and optional fields like 'subtask', 'subtask_id', and 'time2finish'
export type Task = Readonly<{
    id: number;
    title: string;
    date: Date | undefined;  // 'date' can be undefined
    subtask?: string | undefined;
    subtask_id?: number | undefined;
    priority_lvl?: PriorityLevel; // Single priority level
    time2finish?: string | undefined;
}>;

export type MarkedDatesType = {
    [key: string]: {
      dots: { color: string }[];
      marked?: boolean;
      disableTouchEvent?: boolean;
      selectedColor?: string;
      selectedTextColor?: string;
    };
  };

// Define Priorities structure with a 'user_id' and optional 'priority_item' list
export type Priorities = {
    user_id: number;
    priority_item?: PrioritiesItem[];
};

// Define PrioritiesItem, which contains a 'tasks_data' object with a subset of Task properties
export type PrioritiesItem = {
    tasks_data: Pick<Task, 'id' | 'title' | 'priority_lvl' | 'date'>; 
};

export type Workout = Readonly<{
    id: number;
    title: string;
    date: Date | undefined;  // 'date' can be undefined
    description: string | undefined; 
    time: number | undefined;
}>;

// Profile type for managing user data
export type Profile = {
    id: string;
    group: 'admin' | 'user' | 'guest'; // User role constraints
    username: string;
};
