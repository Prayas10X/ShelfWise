import "./App.css";
import { useState } from "react";
import AppContext from "./context/AppContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Brand from "./components/Brand";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
    { id: 2, name: "Notebook", price: 5, category: "Stationery" },
  ]);

  const [showRegister, setShowRegister] = useState(false);

  return (
    <AppContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser, products, setProducts }}
    >
      <div className="app">
        {currentUser ? (
          <Dashboard />
        ) : (
          <div className="auth-page">
            <Brand size={56} showTagline />
            {showRegister ? (
              <Register goToLogin={() => setShowRegister(false)} />
            ) : (
              <Login goToRegister={() => setShowRegister(true)} />
            )}
          </div>
        )}

        <footer className="footer">
          &copy; 2026 ShelfWise &middot; Simple product management
        </footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
