/*import logo from './logo.svg';
import './App.css';
*/
import { useState, useEffect,useCallback } from 'react';
const API = "https://task-api-46uc.onrender.com"; 
//const API = "http://127.0.0.1:8000";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false); // New state for toggling UI
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

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
    setIsLoading(true);
    setAuthError("");
    try {
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
      setAuthError(data.detail || "Login failed. Check your credentials.");
    }
    } catch (error) {
      setAuthError("Could not connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
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
  const getTasks = useCallback(async () => {
    try { 
    const res = await fetch(`${API}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [token]);

  useEffect(() => {
  if (token) {
    getTasks(); // This triggers the auto-load
  }
  }, [token, getTasks]);

  // ✅ TOGGLE COMPLETION
  const toggleComplete = async (task) => {
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Send the title (required by your backend) and the flipped completed status
      body: JSON.stringify({ 
        title: task.title, 
        completed: !task.completed 
      }),
    });
    getTasks(); // Refresh list 
  };
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
  /*  --- Inline style (Object) approach --- */
  /*
  <div className="App" style={{ padding: 20, fontFamily: 'sans-serif' }}>
    <div style={{ maxWidth: 400, margin: '0 auto' }}>

      <h1>Task App</h1>
      
      {!token ? (
       # --- AUTH VIEW (Login/Signup)
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
        #--- TASK VIEW --- 
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

                { DELETE }
                <button onClick={() => deleteTask(t.id)} style={{ backgroundColor: '#dc3545', color: 'white', marginLeft: '10px' }}>Delete</button>.

                {  EDIT }
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
*/

/* --- Utility class Tailwind implementation --- */

<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      {/*HEADER SECTION */ }
      <div className="bg-indigo-600 p-6 text-white text-center">
        <h1 className="text-2xl font-bold tracking-tight">Task Master </h1>
        <p className="text-indigo-100 text-sm">Organize your life, one task at a time.</p>
      </div>

      <div className="p-8">
        {!token ? (
          /* --- AUTH VIEW (Login/Signup) --- */
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {isNewUser ? "Create an Account" : "Welcome Back"}
            </h2>

            {authError && (
              <div className="text-red-500 text-sm text-center">
                <p className="text-red-700 text-sm text-center">{authError}</p>
              </div>
            )}

            <div className="space-y-3">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isNewUser ? (
              <button 
                onClick={signup} 
                disabled={isLoading}
                className={`w-full font-bold py-2 rounded-lg transition-colors text-white ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
            ) : (
              <button 
                onClick={login} 
                disabled={isLoading}
                className={`w-full font-bold py-2 rounded-lg transition-colors text-white ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Signing In..." : "Login"}
              </button>
            )}

            <p className="text-center text-sm text-gray-600 pt-2">
              {isNewUser ? "Already have an account?" : "Need an account?"}{" "}
              <button 
                onClick={() =>{ setIsNewUser(!isNewUser); setAuthError("");}} 

                className="text-indigo-600 font-bold hover:underline focus:outline-none"
              >
                {isNewUser ? "Login here" : "Sign up here"}
              </button>
            </p>
          </div>
        ) : (
           /* --- TASK VIEW --- */
          <div className="space-y-6">
             {/* User Profile Info */} 
            <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg">
              <span className="text-gray-700">Hi, <b className="text-indigo-700">{username}</b></span>
              <button onClick={logout} className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-full font-semibold transition-colors">
                Logout
              </button>
            </div>

            { /* Create Task Input */ }
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">New Task</h3>
              <div className="flex gap-2">
                <input 
                  value={title}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="What needs to be done?" 
                  onChange={(e) => setTitle(e.target.value)} 
                />
                <button onClick={createTask} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-transform active:scale-95">
                  Add
                </button>
              </div>
            </div>

            { /*Task List */}
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b pb-2">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Your Tasks</h3>
                <button onClick={getTasks} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  Refresh List
                </button>
              </div>
              
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {tasks.length === 0 ? (
                  <p className="text-center text-gray-400 py-4 italic text-sm">No tasks yet. Add one above!</p>
                ) : (
                  tasks.map((t) => (
                    <li key={t.id} className="group flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all shadow-sm">
        
                      <div className="flex items-center gap-3">
                        {/* Checkbox to mark complete */}
                        <input 
                          type="checkbox" 
                          checked={t.completed} 
                          onChange={() => toggleComplete(t)}
                          className="h-4 w-4 text-indigo-600 rounded cursor-pointer"
                        />
                        
                        {/* Strike-through text if t.completed is true */}
                        <span className={`font-medium transition-all ${t.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {t.title}
                        </span>
                      </div>

                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            const newTitle = prompt("Edit task", t.title);
                            if (newTitle) updateTask(t.id, newTitle);
                          }}
                          className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteTask(t.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default App;

