import { MdOutlineError } from 'react-icons/md';
import '../../css/ProductNotFound.css';

const ProductNotFound = () => {
    return (
        <div className="product-not-found">
            <MdOutlineError className="not-found-icon" />
            <h6>No Products Found</h6>
        </div>
    );
};

export default ProductNotFound;