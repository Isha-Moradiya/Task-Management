import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Task = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTask = async () => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/task/create-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, data.task]);
        toast.success("Task added!");
        setFormData({ title: "", description: "" });
      } else {
        toast.error("Task not added!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async () => {
    if (!editTask) return;
    try {
      const response = await fetch(
        `http://localhost:5002/api/task/update-task/${editTask}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task._id === editTask ? data.task : task
        );
        setTasks(updatedTasks);
        toast.success("Task updated!");
        setFormData({ title: "", description: "" });
        setEditTask(null);
      } else {
        toast.error("Task not updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    editTask ? updateTask() : addTask();
  };

  const getAllTask = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/task/get-task", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();

      if (response.ok && Array.isArray(data.task)) {
        setTasks(data.task);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/task/delete-task/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success("Task deleted!");
      } else {
        toast.error("Task not deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const taskUpdate = (task) => {
    setFormData({ title: task.title, description: task.description });
    setEditTask(task._id);
  };

  useEffect(() => {
    if (authorizationToken) getAllTask();
  }, [authorizationToken]);

  return (
    <>
      <div className="section-formData">
        <div className="container">
          <div className="form-div">
            <h1 className="main-heading">Task Manager</h1>
            <br />

            <form onSubmit={handleFormSubmit}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your title"
                  required
                  autoComplete="off"
                  value={formData.title}
                  onChange={handleInput}
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Enter your task"
                  required
                  rows="5"
                  value={formData.description}
                  onChange={handleInput}
                />
              </div>

              <button type="submit">
                {editTask ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>

          <div className="task-list">
            <h2>Your Tasks</h2>
            {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task._id} className="task-item">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="button-group">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        taskUpdate(task);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
