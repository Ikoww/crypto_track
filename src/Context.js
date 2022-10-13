import { createContext, useState, useEffect ,useContext } from "react";

const Crypto = createContext();

const Context = ({children}) => {

 const [currency, setCurrency] = useState('USD')
 const [currencySymbol, setCurrencySymbol] = useState('$')

 console.log(currency);
  useEffect (() => {
    if(currency === 'EUR') setCurrencySymbol('€')
    if(currency === 'USD') setCurrencySymbol('$')
  }, [currency])

    return (
        <Crypto.Provider value={{currency, currencySymbol, setCurrency}}>
            {children}
        </Crypto.Provider>
    )

}

export default Context;

export const CryptoState = () => {
    return useContext(Crypto)
};