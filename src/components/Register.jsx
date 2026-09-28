import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Register = ({ goToLogin }) => {
  const { users, setUsers } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccess("");

    // Form validation
    if (name.trim() === "") {
      setError("Name is required.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (users.some((u) => u.email === email)) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: name,
      email: email,
      password: password,
    };

    setUsers([...users, newUser]);
    setError("");
    setSuccess("Registration successful! You can now log in.");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="card auth-card">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Register</button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <button className="link-btn" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
