import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom';
import { Box, Grid, Text, Image } from '@chakra-ui/react'
import BrandingPhoto from '../assets/img/ba-branding-2020-6.jpg';
import RepeatedBA from '../assets/img/repeated-ba.png';
import { Card, Button } from 'react-bootstrap';

const Home = () => {

    const { fetchAllProducts, products } = useContext(ShopContext);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts])

    if (!products) return <div>Loading...</div>

    console.log(products);

    // <Box>
    //     <Grid templateColumns="repeat(3, 1fr)">
    //         {
    //             products.map(product => (
    //                 <Link to={`/products/${product.handle}`} key={product.id}>
    //                     <Image src={product.images[0].src} />
    //                     <Text>
    //                         {product.title}
    //                     </Text>
    //                     <Text>
    //                         ${product.variants[0].price}
    //                     </Text>
    //                 </Link>
    //             ))
    //         }
    //     </Grid>
    // </Box>

    return (
        <>
            <div className="hero">
                <div className="hero__overlayText">
                    <Image src={RepeatedBA} />
                </div>
                <div className="hero__left--top">
                    <h2>Optimized <br /> Ecommerce<span>.</span></h2>
                </div>
                <div className="hero__left--bottom">
                    <p>Some random text that should be converting for something. I am not a copywrite though.</p>
                    <a href="/" className="hero__cta">View Our Work</a>
                </div>
                <div className="hero__right">
                    <Image src={BrandingPhoto}></Image>
                </div>
            </div>
            <div className="products">
                {/* <h2>Products</h2> */}
                <div className="products_grid">
                    {
                        products.map(product => (
                            <Link to={`/products/${product.handle}`} key={product.id}>
                                <Card>
                                    <Card.Img variant='top' src={product.images[0].src} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>${product.variants[0].price}</Card.Text>
                                        <Button variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home