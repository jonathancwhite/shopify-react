import React, { useEffect, useContext, useState } from 'react'
import Description from '../components/Description';

import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import {
    Image,
    useControllableProp,
    useControllableState,
    Button,
    Box,
} from '@chakra-ui/react';
import NumberFormat from 'react-number-format';

const ProductPage = () => {

    let variantOptions = false;

    const { handle } = useParams();
    const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);
    const [variantIndex, setVariantIndex] = useState(0);
    const [value, setValue] = useState(1);
    const [internalValue, setInternalValue] = useControllableState({
        value,
        onChange: setValue,
    })


    useEffect(() => {
        fetchProductWithHandle(handle);
    }, [fetchProductWithHandle, handle])

    useEffect(() => {
        document.title = `${product.title}`
    })

    if (!product.title) return <div>Loading...</div>

    if (product.variants.length > 1) variantOptions = true;

    console.log(product);

    return (
        <>
            <div className='page product'>
                <div className="product-container">
                    <div className="product-details">
                        <div className="productImg">
                            <Image src={product.images[variantIndex].src} />
                        </div>
                        <div className="productInfo">
                            <h1>{product.title}</h1>
                            {/* <h2>{product.variants[variantIndex].title}</h2> */}
                            <p>{product.vendor}</p>
                            <p>Sku: {product.variants[variantIndex].sku}</p>
                            <NumberFormat value={product.variants[variantIndex].price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            {/* Reviews */}
                            <div>
                                <p>Quantity:</p>
                                <Button onClick={() => setInternalValue(value - 1)}>-</Button>
                                <Box as='span' w='200px' mx='24px'>
                                    {internalValue}
                                </Box>
                                <Button onClick={() => setInternalValue(value + 1)}>+</Button>
                            </div>
                            {
                                variantOptions &&
                                <div className="product__options">
                                    <div className="product__options--grid-sm">
                                        {
                                            product.variants.map((variant, index) => (
                                                <Image className='options-sm' key={variant.id} src={variant.image.src}
                                                    onClick={() => {
                                                        setVariantIndex(index);
                                                    }
                                                    } />
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            <div className="product__actions">
                                <button className='product__actions--addToCart' onClick={() => addItemToCheckout(product.variants[variantIndex].id, internalValue)}>Add to Cart</button>
                            </div>

                        </div>

                    </div>
                    <div className="product-description">
                        <Description />
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductPage

