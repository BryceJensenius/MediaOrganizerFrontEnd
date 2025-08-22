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
        <Container maxWidth="mw" className="backgroundStyle">
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
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 600 }}>Name: <span style={{ color: '#222' }}>{result.name}</span></Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Year Published:</b> {result.yearPublished}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Object ID:</b> {result.objectId}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Players:</b> {result.minPlayers} - {result.maxPlayers}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Average Playtime:</b> {result.averagePlaytime} min</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Minimum Age:</b> {result.minAge}</Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}><b>Description:</b></Typography>
                                <Typography variant="body2" sx={{ mb: 2, color: '#444' }}
                                    component="div"
                                    dangerouslySetInnerHTML={{ __html: result.description }}
                                />
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                {result.imageUrl && (
                                    <img src={result.imageUrl} alt={result.name} style={{ maxWidth: '220px', borderRadius: 8, boxShadow: '0 2px 8px #bbb' }} />
                                )}
                                {result.thumbnailUrl && (
                                    <img src={result.thumbnailUrl} alt={result.name + ' thumbnail'} style={{ maxWidth: '120px', borderRadius: 8, boxShadow: '0 2px 8px #bbb' }} />
                                )}
                            </Box>
                        </Box>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
}