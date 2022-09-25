import React, {useState} from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from "./Login";
import Register from "./Register";
import {Tab, Tabs} from "@mui/material";
import {BootstrapButton} from "../../ui/ButtonCustom";


const theme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Index = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item xs={false} sm={6} md={7}
          display='flex' justifyContent='center' alignItems='center'
        >
          <Paper
            square
            elevation={6}
            sx={{
              borderRadius:'29px',
              width:'95%',
              height:'95vh',
              backgroundImage: 'url(https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={5} display='flex' justifyContent='center'>
          <Box
            sx={{
              width:'70%',
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent:'center'
            }}
          >
            <Box sx={{
              width:'100%',
              display:'flex',
              justifyContent:'end',
              paddingBottom:'50px'
            }}>
              <Typography variant="h5">
                <strong>BAUMARKT</strong>
              </Typography>
            </Box>
            <Typography variant="h5">
              Bienvenidos a todos...
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Registro" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              <Login/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Register/>
            </TabPanel>

          </Box>
        </Grid>

      </Grid>

    </ThemeProvider>
  );
};

export default Index;
