import '../../css/Product.css';

const Product = ({ product }) => {
    const { name, image, category, price, qty, _id } = product;
    return (
        <div className="product-cart">
            <img src={image} alt={name} />
            <div className="product-info">
                <h4 title={name}>
                    {name.length > 15 ? `${name.slice(0, 15)}...` : name}
                </h4>
                <p className="price">${price}</p>
                <p className="qty">Quantity: {qty}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;