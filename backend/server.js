const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "your-secret-key-change-this";
let users = [];
let nextId = 1;

// Sample properties data - Nepali Real Estate
const properties = [
    { 
        id: 1, 
        title: "🏔️ Luxury Villa in Pokhara", 
        description: "Stunning villa with breathtaking views of Phewa Lake and Annapurna mountain range. Perfect for nature lovers with modern amenities, infinity pool, and private garden.",
        price: 8500000, 
        location: "Pokhara, Lakeside", 
        bedrooms: 4, 
        bathrooms: 3, 
        image_url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400" 
    },
    { 
        id: 2, 
        title: "🏛️ Traditional Newari House", 
        description: "Beautiful restored traditional Newari house in Bhaktapur Durbar Square area. Authentic architecture with modern interiors, courtyard, and antique woodwork.",
        price: 12000000, 
        location: "Bhaktapur, Durbar Square", 
        bedrooms: 3, 
        bathrooms: 2, 
        image_url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400" 
    },
    { 
        id: 3, 
        title: "⛰️ Mountain View Apartment", 
        description: "Modern apartment with panoramic views of Mt. Everest and surrounding peaks. Located in prime tourist area with easy access to trekking routes.",
        price: 4500000, 
        location: "Namche Bazaar, Everest Region", 
        bedrooms: 2, 
        bathrooms: 2, 
        image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" 
    },
    { 
        id: 4, 
        title: "🌅 Peaceful Retreat in Nagarkot", 
        description: "Cozy cottage with stunning sunrise views over the Himalayas. Perfect for weekend getaways, meditation, and nature walks.",
        price: 3200000, 
        location: "Nagarkot, Bhaktapur", 
        bedrooms: 3, 
        bathrooms: 2, 
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" 
    },
    { 
        id: 5, 
        title: "🏙️ Modern Penthouse in Kathmandu", 
        description: "Luxury penthouse in the heart of Kathmandu with rooftop garden and city views. Close to restaurants, shopping, and cultural sites.",
        price: 25000000, 
        location: "Lazimpat, Kathmandu", 
        bedrooms: 5, 
        bathrooms: 4, 
        image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400" 
    },
    { 
        id: 6, 
        title: "🌾 Farmhouse in Chitwan", 
        description: "Spacious farmhouse near Chitwan National Park. Perfect for organic farming, wildlife enthusiasts, and nature lovers.",
        price: 1800000, 
        location: "Sauraha, Chitwan", 
        bedrooms: 4, 
        bathrooms: 3, 
        image_url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400" 
    },
    { 
        id: 7, 
        title: "🏞️ Lake View Apartment", 
        description: "Beautiful apartment overlooking Fewa Lake. Walking distance to restaurants, cafes, paragliding, and adventure sports centers.",
        price: 5500000, 
        location: "Pokhara, Lakeside", 
        bedrooms: 3, 
        bathrooms: 2, 
        image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400" 
    },
    { 
        id: 8, 
        title: "🎨 Heritage Home in Patan", 
        description: "Stunning restored heritage property in Patan Durbar Square area. Rich in history, art, and culture with modern amenities.",
        price: 18000000, 
        location: "Patan, Lalitpur", 
        bedrooms: 4, 
        bathrooms: 3, 
        image_url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400" 
    },
    { 
        id: 9, 
        title: "🏔️ Mountain Cabin in Mustang", 
        description: "Unique stone cabin in the mystical land of Mustang. Experience Tibetan culture, ancient monasteries, and dramatic landscapes.",
        price: 6500000, 
        location: "Jomsom, Mustang", 
        bedrooms: 2, 
        bathrooms: 1, 
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" 
    },
    { 
        id: 10, 
        title: "🍃 Eco-Friendly Resort Land", 
        description: "Prime land for eco-resort development in Ilam tea gardens. Breathtaking views of Kanchenjunga mountain and rolling tea estates.",
        price: 4200000, 
        location: "Ilam, Eastern Nepal", 
        bedrooms: 0, 
        bathrooms: 0, 
        image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400" 
    },
    { 
        id: 11, 
        title: "🏞️ Riverside Bungalow", 
        description: "Charming bungalow by Trishuli River. Perfect for white water rafting enthusiasts, fishing, and nature lovers.",
        price: 2800000, 
        location: "Trishuli, Nuwakot", 
        bedrooms: 3, 
        bathrooms: 2, 
        image_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400" 
    },
    { 
        id: 12, 
        title: "🕉️ Luxury Resort in Lumbini", 
        description: "High-end resort property in the birthplace of Buddha. Ideal for spiritual tourism, meditation retreats, and yoga centers.",
        price: 15000000, 
        location: "Lumbini, Rupandehi", 
        bedrooms: 8, 
        bathrooms: 6, 
        image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400" 
    },
    { 
        id: 13, 
        title: "🏔️ Annapurna Base Camp Lodge", 
        description: "Cozy mountain lodge at the base of Annapurna. Perfect for trekkers and mountaineers with stunning mountain views.",
        price: 3800000, 
        location: "Annapurna Base Camp, Kaski", 
        bedrooms: 6, 
        bathrooms: 4, 
        image_url: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=400" 
    },
    { 
        id: 14, 
        title: "🏞️ Bandipur Hill Station Home", 
        description: "Beautiful traditional home in the historic hill station of Bandipur. Panoramic views of the Himalayas and charming Newari architecture.",
        price: 5200000, 
        location: "Bandipur, Tanahun", 
        bedrooms: 4, 
        bathrooms: 3, 
        image_url: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400" 
    }
];

// Auth middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// ==================== AUTH ROUTES ====================

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        
        if (!email.includes('@')) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Check if user exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = { 
            id: nextId++, 
            name, 
            email, 
            password: hashedPassword, 
            role: "buyer",
            favourites: [] 
        };
        users.push(user);
        
        console.log(`✅ New user registered: ${email}`);
        
        res.json({ 
            message: "Registration successful", 
            userId: user.id 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET,
            { expiresIn: "7d" }
        );
        
        console.log(`✅ User logged in: ${email}`);
        
        res.json({ 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get current user
app.get("/api/me", auth, (req, res) => {
    try {
        const user = users.find(u => u.id === req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ==================== PROPERTY ROUTES ====================

// Get all properties with favourite status
app.get("/api/properties", auth, (req, res) => {
    try {
        const user = users.find(u => u.id === req.userId);
        const propertiesWithFav = properties.map(p => ({
            ...p,
            isFavourite: user.favourites.includes(p.id)
        }));
        res.json(propertiesWithFav);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get user's favourites
app.get("/api/favourites", auth, (req, res) => {
    try {
        const user = users.find(u => u.id === req.userId);
        const favProperties = properties.filter(p => user.favourites.includes(p.id));
        res.json(favProperties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add to favourites
app.post("/api/favourites", auth, (req, res) => {
    try {
        const { propertyId } = req.body;
        const user = users.find(u => u.id === req.userId);
        
        // Check if property exists
        const property = properties.find(p => p.id === propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        
        // Add to favourites if not already there
        if (!user.favourites.includes(propertyId)) {
            user.favourites.push(propertyId);
            console.log(`✅ Added property ${property.title} to favourites for user ${user.email}`);
        }
        
        const favProperties = properties.filter(p => user.favourites.includes(p.id));
        res.json({ message: "Added to favourites", favourites: favProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Remove from favourites
app.delete("/api/favourites/:propertyId", auth, (req, res) => {
    try {
        const { propertyId } = req.params;
        const user = users.find(u => u.id === req.userId);
        const property = properties.find(p => p.id === parseInt(propertyId));
        
        // Remove from favourites
        user.favourites = user.favourites.filter(id => id !== parseInt(propertyId));
        console.log(`✅ Removed property ${property?.title} from favourites for user ${user.email}`);
        
        const favProperties = properties.filter(p => user.favourites.includes(p.id));
        res.json({ message: "Removed from favourites", favourites: favProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Debug endpoint to see all users (for testing only)
app.get("/api/debug/users", (req, res) => {
    const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        favourites: u.favourites
    }));
    res.json(safeUsers);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Real Estate Backend running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints:`);
    console.log(`   POST   /api/register     - Register new user`);
    console.log(`   POST   /api/login        - Login user`);
    console.log(`   GET    /api/me           - Get current user`);
    console.log(`   GET    /api/properties   - Get all properties`);
    console.log(`   GET    /api/favourites   - Get user's favourites`);
    console.log(`   POST   /api/favourites   - Add to favourites`);
    console.log(`   DELETE /api/favourites/:id - Remove from favourites`);
    console.log(`\n🏔️ Loaded ${properties.length} Nepali properties!`);
});