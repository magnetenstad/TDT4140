import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import {Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}
export default App;
