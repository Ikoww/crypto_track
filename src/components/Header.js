import  { AppBar, Toolbar, Container, Typography, Select, MenuItem } from "@mui/material";
import classes from './Header.module.css';
import { useNavigate } from "react-router-dom";
import {createTheme , ThemeProvider} from '@mui/material';
import { CryptoState } from "../Context";

const Header = () => {

  // const theme = createTheme({ // theme for CoinMaster title
  //   typography: {
  //     fontFamily: [
  //       'Montserrat',
        
  //     ].join(','),
  //     h5: {
  //       fontWeight: 800,
  //     }
  //   },    
  // });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
 
  const {currency, setCurrency} = CryptoState();
   
  const navigate = useNavigate(); // navigate to comeback to homepage when click CoinMaster
      
  const titleClickHandler = () => {
    navigate('/');
  };
    
    return (
      <ThemeProvider theme={darkTheme}>

        <AppBar color='transparent' position='static'>
          <Container>

            <Toolbar>
            
                <Typography variant='h5' onClick={titleClickHandler}
                            className={classes.header__title}
                            sx={{
                              fontFamily: 'Montserrat',
                              fontWeight: 'bold',
                              fontSize: 30,
                            }}>
                  CoinMasters 
                </Typography>
              
              <Select variant='outlined' sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
                
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
              </Select>

            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    )
};

export default Header;