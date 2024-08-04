import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';


export default function Student() {
    const paperStyle = { padding: '50px 30px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('John May');
    const [address, setAddress] = useState('');
    const [students, setStudents] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, address };
        console.log(student);
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New Student Added");
            window.location.reload();
        });
    };

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

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
                            label="Student Name" 
                            variant="outlined" 
                            fullWidth 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField 
                            id="outlined-basic-address" 
                            label="Student Address" 
                            variant="outlined" 
                            fullWidth 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                    {students.map(student => (
                        <Paper elevation={1} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                            ID: {student.id}<br />
                            Name: {student.name}<br />
                            Address: {student.address}
                        </Paper>
                    ))}
                </Paper>
            </Box>
        </Container>
    );
}
