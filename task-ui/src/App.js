/*import logo from './logo.svg';
import './App.css';
*/
import { useState } from 'react';
const API = 'https://task-api-46uc.onrender.com';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // // 🔐 LOGIN
  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setToken(data.acess_token);
  };
   // ➕ CREATE TASK
  const createTask = async () => {
     await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
  };
    
   // 📋 GET TASKS
  const getTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data);
  };

  return (
   /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    

   <div style={{ padding: 20 }}>

      <h1>Task App</h1>
      <h2>Login</h2>

      <input

        placeholder="username"

        onChange={(e) => setUsername(e.target.value)}

      />

      <br />

      <input

        type="password"

        placeholder="password"

        onChange={(e) => setPassword(e.target.value)}

      />

      <br />

      <button onClick={login}>Login</button>

      <p><b>Token:</b> {token}</p>

      <hr />

      <h2>Create Task</h2>

      <input onChange={(e) => setTitle(e.target.value)} />

      <button onClick={createTask}>Add Task</button>

      <hr />

      <h2>Tasks</h2>

      <button onClick={getTasks}>Load Tasks</button>

      <ul>

        {tasks.map((t) => (

          <li key={t.id}>{t.title}</li>

        ))}

      </ul>

    </div>

  );
}

export default App;
