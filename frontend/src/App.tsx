
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Route from './Route/Layout';
import Header from './layouts/Header';
import { useEffect, useState } from 'react';
import Spinner from './layouts/spinner/Spinner';



function App() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // setIsLoading(true);
    setTimeout(() => {
      // setIsLoading(false)
    }, 6000)
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header />
        {
          isLoading ? <div className="load-spinner"><Spinner /> </div> : <Route />
        }

      </BrowserRouter>

    </>
  )
}

export default App
