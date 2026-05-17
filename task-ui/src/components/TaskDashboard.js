function TaskDashboard({
    username,
    logout,
    title,
    setTitle,
    createTask,
    tasks,
    filter,
    sortOrder,
    setFilter,
    setSortOrder,
    editingID,
    setEditingID,
    editText,
    setEditText,
    getTasks,
    updateTask,
    deleteTask,
    toggleComplete
}) {
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true; // for "all"
    });
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOrder === "newest") return b.id - a.id; // assuming higher ID means newer task
        if (sortOrder === "oldest") return a.id - b.id;
        return 0;
    });
    return (
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') createTask();
                  }}
                />
                <button onClick={createTask} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-transform active:scale-95">
                  Add
                </button>
              </div>
            </div>
            {/* --- Task Filter (All, Active, Completed) --- */}
            <div className="flex gap-2">
              <button
                onClick={() =>setFilter("all")}
                className={`px-3 py-1 rounded ${filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1 rounded ${filter === "active" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                Active
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded ${filter === "completed" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
              >
                Completed
              </button>

            </div>

            {/* --- Sorting Controls --- */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder("newest")}
                  className={`px-3 py-1 rounded ${sortOrder === "newest" ? "bg-violet-600 text-white" : "bg-gray-200"}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortOrder("oldest")}
                  className={`px-3 py-1 rounded ${sortOrder === "oldest" ? "bg-violet-600 text-white" : "bg-gray-200"}`}
                >
                  Oldest
                </button>
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
                  sortedTasks.map((t) => (
                    <li key={t.id} className="group flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all shadow-sm">
        
                      <div className="flex items-center gap-3">
                        {/* Checkbox to mark complete */}
                        <input 
                          type="checkbox" 
                          checked={t.completed} 
                          onChange={() => toggleComplete(t)}
                          className="h-4 w-4 text-indigo-600 rounded cursor-pointer"
                        />
                       
                        {editingID === t.id ? (
                          /* --- INLINE EDIT INPUT --- */
                          <input 
                            className="flex-1 px-2 py-1 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            type="text" 
                            value={editText} 
                            onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateTask(t.id, editText);
                                setEditingID(null);
                              } else if (e.key === "Escape") {
                                setEditingID(null);
                              }
                            }}
                          />

                        ) : (
                          /* Strike-through text if t.completed is true */
                          <span className={`font-medium transition-all ${t.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {t.title}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingID === t.id ? (
                          <>
                            {/* Save Button */}
                            <button 
                              onClick={() => {
                                updateTask(t.id, editText);
                                setEditingID(null);
                              }}
                              className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-indigo-700"
                            >
                              Save
                            </button>
                            {/* Cancel Button */}
                            <button onClick={() => setEditingID(null)} className="text-xs text-gray-400 hover:text-gray-600">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                          {/* Toggle Edit Mode */}
                          <button 
                            onClick={() => {
                              setEditingID(t.id);
                              setEditText(t.title);
                            }}
                           
                            className="p-1 text-yellow-600 group-hover:opacity-100 opacity-0 hover:bg-yellow-50 rounded transition-opacity"
                          >
                            Edit
                          </button>
                          <button onClick={() => deleteTask(t.id)} className="p-1 text-red-500 group-hover:opacity-100 opacity-0 hover:bg-red-50 rounded transition-opacity">
                            Delete
                          </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
        </div>
  );
}    
export default TaskDashboard;
