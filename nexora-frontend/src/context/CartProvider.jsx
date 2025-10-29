import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [initialized, setInitialized] = useState(false);

    // Load data from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
        setInitialized(true);
    }, []);

    // cart change or update in the localStorage
    useEffect(() => {
        if (initialized) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [initialized,cart]);

    // add to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingCart = prevCart.find(cart => cart._id === product._id);
            let updatedCart;
            if (existingCart) {
                // increase qty if product exists
                updatedCart = prevCart.map(cart => cart._id === product._id ? { ...cart, qty: cart.qty + 1 } : cart)
            } else {
                // add new product
                updatedCart = [...prevCart, { ...product, qty: 1 }]
            }

            calculateTotal(updatedCart);
            return updatedCart;
        })
    };

    // Update quantity
    const updateQty = (id, qty) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => item._id === id ? { ...item, qty: qty } : item);
            calculateTotal(updatedCart);
            return updatedCart;
        });
    };

    // remove from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item._id !== id);
            calculateTotal(updatedCart);
            return updatedCart;
        });
    };

    // Calculate price
    const calculateTotal = (cartItems) => {
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        setTotal(totalPrice);
    };

    const cartAction = { addToCart, cart, removeFromCart, total, updateQty };
    return (
        <CartContext.Provider value={cartAction}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;