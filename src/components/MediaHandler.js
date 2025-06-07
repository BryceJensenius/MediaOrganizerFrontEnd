import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/style.css';
import PopUpModel from '../components/PopUpModel';
import NavBar from "./NavBar.js";
import { parseISO } from 'date-fns';

// Date Picker Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MediaHandler() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');

    const [finishDate, setFinishDate] = useState(new Date());

    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [media, setMedia] = useState([]);
    const [visibleReviewId, setVisibleReviewId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingMedia, setEditing] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [nameGuess, setNameGuess] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);//movie you clicked into
    const [extraDetailsVisible, setExtraDetailsVisible] = useState(false);//imdb details pop up status

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
        console.log("Fetching media items...");
        setLoading(true);
        fetch("https://api.brycejensenius.xyz/mediaItems/getAll")
            .then(res => {
                console.log("Received response from /mediaItems/getAll:", res);
                return res.json()
            })
            .then((result) => {
                console.log("Parsed media items:", result);
                setMedia(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching media items:", error);
                setLoading(false);
            });
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            alert("Name field cannot be empty");
            return;
        }
        if (!finishDate) {
            alert("Finish Date cannot be empty");
            return;
        }

        // Format date string for sending to backend
        const formattedFinishDate = finishDate.toLocaleDateString();

        const mediaItem = { name, finishDate: formattedFinishDate, rating, review };
        console.log("Prepared mediaItem for submission:", mediaItem);

        if (editingMedia) {
            mediaItem.id = visibleReviewId;
            setEditing(false);
        }

        fetch("https://api.brycejensenius.xyz/mediaItems/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mediaItem)
        }).then((res) => {
            console.log("Response from /mediaItems/add:", res);
            getMedia();
            setName('');
            setFinishDate(new Date()); // <-- keep as Date object
            setRating('');
            setReview('');
        })
        .catch((error) => {
            console.error("Error adding media item:", error);
        });
    };


    const toggleReviewVisibility = (id) => {
        {/*Cant go into other elements while editing one*/}

        //if extra details are visible and you click a different item, close details
        //this makes it so it stays there when toggle toggle with more details because I have no idea how to stop that
        if(extraDetailsVisible && visibleReviewId !== id){
            setMovieDetails(null);
            setExtraDetailsVisible(false)
            console.log("details cleared");
        }
        if(!editingMedia){
            setVisibleReviewId(visibleReviewId === id ? null : id);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    useEffect(() => {
        const selectedMovieName = localStorage.getItem('selectedMovieName');
        if (selectedMovieName) {
            setName(selectedMovieName);
            localStorage.removeItem('selectedMovieName');
        }
        getMedia();
    }, []);

    const handleFilterClick = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("https://api.brycejensenius.xyz/mediaItems/setFilter", {
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

    {/* Clicking into Media */}
    const handleEditClick = (id) => {
        fetch(`https://api.brycejensenius.xyz/mediaItems/getById/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then((result) => {
            setEditing(true);
            setName(result.name);
            setFinishDate(result.finishDate ? new Date(result.finishDate) : new Date());
            setRating(result.rating);
            setReview(result.review);
            setVisibleReviewId(id);
        });
    };

    const getMovieDetails = (title, id) => {
        fetch(`https://api.brycejensenius.xyz/api/omdb/getFullInfo/${title}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                return res.json();
            })
            .then((arrayParam) => {
                if(Array.isArray(arrayParam)){
                    setMovieDetails(arrayParam);
                }else{
                    console.error("Unexpected response Structure:", arrayParam);
                    setMovieDetails([]); //names list set to empty
                }
                setExtraDetailsVisible(true);
                setVisibleReviewId(id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };       

    {/* End Clicking into Media */}
    
    const cancelEdit = () => {
        setEditing(false);
        setName('');
        setFinishDate(new Date());
        setRating('');
        setReview('');
    };

    {/* Guessing Stuff */}
    const getClosestNames = (title) => {
        if (title.trim() === '') {
            return;
        }
        fetch(`https://api.brycejensenius.xyz/api/omdb/getTitles/${title}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok){//.ok is a projerty of response indicating the status of the return code, 200, 400...
                throw new Error('Network response Failed');
            }
            return res.json();
        }).then((result) => {
            if(Array.isArray(result)){
                setNameGuess(result);
            }else{
                console.error("Unexpected response Structure:", result);
                setNameGuess([]); //names list set to empty
            }
    })};

    const setMediaWithGuess = (guessTitle) => {
        setName(guessTitle);
        setNameGuess([]);
    };


    {/* End Guessing Stuff */}

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
                    {nameGuess.length !== 0 && (
                        <>
                            <Paper 
                                elevation={1} 
                                className="guessItem" 
                            >
                                {nameGuess.map((mediaTitle, index) => (
                                    <span
                                        key={index}
                                        onClick={() => setMediaWithGuess(mediaTitle)}
                                        className="bold-green"
                                    >{mediaTitle}<br /></span>
                                ))}
                            </Paper>
                        </>
                    )}
                    {/*Guess Names End*/}

                    {/* Media Rating TextField */}
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            id="outlined-basic-rating"
                            label="Media Rating (0 - 10)"
                            variant="outlined"
                            fullWidth
                            type="number"
                            inputProps={{
                                min: 0,
                                max: 10,
                                step: 0.1,
                            }}
                            value={rating}
                            onChange={e => {
                                let val = e.target.value;
                                // Allow empty string for controlled input
                                if (val === '') {
                                    setRating('');
                                    return;
                                }
                                // Clamp value between 0 and 10, and only allow one decimal place
                                let num = parseFloat(val);
                                if (isNaN(num)) num = 0;
                                if (num < 0) num = 0;
                                if (num > 10) num = 10;
                                // Limit to one decimal place
                                num = Math.floor(num * 10) / 10;
                                setRating(num);
                            }}
                        />
                    </Box>
                    { /* Media Review TextField */}
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

                    {/* Date Picker for Finish Date */}
                    <Box sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Finish Date"
                                value={finishDate}
                                onChange={date => {
                                    setFinishDate(date); // store as Date object
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        fullWidth 
                                        variant="outlined" 
                                        id="outlined-basic-finishDate"
                                    />
                                )}
                            />
                        </LocalizationProvider>
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
                {Array.isArray(media) && media.map(mediaItem => (
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
                                        <Button onClick={() => getMovieDetails(mediaItem.name, mediaItem.id)} className="greenButton">More Details</Button><br/>

                                        <PopUpModel
                                            isVisible={extraDetailsVisible}
                                            details={movieDetails}
                                            onClose={() => setExtraDetailsVisible(false)}
                                        />
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