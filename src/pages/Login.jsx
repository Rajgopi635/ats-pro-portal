import { useState } from "react";
import { supabase } from "../services/supabase";

import {
  FaBrain,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

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

      <div className="floating-glow glow-1"></div>
      <div className="floating-glow glow-2"></div>
      <div className="floating-glow glow-3"></div>

      <div className="ats-login-container">

        {/* LEFT SIDE */}

        <div className="ats-login-left">

          <div className="hero-badge">
            AI Powered Recruitment Platform
          </div>

          <h1>
            ATS PRO AI
          </h1>

          <p className="hero-subtitle">
            Find the best candidates faster with
            AI-powered resume matching, smart ranking,
            and advanced recruitment intelligence.
          </p>
          <div className="hero-stats">

  <div>
    <h3>5000+</h3>
    <span>Candidates</span>
  </div>

  <div>
    <h3>1000+</h3>
    <span>Requirements</span>
  </div>

  <div>
    <h3>95%</h3>
    <span>AI Accuracy</span>
  </div>

</div>

          <div className="ats-feature-list">
            <div>✓ AI Resume Matching</div>
            <div>✓ Smart Candidate Ranking</div>
            <div>✓ Submission Tracking</div>
            <div>✓ Advanced Analytics</div>
          </div>

          <div className="ats-ai-cards">

            <div className="ats-ai-card">

              <FaBrain className="card-icon" />

              <div>
                <span>97% Match</span>
                <h4>SAP S4 HANA Consultant</h4>
                <small>10+ Years Experience</small>
              </div>

            </div>

            <div className="ats-ai-card">

              <FaCode className="card-icon" />

              <div>
                <span>92% Match</span>
                <h4>Java Full Stack Developer</h4>
                <small>8+ Years Experience</small>
              </div>

            </div>

            <div className="ats-ai-card">

              <FaDatabase className="card-icon" />

              <div>
                <span>89% Match</span>
                <h4>Data Engineer</h4>
                <small>7+ Years Experience</small>
              </div>

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

            <div className="input-group">

  <FaEnvelope className="input-icon" />

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

</div>

            <div className="input-group">

  <FaLock className="input-icon" />

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

</div>

            <div className="remember-row">

              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#">
                Forgot Password?
              </a>

            </div>

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