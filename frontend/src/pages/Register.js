import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async () => {
        // Reset messages
        setError("");
        setSuccess("");
        
        // Validate password length
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        // Validate email format
        if (!form.email.includes('@')) {
            setError("Please enter a valid email address");
            return;
        }
        
        // Validate name
        if (!form.name.trim()) {
            setError("Name is required");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await api.post("/register", {
                name: form.name,
                email: form.email,
                password: form.password
            });
            
            console.log("Registration response:", response.data);
            setSuccess("Registration successful! Redirecting to login...");
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                nav("/login");
            }, 2000);
            
        } catch (err) {
            console.error("Registration error:", err);
            
            // Handle different error scenarios
            if (err.response) {
                // Server responded with error
                setError(err.response.data.message || "Registration failed. Please try again.");
            } else if (err.request) {
                // Request was made but no response
                setError("Cannot connect to server. Make sure backend is running on port 5000");
            } else {
                // Something else happened
                setError("Registration failed: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            register();
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏔️ Nepal Real Estate</h1>
                <h2 style={styles.subtitle}>Create Your Account</h2>
                
                {error && (
                    <div style={styles.errorMessage}>
                        ❌ {error}
                    </div>
                )}
                
                {success && (
                    <div style={styles.successMessage}>
                        ✅ {success}
                    </div>
                )}
                
                <div style={styles.form}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        style={styles.input}
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                        autoFocus
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        style={styles.input}
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password (min. 6 characters)"
                        style={styles.input}
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                    />
                    <button 
                        onClick={register} 
                        style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </div>
                
                <p style={styles.linkText}>
                    Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
                </p>
                
                <div style={styles.infoBox}>
                    <p style={styles.infoText}>
                        <strong>📝 Demo Credentials:</strong><br />
                        Email: buyer@example.com<br />
                        Password: password123<br />
                        <span style={styles.infoSmall}>*Register with any email to create your account</span>
                    </p>
                </div>
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
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '20px'
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeIn 0.5s ease-out'
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
        padding: '12px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px',
        border: '1px solid #fcc',
        animation: 'shake 0.5s'
    },
    successMessage: {
        background: '#efe',
        color: '#3c3',
        padding: '12px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px',
        border: '1px solid #cfc',
        animation: 'fadeIn 0.5s'
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
        transition: 'border-color 0.3s, box-shadow 0.3s',
        ':focus': {
            borderColor: '#667eea',
            boxShadow: '0 0 5px rgba(102, 126, 234, 0.3)'
        }
    },
    button: {
        background: '#667eea',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s, transform 0.2s',
        marginTop: '10px',
        fontWeight: 'bold'
    },
    buttonDisabled: {
        background: '#ccc',
        cursor: 'not-allowed',
        opacity: 0.7
    },
    linkText: {
        textAlign: 'center',
        marginTop: '20px',
        color: '#666'
    },
    link: {
        color: '#667eea',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    infoBox: {
        marginTop: '20px',
        padding: '12px',
        background: '#f9f9f9',
        borderRadius: '5px',
        border: '1px solid #eee'
    },
    infoText: {
        fontSize: '12px',
        color: '#888',
        textAlign: 'center',
        margin: 0,
        lineHeight: '1.5'
    },
    infoSmall: {
        fontSize: '10px',
        color: '#aaa'
    }
};

// Add CSS animations (you can add this to your index.css or style tag)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }
    
    input:focus {
        border-color: #667eea;
        box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
    }
    
    button:hover:not(:disabled) {
        background: #5a67d8;
        transform: translateY(-1px);
    }
    
    button:active:not(:disabled) {
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);