import { BsGithub, BsLinkedin } from 'react-icons/bs';
import './style.css';

const Footer = () => {
  return (
    <footer className='footer'>
        <div>
            <p>
        Eyesome made with 💜 by Sandhya
            </p>
        <ul>
            <li>
                <a href="">
                    <BsGithub/>
                    </a>
            </li>
            <li>
                <a href="">
                <BsLinkedin/>       </a>
            </li>
        </ul>
        </div>
    </footer>
  )
};

export default Footer;
