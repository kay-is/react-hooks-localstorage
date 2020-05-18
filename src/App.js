import React from "react";
import "./styles.css";

let localTasks = [];

const tasksAsString = localStorage.getItem("tasks");
if (tasksAsString) {
  localTasks = JSON.parse(tasksAsString);
}

export default function App() {
  const [newTask, setNewTask] = React.useState("");
  const [tasks, setTasks] = React.useState(localTasks);

  function deleteTask(task) {
    const filteredTasks = tasks.filter(function(item) {
      return item !== task;
    });

    const tasksAsString = JSON.stringify(filteredTasks);
    localStorage.setItem("tasks", tasksAsString);

    setTasks(filteredTasks);
  }

  function createTask() {
    const newTasks = [...tasks, newTask];

    const tasksAsString = JSON.stringify(newTasks);
    localStorage.setItem("tasks", tasksAsString);

    setTasks(newTasks);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        value={newTask}
        onChange={function(event) {
          const inputElement = event.target;
          const newValue = inputElement.value;
          setNewTask(newValue);
        }}
      />
      <button onClick={createTask}>Add</button>
      <ul>
        {tasks.map(task => {
          return (
            <li>
              {task}
              <button
                onClick={function() {
                  deleteTask(task);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
