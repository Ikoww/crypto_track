import { CoinList } from "../configuration/api";
import {useState, useEffect} from 'react';
import axios from "axios";
import { CryptoState } from "../Context";
// import { Typography } from "@mui/material";
import { createTheme, Pagination, ThemeProvider} from "@mui/material";
import { Typography,
         Container, 
         TextField,
         TableContainer,
         TableBody,
         TableHead,
         TableCell,
         TableRow,
         LinearProgress,
         Table } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from './CoinsTable.module.css';
import { numberWithCommas } from "./Carousel";

const tableRowContent = [
  'Coin',
  'Price',
  '24h change',
  'Market Cap'
];


const CoinsTable = () => {

 const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
});

const [coinsList, setCoinsList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [search, setSearch] = useState('')
const [page, setPage] = useState(1);
const {currency, currencySymbol, setCurrency } = CryptoState();

const navigate =useNavigate();

useEffect(() => {

    const fetchCoins = async () => {
      setIsLoading(true)
      const {data} = await axios.get(CoinList(currency));
          
          setIsLoading(false);
          setCoinsList(data);
       };
     
     fetchCoins()  
  }, [currency]);

  // console.log(coinsList)

  const searchCoinHandler= () => {
    return coinsList.filter(coin => (
      
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  };

   return (
    <ThemeProvider theme={darkTheme}>
        <Container sx={{textAlign: 'center'}}>
          {/* <Typography sx={{fontSize: 28, fontWeight: 400}}>
            Cryptocurrency prices by Market Cup
          </Typography> */}

          <TextField label='Search...' 
                     onChange={(e) => {
                      setSearch(e.target.value)
                      setPage(1)
                    }}
                     sx={{width: '100%', marginBottom: 2, marginTop: 2}}
                     />
          <TableContainer>
           {isLoading? (
            <LinearProgress sx={{ backgroundColor:'gold'}}/>
           ) : 
           (
             <Table>
               <TableHead sx= {{backgroundColor: '#EEBC1D' }}>
                 <TableRow>
                  {tableRowContent.map(head => (
                    <TableCell sx={{color: 'black', fontWeight: '800', fontFamily: 'Montserrat'}}
                               key={head}
                               align={head === 'Coin'? 'left' : 'right'}>

                                {head}

                    </TableCell>
                  ))}
                 </TableRow>
               </TableHead>


               <TableBody className={classes.row}>
                {searchCoinHandler()
                .slice((page -1) *10, (page -1) * 10 +10)
                .map(coin => {
                  const profit = coin.price_change_percentage_24h > 0;

                  return (
                    <TableRow 
                       onClick={() => navigate(`/coins/${coin.id}`) }
                       key={coin.name}
                       >

                       <TableCell 
                         component='th'
                         scope='row'
                         sx={{display: 'flex', gap: 2, }}
                         >
                         <img src={coin?.image}
                              alt={coin.name}
                              height='50'
                              sx={{marginBottom: 2}}
                              />

                          <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span style={{textTransform: 'uppercase', fontSize: 22}}>{coin.symbol}</span>
                            <span style={{color: 'darkGrey'}}>{coin.name}</span>
                          </div>  


                      </TableCell>
                      <TableCell align='right'>
                        {currencySymbol}
                        {coin.current_price.toFixed(2)}
                      </TableCell>

                      <TableCell 
                        align="right"
                        sx={{color: profit > 0? 'rgb(14, 203, 129)' : 'red' }}>

                          {profit && '+'}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell> 

                       
                      <TableCell align='right'>
                        {currencySymbol}
                        {numberWithCommas(coin.market_cap.toString().slice(0, -6))}
                      </TableCell>         

                    </TableRow>
                  )
                })}

               </TableBody>
             </Table>
           )}
          </TableContainer>


          <Pagination 
          count={+(searchCoinHandler()?.length / 10).toFixed(0)}
          sx={{padding: 20, width: '100%', display: 'flex', justifyContent: 'center'}}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450)
          }} />
        
        </Container>
    </ThemeProvider>
   )
}

export default CoinsTable;