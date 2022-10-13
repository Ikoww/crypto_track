import { Container, Typography } from "@mui/material";
import classes from './Banner.module.css';
import Carousel from "./Carousel";


const Banner = () => {

   

    return (
        <div className={classes.banner}>
            <Container className={classes.banner__content}>
                <div className={classes.tagline}>
                    <Typography variant='h2'
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    fontFamily: 'Montserrat',
                                }}>
                        CoinMasters
                    </Typography>

                    <Typography variant='subtitle2'
                                sx={{
                                    fontFamily: 'Montserrat',
                                    color: 'darkgrey',
                                    textTransform: 'capitalize',
                                    
                                }}>
                        Get all info that you need about cryptocurrency
                    </Typography>
                </div>
                <Carousel />
                
            </Container>
        </div>
    )
};

export default Banner;