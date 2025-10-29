import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import '../../css/ManageProductList.css';
import ProductNotFound from '../../components/shared/ProductNotFound';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

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


    // Product delete function
    const handleDeleteProduct = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this product !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#00bcd4",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // delete product 
                axiosInstance.delete(`/api/products/${productId}`)  
                    .then((res) => {
                        if (res.data?.result?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The product has been deleted successfully.",
                                icon: "success",
                                confirmButtonColor: "#00bcd4",
                            });
                            // update product list 
                            setProducts(products.filter(product => product._id !== productId));
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: res.data?.message,
                                icon: "error",
                            });
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire({
                            title: "Error!",
                            text: err.message,
                            icon: "error",
                        });
                    });
            }
        });
    };
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
                                            <td className="action-buttons">
                                                <Link to={`/editProduct/${product._id}`}><button className="edit-btn" ><FaEdit /></button></Link>
                                                <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn" >
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