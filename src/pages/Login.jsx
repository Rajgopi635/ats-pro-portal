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
    <div className="ats-login-page">

      <div className="ats-login-bg"></div>

      <div className="ats-login-container">

        {/* LEFT SIDE */}

        <div className="ats-login-left">

          <h1>ATS PRO AI</h1>

          <p>
            Recruitment Intelligence Platform
          </p>

          <div className="ats-feature-list">
            <div>✓ AI Resume Matching</div>
            <div>✓ Smart Candidate Ranking</div>
            <div>✓ Submission Tracking</div>
            <div>✓ Live Analytics Dashboard</div>
          </div>

          <div className="ats-ai-cards">

            <div className="ats-ai-card">
              <span>97% Match</span>
              <h4>SAP S4 HANA Consultant</h4>
            </div>

            <div className="ats-ai-card">
              <span>92% Match</span>
              <h4>Java Full Stack Developer</h4>
            </div>

            <div className="ats-ai-card">
              <span>89% Match</span>
              <h4>Data Engineer</h4>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="ats-login-card">

          <div className="ats-version">
            ATS PRO v1.0
          </div>

          <h2>Welcome Back</h2>

          <p>
            Sign in to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="ats-login-form"
          >

            <input
              className="ats-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              className="ats-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            {error && (
              <div className="ats-error">
                {error}
              </div>
            )}

            <button
              className="ats-login-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Login to ATS PRO"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;