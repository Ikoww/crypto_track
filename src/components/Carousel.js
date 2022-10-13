import { useState, useEffect } from 'react';
import classes from './Carousel.module.css';
import axios from "axios";
import { TrendingCoins } from "../configuration/api";
import { CryptoState } from "../Context";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from 'react-router-dom';



export function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
    const [trending , setTrending] = useState([]);
    const {currency, currencySymbol } = CryptoState();

   
    useEffect(() => {

      const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency));
     
            setTrending(data);
         };

       fetchTrendingCoins()  
    }, [currency]);
    
    const profit = currency.price_change_percentage_24h > 0;
    const items = trending.map(coin => {
        return (
            <Link className={classes.carousel__item}
                  to={`/coins/${coin.id}`}
                  underline='none'>
                <img src={coin?.image} 
                     alt={coin.name}
                     height='80'
                     style={{ marginBottom: 10}}
                     />

                <span style={{fontSize: 15, fontWeight: 500}}>{coin?.symbol} 
                  <span style={{color: profit > 0? 'rgb(14,203,129' : 'red'}}>
                  {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </span>

                <span style={{fontSize: 24, fontWeight: 500}}>
                    {currencySymbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
      }
  

    return (
        <div className={classes.carousel}>
            <AliceCarousel 
            mousetracking 
            infinite 
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            responsive={responsive}
            autoPlay
            items={items} />
        </div>
    )
};

export default Carousel;