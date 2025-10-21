# E-Commerce Backend API

A comprehensive Node.js backend API for an e-commerce application built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication & Authorization** - Registration, login, logout with JWT tokens
- **User Management** - Profile management, password reset, role-based access control
- **Product Management** - CRUD operations for products with admin privileges
- **Shopping Cart** - Add/remove products, manage cart items
- **Blog System** - Create, read, update, and delete blog posts
- **Security** - Password hashing with bcrypt, JWT token authentication
- **Email Services** - Password reset and notification emails
- **MongoDB Integration** - Mongoose ODM for database operations
- **Input Validation** - Request validation and error handling
- **CORS Support** - Cross-Origin Resource Sharing enabled

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **File Upload**: Express file upload middleware
- **Development**: Nodemon for auto-restart
- **Code Formatting**: Prettier

## 📁 Project Structure

```project_structure
ecommerce_back/
├── config/
│   ├── dbconnect.js          # Database connection configuration
│   ├── jwtTocken.js          # JWT token utilities
│   └── RefreshTocan.js       # Refresh token handling
├── controller/
│   ├── blogcontroler.js      # Blog-related operations
│   ├── emailcontroler.js     # Email service operations
│   ├── productcontroler.js   # Product CRUD operations
│   └── usrecontrol.js        # User management operations
├── middlewares/
│   ├── authmiddleware.js     # Authentication middleware
│   └── errorhandler.js       # Error handling middleware
├── models/
│   ├── blogmodel.js          # Blog schema model
│   ├── productmodel.js       # Product schema model
│   └── usermodel.js          # User schema model
├── routes/
│   ├── authroute.js          # Authentication routes
│   ├── blogroute.js          # Blog management routes
│   └── projuctroute.js       # Product management routes
├── utils/
│   └── validatemongodgid.js  # MongoDB ObjectId validation
├── index.js                  # Application entry point
└── package.json             # Project dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ramesh-Bojanapu-1011/ecommerce_back.git
   cd ecommerce_back
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=4000
   MONGODB_URL=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   MAIL_ID=your_email@gmail.com
   MP=your_email_password
   ```

4. **Start the application**

   ```bash
   npm start
   ```

The server will start on `http://localhost:4000` (or the port specified in your .env file).

## 📚 API Endpoints

### Authentication Routes (`/api/user/`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Reset password with token

### User Management (`/api/user/`)

- `GET /all_users` - Get all users (Admin only)
- `GET /get-user-details/:id` - Get single user details
- `PUT /update-user/:id` - Update user profile
- `DELETE /delete/:id` - Delete user account
- `POST /update-password` - Update user password
- `POST /user-type/:id` - Get user type/role (Admin only)
- `POST /block-user/:id` - Block user account (Admin only)
- `POST /unblock-user/:id` - Unblock user account (Admin only)
- `GET /refresh` - Refresh authentication token

### Product Routes (`/api/product/`)

- `GET /all` - Get all products
- `GET /getproduct/:id` - Get product by ID
- `POST /create_product` - Create new product (Admin only)
- `PUT /update/:id` - Update product (Admin only)
- `DELETE /delete/:id` - Delete product (Admin only)
- `POST /add_product_to_cart` - Add product to shopping cart
- `POST /remove_product_from_cart` - Remove product from shopping cart
- `POST /add_product_to_wishlist` - Add product to wishlist
- `POST /remove_product_to_wishlist` - Remove product from wishlist

### Blog Routes (`/api/blog/`)

- `GET /all` - Get all blog posts
- `GET /getBlogById/:id` - Get blog post by ID
- `POST /create` - Create new blog post (Admin only)
- `PUT /update/:id` - Update blog post (Admin only)
- `DELETE /deleteblog/:id` - Delete blog post (Admin only)
- `PUT /likeblog/:blog_id` - Like a blog post
- `PUT /dislikeblog/:blog_id` - Dislike a blog post

## 🔒 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```env
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Middleware

- **Authentication Middleware** - Protects routes requiring user authentication
- **Admin Middleware** - Restricts access to admin-only operations
- **Error Handler** - Global error handling and response formatting
- **CORS** - Cross-origin resource sharing configuration

## 📝 Models

### User Model

- Personal information (name, email, mobile)
- Authentication data (password, tokens)
- Role-based access (user/admin)
- Shopping cart and wishlist
- Address management

### Product Model

- Product details (title, description, price)
- Categories and tags
- Stock management
- Ratings and reviews
- Image management

### Blog Model

- Blog content (title, description, content)
- Author information
- Publication status
- SEO-friendly URLs

## 🚀 Development

### Available Scripts

- `npm start` - Start the application with Prettier formatting and Nodemon
- `npm test` - Run tests (currently not implemented)

### Code Formatting

The project uses Prettier for code formatting. It automatically formats code on start.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support or questions, please open an issue on GitHub: [Issues](https://github.com/Ramesh-Bojanapu-1011/ecommerce_back/issues)

## 🔗 Links

- **Repository**: [https://github.com/Ramesh-Bojanapu-1011/ecommerce_back](https://github.com/Ramesh-Bojanapu-1011/ecommerce_back)
- **Issues**: [https://github.com/Ramesh-Bojanapu-1011/ecommerce_back/issues](https://github.com/Ramesh-Bojanapu-1011/ecommerce_back/issues)

---

Built with ❤️ using Node.js and Express.js
