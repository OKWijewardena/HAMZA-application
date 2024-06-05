import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../listItems';

import {
  TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
  

export default function Customer(){

    const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [civil_id, setCivil_id] = useState('');
  const [nationality, setNationality] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp_no, setWhatsapp_no] = useState('');
  const [telephone_no, setTelephone_no] = useState('');
  const [address, setAddress] = useState('');
  const [paci_number, setPaci_number] = useState('');
  const [customers, setCustomer] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/customer/${id}`);
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      alert("Customer record deleted successfully");
      fetchCustomers();// Refresh the customer list after deletion
    } catch (error) {
      console.error('Error deleting Customer:', error);
      alert("An error occurred while deleting the selling record.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/customer/');
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const NewCustomer = {
      name,
      email,
      password,
      civil_id,
      nationality,
      mobile,
      whatsapp_no,
      telephone_no,
      address,
      paci_number
    };

    const NewUser = {
      name,
      email,
      password,
      role: "customer" 
    }

    try {
      await axios.post('http://localhost:8000/api/customer/register', NewCustomer);
      await axios.post('http://localhost:8000/api/users/register', NewUser);
      alert("New Customer added successfully");
    } catch (error) {
      console.error('Error adding customer:', error);
      alert(`Error adding customer: ${error.response ? error.response.data.message : error.message}`);
    }
  };

    return(
        <div>
            <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{backgroundColor: 'white', color: '#637381'}}position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
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
            }}
          >
            SMARTCO
          </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container>
          <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          padding: 3,
          backgroundColor: '#fff',
          borderRadius: 1,
          boxShadow: 3,
          maxWidth: 500, // Adjust the maxWidth as needed
          width: '100%',
          mx: 'auto', // Center the box
        }}>
        <Typography component="h1" variant="h5" gutterBottom sx={{ fontFamily: 'Public Sans, sans-serif', fontWeight: 'bold', color:"#637381" }}>
          Customer Details
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField margin="normal" required fullWidth label="User Name" onChange={(e) => {
                      setName(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="E-mail" onChange={(e) => {
                      setEmail(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Mobile Number" onChange={(e) => {
                      setMobile(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="WhatsApp Number" onChange={(e) => {
                      setWhatsapp_no(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Telephone Number" onChange={(e) => {
                      setTelephone_no(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Address" onChange={(e) => {
                      setAddress(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Nationality" onChange={(e) => {
                      setNationality(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Civil ID" onChange={(e) => {
                      setCivil_id(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Paci Number" onChange={(e) => {
                      setPaci_number(e.target.value);
                    }}/>
          <TextField margin="normal" required fullWidth label="Password" type="password" onChange={(e) => {
                      setPassword(e.target.value);
                    }}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#752888',
              '&:hover': {
                backgroundColor: '#C63DE7',
              },
              fontFamily: 'Public Sans, sans-serif',
              fontWeight: 'bold',
            }}
          >
            Register
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Whatsapp Number</TableCell>
                <TableCell>Telephone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>Civil ID</TableCell>
                <TableCell>Paci Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {customers.map((customer) => (
                        <TableRow key={customer._id}>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.mobile}</TableCell>
                          <TableCell>{customer.whatsapp_no}</TableCell>
                          <TableCell>{customer.telephone_no}</TableCell>
                          <TableCell>{customer.address}</TableCell>
                          <TableCell>{customer.nationality}</TableCell>
                          <TableCell>{customer.paci_number}</TableCell>
                          <TableCell>{customer.civil_id}</TableCell>
                          <TableCell>
                            <IconButton color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleDelete(customer.email)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
        </div>
    )
}