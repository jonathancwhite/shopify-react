import React, { useContext } from 'react'
import { Icon, Image } from '@chakra-ui/react'
import BallisticLogo from '../assets/img/ba-logo.png';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md'
import { ShopContext } from '../context/shopContext';

function Header() {

    const {openCart, openMenu, checkout} = useContext(ShopContext)

    return (
        <>
            <div className="header">
                <div className="header__grid">
                    <div className="header__left">
                        <Link to="/"><Image src={BallisticLogo} /></Link>
                    </div>
                    <div className="header__right">
                        <ul>
                            <Icon fill="#000" cursor="pointer" as={MdShoppingCart} onClick={() => openCart()} />
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header