import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2';

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
    }, [initialized, cart]);

    // add to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            let updatedCart;

            if (existingProduct) {
                // increase qty if product exists
                updatedCart = prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );

                Swal.fire({
                    icon: 'info',
                    title: 'Quantity Updated',
                    text: `${product.name} quantity increased.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                // add new product
                updatedCart = [...prevCart, { ...product, qty: 1 }];

                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart!',
                    text: `${product.name} added successfully.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
            }

            calculateTotal(updatedCart);
            return updatedCart;
        });
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
        const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
        setTotal(totalPrice);
    };

    const cartAction = { addToCart, cart, removeFromCart, total, updateQty, setCart, setTotal };
    return (
        <CartContext.Provider value={cartAction}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;