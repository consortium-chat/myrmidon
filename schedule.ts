export interface Task {
  description: string;
  time: string;
  callback: () => Promise<void>;
}

const tasks: Task[] = [];

export function schedule(task: Task) {
  tasks.push(task);
  console.info("Scheduled task:", task.description);
}

function checkTasks() {
  // Get the current date-time in the Pacific Time Zone
  const nowPT = new Date().toLocaleString("en-US", {
    timeZone: "US/Pacific",
    weekday: "long",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  for (const task of tasks) {
    if (task.time == nowPT) {
      task.callback().catch(console.error);
    }
  }
}

setInterval(checkTasks, 1000);
