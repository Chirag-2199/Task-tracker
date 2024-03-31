import { useState, useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import AddNewTask from "./AddNewTask.jsx";
import EditTask from "./EditTask.jsx";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [pendingTaskList, setPendingTaskList] = useState([]);
  const [inProgressTaskList, setInProgressTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [deployedTaskList, setDeployedTaskList] = useState([]);
  const [deferredTaskList, setDeferredTaskList] = useState([]);

  // const handleDelete = itemID => {
  //     let removeIndex = taskList.indexOf(task);
  //     taskList.splice(removeIndex , 1);
  //     setTaskList((currentTask => currentTask.filter
  //         (todo = todo.id !== itemID)))
  // }
  // const handleDelete = (index) => {
  //     const updatedTaskList = [...taskList];
  //     updatedTaskList.splice(index, 1);
  //     setTaskList(updatedTaskList);
  // };
  const handleDelete = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      const updatedTaskList = [...taskList];
      updatedTaskList.splice(index, 1);
      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    }
  };
  // const handleDelete = (itemID) => {
  //     setTaskList((currentTask) => currentTask.filter((todo) => todo.id !== itemID));
  // }; they are two differnt ways to delete the task but it is not working for me so i used the
  // Function to update task status
  const handleUpdateStatus = (index, newStatus) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].status = newStatus;
    setTaskList(updatedTaskList);

    // Move the task to different lists based on its status
    switch (newStatus) {
      case "Pending":
        console.log("Moving task to Pending list...");

        setPendingTaskList((prevState) => [
          ...prevState,
          updatedTaskList[index],
        ]);
        break;
      case "In Progress":
        setInProgressTaskList((prevState) => [
          ...prevState,
          updatedTaskList[index],
        ]);
        break;
      case "Completed":
        setCompletedTaskList((prevState) => [
          ...prevState,
          updatedTaskList[index],
        ]);
        break;
      case "Deployed":
        setDeployedTaskList((prevState) => [
          ...prevState,
          updatedTaskList[index],
        ]);
        break;
      case "Deferred":
        setDeferredTaskList((prevState) => [
          ...prevState,
          updatedTaskList[index],
        ]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList));
    }
  }, []);

  useEffect(() => {
    if (filterAssignee.trim() === "") {
      setFilteredTasks(taskList);
    } else {
      const filtered = taskList.filter((task) =>
        task.assigneeName.toLowerCase().includes(filterAssignee.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [taskList, filterAssignee]);

  return (
    <>
      <h1 className="heading">
        Task Tracker{" "}
        <span>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </span>
      </h1>
      <div className="main-section">
        <div className="sp">
          <span> Filter By :</span>
          <input
            type="text"
            placeholder="Assignee Name"
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
            className="inp"
          />

          <span>
            <select id="cars" name="cars" className="dropdown">
              <option value="volvo">Priorty</option>
              <option value="saab">P1</option>
              <option value="fiat">P2</option>
              <option value="audi">P3</option>
            </select>
            <span>
              {" "}
              <input type="date" className="date" placeholder="DD/MM/YY" />
            </span>
          </span>

          <br />
          <br />
          <span> Sort By : </span>
          <span>
            <select id="cars" name="cars" className="dropdown">
              <option value="volvo">Priorty</option>
              <option value="saab">P1</option>
              <option value="fiat">P2</option>
              <option value="audi">P3</option>
            </select>
          </span>
        </div>
        <AddNewTask taskList={taskList} setTaskList={setTaskList} />
        <div className="card-container">
          <div className="card">
            <div className="card-heading-pending">Pending</div>
            {taskList.map((task, index) => {
              if (
                filterAssignee.trim() !== "" &&
                !task.assigneeName
                  .toLowerCase()
                  .includes(filterAssignee.toLowerCase())
              ) {
                return null; // Skip rendering if the task doesn't match the filter
              }

              return (
                <div key={index} className="dragable">
                  <h2 className="heading-task-name">
                    {task.taskName}{" "}
                    <EditTask
                      task={task}
                      taskList={taskList}
                      setTaskList={setTaskList}
                      index={index}
                      handleUpdateStatus={handleUpdateStatus}
                    />
                  </h2>
                  <p className="heading-task-name">{task.taskDiscription}</p>
                  <p className="heading-task-name">@{task.assigneeName}</p>
                  <p className="heading-task-name">Team: {task.team}</p>
                  <button
                    className="dlt-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  {index !== taskList.length - 1 && <hr />}
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="card-heading-in-progress">In Progress</div>
            {inProgressTaskList.map((task, index) => (
              <div key={index} className="dragable">
                <h2 className="heading-task-name">
                  {task.taskName}{" "}
                  <EditTask
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    index={index}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </h2>
                <p className="heading-task-name">{task.taskDiscription}</p>
                <p className="heading-task-name">@{task.assigneeName}</p>
                <p className="heading-task-name">Team: {task.team}</p>
                <button className="dlt-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                {index !== taskList.length - 1 && <hr />}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-heading-completed">Completed</div>
            {completedTaskList.map((task, index) => (
              <div key={index} className="dragable">
                <h2 className="heading-task-name">
                  {task.taskName}{" "}
                  <EditTask
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    index={index}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </h2>
                <p className="heading-task-name">{task.taskDiscription}</p>
                <p className="heading-task-name">@{task.assigneeName}</p>
                <p className="heading-task-name">Team: {task.team}</p>
                <button className="dlt-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                {index !== taskList.length - 1 && <hr />}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-heading-deployed">Deployed</div>
            {deployedTaskList.map((task, index) => (
              <div key={index} className="dragable">
                <h2 className="heading-task-name">
                  {task.taskName}{" "}
                  <EditTask
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    index={index}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </h2>
                <p className="heading-task-name">{task.taskDiscription}</p>
                <p className="heading-task-name">@{task.assigneeName}</p>
                <p className="heading-task-name">Team: {task.team}</p>
                <button className="dlt-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                {index !== taskList.length - 1 && <hr />}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-heading-defferd">Deferred</div>
            {deferredTaskList.map((task, index) => (
              <div key={index} className="dragable">
                <h2 className="heading-task-name">
                  {task.taskName}{" "}
                  <EditTask
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    index={index}
                    handleUpdateStatus={handleUpdateStatus}
                  />
                </h2>
                <p className="heading-task-name">{task.taskDiscription}</p>
                <p className="heading-task-name">@{task.assigneeName}</p>
                <p className="heading-task-name">Team: {task.team}</p>
                <button className="dlt-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                {index !== taskList.length - 1 && <hr />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
