import { useParams } from 'react-router-dom';
import ProductManageForm from '../../components/shared/ProductManageForm';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const EditProduct = () => {
    const {productId} = useParams();
    const axiosInstance = useAxios();
    const [product, setProduct] = useState({});

    useEffect(()=> {
        axiosInstance.get(`/api/products/${productId}`)
        .then(res=> {
            if(res.data){
                setProduct(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    },[axiosInstance, productId]);
    return (
        <div>
            <ProductManageForm product={product} action="edit" />
        </div>
    );
};

export default EditProduct;