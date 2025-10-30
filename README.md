# 🛒 Mock E-Commerce Cart Application

A **full-stack shopping cart web application** built with React, Node.js, and MongoDB.  
It allows users to browse products, add them to the cart, manage their cart items, and place mock orders with checkout functionality.

---

## 🚀 Tech Stack

### 🧩 Frontend
- ⚛️ React.js  
- 🧠 React Context API (for global state management)  
- 🔁 Custom Hooks  
- 🎨 Custom CSS for styling  
- 🍬 SweetAlert2 for alerts and confirmation popups  
- 🌐 Axios for API communication  

### 🧱 Backend
- 🟢 Node.js  
- ⚡ Express.js  
- 🍃 MongoDB (with Mongoose)  

---

## 🌟 Features

### 🏪 Product Management
- ✅ Add new products (with image, name, price, and category)
- ✅ View all products on the homepage in a responsive grid layout
- ✅ Edit or delete products directly from the product management page

### 🛍️ Cart System
- 🧠 Uses React Context API for global cart management
- 💾 Persists cart data in **localStorage**
- 🧩 "Add to Cart" button adds product to the cart or increases quantity if already added
- ➕ Quantity increase/decrease buttons
- 🗑️ Remove product with SweetAlert confirmation popup
- 💰 Auto calculation of total price (based on product quantity and price)

### 💳 Checkout System
- 🧾 Checkout page shows:
  - Total items
  - VAT
  - Delivery charge
  - Grand total
- 🧍 User can fill out shipping details (name, email, address)
- 📦 After order confirmation:
  - Data is sent to database
  - Cart is cleared from localStorage
  - Redirects user to home page
  - SweetAlert success popup shows confirmation

---

## 🧭 Application Workflow

```mermaid
graph TD
A[Admin Uploads Product] --> B[Products Display on Home Page]
B --> C[User Clicks 'Add to Cart']
C --> D[Data Stored in Context + LocalStorage]
D --> E[User Views Cart in 'Added Items']
E --> F[Change Quantity or Remove Items (SweetAlert Confirm)]
F --> G[Proceed to Checkout]
G --> H[Fill Name, Email, Address]
H --> I[Confirm Order → Data Saved to Database]
I --> J[Cart Cleared + Redirect to Home + Success Popup]
