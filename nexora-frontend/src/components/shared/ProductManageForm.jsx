import Swal from "sweetalert2";
import "../../css/ProductManageForm.css";
import useAxios from "../../hooks/useAxios";

const ProductManageForm = () => {


    const axiosInstance = useAxios();

    // Handle form submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const qty = form.qty.value;
        const image = form.image.value;
        const category = form.category.value;
        const productInfo = { name, price, qty, image, category }

        // Show SweetAlert confirmation
        const result = await Swal.fire({
            title: "Add this product?",
            text: "Please confirm before sending it to the database.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00bcd4",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!",
        });

        if (result.isConfirmed) {
            // post product
            axiosInstance.post("/api/cart", productInfo)
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
    };

    return (
        <div className="add-product-container">
            <h2 className="form-title">Add New Product</h2>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Product Title</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
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
                        placeholder="Enter product price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        placeholder="Write a short description"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Product Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="qty"
                        required
                        placeholder="Enter product quantity"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Product Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        required
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
