import Swal from "sweetalert2";
import "../../css/CheckOut.css";
import useCart from "../../hooks/useCart";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const { cart, total, setCart, setTotal } = useCart();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // Calculations
    const vat = total * 0.05; // 5% VAT
    const deliveryCharge = total > 100 ? 0 : 5; // free delivery for orders above $100
    const grandTotal = (total + vat + deliveryCharge).toFixed(2);
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    // Place Order Function
    const handleOnSubmit = (e) => {
        e.preventDefault();

        // shipping info
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const userInfo = { name, email, address };


        // show this warning when user not provide any info before placing order
        if (!name || !email || !address) {
            Swal.fire({
                title: "Missing Information!",
                text: "Please fill all fields before placing the order.",
                icon: "warning",
                confirmButtonColor: "#00bcd4",
            });
            return;
        }

        const order = { userInfo, product: cart, total, vat, deliveryCharge, grandTotal, timestamp: new Date().toISOString() };

        Swal.fire({
            title: "Confirm Order",
            text: "Are you sure you want to place this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00bcd4",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, place it!",
        }).then((result) => {
            if (result.isConfirmed) {

                axiosInstance.post("/api/cart", { order })
                    .then(res => {
                        if (res?.data?.data?.insertedId) {
                            Swal.fire({
                                title: "Order Placed!",
                                html: `
                                        <p>Thank you, <b>${name}e</b></p>
                                        <p>Your total payment is <b>$${grandTotal}</b></p>
                                        <p>We'll deliver to: <br /><b>${address}</b></p>
                                    `,
                                icon: "success",
                                confirmButtonColor: "#00bcd4",
                            });

                            // Clear cart from context and localStorage
                            setCart([]);
                            setTotal(0);
                            localStorage.removeItem("cart");

                            // redirect to the home page
                            navigate("/");
                        }
                    }).catch(err => {
                        console.log(err)
                    })



                // Here you can also send data to your backend
                // axios.post("/api/checkout", order)
                // .then(...)
            }
        });
    };

    return (
        <div className="checkout-wrapper">
            <div className="checkout-container">
                {/* LEFT: CART SUMMARY */}
                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="checkout-items">
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cart.map((item) => (
                                <div key={item._id} className="checkout-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>
                                            ${item.price} × {item.qty}
                                        </p>
                                        <p className="item-subtotal">
                                            ${(item.price * item.qty).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* PRICE DETAILS */}
                    <div className="price-details">
                        <div className="price-row">
                            <span>Total Quantity:</span>
                            <span>{totalQty}</span>
                        </div>
                        <div className="price-row">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>VAT (5%):</span>
                            <span>${vat.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Delivery Charge:</span>
                            <span>${deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="price-row total">
                            <strong>Grand Total:</strong>
                            <strong>${grandTotal}</strong>
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="checkout-form">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                placeholder="Enter your delivery address"
                                rows="3"
                            ></textarea>
                        </div>

                        <button className="checkout-btn">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
