import CoinChart from './CoinChart';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { CryptoState } from '../Context';
import { SingleCoin } from '../configuration/api';
import axios from 'axios';
import classes from './CoinInfo.module.css';
import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from './Carousel';
import { LinearProgress } from '@mui/material';





const CoinInfo = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();
    
    const {currency , currencySymbol} = CryptoState();

    
    useEffect(() => {
      const fetchCoin = async () => {
        
        const {data} = await axios.get(SingleCoin(id));

        setCoin(data);
        console.log(data)
               
    }
    // coinData(coin)
    fetchCoin();
},[id])

    
    // console.log(coin?.market_data.current_price[currency.toLowerCase()] < 1)

    if(!coin) {
        return  <LinearProgress sx={{ backgroundColor:'gold'}}/>
    }

    return (
     
        <div className={classes.container}>


            <div className={classes.sidebar}>
                <img src={coin?.image.large} 
                     alt={coin?.name}
                     height='180'
                     style={{marginBottom: 20}}/>

                <Typography variant='h4' 
                            sx={{fontWeight: 'bold',
                                 marginBottom: 2,
                                 fontFamily: 'Montserrat'}}>

                {coin?.name}
                </Typography>
                <Typography sx={{width: '100%',
                                 fontFamily: 'Montserrat',
                                 padding: 1.4,
                                 paddingTop: 0,
                                 paddingBottom: 1,
                                 textAlign: 'center'}}>


                    {parse(`${coin?.description.en.split('. ')[0]}.`)}

                </Typography>
                <div className={classes.marketData}>
                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                            Rank:
                        </Typography>
                        &nbsp;
                        &nbsp; 
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                         Current Price:
                        </Typography>
                        &nbsp;
                        &nbsp; 
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            {currencySymbol}
                            {coin?.market_data.current_price[currency.toLowerCase()] < 1? 
                            coin?.market_data.current_price[currency.toLowerCase()] : 
                            numberWithCommas(+(coin?.market_data.current_price[currency.toLowerCase()]))}
                        </Typography>
                    </span>

                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat', fontWeight: 'bold'}}>
                         Market Cup:
                        </Typography>
                        &nbsp;
                        &nbsp; 
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            {currencySymbol}
                            {numberWithCommas((coin?.market_data.market_cap[currency.toLowerCase()]
                            .toString()
                            .slice(0, -6)))}M
                        </Typography>
                    </span>

                </div>
            </div> 
            
        <CoinChart coin={coin}/>
    </div>
        
      
       
    )
};

export default CoinInfo;