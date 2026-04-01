markdown
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
- [Error Handling](#error-handling)
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
- Smooth animations and transitions

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI library |
| React Router DOM | Navigation |
| Axios | HTTP client |
| CSS-in-JS | Styling |

### Database
- **In-memory storage** (for demonstration)
- Easily upgradable to SQLite/PostgreSQL

## 📁 Project Structure
real-estate-app/
│
├── backend/
│ ├── server.js # Main backend server (API endpoints)
│ └── package.json # Backend dependencies
│
├── frontend/
│ ├── public/
│ │ └── index.html # HTML template
│ ├── src/
│ │ ├── App.js # Main React component with routing
│ │ ├── index.js # React entry point
│ │ ├── api.js # Axios configuration with token interceptor
│ │ └── pages/
│ │ ├── Login.js # Login page component
│ │ ├── Register.js # Registration page component
│ │ └── Dashboard.js # Dashboard with properties & favourites
│ └── package.json # Frontend dependencies
│
└── README.md # This file

text

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge)

### Step 1: Download the Project
```bash
# Navigate to your project directory
cd real-estate-app
Step 2: Backend Setup
bash
# Go to backend folder
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
Expected Output:

text
✅ Real Estate Backend running on http://localhost:5000
📝 API endpoints:
   POST   /api/register     - Register new user
   POST   /api/login        - Login user
   GET    /api/me           - Get current user
   GET    /api/properties   - Get all properties
   GET    /api/favourites   - Get user's favourites
   POST   /api/favourites   - Add to favourites
   DELETE /api/favourites/:id - Remove from favourites

🏔️ Loaded 14 Nepali properties!
Step 3: Frontend Setup (Open New Terminal)
bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
The frontend will automatically open at http://localhost:3000

🎯 How to Run the App
Quick Start (Two Terminals)
Terminal 1 - Backend:

bash
cd backend
npm start
Terminal 2 - Frontend:

bash
cd frontend
npm start
Access the Application
Open browser: http://localhost:3000

You'll be redirected to the login page

New users should click "Register here" to create an account

📡 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/register	Create new user account	❌ No
POST	/api/login	Authenticate user	❌ No
GET	/api/me	Get current user profile	✅ Yes
GET	/api/properties	Get all properties	✅ Yes
GET	/api/favourites	Get user's favourites	✅ Yes
POST	/api/favourites	Add property to favourites	✅ Yes
DELETE	/api/favourites/:id	Remove from favourites	✅ Yes
Request/Response Examples
1. Register a New User
http
POST http://localhost:5000/api/register
Content-Type: application/json

{
  "name": "Bikram Sharma",
  "email": "bikram@example.com",
  "password": "nepal123"
}
Response:

json
{
  "message": "Registration successful",
  "userId": 1
}
2. Login
http
POST http://localhost:5000/api/login
Content-Type: application/json

{
  "email": "bikram@example.com",
  "password": "nepal123"
}
Response:

json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Bikram Sharma",
    "email": "bikram@example.com",
    "role": "buyer"
  }
}
3. Get All Properties
http
GET http://localhost:5000/api/properties
Authorization: your-jwt-token
Response:

json
[
  {
    "id": 1,
    "title": "🏔️ Luxury Villa in Pokhara",
    "description": "Stunning villa with breathtaking views...",
    "price": 8500000,
    "location": "Pokhara, Lakeside",
    "bedrooms": 4,
    "bathrooms": 3,
    "image_url": "https://images.unsplash.com/...",
    "isFavourite": false
  }
  // ... more properties
]
4. Add to Favourites
http
POST http://localhost:5000/api/favourites
Authorization: your-jwt-token
Content-Type: application/json

{
  "propertyId": 1
}
Response:

json
{
  "message": "Added to favourites",
  "favourites": [...]
}
🔄 Example Flows
Flow 1: New User Registration
text
1. User visits http://localhost:3000
2. Clicks "Register here"
3. Enters:
   - Name: "Bikram Sharma"
   - Email: "bikram@example.com"
   - Password: "nepal123"
4. Clicks "Register"
5. ✅ Success: "Registration successful! Redirecting..."
6. Automatically redirected to Login page
Flow 2: Login and Browse Properties
text
1. User enters email: bikram@example.com
2. User enters password: nepal123
3. Clicks "Login"
4. ✅ Redirected to Dashboard
5. Sees: "Welcome, Bikram Sharma!"
6. Sees role: "buyer"
7. Browses 14 properties across Nepal:
   - 🏔️ Luxury Villa in Pokhara (NPR 85,00,000)
   - 🏛️ Traditional Newari House (NPR 1,20,00,000)
   - ⛰️ Mountain View Apartment (NPR 45,00,000)
Flow 3: Add Property to Favourites
text
1. User finds a property they like
2. Clicks "Add to Favourites"
3. ✅ Success message appears: "Added to favourites!"
4. Button changes to "Remove from Favourites"
5. Switches to "My Favourites" tab
6. Property appears in favourites list
Flow 4: Remove from Favourites
text
1. User goes to "My Favourites" tab
2. Finds a property to remove
3. Clicks "Remove from Favourites"
4. ✅ Success: "Removed from favourites!"
5. Property disappears from favourites
6. In "All Properties", button resets to "Add to Favourites"
Flow 5: Filter by Location
text
1. User selects "Pokhara" from location dropdown
2. Only Pokhara properties are displayed:
   - 🏔️ Luxury Villa in Pokhara
   - 🏞️ Lake View Apartment
3. User can clear filter with "Clear Filter" button
4. All properties are displayed again
Flow 6: Logout
text
1. User clicks "Logout" button
2. ✅ Session ends
3. Redirected to Login page
4. Token removed from localStorage
5. User must login again to access dashboard
💾 Database Design
Users (In-memory storage)
javascript
{
  id: Number,              // Auto-incrementing ID
  name: String,            // User's full name
  email: String,           // Unique email address
  password: String,        // Hashed password (bcrypt)
  role: String,            // Default: "buyer"
  favourites: Array        // Array of property IDs
}
Properties (Static data)
javascript
{
  id: Number,              // Property ID (1-14)
  title: String,           // Property title with emoji
  description: String,     // Detailed description
  price: Number,           // Price in NPR
  location: String,        // City and area
  bedrooms: Number,        // Number of bedrooms
  bathrooms: Number,       // Number of bathrooms
  image_url: String        // Unsplash image URL
}
Sample Properties
ID	Title	Location	Price (NPR)
1	Luxury Villa	Pokhara	85,00,000
2	Traditional Newari House	Bhaktapur	1,20,00,000
3	Mountain View Apartment	Everest Region	45,00,000
4	Peaceful Retreat	Nagarkot	32,00,000
5	Modern Penthouse	Kathmandu	2,50,00,000
6	Farmhouse	Chitwan	18,00,000
7	Lake View Apartment	Pokhara	55,00,000
8	Heritage Home	Patan	1,80,00,000
9	Mountain Cabin	Mustang	65,00,000
10	Eco-Resort Land	Ilam	42,00,000
🔒 Security Features
Password Security
Hashing: bcrypt with 10 salt rounds

No plain-text storage: Only hashed passwords stored

Secure comparison: bcrypt.compare() prevents timing attacks

Authentication
JWT Tokens: 7-day expiration

Token verification: Middleware checks all protected routes

No token storage: Tokens stored only in client localStorage

Input Validation
Email: Must be valid format with @ symbol

Password: Minimum 6 characters

Required fields: Name, email, password all required

Duplicate check: Prevents multiple registrations with same email

Authorization
User isolation: Users can only access their own data

ID from token: User ID extracted from JWT, not client input

Favourites protection: Each user has separate favourites array

API Security
CORS enabled: Only allows requests from frontend origin

Error messages: Generic error messages to prevent information leakage

Input sanitization: No SQL injection risk (in-memory DB)

⚠️ Error Handling
Common Error Scenarios
Scenario	Error Message	Status Code
Missing fields	"All fields are required"	400
Short password	"Password must be at least 6 characters"	400
Invalid email	"Invalid email format"	400
Duplicate email	"User already exists"	400
Wrong credentials	"Invalid credentials"	401
No token	"No token provided"	401
Invalid token	"Invalid token"	401
Property not found	"Property not found"	404
Server error	"Server error"	500
Client-Side Error Handling
Network errors: "Cannot connect to server"

Registration failures: Specific validation messages

Login failures: "Invalid credentials"

Automatic token cleanup on 401 responses

User-friendly error messages with red styling

📸 Screenshots
Login Page
Gradient background

Clean form with email/password inputs

Link to registration

Demo credentials info box

Registration Page
Name, email, password fields

Password validation (min 6 chars)

Success message with auto-redirect

Link to login page

Dashboard
Welcome message with user name

Role badge

Logout button

Two tabs: All Properties & My Favourites

Location filter dropdown

Property cards with images, prices, details

Add/Remove favourites buttons

Responsive grid layout

🔧 Troubleshooting
Backend Won't Start
Problem: Error: Cannot find module
Solution:

bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
Frontend Can't Connect to Backend
Problem: Network errors or CORS issues
Solution:

Verify backend is running: http://localhost:5000

Check if CORS is enabled (it is by default)

Verify API base URL in frontend/src/api.js

Check browser console for errors

Login Fails
Problem: "Invalid credentials" with correct password
Solution:

Register a new account first

Check if backend is running

Clear localStorage: localStorage.clear()

Try again

Properties Not Loading
Problem: Empty property list
Solution:

Ensure you're logged in

Check backend console for errors

Verify token is being sent in requests

Open browser DevTools > Network tab to see API responses

Port Already in Use
Problem: Error: listen EADDRINUSE: address already in use :::5000
Solution (Windows):

bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID 12345 /F
Images Not Loading
Problem: Broken images in property cards
Solution:

Images are from Unsplash, require internet connection

Check if images load directly: right-click image > Open in new tab

If offline, images will show placeholder

📝 Development Notes
Adding New Properties
To add more properties, edit the properties array in backend/server.js:

javascript
{
    id: 15,
    title: "Your Property Title",
    description: "Property description",
    price: 5000000,
    location: "City, Area",
    bedrooms: 3,
    bathrooms: 2,
    image_url: "https://your-image-url.com/image.jpg"
}
Customizing Colors
Modify the gradient colors in the styles:

Login/Register pages: background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

Dashboard: Same gradient in container background

Primary color: #667eea

Environment Variables
For production, consider adding environment variables:

bash
# .env file
PORT=5000
JWT_SECRET=your-super-secret-key
NODE_ENV=production
🎓 Learning Outcomes
This project demonstrates:

Full-stack JavaScript development

JWT authentication flow

REST API design principles

React component architecture

State management with hooks

Secure password handling

User-specific data isolation

Error handling best practices

Responsive UI design

📄 License
This project is created for educational purposes and job application demonstration.

👨‍💻 Author
Built as part of a real-estate buyer portal assignment.

🚀 Quick Commands Reference
bash
# Start Backend
cd backend && npm start

# Start Frontend (new terminal)
cd frontend && npm start

# Install dependencies
cd backend && npm install
cd frontend && npm install

# Clear and reinstall
rm -rf node_modules package-lock.json && npm install