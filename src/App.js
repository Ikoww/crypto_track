import './App.css';
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';


function App() {
 
  return (
  <div className='container__main '>
    
      <Header />
      <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/coins/:id' element={<CoinPage />}/>
      </Routes>
  </div>
  
  );
}

export default App;

