import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AddProduct from "../pages/AddProduct/AddProduct";
import ManageProductList from "../pages/ManageProductList/ManageProductList";
import EditProduct from "../pages/EditProduct.jsx/EditProduct";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            }, 
            {
                path: "addProduct",
                Component: AddProduct
            },
            {
                path: "productList",
                Component: ManageProductList
            },
            {
                path: "editProduct/:productId",
                Component: EditProduct
            },
        ]
    }
])

export default router;