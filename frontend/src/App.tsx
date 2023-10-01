
import { BrowserRouter } from 'react-router-dom';
import Route from './Route/Layout';
import Header from './layouts/Header';
import { useEffect, useState } from 'react';
import Spinner from './layouts/Spinner';




function App() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    // document.body.classList.add('dark-mode')
    setTimeout(() => {
      setIsLoading(false)
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
