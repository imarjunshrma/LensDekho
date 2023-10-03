
import { BrowserRouter } from 'react-router-dom';
import Route from './Route/Layout';
import Header from './layouts/Header';
import { useEffect, useState } from 'react';
import Spinner from './layouts/Spinner';




function App() {
  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();
  const calculateViewPortHeight = () => {
    const viewPortHeight = window.innerHeight.toString();
    let height = document.documentElement.style.getPropertyValue("--viewPortHeight");
    if (height !== viewPortHeight) {
      document.documentElement.style.setProperty("--viewPortHeight", viewPortHeight);
    }
  }
  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/") {
      setIsLoading(true);
      // document.body.classList.add('dark-mode')
      setTimeout(() => {
        setIsLoading(false)
      }, 6000)
    }

    calculateViewPortHeight();
    window.addEventListener("resize", calculateViewPortHeight)
    return () => {
      window.removeEventListener("resize", calculateViewPortHeight);
    }

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
