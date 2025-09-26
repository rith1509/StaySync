# StaySync - A Full-Stack Vacation Rental Platform

### [Live Demo](https://staysync-afje.onrender.com/listings) ---

## 🚀 Project Overview
This repository contains the source code for **StaySync**, a full-stack web application inspired by Airbnb. It's built with a classic MVC (Model-View-Controller) architecture using Node.js, Express, and MongoDB. The platform allows users to browse, create, and review vacation listings, with features like interactive maps, image uploads, and robust user authentication.

---

## ✨ Core Features

* **RESTful CRUD Operations**: Full Create, Read, Update, and Delete functionality for both listings and reviews.
* **User Authentication**: Secure user signup, login, and logout functionality using Passport.js with password hashing and salting.
* **Image Uploads**: Seamless image uploads to the cloud using Multer for handling multipart/form-data and Cloudinary for hosting.
* **Interactive Maps**: Displays the location of each listing on an interactive map using Mapbox GL JS.
* **Server-Side Geocoding**: Automatically converts listing locations (e.g., "Paris, France") into storable GeoJSON coordinates using the Mapbox Geocoding API.
* **Dynamic Filtering & Search**: Users can filter listings by category and perform a case-insensitive search that queries titles, categories, and locations.
* **Data Validation**: Robust server-side schema validation using Joi to ensure data integrity.
* **Persistent Sessions**: User sessions are stored in MongoDB using `connect-mongo`, allowing users to stay logged in even after the server restarts.
* **Flash Messaging**: Provides users with feedback (e.g., success or error messages) using `connect-flash`.

---

<img width="1906" height="901" alt="image" src="https://github.com/user-attachments/assets/f850b955-e433-437e-b6e9-8d6d5671be21" />
<img width="1901" height="853" alt="image" src="https://github.com/user-attachments/assets/5ed3f6eb-3f39-44c6-967c-5f8734133b22" />
<img width="1894" height="899" alt="image" src="https://github.com/user-attachments/assets/2fa0f366-b23f-4d75-9ff8-89fcd0622f1e" />
<img width="1911" height="898" alt="image" src="https://github.com/user-attachments/assets/b342ad4f-f838-417e-98ae-7f0e1b230293" />



## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose ODM), MongoDB Atlas for production |
| **Frontend** | EJS (Embedded JavaScript templates), Bootstrap 5 |
| **Authentication** | Passport.js (Local Strategy), Express Session |
| **Image Hosting** | Cloudinary API, Multer |
| **Geospatial Services**| Mapbox API, Mapbox GL JS |
| **Deployment** | Render |

---

## 📂 Repository Structure

<img width="318" height="490" alt="image" src="https://github.com/user-attachments/assets/2d13871b-dc84-483a-98cd-d1709b93820c" />



## 🔧 Local Setup & Installation

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
* Node.js (v18.x or later)
* npm
* A MongoDB Atlas account (or a local MongoDB installation)

### 2. Clone the Repository
bash
git clone [https://github.com/rith1509/StaySync.git](https://github.com/rith1509/StaySync.git)
cd your-repo-name
### 3. Install Dependencies
Bash

npm install
### 4. Set Up Environment Variables
Create a .env file in the root of the project and add the following variables. Replace the placeholder values with your own keys and credentials.

Code snippet

#### MongoDB Atlas Connection String
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/staysync?retryWrites=true&w=majority

#### Cloudinary Credentials
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

#### Mapbox Public Token
MAP_TOKEN=pk.eyJ1I...your_mapbox_token

#### Session Secret Key
SECRET=a_very_long_and_random_string_for_sessions
### 5. Initialize the Database (Optional)
To populate the database with sample listings, run the initialization script:

Bash

node init/index.js
### 6. Run the Application
Start the development server using nodemon:

Bash

nodemon app.js
The application will be available at http://localhost:8080.
