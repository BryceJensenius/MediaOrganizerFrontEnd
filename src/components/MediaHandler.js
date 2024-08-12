import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/style.css';

export default function MediaHandler() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [media, setMedia] = useState([]);
    const [visibleReviewId, setVisibleReviewId] = useState(null);
    const [loading, setLoading] = useState(false);

    const getMedia = () => {
        setLoading(true);
        fetch("http://localhost:8080/mediaItems/getAll")
            .then(res => res.json())
            .then((result) => {
                setMedia(result);
                setLoading(false);
            });
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            alert("Name field cannot be empty");
            return;
        }

        const mediaItem = { name, finishDate, rating, review };
        fetch("http://localhost:8080/mediaItems/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaItem)
        }).then(() => {
            getMedia();
            setName('');
            setFinishDate('');
            setRating('');
            setReview('');
        });
    };

    const toggleReviewVisibility = (id) => {
        setVisibleReviewId(visibleReviewId === id ? null : id);
    };

    useEffect(() => {
        getMedia();
    }, []);

    const [nameFilter, setNameFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');

    const handleFilterClick = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://localhost:8080/mediaItems/setFilter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nameFilter: nameFilter, ratingFilter: ratingFilter})
        }).then(() => {
            getMedia();
        });
    };

    const handleFilterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleFilterClick(e);
        }
    };

    return (
        <Container 
            maxWidth="md" 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'flex-start', 
                minHeight: '100vh'
            }}
        >
            {/* Add Media Paper */}
            <Box component="form" noValidate autoComplete="off">
                <Paper elevation={5} style={paperStyle}>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{
                            fontFamily: 'Arial, serif',
                            color: "black",
                            textAlign: "center",
                            marginBottom: 2,
                            fontWeight: 'bold',
                        }}
                    >
                        Add Media
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-name" 
                            label="Media Name" 
                            variant="outlined" 
                            fullWidth 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-finishDate" 
                            label="Media Finish Date" 
                            variant="outlined" 
                            fullWidth 
                            value={finishDate}
                            onChange={(e) => setFinishDate(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-rating" 
                            label="Media Rating" 
                            variant="outlined" 
                            fullWidth 
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-review" 
                            label="Media Review" 
                            variant="outlined" 
                            fullWidth 
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleClick}>
                        Submit Input
                    </Button>
                </Paper>
            </Box>

            {/* Media List Paper */}
            <Paper elevation={3} style={paperStyle}>
                <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{
                        fontFamily: 'Arial, serif',
                        color: "#222222",
                        textAlign: "center",
                        marginBottom: 2,
                        fontWeight: 'bold',
                    }}
                >
                    Media
                </Typography>
                {/* Filter Selection Component */}
            <Container 
                maxWidth="md" 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: '', 
                    justifyContent: '', 
                }}
            >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '62ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField 
                            id="outlined-basic-name" 
                            label="Name Filter" 
                            variant="standard" 
                            fullWidth 
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            onKeyPress={handleFilterKeyPress}
                        />
                        <TextField 
                            id="outlined-basic-name" 
                            label="Rating Filter" 
                            variant="standard" 
                            fullWidth 
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            onKeyPress={handleFilterKeyPress}
                        />
                        <Button variant="contained" color="primary" onClick={handleFilterClick} sx={{ ml: 1 }}>
                            Search
                        </Button>
                        {loading && <CircularProgress size={1} sx={{ ml: 2 }} />}
                    </Box>
                </Box>
            </Container>
            {/* FILTER STUFF END */}
                {media.map(mediaItem => (
                    <Paper 
                        elevation={1} 
                        style={{ margin: "5px", padding: "5px", textAlign: "left", cursor: "pointer" }} 
                        key={mediaItem.id}
                        onClick={() => toggleReviewVisibility(mediaItem.id)}
                    >
                        <span className="bold-green">Name:</span><span className="light-bold"> {mediaItem.name}</span><br />
                        <span className="light-bold-green">Rating:</span> {mediaItem.rating}<br />
                        {visibleReviewId === mediaItem.id && (
                            <>
                                <span className="light-bold-green">Finish Date:</span> {mediaItem.finishDate}<br />
                                <span className="light-bold-green">Review:</span><br />{mediaItem.review}
                            </>
                        )}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}