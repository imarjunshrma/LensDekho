
import { BrowserRouter} from 'react-router-dom';
import './App.css'
import Route from './Route/Layout';
import Header from './layouts/Header';



function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
     <Route/>
    </BrowserRouter>
 
    </>
  )
}

export default App
