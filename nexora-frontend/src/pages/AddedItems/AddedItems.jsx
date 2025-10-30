import useCart from "../../hooks/useCart";
import "../../css/AddedItem.css";
import ProductNotFound from "../../components/shared/ProductNotFound";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddedItem = () => {
    const { cart, removeFromCart, updateQty, total } = useCart();
    // handle remove item
    const handleRemoveItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to remove this item from the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00bcd4",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // remove item from cart
                removeFromCart(id);

                Swal.fire({
                    title: "Removed!",
                    text: "Item has been removed from your cart.",
                    icon: "success",
                    confirmButtonColor: "#00bcd4",
                });
            }
        });
    };

    return (
        <div className="added-item-container">
            {cart.length === 0 ? (
                <ProductNotFound />
            ) : (
                <>
                    <h2 className="cart-title">Added Product List</h2>
                    <div className="cart-list">
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-img" />

                                <div className="cart-details">
                                    <h4 className="cart-name" title={item.name}>
                                        {item.name.length > 18
                                            ? item.name.slice(0, 18) + "..."
                                            : item.name}
                                    </h4>
                                    <p className="cart-price">$ {item.price}</p>

                                    <div className="cart-actions">
                                        <button onClick={() => updateQty(item._id, Math.max(item.qty - 1, 1))} className="qty-btn"> - </button>
                                        <span className="qty-count">{item.qty}</span>
                                        <button onClick={() => updateQty(item._id, item.qty + 1)} className="qty-btn"> + </button>
                                    </div>

                                </div>
                                <button  onClick={() => handleRemoveItem(item._id)} className="remove-btn"> Remove </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <Link to="/checkOut"><button className="checkout-btn">Proceed to Checkout</button></Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddedItem;
