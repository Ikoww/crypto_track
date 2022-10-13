import './App.css';
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';
import styled from '@emotion/styled';

function App() {
  const Container = styled.div`
     background: #14161a;
     color: white;
     minHeight: 100vh
  `
  return (
  <Container>
    
      <Header />
      <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/coins/:id' element={<CoinPage />}/>
      </Routes>
  </Container>
  
  );
}

export default App;

