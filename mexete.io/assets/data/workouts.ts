// Define the tasks array
const workouts = [
    {
      id: 0,
      title: 'Run',
      date:new Date(),
      // end_date:'',
      description: {
          title: 'Fartlek',
          split:5,
          splitTime: 5,
          rest:3,
          restTime: 3,
          cooldown:1,
          get totalTime(){
            return (this.split*this.splitTime) + (this.rest*this.restTime);
          },
        },
    },
    {
        id: 1,
        title: 'Gym',
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow's date
        end_date:'',
        description: {
            title: 'Legs & Shoulders',
            get totalTime(){
              return 90;
            },
          },
      },
  ];

  export default workouts;


  // import { Workout } from '../types';
  
  // // Define the tasks array with explicit type
  // const workouts: Workout[] = []; // Explicitly define the type as an array of Task
  
  // export default workouts;
  