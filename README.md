# 🏔️ Nepal Real Estate Buyer Portal

A full-stack web application for real estate buyers to browse properties across Nepal, manage favourites, and have a personalized dashboard.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [How to Run the App](#how-to-run-the-app)
- [API Endpoints](#api-endpoints)
- [Example Flows](#example-flows)
- [Database Design](#database-design)
- [Security Features](#security-features)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🔐 Authentication
- User registration with email and password
- Secure login with JWT authentication
- Password hashing using bcrypt (no raw passwords stored)
- Protected routes requiring authentication

### 🏠 Dashboard
- Personalized welcome message with user's name
- Display user role (buyer)
- Browse all available properties with images and details
- Filter properties by location (Pokhara, Kathmandu, Bhaktapur, etc.)

### ❤️ Favourites Management
- Add properties to favourites with one click
- Remove properties from favourites
- View all favourited properties in separate tab
- Users can only see and modify their own favourites
- Real-time updates without page refresh

### 🏔️ Nepali Properties
- 14+ properties across major Nepali cities:
  - **Pokhara**: Luxury villas with Annapurna views, lake view apartments
  - **Kathmandu**: Modern penthouses in Lazimpat
  - **Bhaktapur**: Traditional Newari houses near Durbar Square
  - **Nagarkot**: Peaceful retreats with mountain views
  - **Chitwan**: Farmhouses near national park
  - **Mustang**: Unique mountain cabins
  - **Ilam**: Eco-resort land in tea gardens
  - **Lumbini**: Luxury resort properties
  - **Everest Region**: Mountain view apartments

### 🎨 UI/UX Features
- Modern gradient design with responsive layout
- Loading states for better user experience
- Success and error message notifications
- Image fallback handling
- Location filter dropdown
- Mobile-friendly responsive design

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Backend** | |
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| JWT | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |
| **Frontend** | |
| React.js | UI library |
| React Router DOM | Navigation |
| Axios | HTTP client |
| CSS-in-JS | Styling |



## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- Modern web browser

### Step 1: Clone the Repository
```bash
git clone https://github.com/Swapnil190/real-estate-portal.git
cd real-estate-portal
Step 2: Backend Setup
bash
cd backend
npm install
npm start
Expected Output:

text
✅ Real Estate Backend running on http://localhost:5000
🏔️ Loaded 14 Nepali properties!
Step 3: Frontend Setup (Open New Terminal)
bash
cd frontend
npm install
npm start
The frontend will open at http://localhost:3000

🎯 How to Run the App
Quick Start (Two Terminals)
Terminal 1 - Backend:

bash
cd backend && npm start
Terminal 2 - Frontend:

bash
cd frontend && npm start
Access the Application
Open browser: http://localhost:3000

Register a new account or login with existing credentials

Browse properties and add to favourites

📡 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/register	Register new user	❌
POST	/api/login	Login user	❌
GET	/api/me	Get user profile	✅
GET	/api/properties	Get all properties	✅
GET	/api/favourites	Get user's favourites	✅
POST	/api/favourites	Add to favourites	✅
DELETE	/api/favourites/:id	Remove from favourites	✅
🔄 Example Flows
Flow 1: New User Registration
text
1. Visit http://localhost:3000
2. Click "Register here"
3. Enter: Name, Email, Password (min 6 chars)
4. Click "Register"
5. ✅ Success: "Registration successful!"
6. Redirected to Login page
Flow 2: Login and Browse Properties
text
1. Enter email and password
2. Click "Login"
3. ✅ Redirected to Dashboard
4. See welcome message and user role
5. Browse 14+ properties across Nepal
6. Use location filter to find properties
Flow 3: Add to Favourites
text
1. Find a property you like
2. Click "Add to Favourites"
3. ✅ Success: "Added to favourites!"
4. Switch to "My Favourites" tab
5. Property appears in favourites list
Flow 4: Remove from Favourites
text
1. Go to "My Favourites" tab
2. Click "Remove from Favourites"
3. ✅ Success: "Removed from favourites!"
4. Property disappears from list
💾 Database Design
Users (In-memory storage)
javascript
{
  id: Number,              // Auto-incrementing ID
  name: String,            // User's full name
  email: String,           // Unique email address
  password: String,        // Hashed with bcrypt
  role: String,            // Default: "buyer"
  favourites: Array        // Array of property IDs
}
🔒 Security Features
Password Security
Hashing: bcrypt with 10 salt rounds

No plain-text storage: Only hashed passwords stored

Secure comparison: bcrypt.compare() prevents timing attacks

Authentication
JWT Tokens: 7-day expiration

Token verification: Middleware on all protected routes

User isolation: Users can only access their own data

Input Validation
Email format validation

Password minimum 6 characters

Required field validation

Duplicate email prevention

⚠️ Error Handling
Scenario	Error Message	Status
Missing fields	"All fields are required"	400
Short password	"Password must be at least 6 characters"	400
Invalid email	"Invalid email format"	400
Duplicate email	"User already exists"	400
Wrong credentials	"Invalid credentials"	401
No token	"No token provided"	401
Property not found	"Property not found"	404
🔧 Troubleshooting
Backend Won't Start
bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
Login Fails
Register a new account first

Check if backend is running

Clear localStorage: localStorage.clear()

Port Already in Use
bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID 12345 /F
📝 Future Improvements
Add PostgreSQL database integration

Implement property search functionality

Add property images upload

Implement pagination for properties

Add user profile editing

Implement password reset via email
