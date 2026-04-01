import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setError("");
        setLoading(true);
        
        try {
            const res = await api.post("/login", form);
            localStorage.setItem("token", res.data.token);
            nav("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏔️ Nepal Real Estate</h1>
                <h2 style={styles.subtitle}>Login to Your Account</h2>
                
                {error && (
                    <div style={styles.errorMessage}>
                        ❌ {error}
                    </div>
                )}
                
                <div style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        style={styles.input}
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        onClick={login} 
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                
                <p style={styles.linkText}>
                    Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center',
        color: '#667eea',
        marginBottom: '10px',
        fontSize: '28px'
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginBottom: '30px',
        fontSize: '18px',
        fontWeight: 'normal'
    },
    errorMessage: {
        background: '#fee',
        color: '#c33',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s'
    },
    button: {
        background: '#667eea',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s',
        marginTop: '10px'
    },
    linkText: {
        textAlign: 'center',
        marginTop: '20px',
        color: '#666'
    },
    link: {
        color: '#667eea',
        textDecoration: 'none'
    }
};