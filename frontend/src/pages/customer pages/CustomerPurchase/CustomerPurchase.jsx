import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

export default function CustomerPurchase() {

    const [sellings, setSellings] = useState([]);

    useEffect(() => {
        fetchSellings();
    }, []);

    const fetchSellings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/selling/getOneSellingID/665959c19f3ac82b358da9a9');
            setSellings(response.data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };
  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" align="center" sx={{ mb: 2, flexGrow: 1, 
              background: 'linear-gradient(90deg, #C63DE7, #752888)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 'bold',
              marginTop:'20px' }}>
        SMART CO
      </Typography>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        iPhone 11
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src={`/images/deviceImages/${sellings.imageName}`} alt="iPhone 11" style={{ width: '100%', maxWidth: 300 }} />
      </Box>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment Plan
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {sellings.customArray && sellings.customArray.map((item) => (
    <TableRow key={item._id}>
      <TableCell>{item.date}</TableCell>
      <TableCell>{item.price}/=</TableCell>
      <TableCell>
        <Button variant="contained" color={item.status === 'paid' ? 'success' : 'error'} size="small">
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" align="right" sx={{ mt: 2 }}>
  Remaining Balance: {sellings.balance}/=
</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Payment History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Invoice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2024/05/02</TableCell>
                  <TableCell>20000/=</TableCell>
                  <TableCell><Button variant="contained" size="small">View</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
