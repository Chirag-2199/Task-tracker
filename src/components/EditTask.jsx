import "./Home.css";
import { useState, useEffect } from "react";
const EditTask = ({
  task,
  index,
  taskList,
  setTaskList,
  handleUpdateStatus,
}) => {
  const [editModal, setEditModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDiscription, setTaskDiscription] = useState("");
  const [status, setStatus] = useState(task.status || "");

  useEffect(() => {
    setTaskName(task.taskName);
    setTaskDiscription(task.taskDiscription);
    setStatus(task.status || "");
  }, [task]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") setTaskName(value);
    if (name === "taskDiscription") setTaskDiscription(value);
    if (status === "status") setStatus(value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDiscription.trim()) {
      alert("Title and description cannot be empty");
      return;
    }
    const updatedTask = { ...task, taskName, taskDiscription, status }; // Include status in updated task
    setTaskList((prevTaskList) => {
      const newList = [...prevTaskList];
      newList[index] = updatedTask;
      return newList;
    });
    // Update local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));
    handleUpdateStatus(index, status); // Update task status
    setEditModal(false);
  };

  useEffect(() => {
    console.log("Updated task list:", taskList);
  }, [taskList]);

  return (
    <>
      <button className="edit-btn" onClick={() => setEditModal(true)}>
        Edit
      </button>
      {editModal ? (
        <>
          <div className="prop">
            <div className="add-task">
              <div className="inp-fields">
                <h3 className="task-heading"> Edit Task</h3>
                <button
                  className="cross-btn"
                  onClick={() => {
                    setEditModal(false);
                  }}
                >
                  x
                </button>
              </div>
              <form>
                <h4 className="title"> Title :</h4>
                <input
                  id="task-name"
                  type="text"
                  placeholder="Task 1"
                  name="taskName"
                  value={taskName}
                  onChange={handleInput}
                  required
                />
                <h4 className="title"> Task Description :</h4>
                <textarea
                  rows="3"
                  placeholder="Enter Your task description "
                  name="taskDiscription"
                  value={taskDiscription}
                  onChange={handleInput}
                  required
                />
                <h4 className="title"> Team:</h4>
                <input id="task-name" type="text" placeholder="Avengers" />

                <h4 className="title"> Assigne :</h4>
                <input id="task-name" type="text" placeholder="@chirag" />
                <span>
                  <select id="cars" name="cars" className="up-edit-btn">
                    <option value="volvo">Priorty</option>
                    <option value="saab">P1</option>
                    <option value="fiat">P2</option>
                    <option value="audi">P3</option>
                  </select>
                </span>
                <span>
                  <select
                    id="status"
                    name="status"
                    className="up-edit-btn"
                    onChange={handleInput}
                  >
                    <option value="status"> Status</option>
                    <option value="Panding">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Defferd">Defferd</option>
                  </select>
                </span>
              </form>
              <div>
                <button className="add-btn" onClick={handleUpdate}>
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default EditTask;
