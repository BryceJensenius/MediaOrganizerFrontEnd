import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/style.css';

export default function MediaHandler() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [finishDate, setFinishDate] = useState(new Date().toLocaleDateString());
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [media, setMedia] = useState([]);
    const [visibleReviewId, setVisibleReviewId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingMedia, setEditing] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [nameGuess, setNameGuess] = useState([]);

    {/*Sorting Stuff*/}
    const [sortType, setSortType] = useState('name'); // Default sort by name
    const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };
    
    const handleOrderChange = (e) => {
        setSortOrder(e.target.value);
    };
    {/*Sorting Stuff*/}

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
        if(finishDate.trim() === ''){
            setFinishDate(new Date().toLocaleDateString());
            alert("Finish Date cannot be empty");
            return;
        }

        const mediaItem = { name, finishDate, rating, review };

        {/* if the element is one that was being edited, set an ID and it automatically saves changes rather than creating a new element*/}
        if(editingMedia){
            mediaItem.id = visibleReviewId;
            setEditing(false);
        }

        fetch("http://localhost:8080/mediaItems/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaItem)
        }).then(() => {
            getMedia();
            setName('');
            setFinishDate(new Date().toLocaleDateString());
            setRating('');
            setReview('');
        });
    };

    const toggleReviewVisibility = (id) => {
        {/*Cant go into other elements while editing one*/}
        if(!editingMedia){
            setVisibleReviewId(visibleReviewId === id ? null : id);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    const handleFilterClick = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("http://localhost:8080/mediaItems/setFilter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nameFilter: nameFilter, ratingFilter: ratingFilter, sortType: sortType, sortOrder: sortOrder})
        }).then(() => {
            getMedia();
        });
    };

    const handleFilterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleFilterClick(e);
        }
    };

    const handleEditClick = (id) => {
        fetch(`http://localhost:8080/mediaItems/getById/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then((result) => {
            setEditing(true);
            setName(result.name);
            setFinishDate(result.finishDate);
            setRating(result.rating);
            setReview(result.review);
            setVisibleReviewId(id); {/*Hitting edit minimizes item, reopen it*/}
        });
    };
    
    const cancelEdit = () => {
        setEditing(false);
        setName('');
        setFinishDate(new Date().toLocaleDateString());
        setRating('');
        setReview('');
    };

    const getClosestNames = (title) => {
        if (title.trim() === '') {
            return;
        }
        fetch(`http://localhost:8080/api/omdb/movie/${title}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok){//.ok is a projerty of response indicating the status of the return code, 200, 400...
                throw new Error('Network response Failed');
            }
            return res.json();
        }).then((result) => {
            if(Array.isArray(result.results)){
                const names = result.results.map(movie => movie.title);//they are key value pairs so we need to grap the names and put in a list
                setNameGuess(names);
            }else{
                console.error("Unexpected response Structure:", result);
                setNameGuess([]); //names list set to empty
            }
    })};

    return (
        <Container 
            maxWidth="mw" 
            className='backgroundStyle'
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
                            fontWeight: '400',
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
                            onChange={(e) => {
                                setName(e.target.value)
                                getClosestNames(e.target.value)
                            }}
                        />
                    </Box>

                    {/*Guess Names*/}
                    {nameGuess.map(mediaTitle => (
                    <Paper 
                        elevation={1} 
                        className="mediaItem" 
                    >
                        <span className="bold-green">{mediaTitle}</span>
                    </Paper>
                    ))}
                    {/*Guess Names End*/}

                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-finishDate" 
                            label="MM/DD/YYYY : Finish Date" 
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
                    <Button variant="contained" className="greenButton" onClick={handleClick}>
                        Submit Input
                    </Button>
                </Paper>
            </Box>

            {/* Media List Paper */}
            <Paper elevation={5} style={paperStyle}>
                <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{
                        fontFamily: 'Arial, serif',
                        color: "#222222",
                        textAlign: "center",
                        marginBottom: 2,
                        fontWeight: '400',
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
                            '& > :not(style)': { ml: 1, mb:3, width: '62ch' },
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
                            <Button 
                            variant="contained" 
                            className="greenButtonSearch" 
                            onClick={handleFilterClick}
                            >
                            Search
                            </Button>
                            {loading && <CircularProgress size={1} sx={{ ml: 2 }} />}
                        </Box>

                        {/*Sorting Stuff*/}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <TextField
                                select
                                label="Sort By"
                                value={sortType}
                                onChange={handleSortChange}
                                sx={{ ml: 0 }}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="id">Default</option>
                                <option value="name">Name</option>
                                <option value="rating">Rating</option>
                                <option value="finishDate">Finish Date</option>
                            </TextField>

                            {/* Sort Order Dropdown */}
                            <TextField
                                select
                                label="Order"
                                value={sortOrder}
                                onChange={handleOrderChange}
                                sx={{ ml: 1 }}
                                SelectProps={{
                                    native: true
                                }}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </TextField>
                        </Box>
                        {/*Sorting Stuff*/}

                    </Box>
                </Container>

                {/* FILTER STUFF END */}
                {media.map(mediaItem => (
                    <Paper 
                        elevation={1} 
                        className="mediaItem" 
                        key={mediaItem.id}
                        onClick={() => toggleReviewVisibility(mediaItem.id)}
                    >
                        <span className="bold-green">Name:</span><span className="light-bold"> {mediaItem.name}</span><br />
                        <span className="light-bold-green">Rating:</span> {mediaItem.rating}<br />
                        {visibleReviewId === mediaItem.id && (
                            <>
                                <Box sx={{ mb: 1 }}>
                                    <span className="light-bold-green">Finish Date:</span> {mediaItem.finishDate}<br />
                                    <span className="light-bold-green">Review:</span><br />{mediaItem.review}<br />
                                </Box>
                                {!editingMedia && (
                                    <>
                                        <Button onClick={() => handleEditClick(mediaItem.id)} className="greenButton">Edit</Button>
                                    </>
                                )}
                                {editingMedia && (
                                    <>
                                        <Button onClick={cancelEdit} className="redButton">Cancel</Button>
                                    </>
                                )}
                            </>
                        )}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}