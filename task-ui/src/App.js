import { useState, useEffect,useCallback } from 'react';
import AuthForm from "./components/AuthForm";
import TaskDashboard from "./components/TaskDashboard";
import { taskApi } from "./services/api";


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false); // state for toggling UI
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [editingID, setEditingID] = useState(null); // state to track which task is being edited
  const [editText, setEditText] = useState(""); //  state to hold the edited text
  const [newTask, setnewTask] = useState(""); // state for new task input

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }

  }, []);
  
  // 📝 SIGNUP
  const signup = async () => {
  try {
      const { ok, data } = await taskApi.signup(username, password);
      if (ok) {
        alert("Signup successful! Please login.");
        setIsNewUser(false); 
      } else {
        alert(`Signup failed: ${data.detail}`);
      }
    } catch (error) {
      alert("Signup request failed. Check server status.");
    }
  
};
  // 🔐 LOGIN
  const login = async () => {
    setIsLoading(true);
    setAuthError("");
    try {
      const { ok, data } = await taskApi.login(username, password);
      if (ok) {
        setToken(data.acess_token);
        localStorage.setItem("token", data.acess_token); // Save token for persistence
        localStorage.setItem("username", username); // Save username for display
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
      if (!newTask.trim()) {
      alert("Task title cannot be empty!");
      return; // Stop the function here
    } 
    await taskApi.createTask(token, newTask);
    setnewTask("") // Clear input after adding
    getTasks();   // Refresh list automatically
  };
  
   // Delete Task
  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(token, id);
      getTasks();   
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ UPDATE TASK
  
  const updateTask = async (id, newTitle) => {
    if (!newTitle.trim()) {
      alert("Task title cannot be empty!");
      setEditingID(null); // Close the edit mode
      return;
    } 
    const currentTask = tasks.find(t => t.id === id);
    await taskApi.updateTask(token, id, newTitle, currentTask ? currentTask.completed : false);
    getTasks();   // Refresh list automatically
  };  

   // 📋 GET TASKS
  const getTasks = useCallback(async () => {
    try { 
    const data = await taskApi.getTasks(token);
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
    await taskApi.updateTask(token, task.id, task.title, !task.completed);
    getTasks(); // Refresh list 
  };
  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
    setTasks([]);
  };

  return (
   
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
            <AuthForm
              username={username}
              password={password}
              isNewUser={isNewUser}
              setIsNewUser={setIsNewUser}
              setUsername={setUsername}
              setPassword={setPassword}
              login={login}
              signup={signup}
              isLoading={isLoading}
              authError={authError}
              setAuthError={setAuthError}
            />           
        ) : (
            /* --- TASK VIEW --- */
            <TaskDashboard
              username={username}
              logout={logout}
              title={newTask}
              setTitle={setnewTask}
              createTask={createTask}
              tasks={tasks}
              getTasks={getTasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editingID={editingID}
              setEditingID={setEditingID}
              editText={editText}
              setEditText={setEditText}
            />
        )}  
      </div>
  
                
</div>
</div>

  );
}

export default App;

