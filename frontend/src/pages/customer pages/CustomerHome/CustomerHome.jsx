import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import FindIcon from '@mui/icons-material/Search'; // Adjust based on your icon choice

export default function CustomerHome() {
    const [sellings, setSellings] = useState([]);
    const [devices,setDevices] = useState([]);
    const [eminumbers,setEminumbers] = useState();

    useEffect(() => {
        fetchSellings();
    }, []);

    const fetchSellings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/selling/getOneSelling/cs20');
            setSellings(response.data);
            const emiNumbers = response.data.map(selling => selling.emiNumber);
            setEminumbers(emiNumbers);
            console.log(emiNumbers);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('http://localhost:8000/device/getOneDevice/xq2123');
            setDevices(response.data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };


  return (
    <Container>
      <Box textAlign="center" mb={4}>
      <Typography
            component="h1"
            variant="h6"
            noWrap
            sx={{ 
              flexGrow: 1, 
              background: 'linear-gradient(90deg, #C63DE7, #752888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 'bold',
              marginTop:'20px'
            }}
          >
            SMARTCO
          </Typography>
          <Box bgcolor="secondary.light" p={4} borderRadius={2} textAlign="center" sx={{ background: 'linear-gradient(90deg, rgba(198, 61, 231, 0.2), rgba(117, 40, 136, 0.2))', marginTop: "20px", position: 'relative' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'black', fontFamily: 'Public Sans, sans-serif', fontWeight: 'bold' }}>
            Number of devices you can buy from us
          </Typography>
          <Typography variant="h3" color="secondary" gutterBottom>
            5,275
          </Typography>
          <Link to="/customerdevice" style={{textDecoration: 'none', color:"black"}}>
          <Button variant="contained" sx={{ backgroundColor: '#752888', mt: 2 }}>
            Find your device
          </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box component="img" src="../../../images/image.png" alt="Illustration" sx={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
        </Grid>
      </Grid>
    </Box>
      </Box>

      <Typography variant="h5" gutterBottom>
        Your Devices
      </Typography>
      <Grid container spacing={3}>
        {sellings.map((selling) => (
          <Grid item xs={12} sm={6} md={4} key={selling._id}>
            <Link to="/customerpurchase" style={{textDecoration: 'none', color:"black"}}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`/images/deviceImages/${selling.imageName}`}
                alt={selling.emiNumber}               
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {selling.deviceName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment Date: {selling.paymentDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Remaining Balance: {selling.balance}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
