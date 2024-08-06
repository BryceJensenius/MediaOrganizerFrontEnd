import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';


export default function Student() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('John May');
    const [finishDate, setFinishDate] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [students, setStudents] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const mediaItem = { name, finishDate, rating, review };
        console.log(mediaItem);
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(mediaItem)
        }).then(() => {
            console.log("New Student Added");
            window.location.reload();
        });
    };

    //this runs on rendering, because we reload when the button is clicked, it reloads each time a new item is added
    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    //extra boxes are added simply to space out elements
    return (
        <Container 
            maxWidth="md" 
            sx={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: '', 
                justifyContent: '', 
                minHeight: '100vh' // Full viewport height
            }}
        >
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Paper elevation={5} style={paperStyle}>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{
                            fontFamily: 'Arial, serif',
                            color: "#1E90FF",
                            textAlign: "center",
                            marginBottom: 2,
                            fontWeight: 'bold',
                        }}
                    >
                        Add Student
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
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit Input
                    </Button>
                </Paper>

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
                        Students
                    </Typography>
                    {students.map(mediaItem => (
                        <Paper elevation={1} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={mediaItem.id}>
                            ID: {mediaItem.id}<br />
                            Name: {mediaItem.name}<br />
                            Address: {mediaItem.address}
                        </Paper>
                    ))}
                </Paper>
            </Box>
        </Container>
    );
}
