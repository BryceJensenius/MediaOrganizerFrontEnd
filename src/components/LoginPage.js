import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import { setSessionToken, isAuthenticated } from '../utils/auth';
import '../styles/style.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/media');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password are required');
            return;
        }

        setLoading(true);

        const endpoint = isSignup ? '/auth/signup' : '/auth/login';
        const authRequest = { username, password };

        try {
            const response = await fetch(`https://api.brycejensenius.xyz${endpoint}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authRequest)
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const sessionToken = await response.text();
            
            if (sessionToken && sessionToken !== 'null' && sessionToken.trim() !== '') {
                // Store the session token
                setSessionToken(sessionToken);
                navigate('/media');
            } else {
                setError(isSignup 
                    ? 'Signup failed. Username may already exist.' 
                    : 'Invalid username or password');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(isSignup 
                ? 'Signup failed. Please try again.' 
                : 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsSignup(!isSignup);
        setError('');
        setPassword('');
    };

    return (
        <div className="backgroundStyle">
            <Container>
                <Paper elevation={3} className="paper_boxes" sx={{ marginTop: '50px' }}>
                    <Typography variant="h4" align="center" gutterBottom className="bold-green">
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Typography>
                    
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            marginTop: 3
                        }}
                    >
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                        
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />

                        {error && (
                            <Typography 
                                variant="body2" 
                                color="error" 
                                align="center"
                                sx={{ marginTop: 1 }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            className="greenButton"
                            fullWidth
                            disabled={loading}
                            sx={{ marginTop: 2, padding: '10px 0 !important' }}
                        >
                            {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
                        </Button>

                        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                            <Typography variant="body2">
                                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                                <Button
                                    onClick={toggleMode}
                                    disabled={loading}
                                    sx={{ 
                                        marginLeft: 1,
                                        textTransform: 'none',
                                        color: '#4caf50',
                                        fontWeight: 600
                                    }}
                                >
                                    {isSignup ? 'Login' : 'Sign Up'}
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}