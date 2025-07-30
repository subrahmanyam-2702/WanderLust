# 🌍 Wanderlust – A Full-Stack Travel Listing Web App

Wanderlust is a dynamic full-stack web application that allows users to explore, create, and manage travel accommodation listings around the world. Inspired by Airbnb, this project leverages modern web technologies to deliver a seamless user experience with map integration and cloud image hosting.

---

## 🔧 Tech Stack

- **Frontend**: EJS, HTML, CSS, Bootstrap  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (hosted on Atlas)  
- **Authentication**: Passport.js  
- **Cloud Services**: Cloudinary (image hosting), Mapbox (interactive maps)  
- **Middleware & Tools**: Mongoose, Multer, Method-Override, dotenv, connect-flash  

---

## ✨ Features

- 🔐 User authentication and session management  
- 📍 Mapbox integration to visualize location-based listings  
- 📸 Image upload and storage with Cloudinary  
- 📝 CRUD functionality for listings (Create, Read, Update, Delete)  
- 💬 Flash messages for user-friendly feedback  
- 🌐 Mobile-responsive UI with Bootstrap  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```
### 2. Install Dependencies
```bash
  npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root directory and add the following keys:
```bash
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_KEY=your_cloud_key
  CLOUDINARY_SECRET=your_cloud_secret
  MAPBOX_TOKEN=your_mapbox_token
  DB_URL=your_mongodb_connection_string
  SECRET=your_session_secret

```

### 4. Run the App
```bash
nodemon app.js (if nodemon is not installed, then node app.js)
```
Visit http://localhost:8080 in your browser.



## Contact

For any inquiries, please reach out to : 

- **Name:** Subrahmanyam Medidi
- **Email:** [venkatasubrahmanayammedidi@gmail.com](venkatasubrahmanayammedidi@gmail.com)
- **Github:** [https://github.com/subrahmanyam-2702](https://github.com/subrahmanyam-2702)

