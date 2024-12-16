// Define the tasks array
const tasks = [
  {
    id: 0,
    title: 'Exercicios AR',
    priority_lvl: '1',
    date:new Date(),
    // end_date:'',
    subtasks: [
      {
        subtask_id: 0,
        subtask_title: 'O que é DNS?',
        subtask_time2finish: '[1h]',
      },
      {
        subtask_id: 1,
        subtask_title: 'Servidor A e R',
        subtask_time2finish: '[45min]',
      },
      {
        subtask_id: 2,
        subtask_title: 'Exercicios 1,2',
        subtask_time2finish: '[45min]',
      },
    ],
  },
  {
    id: 1,
    title: 'Plan App',
    priority_lvl: '2',
    date:new Date(),
    subtasks: [
      {
        subtask_id: 0,
        subtask_title: 'Define Dummy data',
        subtask_time2finish: '[3h]',
      },
    ],
  },
  {
    id: 2,
    title: 'Run',
    priority_lvl: '3',
    date:new Date(),
  },
  {
    id: 3,
    title: 'Trash Out',
    priority_lvl: '',
  },
  {
    id: 4,
    title: 'Apresentar Proj PCD',
    priority_lvl: '1',
    date:new Date(),
  },
  {
    id: 5,
    title: 'Something 1',
    priority_lvl: '',
  },
];

export default tasks;
// import { Task } from '../types';

// // Define the tasks array with explicit type
// const tasks: Task[] = []; // Explicitly define the type as an array of Task

// export default tasks;
