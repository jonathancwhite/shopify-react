import React from 'react'
import { Image } from '@chakra-ui/react'
import BallisticLogo from '../assets/img/ba-logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
        <div className="header">
            <div className="header__grid">
                <div className="header__left">
                    <Link to="/"><Image src={BallisticLogo}/></Link>
                </div>
                <div className="header__right">
                    <ul>
                        <a href=""><li>About</li></a>
                        <a href=""><li>Work</li></a>
                        <a href=""><li>Services</li></a>
                        <a href=""><li>Contact</li></a>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header