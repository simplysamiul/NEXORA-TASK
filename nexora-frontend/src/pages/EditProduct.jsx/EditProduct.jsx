import React from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const {productId} = useParams();
    return (
        <div>
            {productId}
        </div>
    );
};

export default EditProduct;