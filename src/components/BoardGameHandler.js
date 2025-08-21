import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';

export default function BoardGameHandler() {
    const [gameName, setGameName] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        if (!gameName.trim()) {
            setError('Please enter a board game name.');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`https://api.brycejensenius.xyz/boardGame/${encodeURIComponent(gameName)}`);
            if (!res.ok) throw new Error('Game not found');
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError('Could not find board game.');
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm" className="backgroundStyle">
            <Paper elevation={5} className="paper_boxes" style={{ marginTop: 32 }}>
                <Typography variant="h4" component="h1" sx={{ fontFamily: 'Arial, serif', color: 'black', textAlign: 'center', marginBottom: 2, fontWeight: '400' }}>
                    Board Game Search
                </Typography>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSearch}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            id="outlined-basic-boardgame-name"
                            label="Board Game Name"
                            variant="outlined"
                            fullWidth
                            value={gameName}
                            onChange={e => setGameName(e.target.value)}
                        />
                    </Box>
                    <Button variant="contained" className="greenButton" type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </Box>
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                {result && (
                    <Paper elevation={2} sx={{ mt: 3, p: 2, background: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 600 }}>Name: <span style={{ color: '#222' }}>{result.name}</span></Typography>
                        <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 600 }}>Year Published: <span style={{ color: '#222' }}>{result.yearPublished}</span></Typography>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
}