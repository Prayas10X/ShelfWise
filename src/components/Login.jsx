import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Login = ({ goToRegister }) => {
  const { users, setCurrentUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Form validation
    if (email.trim() === "" || password === "") {
      setError("Please enter your email and password.");
      return;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    setCurrentUser(foundUser);
  };

  return (
    <div className="card auth-card">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="switch-text">
        No account yet?{" "}
        <button className="link-btn" onClick={goToRegister}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
