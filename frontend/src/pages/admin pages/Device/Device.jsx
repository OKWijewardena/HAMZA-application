import * as React from 'react';
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
  

export default function Device(){

    const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
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
          Device Details
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Device Name" />
          <TextField margin="normal" required fullWidth label="Quantity" />
          <TextField margin="normal" required fullWidth label="Price" />
          <TextField margin="normal" required fullWidth label="Colour" />
          <TextField margin="normal" required fullWidth label="Shop Name" />
          <TextField margin="normal" required fullWidth label="Model Number" />
          <TextField margin="normal" required fullWidth label="Storage" />
          <TextField margin="normal" required fullWidth label="Warrenty" />
          <TextField margin="normal" required fullWidth label="Emi Number" />
          <TextField margin="normal" required fullWidth label="Purchase Date" type='date'/>
          <TextField margin="normal" required fullWidth label="Expire Date" type={'date'}/>
          <TextField margin="normal" required fullWidth label="Device Image" type={'file'}/>

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
                <TableCell>Device Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Colour</TableCell>
                <TableCell>Shop Name</TableCell>
                <TableCell>Model Number</TableCell>
                <TableCell>Storage</TableCell>
                <TableCell>Warrenty</TableCell>
                <TableCell>Emi Number</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Expire Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example Data Row */}
              {Array.from({ length: 2 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>xxx</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
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