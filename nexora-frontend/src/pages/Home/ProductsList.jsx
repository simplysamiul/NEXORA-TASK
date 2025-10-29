import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import '../../css/ProductsList.css';
import Product from './Product';
import ProductNotFound from '../../components/shared/ProductNotFound';

const ProductsList = () => {
    const axiosInstance = useAxios();

    // loaded all products data
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axiosInstance.get("/api/products")
            .then(res => {
                if (res?.data) {
                    setProducts(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [axiosInstance]);
    return (
        <div className='products-area'>
            {
                products.length === 0
                    ? <ProductNotFound />
                    : <div className='products-container'>
                        {
                            products.map(product => <Product key={product._id} product={product} />)
                        }
                    </div>
            }
        </div>
    );
};

export default ProductsList;