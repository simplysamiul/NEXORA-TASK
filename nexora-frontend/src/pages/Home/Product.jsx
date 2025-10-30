import '../../css/Product.css';
import useCart from '../../hooks/useCart';

const Product = ({ product }) => {
    const { name, image, price } = product;
    const { addToCart } = useCart();

    // product add in the cart
    const handleProductAdd = (product) => {
            addToCart(product);
    }
    return (
        <div className="product-cart">
            <img src={image} alt={name} />
            <div className="product-info">
                <h4 title={name}>
                    {name.length > 15 ? `${name.slice(0, 15)}...` : name}
                </h4>
                <p className="price">${price}</p>
                <button onClick={() => handleProductAdd(product)} className="add-to-cart"> "Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;