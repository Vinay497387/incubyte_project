# 🍬 Sweet Shop Management System API

This is a simple Node.js + Express.js + MongoDB-based REST API for managing a Sweet Shop's inventory. The system allows you to create, view, update, delete, search, purchase, and restock sweet items.

---

## 📁 Project Structure

sweet-shop-api/
├── models/
│ └── Sweet.js # Mongoose schema for Sweet items
├── routes/
│ └── sweets.js # Express router for all sweet-related routes
├── server.js # Entry point of the application
├── package.json
└── README.md


---

## 🚀 Features

- Add new sweets to the inventory
- View all available sweets
- Search sweets by name, category, or price range
- Update sweet details
- Purchase sweets (reduces quantity)
- Restock sweets (increases quantity)
- Delete sweets from the inventory

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv (recommended)
- Postman (for testing)

---


## 🔧 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Vinay497387/sweet-shop-api.git
   cd sweet-shop-api

2.  Install dependencies
    npm install

3.  Start MongoDB locally
    Make sure MongoDB is running locally on mongodb://localhost:27017.

4.  Run the server
    npm start

5.  API is now running at:
    http://localhost:5000/api/sweets

📃 License
This project is open-source and free to use.


👨‍💻 Author
Vinay Raj Singh
https://github.com/Vinay497387 


   
