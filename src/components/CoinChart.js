
import { chartDays } from "../configuration/data";
import SelectButton from "./SelectButton";
import classes from './CoinChart.module.css';
import { CircularProgress } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/system';
import axios from 'axios';
import { CryptoState } from '../Context';
import { HistoricalChart } from '../configuration/api';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import { ClassNames } from '@emotion/react';
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);



const CoinChart = ({ coin }) => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

   const [days, setDays] = useState(7);
   const [flag, setFlag] = useState(false);
   const [historicData, setHistoricData] = useState();
   const { currency } = CryptoState();;


   useEffect(() => {
    const fetchHistoric = async () => {
      const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
      
      setHistoricData(data.prices)
    }
    fetchHistoric();
  }, [days, coin.id, currency])
  
 
    return (
     
        <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : ( */}
          <>
          

            <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              />
            
            <div className={classes.container__btns}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        
      </div>
    </ThemeProvider>
  );
    
};

export default CoinChart;