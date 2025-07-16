import React, { useState } from 'react';
import { Code, Send, Loader2, CheckCircle, AlertCircle, Github, Twitter, Mail, ArrowRight } from 'lucide-react';
import './App.css';

function App() {
    const [code, setCode] = useState('');
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        setError('');
        setReview('');

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/ai/get-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Google-Gemini-Key': import.meta.env.VITE_GOOGLE_GEMINI_KEY,
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText || 'Request failed'}`);
            }

            const result = await response.text();
            setReview(result);
        } catch (err) {
            setError(err.message || 'Failed to get code review');
        } finally {
            setLoading(false);
        }
    };

    const exampleCode = `function fetchData() {
  let data = fetch('/api/data').then(response => response.json());
  return data;
}`;

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <Code className="icon" />
                        </div>
                        <div className="logo-text">
                            <h1>AI Code Review</h1>
                            <p>Powered by Gemini AI</p>
                        </div>
                    </div>
                    <nav className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How it Works</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>

            <main className="main-content-wrapper">
                <section className="hero">
                    <div className="hero-content">
                        <h2>Get Expert Code Reviews <span>Instantly</span></h2>
                        <p>
                            Leverage the power of AI to get detailed code reviews from a virtual senior developer with 7+ years of experience.
                        </p>
                        <div className="hero-buttons">
                            <button onClick={() => document.getElementById('code-input')?.focus()}>
                                <Code className="icon" />
                                <span>Start Code Review</span>
                                <ArrowRight className="icon" />
                            </button>
                            <button onClick={() => setCode(exampleCode)}>
                                Try Example Code
                            </button>
                        </div>
                    </div>
                </section>

                <section className="main-content">
                    <div className="content-grid">
                        <div className="code-input-container">
                            <h3>
                                <Code className="icon" />
                                <span>Your Code</span>
                            </h3>
                            <form onSubmit={handleSubmit}>
                <textarea
                    id="code-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here for review..."
                    required
                />
                                <button type="submit" disabled={loading || !code.trim()}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="icon spinner" />
                                            <span>Reviewing Code...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="icon" />
                                            <span>Get AI Review</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="review-output-container">
                            <h3>
                                <CheckCircle className="icon" />
                                <span>AI Review</span>
                            </h3>

                            {error && (
                                <div className="error-message">
                                    <AlertCircle className="icon" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {review ? (
                                <div className="review-content">
                                    <pre>{review}</pre>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <Code className="icon" />
                                    <p>{loading ? 'AI is reviewing your code...' : 'Submit your code to get an expert review'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <h2>Why Choose AI Code Review?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <CheckCircle className="icon" />
                            </div>
                            <h3>Expert Analysis</h3>
                            <p>Get reviews from an AI trained to think like a senior developer with 7+ years of experience.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Loader2 className="icon" />
                            </div>
                            <h3>Instant Feedback</h3>
                            <p>No waiting for human reviewers. Get comprehensive feedback in seconds.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Code className="icon" />
                            </div>
                            <h3>Best Practices</h3>
                            <p>Learn industry standards, security practices, and performance optimizations.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer id="contact" className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo-container">
                            <div className="logo-icon">
                                <Code className="icon" />
                            </div>
                            <div className="logo-text">
                                <h3>AI Code Review</h3>
                                <p>Powered by Gemini AI</p>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href="#"><Github className="icon" /></a>
                            <a href="#"><Twitter className="icon" /></a>
                            <a href="#"><Mail className="icon" /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="links-column">
                            <h4>Features</h4>
                            <ul>
                                <li>Code Analysis</li>
                                <li>Security Review</li>
                                <li>Performance Tips</li>
                                <li>Best Practices</li>
                            </ul>
                        </div>

                        <div className="links-column">
                            <h4>Support</h4>
                            <ul>
                                <li>Documentation</li>
                                <li>API Reference</li>
                                <li>Help Center</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} AI Code Review. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
