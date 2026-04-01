import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const nav = useNavigate();
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("properties");
    const [selectedLocation, setSelectedLocation] = useState("all");

    // All unique locations from properties
    const locations = [
        "all",
        "Pokhara",
        "Kathmandu",
        "Bhaktapur",
        "Nagarkot",
        "Chitwan",
        "Mustang",
        "Ilam",
        "Lumbini",
        "Everest Region",
        "Patan",
        "Annapurna",
        "Bandipur"
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const userRes = await api.get("/me");
            const propsRes = await api.get("/properties");
            const favRes = await api.get("/favourites");
            
            setUser(userRes.data);
            setProperties(propsRes.data);
            setFavourites(favRes.data);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                nav("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleFavourite = async (propertyId, isCurrentlyFav) => {
        try {
            if (isCurrentlyFav) {
                await api.delete(`/favourites/${propertyId}`);
                showMessage("Removed from favourites!", "success");
            } else {
                await api.post("/favourites", { propertyId });
                showMessage("Added to favourites!", "success");
            }
            await loadData();
        } catch (error) {
            showMessage(error.response?.data?.message || "Error updating favourites", "error");
        }
    };

    const showMessage = (msg, type) => {
        setMessage({ text: msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const logout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ne-NP', {
            style: 'currency',
            currency: 'NPR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const getFilteredProperties = () => {
        let props = activeTab === "properties" ? properties : favourites;
        if (selectedLocation !== "all") {
            props = props.filter(p => p.location.includes(selectedLocation));
        }
        return props;
    };

    if (loading) {
        return <div style={styles.loading}>Loading properties from Nepal...</div>;
    }

    const displayProperties = getFilteredProperties();

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <div style={styles.navContent}>
                    <h1 style={styles.logo}>🏔️ Nepal Real Estate Portal</h1>
                    <div style={styles.navRight}>
                        <span style={styles.userName}>👋 {user?.name}</span>
                        <span style={styles.userRole}>🎭 {user?.role}</span>
                        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
                    </div>
                </div>
            </nav>

            {message && (
                <div style={message.type === "success" ? styles.successMessage : styles.errorMessage}>
                    {message.text}
                </div>
            )}

            <div style={styles.mainContent}>
                <div style={styles.tabs}>
                    <button 
                        style={activeTab === "properties" ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab("properties")}
                    >
                        🏘️ All Properties ({properties.length})
                    </button>
                    <button 
                        style={activeTab === "favourites" ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab("favourites")}
                    >
                        ❤️ My Favourites ({favourites.length})
                    </button>
                </div>

                {activeTab === "properties" && (
                    <div style={styles.filterSection}>
                        <label style={styles.filterLabel}>📍 Filter by Location: </label>
                        <select 
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            style={styles.filterSelect}
                        >
                            {locations.map(location => (
                                <option key={location} value={location}>
                                    {location === "all" ? "🏔️ All Nepal" : `📍 ${location}`}
                                </option>
                            ))}
                        </select>
                        {selectedLocation !== "all" && (
                            <button 
                                onClick={() => setSelectedLocation("all")}
                                style={styles.clearFilter}
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>
                )}

                <div style={styles.propertiesGrid}>
                    {displayProperties.length === 0 ? (
                        <div style={styles.emptyState}>
                            {activeTab === "properties" 
                                ? "No properties found in this location 🏔️" 
                                : "No favourites yet. Start adding properties you like! ❤️"}
                        </div>
                    ) : (
                        displayProperties.map(property => (
                            <div key={property.id} style={styles.propertyCard}>
                                <img 
                                    src={property.image_url} 
                                    alt={property.title}
                                    style={styles.propertyImage}
                                    onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Nepal+Property"}
                                />
                                <div style={styles.propertyDetails}>
                                    <h3 style={styles.propertyTitle}>{property.title}</h3>
                                    <div style={styles.propertyPrice}>{formatPrice(property.price)}</div>
                                    <div style={styles.propertyLocation}>📍 {property.location}</div>
                                    <div style={styles.propertyFeatures}>
                                        {property.bedrooms > 0 && <span>🛏️ {property.bedrooms} beds</span>}
                                        {property.bathrooms > 0 && <span>🚿 {property.bathrooms} baths</span>}
                                        {property.bedrooms === 0 && <span>🏞️ Land/Development Property</span>}
                                    </div>
                                    <p style={styles.propertyDesc}>{property.description.substring(0, 120)}...</p>
                                    <button 
                                        style={property.isFavourite ? styles.favBtnActive : styles.favBtn}
                                        onClick={() => toggleFavourite(property.id, property.isFavourite)}
                                    >
                                        {property.isFavourite ? "❤️ Remove from Favourites" : "🤍 Add to Favourites"}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    navbar: {
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    navContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    logo: {
        color: '#667eea',
        fontSize: '24px',
        margin: 0
    },
    navRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
    },
    userName: {
        color: '#667eea',
        fontWeight: '500'
    },
    userRole: {
        background: '#e0e7ff',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        color: '#667eea'
    },
    logoutBtn: {
        background: '#f44336',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s'
    },
    successMessage: {
        background: '#d4edda',
        color: '#155724',
        padding: '12px',
        textAlign: 'center',
        margin: '20px auto',
        maxWidth: '1200px',
        borderRadius: '5px',
        animation: 'slideDown 0.3s ease-out'
    },
    errorMessage: {
        background: '#f8d7da',
        color: '#721c24',
        padding: '12px',
        textAlign: 'center',
        margin: '20px auto',
        maxWidth: '1200px',
        borderRadius: '5px',
        animation: 'slideDown 0.3s ease-out'
    },
    mainContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
    },
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid rgba(255,255,255,0.3)'
    },
    tab: {
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: 'white',
        transition: 'all 0.3s'
    },
    activeTab: {
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: 'white',
        borderBottom: '2px solid white',
        fontWeight: 'bold'
    },
    filterSection: {
        background: 'rgba(255,255,255,0.95)',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
    },
    filterLabel: {
        fontWeight: 'bold',
        color: '#667eea'
    },
    filterSelect: {
        padding: '8px 12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
        cursor: 'pointer'
    },
    clearFilter: {
        padding: '6px 12px',
        background: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    propertiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
    },
    propertyCard: {
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer'
    },
    propertyImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        transition: 'transform 0.3s'
    },
    propertyDetails: {
        padding: '15px'
    },
    propertyTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#333'
    },
    propertyPrice: {
        fontSize: '22px',
        color: '#667eea',
        fontWeight: 'bold',
        margin: '10px 0'
    },
    propertyLocation: {
        color: '#666',
        marginBottom: '10px',
        fontSize: '14px'
    },
    propertyFeatures: {
        display: 'flex',
        gap: '15px',
        color: '#888',
        fontSize: '14px',
        marginBottom: '10px'
    },
    propertyDesc: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '15px',
        lineHeight: '1.5'
    },
    favBtn: {
        width: '100%',
        padding: '10px',
        background: '#f0f0f0',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background 0.3s'
    },
    favBtnActive: {
        width: '100%',
        padding: '10px',
        background: '#fee',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#f44336'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#667eea'
    },
    emptyState: {
        textAlign: 'center',
        padding: '50px',
        color: '#999',
        fontSize: '16px',
        background: 'white',
        borderRadius: '10px',
        gridColumn: '1 / -1'
    }
};