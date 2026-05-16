function AuthForm({ 
    username,
    password, 
    isNewUser, 
    setIsNewUser, 
    setUsername, 
    setPassword, 
    login, 
    signup,
    isLoading,
    authError,
    setAuthError
}) {
    return (
    
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') login();
                }}
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
      
    );
}

export default AuthForm;
       