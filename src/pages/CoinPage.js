import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { CryptoState } from '../Context';
import { SingleCoin } from '../configuration/api';
import axios from 'axios';
import classes from './CoinPage.module.css';
import CoinInfo from '../components/CoinInfo';
import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Carousel';

const CoinPage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();

    const {currency , currencySymbol} = CryptoState();

    
    useEffect(() => {
      const fetchCoin = async () => {

        const {data} = await axios.get(SingleCoin(id));

        setCoin(data);
        console.log(data)
      }
      fetchCoin()
    },[id])
    
    

    return (
     <>
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
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            Rank:
                        </Typography>
                        &nbsp;
                        &nbsp; 
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{display: 'flex'}}>
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                         Current Price:
                        </Typography>
                        &nbsp;
                        &nbsp; 
                        <Typography variant='h5' sx={{fontFamily: 'Montserrat'}}>
                            {currencySymbol}
                            {numberWithCommas(+(coin?.market_data.current_price[currency.toLowerCase()]))}
                        </Typography>
                    </span>

                </div>
            </div> 

        <CoinInfo coin={coin} />
        </div>

     </>
    )
};

export default CoinPage;