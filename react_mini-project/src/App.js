import {BrowserRouter,Routes,Route}from 'react-router-dom';
import RegisterPage from './Page/RegisterPage'
import './App.css';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Routes>
            <Route path = "Register" element = {<RegisterPage/>}/>
          </Routes>
          </BrowserRouter>

    </div>
  );
}

export default App;
