import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './component/navbar';
import { Estimate } from './pages/estimate';
import { Confirm } from './pages/confirm';
import { Trip } from './pages/trips';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
        <Route path='/ride/estimate' element={<Estimate />}/>
        <Route path='/ride/confirm' element={<Confirm />}/>
        <Route path='/ride/:customer_id' element={<Trip />}/> 
     </Routes>
    </div>
  );
}

export default App;
