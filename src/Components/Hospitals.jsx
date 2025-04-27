import React, { useState, useEffect } from 'react';
import '../css/Hospitals.css';
import { FaSearch, FaMapMarkerAlt, FaClock, FaPhone, FaHospital } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet's default icon path issues
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Sample data for demonstration purposes (replace with your API call)
  useEffect(() => {
    // Simulating API fetch with timeout
    setTimeout(() => {
      const sampleHospitals = [
        {
          id: 1,
          name: "AIIMS Bhopal",
          location: "Saket Nagar, Bhopal",
          city: "Bhopal",
          specialties: ["General Medicine", "Cardiology", "Neurology"],
          rating: 4.7,
          phone: "+91 755 297 2000",
          hours: "24 hours",
          image:"more_hospital.jpg"
          ,
          coordinates: { lat: 23.2067, lng: 77.4610 },
          address: "AIIMS Campus, Saket Nagar, Bhopal, Madhya Pradesh 462020"
        },
        {
          id: 2,
          name: "Sharda Hospital",
          location: "MP Nagar, Bhopal",
          city: "Bhopal",
          specialties: ["Orthopedics", "General Surgery", "Pediatrics"],
          rating: 4.3,
          phone: "+91 755 123 4567",
          hours: "8:00 AM - 10:00 PM",
          image: "sharda_hospital.jpg", // Image required
          coordinates: { lat: 23.2330, lng: 77.4343 },
          address: "Plot No. 12, Zone-I, MP Nagar, Bhopal, Madhya Pradesh 462011"
        },
        {
          id: 3,
          name: "Bansal Hospital",
          location: "Shahpura, Bhopal",
          city: "Bhopal",
          specialties: ["Cardiac Care", "Urology", "Gastroenterology"],
          rating: 4.5,
          phone: "+91 755 402 2222",
          hours: "24 hours",
          image: "bansal_hospital.jpg", // Image required
          coordinates: { lat: 23.2126, lng: 77.4351 },
          address: "C-Sector, Shahpura, Bhopal, Madhya Pradesh 462016"
        },
        {
          id: 4,
          name: "Hamidia Hospital",
          location: "Royal Market, Bhopal",
          city: "Bhopal",
          specialties: ["Emergency Care", "General Medicine", "Surgery"],
          rating: 4.1,
          phone: "+91 755 273 8967",
          hours: "24 hours",
          image: "apollo_hospital.jpg", // Image required
          coordinates: { lat: 23.2599, lng: 77.3952 },
          address: "Royal Market Rd, Bhopal, Madhya Pradesh 462001"
        },
        {
          id: 5,
          name: "Chirayu Medical College & Hospital",
          location: "Bairagarh, Bhopal",
          city: "Bhopal",
          specialties: ["Multispecialty", "Trauma Care", "Gynecology"],
          rating: 4.4,
          phone: "+91 755 297 2000",
          hours: "24 hours",
          image: "chirayu_hospital.jpg", // Image required
          coordinates: { lat: 23.2819, lng: 77.3361 },
          address: "Bairagarh, Bhopal, Madhya Pradesh 462030"
        },
        {
          id: 6,
          name: "Apollo Hospitals",
          location: "Vijay Nagar, Indore",
          city: "Indore",
          specialties: ["Cardiology", "Oncology", "Neurosciences"],
          rating: 4.8,
          phone: "+91 731 471 7000",
          hours: "24 hours",
          image: "hamidia_hospital.jpg", // Image required
          coordinates: { lat: 22.7533, lng: 75.8937 },
          address: "Vijay Nagar, Indore, Madhya Pradesh 452010"
        },
        {
          id: 7,
          name: "Bombay Hospital",
          location: "Scheme No. 94, Indore",
          city: "Indore",
          specialties: ["Cardiology", "Nephrology", "Neurosurgery"],
          rating: 4.6,
          phone: "+91 731 255 8866",
          hours: "24 hours",
          image: "more_hospital.jpg", // Image required
          coordinates: { lat: 22.7196, lng: 75.8577 },
          address: "Ring Road, Indore, Madhya Pradesh 452010"
        },
        {
          id: 8,
          name: "Medanta Hospital",
          location: "Sector 38, Gurugram",
          city: "Gurugram",
          specialties: ["Cardiology", "Oncology", "Transplants"],
          rating: 4.9,
          phone: "+91 124 414 1414",
          hours: "24 hours",
          image: "more2_hospital.jpg", // Image required
          coordinates: { lat: 28.4595, lng: 77.0266 },
          address: "Sector 38, Gurugram, Haryana 122001"
        }
      ];
      
      setHospitals(sampleHospitals);
      setFilteredHospitals(sampleHospitals);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [searchTerm, selectedCity, hospitals]);

  const filterHospitals = () => {
    let filtered = hospitals;
    
    // Filter by city
    if (selectedCity !== 'All') {
      filtered = filtered.filter(hospital => hospital.city === selectedCity);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(hospital => 
        hospital.name.toLowerCase().includes(lowercasedSearch) || 
        hospital.location.toLowerCase().includes(lowercasedSearch) ||
        hospital.specialties.some(specialty => specialty.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    setFilteredHospitals(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setViewMode('details');
  };

  const handleBackClick = () => {
    setViewMode('list');
    setSelectedHospital(null);
  };

  const getUniqueCity = () => {
    const cities = hospitals.map(hospital => hospital.city);
    return ['All', ...new Set(cities)];
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-star-${i}`} className="star empty">☆</span>);
    }
    
    return <div className="star-rating">{stars}</div>;
  };

  const renderHospitalList = () => {
    if (loading) {
      return <div className="loading-spinner">Loading hospitals...</div>;
    }

    if (filteredHospitals.length === 0) {
      return <div className="no-results">No hospitals found matching your criteria</div>;
    }

    return (
      <div className="hospitals-grid">
        {filteredHospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card" onClick={() => handleHospitalClick(hospital)}>
            <div className="hospital-image-container">
              <div className="hospital-image" style={{ backgroundImage: `url(${hospital.image || '/images/default_hospital.jpg'})` }}>
                <div className="hospital-rating">{hospital.rating} <span className="rating-star">★</span></div>
              </div>
            </div>
            <div className="hospital-info">
              <h3 className="hospital-name">{hospital.name}</h3>
              <p className="hospital-location"><FaMapMarkerAlt className="icon" /> {hospital.location}</p>
              <p className="hospital-hours"><FaClock className="icon" /> {hospital.hours}</p>
              <div className="hospital-specialties">
                {hospital.specialties.slice(0, 3).map((specialty, index) => (
                  <span key={index} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderHospitalDetails = () => {
    if (!selectedHospital) return null;

    return (
      <div className="hospital-details-container">
        <button className="back-button" onClick={handleBackClick}>
          &larr; Back to List
        </button>
        
        <div className="hospital-details-card">
          <div className="hospital-details-header">
            <div className="hospital-details-image" style={{ backgroundImage: `url(${selectedHospital.image || '/images/default_hospital.jpg'})` }}>
              <div className="hospital-rating-large">{selectedHospital.rating} <span className="rating-star">★</span></div>
            </div>
            <div className="hospital-details-title">
              <h2>{selectedHospital.name}</h2>
              <div className="hospital-details-subtitle">
                <span className="details-city">{selectedHospital.city}</span>
                {renderStarRating(selectedHospital.rating)}
              </div>
            </div>
          </div>
          
          <div className="hospital-details-body">
            <div className="details-section">
              <h3><FaMapMarkerAlt className="details-icon" /> Location</h3>
              <p>{selectedHospital.address}</p>
              
              <div className="hospital-map">
                {/* Real map implementation using React Leaflet */}
                <MapContainer 
                  center={[selectedHospital.coordinates.lat, selectedHospital.coordinates.lng]} 
                  zoom={15} 
                  style={{ height: '300px', width: '100%', borderRadius: '8px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[selectedHospital.coordinates.lat, selectedHospital.coordinates.lng]}>
                    <Popup>
                      <strong>{selectedHospital.name}</strong><br />
                      {selectedHospital.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            
            <div className="details-section">
              <h3><FaHospital className="details-icon" /> Specialties</h3>
              <div className="specialties-container">
                {selectedHospital.specialties.map((specialty, index) => (
                  <span key={index} className="specialty-tag-large">{specialty}</span>
                ))}
              </div>
            </div>
            
            <div className="details-section">
              <h3><FaClock className="details-icon" /> Working Hours</h3>
              <p>{selectedHospital.hours}</p>
            </div>
            
            <div className="details-section">
              <h3><FaPhone className="details-icon" /> Contact</h3>
              <p>{selectedHospital.phone}</p>
            </div>
            
            <div className="hospital-action-buttons">
              <button className="action-button phone-button">
                <FaPhone className="button-icon" /> Call Now
              </button>
              <button className="action-button appointment-button">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hospitals-page-wrapper">
      <div className="hospitals-container">
        {viewMode === 'list' ? (
          <>
            <div className="hospitals-header">
              <h1 className="hospitals-title">Find Hospitals Near You</h1>
              <p className="hospitals-subtitle">Search for hospitals, clinics, and healthcare centers in your city</p>
            </div>
            
            <div className="search-container">
              <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by hospital name, location, or specialty..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
              
              <div className="filter-options">
                <select className="city-select" value={selectedCity} onChange={handleCityChange}>
                  {getUniqueCity().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="hospitals-content">
              <div className="filter-tags">
                {selectedCity !== 'All' && (
                  <div className="filter-tag">
                    City: {selectedCity}
                    <span className="remove-tag" onClick={() => setSelectedCity('All')}>×</span>
                  </div>
                )}
                {searchTerm && (
                  <div className="filter-tag">
                    Search: {searchTerm}
                    <span className="remove-tag" onClick={() => setSearchTerm('')}>×</span>
                  </div>
                )}
              </div>
              
              <div className="results-counter">
                Found {filteredHospitals.length} {filteredHospitals.length === 1 ? 'hospital' : 'hospitals'}
              </div>
              
              {renderHospitalList()}
            </div>
          </>
        ) : (
          renderHospitalDetails()
        )}
      </div>
    </div>
  );
};

export default Hospitals;