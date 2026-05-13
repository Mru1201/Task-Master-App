/*import logo from './logo.svg';
import './App.css';
*/
import { useState, useEffect } from 'react';
const API = 'https://task-api-46uc.onrender.com';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false); // New state for toggling UI

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);


  // 📝 SIGNUP
  const signup = async () => {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  const data = await res.json();
  if (res.ok) {
    alert("Signup successful! Please login.");
    setIsNewUser(false); // TO Show login UI after successful signup
  } else {
    alert(`Signup failed: ${data.detail}`);
  } 
};
  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.acess_token);
      localStorage.setItem("token", data.acess_token); // Save token for persistence
    } else {
      alert("Login failed check credentials!");
    }
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
    setTitle(""); // Clear input
    getTasks();   // Refresh list automatically
  };
   // Delete Task
  const deleteTask = async (id) => {
     await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getTasks();   // Refresh list automatically
  };

  // ✅ UPDATE TASK
  const updateTask = async (id, newTitle) => {
     await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });
    getTasks();   // Refresh list automatically
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
  useEffect(() => {
    if (token) {
      getTasks();
    }
  }, [token, getTasks]);
  
  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
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
    
<div className="App" style={{ padding: 20, fontFamily: 'sans-serif' }}>
    <div style={{ maxWidth: 400, margin: '0 auto' }}>

      <h1>Task App</h1>
      
      {!token ? (
        /* --- AUTH VIEW (Login/Signup) --- */
      <div style={{ maxWidth: '300px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <h2>{isNewUser ? "Sign Up" : "Login"}</h2>
        <input
            placeholder="username"
            style={{ width: '100%', marginBottom: '10px' }}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="password"
            style={{ width: '100%', marginBottom: '10px' }}
            onChange={(e) => setPassword(e.target.value)}
        />
        {isNewUser ? (
            <button onClick={signup} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white' }}>Register</button>
        ) : (
            <button onClick={login} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>Login</button>
        )}
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
            {isNewUser ? "Already have an account?" : "Need an account?"}
            <button 
              onClick={() => setIsNewUser(!isNewUser)} 
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isNewUser ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      ) : (
        /* --- TASK VIEW --- */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Welcome, <b>{username}</b></span>
            <button onClick={logout} style={{ backgroundColor: '#dc3545', color: 'white' }}>Logout</button>
          </div>
          <hr />
          <h2>Create Task</h2>
          <input 
            value={title}
            placeholder="New task title..." 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <button onClick={createTask}>Add Task</button>

          <hr />
          <h2>Your Tasks</h2>
          <button onClick={getTasks}>Refresh List</button>
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                {t.title}

                {/* DELETE */}
                <button onClick={() => deleteTask(t.id)} style={{ backgroundColor: '#dc3545', color: 'white', marginLeft: '10px' }}>Delete</button>.

                {/* EDIT */}
                <button 
                  onClick={() => {
                    const newTitle = prompt("Edit task", t.title);
                    if (newTitle) {
                        updateTask(t.id, newTitle);
                    }
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  </div>

  );
}

export default App;
