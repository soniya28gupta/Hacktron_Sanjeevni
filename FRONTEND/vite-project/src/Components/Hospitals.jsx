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
        },
        {
          id: 10,
          name: "CHL Hospital",
          location: "AB Road, Indore",
          city: "Indore",
          specialties: ["Cardiology", "Gastroenterology", "Neurology"],
          rating: 4.5,
          phone: "+91 731 425 7000",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 22.7244, lng: 75.8839 },
          address: "AB Road, Near LIG Square, Indore, Madhya Pradesh 452008"
        },
        {
          id: 11,
          name: "Choithram Hospital",
          location: "Manik Bagh Road, Indore",
          city: "Indore",
          specialties: ["General Surgery", "Nephrology", "Oncology"],
          rating: 4.7,
          phone: "+91 731 247 0700",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 22.7154, lng: 75.8497 },
          address: "Manik Bagh Road, Indore, Madhya Pradesh 452014"
        },
        {
          id: 12,
          name: "Medanta Hospital Indore",
          location: "Vijay Nagar, Indore",
          city: "Indore",
          specialties: ["Cardiology", "Orthopedics", "Neurology"],
          rating: 4.4,
          phone: "+91 731 473 2000",
          hours: "24 hours",
          image: "hospital_5.jpg",
          coordinates: { lat: 22.7513, lng: 75.8977 },
          address: "Vijay Nagar, Indore, Madhya Pradesh 452010"
        },
        
        // Delhi Hospitals
        {
          id: 13,
          name: "AIIMS Delhi",
          location: "Ansari Nagar, New Delhi",
          city: "Delhi",
          specialties: ["General Medicine", "Cardiology", "Neurology", "Oncology"],
          rating: 4.9,
          phone: "+91 11 2658 8500",
          hours: "24 hours",
          image: "more_hospital.jpg",
          coordinates: { lat: 28.5672, lng: 77.2100 },
          address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi, Delhi 110029"
        },
        {
          id: 14,
          name: "Fortis Hospital Delhi",
          location: "Vasant Kunj, New Delhi",
          city: "Delhi",
          specialties: ["Cardiology", "Neurosciences", "Orthopedics"],
          rating: 4.6,
          phone: "+91 11 4277 6222",
          hours: "24 hours",
          image: "hospital_1.jpg",
          coordinates: { lat: 28.5242, lng: 77.1560 },
          address: "Sector B, Pocket 1, Vasant Kunj, New Delhi, Delhi 110070"
        },
        {
          id: 15,
          name: "Max Super Speciality Hospital",
          location: "Saket, New Delhi",
          city: "Delhi",
          specialties: ["Cardiology", "Oncology", "Orthopedics", "Transplants"],
          rating: 4.7,
          phone: "+91 11 2651 5050",
          hours: "24 hours",
          image: "hospital_2.jpg",
          coordinates: { lat: 28.5280, lng: 77.2129 },
          address: "1, 2, Press Enclave Marg, Saket, New Delhi, Delhi 110017"
        },
        {
          id: 16,
          name: "Sir Ganga Ram Hospital",
          location: "Rajinder Nagar, New Delhi",
          city: "Delhi",
          specialties: ["Gastroenterology", "Nephrology", "Neurology"],
          rating: 4.5,
          phone: "+91 11 4225 1000",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 28.6391, lng: 77.1901 },
          address: "Rajinder Nagar, New Delhi, Delhi 110060"
        },
        {
          id: 17,
          name: "Indraprastha Apollo Hospital",
          location: "Sarita Vihar, New Delhi",
          city: "Delhi",
          specialties: ["Cardiology", "Neurosurgery", "Transplants", "Oncology"],
          rating: 4.8,
          phone: "+91 11 7179 1090",
          hours: "24 hours",
          image: "apollo_hospital.jpg",
          coordinates: { lat: 28.5421, lng: 77.2830 },
          address: "Sarita Vihar, Delhi-Mathura Road, New Delhi, Delhi 110076"
        },
        
        // Mumbai Hospitals
        {
          id: 18,
          name: "Kokilaben Dhirubhai Ambani Hospital",
          location: "Andheri West, Mumbai",
          city: "Mumbai",
          specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics"],
          rating: 4.8,
          phone: "+91 22 4269 6969",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 19.1307, lng: 72.8257 },
          address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai 400053"
        },
        {
          id: 19,
          name: "Lilavati Hospital",
          location: "Bandra West, Mumbai",
          city: "Mumbai",
          specialties: ["Cardiology", "Neurosurgery", "Orthopedics", "Urology"],
          rating: 4.7,
          phone: "+91 22 2675 1000",
          hours: "24 hours",
          image: "hospital_5.jpg",
          coordinates: { lat: 19.0509, lng: 72.8294 },
          address: "A-791, Bandra Reclamation, Bandra West, Mumbai 400050"
        },
        {
          id: 20,
          name: "Tata Memorial Hospital",
          location: "Parel, Mumbai",
          city: "Mumbai",
          specialties: ["Oncology", "Cancer Care", "Radiation Therapy"],
          rating: 4.9,
          phone: "+91 22 2417 7000",
          hours: "8:00 AM - 6:00 PM",
          image: "more_hospital.jpg",
          coordinates: { lat: 19.0048, lng: 72.8435 },
          address: "Dr. E Borges Road, Parel, Mumbai 400012"
        },
        {
          id: 21,
          name: "Breach Candy Hospital",
          location: "Breach Candy, Mumbai",
          city: "Mumbai",
          specialties: ["General Medicine", "Cardiology", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 22 2366 7888",
          hours: "24 hours",
          image: "hospital_1.jpg",
          coordinates: { lat: 18.9667, lng: 72.8008 },
          address: "60 A, Bhulabhai Desai Marg, Breach Candy, Mumbai 400026"
        },
        
        // Bangalore Hospitals
        {
          id: 22,
          name: "Narayana Health City",
          location: "Bommasandra, Bangalore",
          city: "Bangalore",
          specialties: ["Cardiology", "Oncology", "Nephrology", "Transplants"],
          rating: 4.7,
          phone: "+91 80 7122 2222",
          hours: "24 hours",
          image: "hospital_2.jpg",
          coordinates: { lat: 12.8168, lng: 77.6803 },
          address: "258/A, Bommasandra Industrial Area, Anekal Taluk, Bangalore 560099"
        },
        {
          id: 23,
          name: "Manipal Hospital",
          location: "HAL Airport Road, Bangalore",
          city: "Bangalore",
          specialties: ["Neurology", "Cardiology", "Orthopedics", "Oncology"],
          rating: 4.6,
          phone: "+91 80 2502 4444",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 12.9583, lng: 77.6484 },
          address: "98, HAL Airport Road, Bangalore 560017"
        },
        {
          id: 24,
          name: "Apollo Hospital Bangalore",
          location: "Bannerghatta Road, Bangalore",
          city: "Bangalore",
          specialties: ["Cardiology", "Neurosciences", "Orthopedics", "Gastroenterology"],
          rating: 4.8,
          phone: "+91 80 4612 4444",
          hours: "24 hours",
          image: "apollo_hospital.jpg",
          coordinates: { lat: 12.8893, lng: 77.5995 },
          address: "154/11, Bannerghatta Road, Bangalore 560076"
        },
        {
          id: 25,
          name: "Fortis Hospital Bangalore",
          location: "Cunningham Road, Bangalore",
          city: "Bangalore",
          specialties: ["Cardiology", "Orthopedics", "Neurosurgery", "Urology"],
          rating: 4.7,
          phone: "+91 80 6621 4444",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 12.9866, lng: 77.5912 },
          address: "14, Cunningham Road, Bangalore 560052"
        },
        
        // Chennai Hospitals
        {
          id: 26,
          name: "Apollo Hospitals Chennai",
          location: "Greams Road, Chennai",
          city: "Chennai",
          specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics"],
          rating: 4.8,
          phone: "+91 44 2829 3333",
          hours: "24 hours",
          image: "apollo_hospital.jpg",
          coordinates: { lat: 13.0614, lng: 80.2474 },
          address: "21, Greams Lane, Off Greams Road, Chennai 600006"
        },
        {
          id: 27,
          name: "SIMS Hospital",
          location: "Vadapalani, Chennai",
          city: "Chennai",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 44 2489 3113",
          hours: "24 hours",
          image: "hospital_5.jpg",
          coordinates: { lat: 13.0507, lng: 80.2127 },
          address: "No.1, Jawaharlal Nehru Salai, Vadapalani, Chennai 600026"
        },
        {
          id: 28,
          name: "Kauvery Hospital",
          location: "Alwarpet, Chennai",
          city: "Chennai",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Nephrology"],
          rating: 4.5,
          phone: "+91 44 4000 6000",
          hours: "24 hours",
          image: "more_hospital.jpg",
          coordinates: { lat: 13.0356, lng: 80.2568 },
          address: "TTK Road, Alwarpet, Chennai 600018"
        },
        
        // Kolkata Hospitals
        {
          id: 29,
          name: "AMRI Hospital",
          location: "Dhakuria, Kolkata",
          city: "Kolkata",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 33 6626 6666",
          hours: "24 hours",
          image: "hospital_1.jpg",
          coordinates: { lat: 22.5124, lng: 88.3636 },
          address: "JC 16-17, Sector III, Salt Lake City, Kolkata 700098"
        },
        {
          id: 30,
          name: "Fortis Hospital Kolkata",
          location: "Anandapur, Kolkata",
          city: "Kolkata",
          specialties: ["Cardiology", "Orthopedics", "Neurosurgery", "Oncology"],
          rating: 4.7,
          phone: "+91 33 6621 4444",
          hours: "24 hours",
          image: "hospital_2.jpg",
          coordinates: { lat: 22.5142, lng: 88.4002 },
          address: "730, Anandapur, E.M. Bypass Road, Kolkata 700107"
        },
        
        // Hyderabad Hospitals
        {
          id: 31,
          name: "Apollo Hospitals Hyderabad",
          location: "Jubilee Hills, Hyderabad",
          city: "Hyderabad",
          specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics"],
          rating: 4.8,
          phone: "+91 40 2360 7777",
          hours: "24 hours",
          image: "apollo_hospital.jpg",
          coordinates: { lat: 17.4238, lng: 78.4303 },
          address: "Road No 72, Film Nagar, Jubilee Hills, Hyderabad 500033"
        },
        {
          id: 32,
          name: "KIMS Hospital",
          location: "Secunderabad, Hyderabad",
          city: "Hyderabad",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology"],
          rating: 4.7,
          phone: "+91 40 4488 5000",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 17.4434, lng: 78.4784 },
          address: "1-8-31/1, Minister Road, Secunderabad, Hyderabad 500003"
        },
        {
          id: 33,
          name: "Yashoda Hospital",
          location: "Somajiguda, Hyderabad",
          city: "Hyderabad",
          specialties: ["Cardiology", "Neurology", "Oncology", "Nephrology"],
          rating: 4.6,
          phone: "+91 40 2333 5555",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 17.4252, lng: 78.4598 },
          address: "Raj Bhavan Road, Somajiguda, Hyderabad 500082"
        },
        
        // Ahmedabad Hospitals
        {
          id: 34,
          name: "Zydus Hospital",
          location: "Thaltej, Ahmedabad",
          city: "Ahmedabad",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
          rating: 4.7,
          phone: "+91 79 6619 9999",
          hours: "24 hours",
          image: "hospital_5.jpg",
          coordinates: { lat: 23.0526, lng: 72.5310 },
          address: "Zydus Hospital Road, Thaltej, Ahmedabad 380054"
        },
        {
          id: 35,
          name: "Sterling Hospital",
          location: "Gurukul, Ahmedabad",
          city: "Ahmedabad",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 79 4001 1111",
          hours: "24 hours",
          image: "more_hospital.jpg",
          coordinates: { lat: 23.0414, lng: 72.5424 },
          address: "Near Gurukul Road, Memnagar, Ahmedabad 380052"
        },
        
        // Pune Hospitals
        {
          id: 36,
          name: "Ruby Hall Clinic",
          location: "Sassoon Road, Pune",
          city: "Pune",
          specialties: ["Cardiology", "Oncology", "Neurology", "Nephrology"],
          rating: 4.7,
          phone: "+91 20 6645 5555",
          hours: "24 hours",
          image: "hospital_1.jpg",
          coordinates: { lat: 18.5324, lng: 73.8716 },
          address: "40, Sassoon Road, Pune 411001"
        },
        {
          id: 37,
          name: "Jehangir Hospital",
          location: "Sassoon Road, Pune",
          city: "Pune",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 20 6681 1000",
          hours: "24 hours",
          image: "hospital_2.jpg",
          coordinates: { lat: 18.5285, lng: 73.8746 },
          address: "32, Sassoon Road, Pune 411001"
        },
        
        // Jaipur Hospitals
        {
          id: 38,
          name: "Fortis Escorts Hospital",
          location: "JLN Marg, Jaipur",
          city: "Jaipur",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
          rating: 4.7,
          phone: "+91 141 254 7000",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 26.9196, lng: 75.8113 },
          address: "JLN Marg, Malviya Nagar, Jaipur 302017"
        },
        {
          id: 39,
          name: "Narayana Multispeciality Hospital",
          location: "Malviya Nagar, Jaipur",
          city: "Jaipur",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Nephrology"],
          rating: 4.5,
          phone: "+91 141 400 6500",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 26.8572, lng: 75.8091 },
          address: "Malviya Nagar Institutional Area, Malviya Nagar, Jaipur 302017"
        },
        
        // Lucknow Hospitals
        {
          id: 40,
          name: "Sanjay Gandhi Postgraduate Institute",
          location: "Raebareli Road, Lucknow",
          city: "Lucknow",
          specialties: ["Gastroenterology", "Neurology", "Nephrology", "Cardiology"],
          rating: 4.8,
          phone: "+91 522 266 8700",
          hours: "24 hours",
          image: "hospital_5.jpg",
          coordinates: { lat: 26.7424, lng: 80.9423 },
          address: "Raebareli Road, Lucknow 226014"
        },
        {
          id: 41,
          name: "Medanta Hospital Lucknow",
          location: "Sushant Golf City, Lucknow",
          city: "Lucknow",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
          rating: 4.7,
          phone: "+91 522 450 5050",
          hours: "24 hours",
          image: "more2_hospital.jpg",
          coordinates: { lat: 26.7884, lng: 81.0102 },
          address: "Sector A, Pocket 1, Sushant Golf City, Lucknow 226030"
        },
        
        // Chandigarh Hospitals
        {
          id: 42,
          name: "PGIMER Chandigarh",
          location: "Sector 12, Chandigarh",
          city: "Chandigarh",
          specialties: ["Neurology", "Cardiology", "Nephrology", "Orthopedics"],
          rating: 4.9,
          phone: "+91 172 274 6018",
          hours: "24 hours",
          image: "more_hospital.jpg",
          coordinates: { lat: 30.7642, lng: 76.7742 },
          address: "Sector 12, Chandigarh 160012"
        },
        {
          id: 43,
          name: "Fortis Hospital Mohali",
          location: "Mohali, Chandigarh",
          city: "Chandigarh",
          specialties: ["Cardiology", "Orthopedics", "Neurology", "Oncology"],
          rating: 4.7,
          phone: "+91 172 509 2222",
          hours: "24 hours",
          image: "hospital_1.jpg",
          coordinates: { lat: 30.7285, lng: 76.7721 },
          address: "Phase 8, Mohali, Punjab 160059"
        },
        
        // Guwahati Hospitals
        {
          id: 44,
          name: "GNRC Hospitals",
          location: "Dispur, Guwahati",
          city: "Guwahati",
          specialties: ["Neurology", "Cardiology", "Orthopedics", "Gastroenterology"],
          rating: 4.6,
          phone: "+91 361 216 1700",
          hours: "24 hours",
          image: "hospital_2.jpg",
          coordinates: { lat: 26.1386, lng: 91.7887 },
          address: "Dispur, Guwahati, Assam 781006"
        },
        {
          id: 45,
          name: "Nemcare Hospital",
          location: "GS Road, Guwahati",
          city: "Guwahati",
          specialties: ["Cardiology", "Gynecology", "Orthopedics", "Neurology"],
          rating: 4.5,
          phone: "+91 361 234 2222",
          hours: "24 hours",
          image: "hospital_3.jpg",
          coordinates: { lat: 26.1619, lng: 91.7681 },
          address: "GS Road, Bhangagarh, Guwahati, Assam 781005"
        },
        
        // Patna Hospitals
        {
          id: 46,
          name: "AIIMS Patna",
          location: "Phulwari Sharif, Patna",
          city: "Patna",
          specialties: ["General Medicine", "Cardiology", "Neurology", "Oncology"],
          rating: 4.7,
          phone: "+91 612 245 1070",
          hours: "24 hours",
          image: "more_hospital.jpg",
          coordinates: { lat: 25.6074, lng: 85.0556 },
          address: "Phulwari Sharif, Patna, Bihar 801507"
        },
        {
          id: 47,
          name: "Paras HMRI Hospital",
          location: "Raja Bazar, Patna",
          city: "Patna",
          specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology"],
          rating: 4.5,
          phone: "+91 612 355 5555",
          hours: "24 hours",
          image: "hospital_4.jpg",
          coordinates: { lat: 25.6157, lng: 85.1300 },
          address: "Raja Bazar, Bailey Road, Patna 800014"
        },
        // Additional Delhi Hospitals
{
  id: 48,
  name: "Safdarjung Hospital",
  location: "Ansari Nagar, New Delhi",
  city: "Delhi",
  specialties: ["General Medicine", "Orthopedics", "Dermatology", "ENT"],
  rating: 4.3,
  phone: "+91 11 2673 0000",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 28.5679, lng: 77.2022 },
  address: "Ansari Nagar West, New Delhi, Delhi 110029"
},
{
  id: 49,
  name: "Ram Manohar Lohia Hospital",
  location: "Connaught Place, New Delhi",
  city: "Delhi",
  specialties: ["General Medicine", "Neurology", "Nephrology", "Cardiology"],
  rating: 4.2,
  phone: "+91 11 2336 5525",
  hours: "24 hours",
  image: "hospital_5.jpg",
  coordinates: { lat: 28.6292, lng: 77.2050 },
  address: "Baba Kharak Singh Marg, New Delhi, Delhi 110001"
},
{
  id: 50,
  name: "BLK Super Speciality Hospital",
  location: "Rajinder Nagar, New Delhi",
  city: "Delhi",
  specialties: ["Cardiology", "Oncology", "Transplants", "Robotic Surgery"],
  rating: 4.6,
  phone: "+91 11 3040 3040",
  hours: "24 hours",
  image: "hospital_2.jpg",
  coordinates: { lat: 28.6417, lng: 77.1847 },
  address: "Pusa Road, Rajinder Nagar, New Delhi, Delhi 110005"
},

// Additional Mumbai Hospitals
{
  id: 51,
  name: "Jaslok Hospital",
  location: "Pedder Road, Mumbai",
  city: "Mumbai",
  specialties: ["Neurology", "Cardiology", "Oncology", "Urology"],
  rating: 4.7,
  phone: "+91 22 6657 3333",
  hours: "24 hours",
  image: "hospital_3.jpg",
  coordinates: { lat: 18.9697, lng: 72.8072 },
  address: "15, Dr. Deshmukh Marg, Pedder Road, Mumbai 400026"
},
{
  id: 52,
  name: "Hiranandani Hospital",
  location: "Powai, Mumbai",
  city: "Mumbai",
  specialties: ["Cardiology", "Orthopedics", "Neurosurgery", "Gastroenterology"],
  rating: 4.6,
  phone: "+91 22 2576 3300",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 19.1172, lng: 72.9082 },
  address: "Hillside Avenue, Hiranandani Gardens, Powai, Mumbai 400076"
},
{
  id: 53,
  name: "Global Hospital",
  location: "Parel, Mumbai",
  city: "Mumbai",
  specialties: ["Hepatology", "Liver Transplantation", "Cardiology", "Nephrology"],
  rating: 4.5,
  phone: "+91 22 6767 6767",
  hours: "24 hours",
  image: "hospital_4.jpg",
  coordinates: { lat: 19.0018, lng: 72.8419 },
  address: "35, Dr. E. Borges Road, Parel, Mumbai 400012"
},

// Additional Bangalore Hospitals
{
  id: 54,
  name: "Columbia Asia Hospital",
  location: "Whitefield, Bangalore",
  city: "Bangalore",
  specialties: ["General Surgery", "Orthopedics", "Gynecology", "Pediatrics"],
  rating: 4.5,
  phone: "+91 80 6165 6262",
  hours: "24 hours",
  image: "hospital_1.jpg",
  coordinates: { lat: 12.9666, lng: 77.7530 },
  address: "Whitefield Road, Bangalore 560066"
},
{
  id: 55,
  name: "Aster CMI Hospital",
  location: "Hebbal, Bangalore",
  city: "Bangalore",
  specialties: ["Cardiology", "Neurology", "Gastroenterology", "Oncology"],
  rating: 4.6,
  phone: "+91 80 4342 0100",
  hours: "24 hours",
  image: "hospital_2.jpg",
  coordinates: { lat: 13.0467, lng: 77.5809 },
  address: "No. 43/2, New Airport Road, NH 44, Hebbal, Bangalore 560092"
},
{
  id: 56,
  name: "MS Ramaiah Memorial Hospital",
  location: "MSRIT Post, Bangalore",
  city: "Bangalore",
  specialties: ["Neurology", "Cardiology", "Nephrology", "Orthopedics"],
  rating: 4.4,
  phone: "+91 80 2360 8888",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 13.0301, lng: 77.5648 },
  address: "New BEL Road, MSRIT Post, Bangalore 560054"
},

// Additional Chennai Hospitals
{
  id: 57,
  name: "Fortis Malar Hospital",
  location: "Adyar, Chennai",
  city: "Chennai",
  specialties: ["Cardiac Care", "Orthopedics", "Neurosurgery", "Transplants"],
  rating: 4.6,
  phone: "+91 44 4289 2222",
  hours: "24 hours",
  image: "hospital_3.jpg",
  coordinates: { lat: 13.0080, lng: 80.2512 },
  address: "No. 52, 1st Main Road, Gandhi Nagar, Adyar, Chennai 600020"
},
{
  id: 58,
  name: "Sri Ramachandra Medical Centre",
  location: "Porur, Chennai",
  city: "Chennai",
  specialties: ["Multispecialty", "Transplants", "Oncology", "Neurology"],
  rating: 4.7,
  phone: "+91 44 2476 8027",
  hours: "24 hours",
  image: "hospital_4.jpg",
  coordinates: { lat: 13.0374, lng: 80.1427 },
  address: "No. 1, Ramachandra Nagar, Porur, Chennai 600116"
},
{
  id: 59,
  name: "Gleneagles Global Hospital Chennai",
  location: "Perumbakkam, Chennai",
  city: "Chennai",
  specialties: ["Liver Transplantation", "Cardiology", "Neurology", "Oncology"],
  rating: 4.6,
  phone: "+91 44 4477 7000",
  hours: "24 hours",
  image: "hospital_5.jpg",
  coordinates: { lat: 12.9128, lng: 80.2182 },
  address: "439, Cheran Nagar, Perumbakkam, Chennai 600100"
},

// Additional Kolkata Hospitals
{
  id: 60,
  name: "Apollo Gleneagles Hospital",
  location: "Kadapara, Kolkata",
  city: "Kolkata",
  specialties: ["Cardiology", "Neurosciences", "Oncology", "Orthopedics"],
  rating: 4.7,
  phone: "+91 33 2320 3040",
  hours: "24 hours",
  image: "apollo_hospital.jpg",
  coordinates: { lat: 22.5701, lng: 88.4264 },
  address: "58, Canal Circular Road, Kadapara, Kolkata 700054"
},
{
  id: 61,
  name: "Medica Superspecialty Hospital",
  location: "Mukundapur, Kolkata",
  city: "Kolkata",
  specialties: ["Cardiology", "Neurology", "Oncology", "Nephrology"],
  rating: 4.6,
  phone: "+91 33 6652 0000",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 22.5138, lng: 88.3974 },
  address: "127, Mukundapur, E.M. Bypass, Kolkata 700099"
},
{
  id: 62,
  name: "Peerless Hospital",
  location: "Panchasayar, Kolkata",
  city: "Kolkata",
  specialties: ["Cardiac Care", "Neurology", "Gastroenterology", "Oncology"],
  rating: 4.5,
  phone: "+91 33 4007 0000",
  hours: "24 hours",
  image: "hospital_1.jpg",
  coordinates: { lat: 22.4797, lng: 88.3944 },
  address: "360, Panchasayar, Kolkata 700094"
},

// Additional Hyderabad Hospitals
{
  id: 63,
  name: "Care Hospitals",
  location: "Banjara Hills, Hyderabad",
  city: "Hyderabad",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
  rating: 4.6,
  phone: "+91 40 3041 4141",
  hours: "24 hours",
  image: "hospital_2.jpg",
  coordinates: { lat: 17.4132, lng: 78.4456 },
  address: "Road No. 1, Banjara Hills, Hyderabad 500034"
},
{
  id: 64,
  name: "Continental Hospitals",
  location: "HITEC City, Hyderabad",
  city: "Hyderabad",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Transplants"],
  rating: 4.7,
  phone: "+91 40 6700 0000",
  hours: "24 hours",
  image: "hospital_3.jpg",
  coordinates: { lat: 17.4504, lng: 78.3789 },
  address: "Plot No. 3, HITEC City, Hyderabad 500081"
},
{
  id: 65,
  name: "Sunshine Hospitals",
  location: "Secunderabad, Hyderabad",
  city: "Hyderabad",
  specialties: ["Orthopedics", "Joint Replacement", "Spine Surgery", "Sports Medicine"],
  rating: 4.7,
  phone: "+91 40 4363 6363",
  hours: "24 hours",
  image: "hospital_4.jpg",
  coordinates: { lat: 17.4504, lng: 78.4921 },
  address: "Paradise Circle, Secunderabad, Hyderabad 500003"
},

// Additional Bhopal Hospitals
{
  id: 66,
  name: "People's Hospital",
  location: "Bhanpur, Bhopal",
  city: "Bhopal",
  specialties: ["Cardiology", "Neurology", "Oncology", "Nephrology"],
  rating: 4.5,
  phone: "+91 755 427 0000",
  hours: "24 hours",
  image: "hospital_5.jpg",
  coordinates: { lat: 23.2878, lng: 77.4309 },
  address: "Peoples Campus, Bhanpur, Bhopal 462037"
},
{
  id: 67,
  name: "Jawaharlal Nehru Cancer Hospital",
  location: "Idgah Hills, Bhopal",
  city: "Bhopal",
  specialties: ["Oncology", "Cancer Care", "Radiation Therapy", "Palliative Care"],
  rating: 4.4,
  phone: "+91 755 266 2226",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 23.2522, lng: 77.4041 },
  address: "Idgah Hills, Bhopal 462001"
},
{
  id: 68,
  name: "LBS Hospital",
  location: "TT Nagar, Bhopal",
  city: "Bhopal",
  specialties: ["General Medicine", "Orthopedics", "Gynecology", "Pediatrics"],
  rating: 4.3,
  phone: "+91 755 274 0000",
  hours: "24 hours",
  image: "hospital_1.jpg",
  coordinates: { lat: 23.2448, lng: 77.4037 },
  address: "LBS Hospital Rd, TT Nagar, Bhopal 462003"
},

// Additional Indore Hospitals
{
  id: 69,
  name: "Sri Aurobindo Institute of Medical Sciences",
  location: "Indore-Ujjain Highway, Indore",
  city: "Indore",
  specialties: ["Multispecialty", "Cardiac Care", "Neurosciences", "Oncology"],
  rating: 4.6,
  phone: "+91 731 473 1000",
  hours: "24 hours",
  image: "hospital_2.jpg",
  coordinates: { lat: 22.7246, lng: 75.8470 },
  address: "Indore-Ujjain Highway, Indore 453111"
},
{
  id: 70,
  name: "Arihant Hospital",
  location: "Sapna Sangeeta Road, Indore",
  city: "Indore",
  specialties: ["Cardiology", "Orthopedics", "Neurology", "Internal Medicine"],
  rating: 4.4,
  phone: "+91 731 247 2301",
  hours: "24 hours",
  image: "hospital_3.jpg",
  coordinates: { lat: 22.7244, lng: 75.8883 },
  address: "283, Sapna Sangeeta Road, Indore 452001"
},
{
  id: 71,
  name: "Greater Kailash Hospital",
  location: "Old Palasia, Indore",
  city: "Indore",
  specialties: ["General Medicine", "Cardiology", "Neurology", "Orthopedics"],
  rating: 4.3,
  phone: "+91 731 254 9090",
  hours: "24 hours",
  image: "hospital_4.jpg",
  coordinates: { lat: 22.7214, lng: 75.8799 },
  address: "11, G.K. Tower, Old Palasia, Indore 452001"
},

// Additional Pune Hospitals
{
  id: 72,
  name: "Deenanath Mangeshkar Hospital",
  location: "Erandwane, Pune",
  city: "Pune",
  specialties: ["Cardiac Care", "Neurosciences", "Oncology", "Orthopedics"],
  rating: 4.7,
  phone: "+91 20 4015 1000",
  hours: "24 hours",
  image: "hospital_5.jpg",
  coordinates: { lat: 18.5134, lng: 73.8244 },
  address: "Erandwane, Pune 411004"
},
{
  id: 73,
  name: "Sahyadri Super Speciality Hospital",
  location: "Deccan Gymkhana, Pune",
  city: "Pune",
  specialties: ["Cardiology", "Neurosurgery", "Orthopedics", "Transplants"],
  rating: 4.6,
  phone: "+91 20 6721 3333",
  hours: "24 hours",
  image: "more_hospital.jpg",
  coordinates: { lat: 18.5203, lng: 73.8461 },
  address: "Plot No. 30-C, Karve Road, Deccan Gymkhana, Pune 411004"
},
{
  id: 74,
  name: "Aditya Birla Memorial Hospital",
  location: "Chinchwad, Pune",
  city: "Pune",
  specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics"],
  rating: 4.5,
  phone: "+91 20 3071 7777",
  hours: "24 hours",
  image: "hospital_1.jpg",
  coordinates: { lat: 18.6299, lng: 73.7967 },
  address: "Aditya Birla Hospital Marg, Chinchwad, Pune 411033"
},

// Additional Ahmedabad Hospitals
{
  id: 75,
  name: "HCG Cancer Centre",
  location: "Mithakhali, Ahmedabad",
  city: "Ahmedabad",
  specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology", "Medical Oncology"],
  rating: 4.7,
  phone: "+91 79 6618 0000",
  hours: "24 hours",
  image: "hospital_2.jpg",
  coordinates: { lat: 23.0314, lng: 72.5593 },
  address: "Mithakhali Six Roads, Ahmedabad 380006"
},
{
  id: 76,
  name: "SAL Hospital",
  location: "Drive In Road, Ahmedabad",
  city: "Ahmedabad",
  specialties: ["Cardiology", "Neurology", "Orthopedics", "Urology"],
  rating: 4.5,
  phone: "+91 79 7127 1127",
  hours: "24 hours",
  image: "hospital_3.jpg",
  coordinates: { lat: 23.0545, lng: 72.5362 },
  address: "Drive In Road, Ahmedabad 380054"
},
{
  id: 77,
  name: "KD Hospital",
  location: "Bodakdev, Ahmedabad",
  city: "Ahmedabad",
  specialties: ["Multispecialty", "Cardiac Care", "Nephrology", "Gastroenterology"],
  rating: 4.6,
  phone: "+91 79 6677 0000",
  hours: "24 hours",
  image: "hospital23.avif",
  coordinates: { lat: 23.0412, lng: 72.5107 },
  address: "Off S.G. Highway, Bodakdev, Ahmedabad 380054"
},
{
  id: 78,
  name: "Sanjeevini Multi Speciality Hospital",
  location: "Karnal Ganj, Piproda Khurd, Guna",
  city: "Guna",
  specialties: ["Anesthesiology", "Cardiology", "Dentistry", "Dermatology", "ENT", "General Medicine", "General Surgery", "Nephrology", "Neurology", "Oncology", "Ophthalmology", "Pathology", "Pediatrics", "Pulmonology", "Radiology", "Urology", "Gynecology and Obstetrics", "Rheumatology"],
  rating: 4.5,
  phone: "+91 7542 250288",
  hours: "24 hours",
  image: "sanjeevini_hospital.jpg",
  coordinates: { lat: 24.6470, lng: 77.3130 },
  address: "Sanjeevini Multi Speciality Hospital, Karnal Ganj, Piproda Khurd, Guna, Madhya Pradesh 473001"
},
{
  id: 79,
  name: "Meenakshi Hospital",
  location: "Dalvi Nagar Colony, New City Colony, Guna",
  city: "Guna",
  specialties: ["General Medicine", "Oral Surgery"],
  rating: 3.6,
  phone: "+91 7542 253181",
  hours: "24 hours",
  image: "meenakshi_hospital.jpg",
  coordinates: { lat: 24.6485, lng: 77.3120 },
  address: "Dalvi Nagar Colony, New City Colony, Guna, Madhya Pradesh 473001"
},
{
  id: 80,
  name: "City Hospital Guna",
  location: "Porwal Colony Rd, Vindhyachal Colony, Model Town Colony, Guna",
  city: "Guna",
  specialties: ["General Medicine"],
  rating: 4.1,
  phone: "+91 7542 225288",
  hours: "24 hours",
  image: "city_hospital_guna.jpg",
  coordinates: { lat: 24.6510, lng: 77.3180 },
  address: "Porwal Colony Rd, Porwal Colony, Vindhyachal Colony, Model Town Colony, Guna, Madhya Pradesh 473001"
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