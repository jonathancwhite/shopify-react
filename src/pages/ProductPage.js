import React, { useEffect, useContext, useState } from 'react'

import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';
import { Image } from '@chakra-ui/react';

const ProductPage = () => {

    let variantOptions = false;

    const { handle } = useParams();
    const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);

    const [variantIndex, setVariantIndex] = useState(0);
    // const [activeThumb, setActiveThumb] = useState(false);

    useEffect(() => {
        fetchProductWithHandle(handle)
    }, [fetchProductWithHandle, handle])

    if (!product.title) return <div>Loading...</div>

    if (product.variants.length > 1) {
        // console.log(product.variants.length);
        variantOptions = true;
    }

    console.log(product);
    console.log(product.variants);

    return (
        <>
            <div className='page product'>
                <div className="product-container">
                    <div className="product-details">
                        <div className="productImg">
                            <Image src={product.images[0].src} />
                        </div>
                        <div className="productInfo">
                            <h1>{product.title}</h1>
                            <h2>${product.variants[variantIndex].price}</h2>
                            {/* <p>{variantIndex}</p> */}
                            {
                                variantOptions &&
                                <div className="product__options">
                                    <div className="product__options--grid-sm">
                                        {
                                            product.variants.map((variant, index) => (
                                                <Image className='options-sm' src={variant.image.src} onClick={() => setVariantIndex(index)}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            <div className="product__actions">
                                <button className='product__actions--addToCart'>Add to Cart</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default ProductPage

