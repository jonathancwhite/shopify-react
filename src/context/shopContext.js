import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext();


const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
})

class ShopProvider extends Component {
    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }

    componentDidMount() {
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id);
        } else {
            this.createCheckout();
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem('checkout-id', checkout.id)
        this.setState({ checkout: checkout })
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                this.setState({ checkout: checkout })
            })

    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity, 10)
            }
        ]

        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({ checkout: checkout })

        this.openCart()
    }

    removeLineItem = async (lineItemIdsToRemove) => {
        const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
        this.setState({ checkout: checkout })
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        this.setState({ products: products });
    }

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle);
        this.setState({ product: product })
    }

    closeCart = () => {
        this.setState({ isCartOpen: false })
    }

    openCart = () => {
        this.setState({ isCartOpen: true })
    }

    closeMenu = () => {

    }

    openMenu = () => {

    }

    updateLineItems = async (variantId, quantity) => {
        const lineItemsToUpdate = [
            {
                id: variantId,
                quantity: parseInt(quantity, 10)
            }
          ];
        const checkout = await client.checkout.updateLineItems(this.state.checkout.id, lineItemsToUpdate);
        this.setState({ checkout: checkout })
    }

    render() {

        return (
            <ShopContext.Provider
                value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchCheckout: this.fetchCheckout,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    createCheckout: this.createCheckout,
                    openCart: this.openCart,
                    openMenu: this.openMenu,
                    closeCart: this.closeCart,
                    closeMenu: this.closeMenu,
                    removeLineItem: this.removeLineItem,
                    addItemToCheckout: this.addItemToCheckout,
                    updateLineItems: this.updateLineItems
                }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider