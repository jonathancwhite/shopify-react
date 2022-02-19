import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Icon } from '@chakra-ui/react'
import { MdDelete, MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Image,
    Link
} from '@chakra-ui/react'

export const Cart = () => {

    function updateQuantityLess(itemId, quantity) {
        let newQ = parseInt(quantity - 1);
        console.log(itemId, newQ)
        updateLineItems(itemId, newQ);
    }

    function updateQuantityMore(itemId, quantity) {
        let newQ = parseInt(quantity + 1);
        console.log(itemId, newQ)
        updateLineItems(itemId, newQ);
    }

    const { isCartOpen, closeCart, checkout, removeLineItem, updateLineItems } = useContext(ShopContext)
    console.log(checkout.lineItems)

    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement='right'
                onClose={closeCart}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Cart:</DrawerHeader>

                    <DrawerBody>
                        {
                            checkout.lineItems &&
                            checkout.lineItems.map(item => (
                                <div className="minicartItem">
                                    <div className="minicartItem__imageContainer">
                                        <Image src={item.variant.image.src} />
                                    </div>
                                    <div className="minicartItem__infoContainer">
                                        <h2>{item.variant.title}</h2>
                                        <p>${item.variant.price}</p>
                                        <div className="minicartItem__action--quantity">
                                            <Icon as={MdOutlineExpandMore} onClick={() => updateQuantityLess(item.id, item.quantity)} />
                                            <span>{item.quantity}</span>
                                            <Icon as={MdOutlineExpandLess} onClick={() => updateQuantityMore(item.id, item.quantity)} />
                                        </div>
                                    </div>
                                    <div className="minicartItem__action--remove">
                                        <span><Icon as={MdDelete} cursor="pointer" onClick={() => removeLineItem(item.id)} /></span>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            checkout.lineItems?.length > 0 ?
                                <>
                                    <Button colorScheme='blue'><Link href={checkout.webUrl}>Checkout</Link></Button>
                                </> :
                                <>
                                    <p>Your cart is empty.</p>
                                </>
                        }
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
