import React, { useContext } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react';
import { ShopContext } from '../context/shopContext';

const Description = () => {

    const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            Description
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {product.description}
                </AccordionPanel>
            </AccordionItem>

            {/* <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            Additional Info
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {product.tags}
                </AccordionPanel>
            </AccordionItem> */}
        </Accordion>
    )
}

export default Description