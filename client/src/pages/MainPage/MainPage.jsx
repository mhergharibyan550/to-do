import React, { useState, useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./MainPage.scss";
import axios from "axios";

const MainPage = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const { userId } = useContext(AuthContext);

  const getTasks = useCallback(async () => {
    try {
      const response = await axios.get("/api/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          userId,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const createTask = useCallback(async () => {
    if (!text) return null;
    try {
      const response = await axios.post(
        "/api/tasks/add",
        {
          text,
          userId,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setTasks([response.data, ...tasks]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, tasks]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const removeTask = useCallback(
    async (id) => {
      try {
        await axios.delete(
          `/api/tasks/delete/${id}`,
          { id },
          { headers: { "Content-Type": "application/json" } }
        );
        getTasks();
      } catch (error) {
        console.log(error);
      }
    },
    [getTasks]
  );

  const completeTask = useCallback(
    async (id) => {
      try {
        await axios.put(
          `/api/tasks/complete/${id}`,
          { id },
          { headers: { "Content-Type": "application/json" } }
        );

        getTasks();
      } catch (error) {
        console.log(error);
      }
    },
    [getTasks]
  );

  const importantTask = useCallback(
    async (id) => {
      try {
        await axios.put(
          `/api/tasks/important/${id}`,
          { id },
          { headers: { "Content-Type": "application/json" } }
        );

        getTasks();
      } catch (error) {
        console.log(error);
      }
    },
    [getTasks]
  );

  return (
    <div className="container">
      <div className="main-page">
        <h4>Add task:</h4>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="text"
                name="input"
                className="validate"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label htmlFor="input">Task:</label>
            </div>
          </div>
          <div className="row">
            <button
              className="waves-effect waves-light btn blue"
              onClick={createTask}
            >
              Add
            </button>
          </div>
        </form>
        <h3>Active tasks:</h3>
        <div className="todos">
          {tasks.map((task, index) => {
            let cls = ["row", "flex", "todos-item"];

            if (task.completed) {
              cls.push("completed");
            }
            if (task.important) {
              cls.push("important");
            }
            return (
              <div
                className={cls.join(" ")}
                key={index} /* Using index is not a good practice */
              >
                <div className="col todos-num">{index + 1}</div>
                <div className="col todos-text">{task.text}</div>
                <div className="col todos-buttons">
                  {" "}
                  <i
                    className="material-icons blue-text"
                    onClick={() => completeTask(task._id)}
                  >
                    check
                  </i>
                  <i
                    className="material-icons orange-text"
                    onClick={() => importantTask(task._id)}
                  >
                    warning
                  </i>
                  <i
                    className="material-icons red-text"
                    onClick={() => removeTask(task._id)}
                  >
                    delete
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
