import { useState } from "react";
import { supabase } from "../services/supabase";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    onLogin(data.user);

    setLoading(false);
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>ATS PRO</h1>

        <p>Recruitment Portal</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;