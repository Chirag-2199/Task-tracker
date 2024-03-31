import { useState, useEffect } from "react";
import "./Home.css";

const AddNewTask = ({ taskList, setTaskList }) => {
  const [addModel, setAddModel] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDiscription, setTaskDiscription] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [team, setTeam] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") setTaskName(value);
    if (name === "taskDiscription") setTaskDiscription(value);
    if (name === "assigneeName") setAssigneeName(value);
    if (name === "team") setTeam(value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDiscription.trim() || !assigneeName.trim() || !team.trim()) {
      alert('Title, description, assignee name, and team cannot be empty');
      return;
    }
    const newTask = { taskName, taskDiscription, assigneeName, team };
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    // Update local storage
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    setAddModel(false);
    setTaskName("");
    setTaskDiscription("");
    setAssigneeName("");
    setTeam("");
  };

  useEffect(() => {
    console.log("Updated task list:", taskList);
  }, [taskList]);

  return (
    <>
      <span>
        <button className="btn" onClick={() => setAddModel(true)}>
          {" "}
          Add New Task
        </button>
      </span>
      {addModel ? (
        <>
          <div className="prop">
            <div className="add-task">
              <div className="inp-fields">
                <h3 className="task-heading"> Add New Task</h3>
                <button
                  className="cross-btn"
                  onClick={() => {
                    setAddModel(false);
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
                <h4 className="assigne"> Assignee Name :</h4>
                <input
                  id="assignee-name"
                  className="assigne"
                  type="text"
                  placeholder="John Doe"
                  name="assigneeName"
                  value={assigneeName}
                  onChange={handleInput}
                  required
                />
                <h4 className="team"> Team:</h4>
                <input
                className="team"
                  id="team"
                  type="text"
                  placeholder="Avengers"
                  name="team"
                  value={team}
                  onChange={handleInput}
                  required
                />
                    <span > 
                        <select id="cars" name="cars" className="up-edit-btn">
                            <option value="volvo">Priorty</option>
                            <option value="saab">P1</option>
                            <option value="fiat">P2</option>
                            <option value="audi">P3</option>
                        </select>
                    </span>
                    <span > 
                        <select id="cars" name="cars"className="up-edit-btn" >
                            <option value="volvo">Status</option>
                            <option value="saab">Pending</option>
                            <option value="fiat">In Progress</option>
                            <option value="audi">Completed</option>
                            <option value="audi">Deployed</option>
                            <option value="audi">Defferd</option>
                        </select>
                    </span>
              </form>
              <div>
                <button className="add-btn" onClick={handleAdd}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddNewTask;
