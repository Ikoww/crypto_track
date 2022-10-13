import { CoinList } from "../configuration/api";
import {useState, useEffect} from 'react';
import axios from "axios";
import { CryptoState } from "../Context";
// import { Typography } from "@mui/material";
import { createTheme, ThemeProvider} from "@mui/material";
import { Typography, Container } from "@mui/material";


const CoinsTable = () => {

 const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
});

const [coinsList, setCoinsList] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const {currency, symbol , setCurrency } = CryptoState();

useEffect(() => {

    const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await axios.get(CoinList(currency));
          
          setIsLoading(false);
          setCoinsList(data);
       };

     fetchCoins()  
  }, [currency]);

  console.log(coinsList)

   return (
    <ThemeProvider theme={darkTheme}>
        <Container sx={{textAlign: 'center'}}>
          <Typography>
            Cryptocurrency prices by Market Cup
          </Typography>
        
        </Container>
    </ThemeProvider>
   )
}

export default CoinsTable;