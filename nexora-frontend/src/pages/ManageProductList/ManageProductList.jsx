import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import '../../css/ManageProductList.css';
import ProductNotFound from '../../components/shared/ProductNotFound';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageProductList = () => {
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
        <div className='products-list-area'>
            {
                products.length === 0
                    ? <ProductNotFound />
                    : <>
                        <div className="product-list-header">
                            <h3>All Products</h3>
                        </div>

                        <div className="table-wrapper">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price ($)</th>
                                        <th>Qty</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr className='table-content' key={product._id}>
                                            <td>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="product-img"
                                                />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.qty}</td>
                                            <td className="action-buttons">
                                                <Link to={`/editProduct/${product._id}`}><button className="edit-btn" ><FaEdit /></button></Link>
                                                <button className="delete-btn" >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    );
};

export default ManageProductList;