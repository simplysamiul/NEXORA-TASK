import Swal from "sweetalert2";
import "../../css/ProductManageForm.css";
import useAxios from "../../hooks/useAxios";

const ProductManageForm = ({ product = {}, action }) => {

    const { name, image, category, price, description, _id } = product;
    const actionStatus = action === "add" ? "Add" : "Update"

    const axiosInstance = useAxios();

    // Handle form submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const image = form.image.value;
        const category = form.category.value;
        const description = form.description.value;
        const productInfo = { name, price, image, category, description };

        // Show SweetAlert confirmation
        const result = await Swal.fire({
            title: `${actionStatus} this product?`,
            text: `Please confirm before ${actionStatus.toLowerCase()} the product.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00bcd4",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${actionStatus} it!`,
        });

        if (result.isConfirmed) {


            // post product 
            if (action === "add") {
                axiosInstance.post("/api/products", productInfo)
                    .then(res => {
                        if (res.data?.data?.insertedId) {
                            Swal.fire({
                                title: "Added!",
                                text: `${res.data.message}`,
                                icon: "success",
                                confirmButtonColor: "#00bcd4",
                            });
                            // clear form send data to the database
                            form.reset();
                        }
                    }).catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: `${err.message}`,
                            icon: "error",
                        });
                    })
            } 
            // Update product
            else if (action === "edit") {
                axiosInstance.patch(`/api/products/${_id}`, {productInfo})
                    .then(res => {
                        if (res.data?.result?.modifiedCount) {
                            Swal.fire({
                                title: "Update!",
                                text: `${res.data.message}`,
                                icon: "success",
                                confirmButtonColor: "#00bcd4",
                            });
                            // clear form send data to the database
                            form.reset();
                        }
                    }).catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: `${err.message}`,
                            icon: "error",
                        });
                    })
            }


        }
    };

    return (
        <div className="add-product-container">
            <h2 className="form-title">{actionStatus} New Product</h2>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Product Title</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={name ? name : ""}
                        placeholder="Enter product title"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        required
                        defaultValue={price ? price : ""}
                        placeholder="Enter product price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={description ? description : ""}
                        placeholder="Write a short description"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Product Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        required
                        defaultValue={image ? image : ""}
                        placeholder="Enter product image link"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        required
                        defaultValue={category ? category : ""}
                        placeholder="Enter product category"
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductManageForm;
