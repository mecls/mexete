export type Task = {id: number,title: string,
    subtask:string | undefined,
    subtask_id: number | undefined,
    priority_lvl?:[PriorityLevel],
    time2finish: string | undefined;
};

export type PriorityLevel = 'High Priority' | 'Medium Priority' | 'Low Priority' | 'Default';

export type Priorities = {
    user_id: number;
    priority_item?: PrioritiesItem[];
};

export type PrioritiesItem = {
    tasks_data: Pick<Task, 'id' | 'title' | 'priority_lvl'>;
};
  
export type Profile = {
    id: string,
    group: string,
    username: string;
  };
  