import React, { useState } from 'react';
import '../css/bloodavailability.css';

const BloodAvailability = () => {
  // Sample data for hospitals across different cities in India with blood stocks
  const sampleHospitals = [
    {
      id: 1,
      name: "Apollo Hospitals",
      city: "Mumbai",
      address: "154-11, Opposite Glaxo, Worli, Mumbai, Maharashtra 400018",
      contactNumber: "+91-22-67540655",
      bloodStock: {
        "A+": 25,
        "A-": 8,
        "B+": 30,
        "B-": 10,
        "AB+": 15,
        "AB-": 5,
        "O+": 45,
        "O-": 12
      }
    },
    {
      id: 2,
      name: "Fortis Hospital",
      city: "Delhi",
      address: "Shalimar Bagh, New Delhi, Delhi 110088",
      contactNumber: "+91-11-71173535",
      bloodStock: {
        "A+": 18,
        "A-": 6,
        "B+": 22,
        "B-": 7,
        "AB+": 10,
        "AB-": 3,
        "O+": 32,
        "O-": 9
      }
    },
    {
      id: 3,
      name: "AIIMS",
      city: "Delhi",
      address: "Sri Aurobindo Marg, Ansari Nagar, Delhi 110029",
      contactNumber: "+91-11-26593677",
      bloodStock: {
        "A+": 35,
        "A-": 12,
        "B+": 40,
        "B-": 15,
        "AB+": 20,
        "AB-": 8,
        "O+": 50,
        "O-": 18
      }
    },
    {
      id: 4,
      name: "Narayana Health",
      city: "Bangalore",
      address: "258/A, Bommasandra Industrial Area, Bangalore 560099",
      contactNumber: "+91-80-71222222",
      bloodStock: {
        "A+": 22,
        "A-": 7,
        "B+": 28,
        "B-": 9,
        "AB+": 12,
        "AB-": 4,
        "O+": 38,
        "O-": 11
      }
    },
    {
      id: 5,
      name: "Manipal Hospitals",
      city: "Bangalore",
      address: "98, HAL Airport Road, Bangalore 560017",
      contactNumber: "+91-80-25023456",
      bloodStock: {
        "A+": 20,
        "A-": 5,
        "B+": 25,
        "B-": 8,
        "AB+": 15,
        "AB-": 3,
        "O+": 30,
        "O-": 10
      }
    },
    {
      id: 6,
      name: "Global Hospitals",
      city: "Chennai",
      address: "439, Cheran Nagar, Perumbakkam, Chennai 600100",
      contactNumber: "+91-44-45777000",
      bloodStock: {
        "A+": 15,
        "A-": 4,
        "B+": 20,
        "B-": 6,
        "AB+": 10,
        "AB-": 2,
        "O+": 25,
        "O-": 8
      }
    },
    {
      id: 7,
      name: "Sterling Hospital",
      city: "Ahmedabad",
      address: "Sterling Hospital Road, Gurukul, Ahmedabad 380052",
      contactNumber: "+91-79-40011111",
      bloodStock: {
        "A+": 16,
        "A-": 5,
        "B+": 24,
        "B-": 7,
        "AB+": 12,
        "AB-": 3,
        "O+": 28,
        "O-": 9
      }
    },
    {
      id: 8,
      name: "Medanta",
      city: "Gurgaon",
      address: "CH Baktawar Singh Road, Sector 38, Gurgaon 122001",
      contactNumber: "+91-124-4141414",
      bloodStock: {
        "A+": 28,
        "A-": 9,
        "B+": 35,
        "B-": 12,
        "AB+": 18,
        "AB-": 6,
        "O+": 42,
        "O-": 14
      }
    },
    {
      id: 9,
      name: "Wockhardt Hospital",
      city: "Mumbai",
      address: "1877, Dr Anand Rao Nair Road, Mumbai Central, Mumbai 400011",
      contactNumber: "+91-22-61784444",
      bloodStock: {
        "A+": 21,
        "A-": 6,
        "B+": 26,
        "B-": 8,
        "AB+": 13,
        "AB-": 4,
        "O+": 32,
        "O-": 10
      }
    },
    {
      id: 10,
      name: "Kokilaben Hospital",
      city: "Mumbai",
      address: "Rao Saheb Achutrao Patwardhan Marg, Mumbai 400053",
      contactNumber: "+91-22-42699999",
      bloodStock: {
        "A+": 30,
        "A-": 10,
        "B+": 36,
        "B-": 12,
        "AB+": 18,
        "AB-": 6,
        "O+": 45,
        "O-": 15
      }
    },
    {
      id: 11,
      name: "Ruby Hall Clinic",
      city: "Pune",
      address: "40, Sassoon Road, Pune 411001",
      contactNumber: "+91-20-26163391",
      bloodStock: {
        "A+": 19,
        "A-": 6,
        "B+": 24,
        "B-": 8,
        "AB+": 14,
        "AB-": 4,
        "O+": 29,
        "O-": 9
      }
    },
    {
      id: 12,
      name: "KIMS Hospital",
      city: "Hyderabad",
      address: "1-8-31/1, Minister Road, Secunderabad, Hyderabad 500003",
      contactNumber: "+91-40-44885000",
      bloodStock: {
        "A+": 23,
        "A-": 7,
        "B+": 29,
        "B-": 10,
        "AB+": 16,
        "AB-": 5,
        "O+": 35,
        "O-": 11
      }
    },
    // New hospitals in existing cities
    {
      id: 13,
      name: "Lilavati Hospital",
      city: "Mumbai",
      address: "A-791, Bandra Reclamation, Bandra West, Mumbai 400050",
      contactNumber: "+91-22-26751000",
      bloodStock: {
        "A+": 28,
        "A-": 9,
        "B+": 33,
        "B-": 11,
        "AB+": 17,
        "AB-": 6,
        "O+": 41,
        "O-": 13
      }
    },
    {
      id: 14,
      name: "Hinduja Hospital",
      city: "Mumbai",
      address: "Veer Savarkar Marg, Mahim, Mumbai 400016",
      contactNumber: "+91-22-24449199",
      bloodStock: {
        "A+": 23,
        "A-": 7,
        "B+": 27,
        "B-": 9,
        "AB+": 14,
        "AB-": 4,
        "O+": 36,
        "O-": 11
      }
    },
    {
      id: 15,
      name: "Max Super Speciality Hospital",
      city: "Delhi",
      address: "1, Press Enclave Road, Saket, New Delhi 110017",
      contactNumber: "+91-11-26515050",
      bloodStock: {
        "A+": 26,
        "A-": 8,
        "B+": 31,
        "B-": 10,
        "AB+": 16,
        "AB-": 5,
        "O+": 39,
        "O-": 12
      }
    },
    {
      id: 16,
      name: "Artemis Hospital",
      city: "Gurgaon",
      address: "Sector 51, Gurgaon, Haryana 122001",
      contactNumber: "+91-124-6767999",
      bloodStock: {
        "A+": 21,
        "A-": 7,
        "B+": 26,
        "B-": 8,
        "AB+": 13,
        "AB-": 4,
        "O+": 33,
        "O-": 10
      }
    },
    {
      id: 17,
      name: "Columbia Asia Hospital",
      city: "Bangalore",
      address: "Kirloskar Business Park, Hebbal, Bangalore 560024",
      contactNumber: "+91-80-39898969",
      bloodStock: {
        "A+": 19,
        "A-": 6,
        "B+": 23,
        "B-": 8,
        "AB+": 12,
        "AB-": 4,
        "O+": 30,
        "O-": 9
      }
    },
    {
      id: 18,
      name: "Baptist Hospital",
      city: "Bangalore",
      address: "Bellary Road, Hebbal, Bangalore 560024",
      contactNumber: "+91-80-22024700",
      bloodStock: {
        "A+": 17,
        "A-": 5,
        "B+": 21,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 27,
        "O-": 8
      }
    },
    {
      id: 19,
      name: "Apollo Hospitals",
      city: "Chennai",
      address: "21, Greams Lane, Off Greams Road, Chennai 600006",
      contactNumber: "+91-44-28290200",
      bloodStock: {
        "A+": 31,
        "A-": 10,
        "B+": 37,
        "B-": 12,
        "AB+": 19,
        "AB-": 6,
        "O+": 49,
        "O-": 15
      }
    },
    {
      id: 20,
      name: "Fortis Malar Hospital",
      city: "Chennai",
      address: "No. 52, 1st Main Road, Gandhi Nagar, Adyar, Chennai 600020",
      contactNumber: "+91-44-42892222",
      bloodStock: {
        "A+": 20,
        "A-": 6,
        "B+": 25,
        "B-": 8,
        "AB+": 13,
        "AB-": 4,
        "O+": 32,
        "O-": 10
      }
    },
    {
      id: 21,
      name: "Sahyadri Hospital",
      city: "Pune",
      address: "Plot No. 30-C, Karve Road, Pune 411004",
      contactNumber: "+91-20-67213000",
      bloodStock: {
        "A+": 18,
        "A-": 6,
        "B+": 22,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 28,
        "O-": 9
      }
    },
    {
      id: 22,
      name: "Care Hospitals",
      city: "Hyderabad",
      address: "Exhibition Road, Nampally, Hyderabad 500001",
      contactNumber: "+91-40-61656565",
      bloodStock: {
        "A+": 22,
        "A-": 7,
        "B+": 26,
        "B-": 9,
        "AB+": 14,
        "AB-": 4,
        "O+": 34,
        "O-": 11
      }
    },
    {
      id: 23,
      name: "Yashoda Hospitals",
      city: "Hyderabad",
      address: "Raj Bhavan Road, Somajiguda, Hyderabad 500082",
      contactNumber: "+91-40-45678000",
      bloodStock: {
        "A+": 25,
        "A-": 8,
        "B+": 30,
        "B-": 10,
        "AB+": 15,
        "AB-": 5,
        "O+": 40,
        "O-": 12
      }
    },
    {
      id: 24,
      name: "Zydus Hospitals",
      city: "Ahmedabad",
      address: "Zydus Hospital Road, Thaltej, Ahmedabad 380054",
      contactNumber: "+91-79-66191919",
      bloodStock: {
        "A+": 19,
        "A-": 6,
        "B+": 24,
        "B-": 8,
        "AB+": 12,
        "AB-": 4,
        "O+": 30,
        "O-": 9
      }
    },
    // New hospitals in additional cities
    {
      id: 25,
      name: "District Hospital",
      city: "Guna",
      address: "Hospital Road, Near Bus Stand, Guna, Madhya Pradesh 473001",
      contactNumber: "+91-7542-252201",
      bloodStock: {
        "A+": 12,
        "A-": 4,
        "B+": 15,
        "B-": 5,
        "AB+": 8,
        "AB-": 2,
        "O+": 20,
        "O-": 6
      }
    },
    {
      id: 26,
      name: "Agarwal Hospital",
      city: "Guna",
      address: "Station Road, Guna, Madhya Pradesh 473001",
      contactNumber: "+91-7542-252345",
      bloodStock: {
        "A+": 9,
        "A-": 3,
        "B+": 11,
        "B-": 4,
        "AB+": 6,
        "AB-": 2,
        "O+": 16,
        "O-": 5
      }
    },
    {
      id: 27,
      name: "Shri Ram Hospital",
      city: "Guna",
      address: "Civil Lines, Guna, Madhya Pradesh 473001",
      contactNumber: "+91-7542-253789",
      bloodStock: {
        "A+": 10,
        "A-": 3,
        "B+": 13,
        "B-": 4,
        "AB+": 7,
        "AB-": 2,
        "O+": 18,
        "O-": 5
      }
    },
    {
      id: 28,
      name: "PGI Chandigarh",
      city: "Chandigarh",
      address: "Sector 12, Chandigarh 160012",
      contactNumber: "+91-172-2746018",
      bloodStock: {
        "A+": 29,
        "A-": 9,
        "B+": 34,
        "B-": 11,
        "AB+": 18,
        "AB-": 6,
        "O+": 46,
        "O-": 14
      }
    },
    {
      id: 29,
      name: "Government Medical College & Hospital",
      city: "Chandigarh",
      address: "Sector 32, Chandigarh 160030",
      contactNumber: "+91-172-2665253",
      bloodStock: {
        "A+": 21,
        "A-": 7,
        "B+": 26,
        "B-": 8,
        "AB+": 13,
        "AB-": 4,
        "O+": 33,
        "O-": 10
      }
    },
    {
      id: 30,
      name: "Tata Medical Center",
      city: "Kolkata",
      address: "14, MAR(E-W), New Town, Kolkata 700160",
      contactNumber: "+91-33-66057000",
      bloodStock: {
        "A+": 27,
        "A-": 9,
        "B+": 32,
        "B-": 11,
        "AB+": 17,
        "AB-": 5,
        "O+": 42,
        "O-": 13
      }
    },
    {
      id: 31,
      name: "AMRI Hospitals",
      city: "Kolkata",
      address: "JC 16-17, Sector III, Salt Lake City, Kolkata 700098",
      contactNumber: "+91-33-66800000",
      bloodStock: {
        "A+": 18,
        "A-": 6,
        "B+": 23,
        "B-": 7,
        "AB+": 12,
        "AB-": 4,
        "O+": 29,
        "O-": 9
      }
    },
    {
      id: 32,
      name: "SMS Medical College & Hospital",
      city: "Jaipur",
      address: "JLN Marg, Jaipur, Rajasthan 302004",
      contactNumber: "+91-141-2518100",
      bloodStock: {
        "A+": 26,
        "A-": 8,
        "B+": 31,
        "B-": 10,
        "AB+": 16,
        "AB-": 5,
        "O+": 40,
        "O-": 12
      }
    },
    {
      id: 33,
      name: "Fortis Escorts Hospital",
      city: "Jaipur",
      address: "JLN Marg, Malviya Nagar, Jaipur 302017",
      contactNumber: "+91-141-4097000",
      bloodStock: {
        "A+": 19,
        "A-": 6,
        "B+": 24,
        "B-": 8,
        "AB+": 12,
        "AB-": 4,
        "O+": 31,
        "O-": 10
      }
    },
    {
      id: 34,
      name: "King George's Medical University",
      city: "Lucknow",
      address: "Shah Mina Road, Chowk, Lucknow 226003",
      contactNumber: "+91-522-2257540",
      bloodStock: {
        "A+": 30,
        "A-": 10,
        "B+": 36,
        "B-": 12,
        "AB+": 19,
        "AB-": 6,
        "O+": 47,
        "O-": 15
      }
    },
    {
      id: 35,
      name: "Medanta Hospital",
      city: "Lucknow",
      address: "Amar Shaheed Path, Golf City, Pocket-1, Sector A, Lucknow 226030",
      contactNumber: "+91-522-4505050",
      bloodStock: {
        "A+": 22,
        "A-": 7,
        "B+": 27,
        "B-": 9,
        "AB+": 14,
        "AB-": 4,
        "O+": 35,
        "O-": 11
      }
    },
    {
      id: 36,
      name: "SGPGI",
      city: "Lucknow",
      address: "Raebareli Road, Lucknow 226014",
      contactNumber: "+91-522-2494111",
      bloodStock: {
        "A+": 31,
        "A-": 10,
        "B+": 38,
        "B-": 12,
        "AB+": 20,
        "AB-": 7,
        "O+": 49,
        "O-": 16
      }
    },
    {
      id: 37,
      name: "Regency Hospital",
      city: "Kanpur",
      address: "A-2, Sarvodaya Nagar, Kanpur 208005",
      contactNumber: "+91-512-3056333",
      bloodStock: {
        "A+": 17,
        "A-": 5,
        "B+": 21,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 27,
        "O-": 8
      }
    },
    {
      id: 38,
      name: "GSVM Medical College",
      city: "Kanpur",
      address: "Swaroop Nagar, Kanpur 208002",
      contactNumber: "+91-512-2535483",
      bloodStock: {
        "A+": 24,
        "A-": 8,
        "B+": 29,
        "B-": 10,
        "AB+": 15,
        "AB-": 5,
        "O+": 38,
        "O-": 12
      }
    },
    {
      id: 39,
      name: "Apollo Hospital",
      city: "Bhopal",
      address: "E-1/1, Arera Colony, Bhopal 462016",
      contactNumber: "+91-755-4258888",
      bloodStock: {
        "A+": 20,
        "A-": 6,
        "B+": 24,
        "B-": 8,
        "AB+": 12,
        "AB-": 4,
        "O+": 31,
        "O-": 10
      }
    },
    {
      id: 40,
      name: "Chirayu Medical College & Hospital",
      city: "Bhopal",
      address: "Bairagarh, Bhopal 462030",
      contactNumber: "+91-755-4231000",
      bloodStock: {
        "A+": 18,
        "A-": 6,
        "B+": 22,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 28,
        "O-": 9
      }
    },
    {
      id: 41,
      name: "Jawaharlal Nehru Hospital & Research Centre",
      city: "Bhilai",
      address: "Sector 9, Bhilai, Chhattisgarh 490009",
      contactNumber: "+91-788-2227401",
      bloodStock: {
        "A+": 16,
        "A-": 5,
        "B+": 20,
        "B-": 6,
        "AB+": 10,
        "AB-": 3,
        "O+": 25,
        "O-": 8
      }
    },
    {
      id: 42,
      name: "Indraprastha Apollo Hospital",
      city: "Delhi",
      address: "Delhi Mathura Road, Sarita Vihar, Delhi 110076",
      contactNumber: "+91-11-71791090",
      bloodStock: {
        "A+": 33,
        "A-": 11,
        "B+": 40,
        "B-": 13,
        "AB+": 21,
        "AB-": 7,
        "O+": 52,
        "O-": 17
      }
    },
    {
      id: 43,
      name: "Seven Hills Hospital",
      city: "Mumbai",
      address: "Marol Maroshi Road, Andheri East, Mumbai 400059",
      contactNumber: "+91-22-67676767",
      bloodStock: {
        "A+": 19,
        "A-": 6,
        "B+": 23,
        "B-": 8,
        "AB+": 12,
        "AB-": 4,
        "O+": 30,
        "O-": 9
      }
    },
    {
      id: 44,
      name: "SRCC Children's Hospital",
      city: "Mumbai",
      address: "1-1A, Haji Ali Park, Mumbai 400034",
      contactNumber: "+91-22-61540004",
      bloodStock: {
        "A+": 14,
        "A-": 4,
        "B+": 17,
        "B-": 6,
        "AB+": 9,
        "AB-": 3,
        "O+": 22,
        "O-": 7
      }
    },
    {
      id: 45,
      name: "MS Ramaiah Memorial Hospital",
      city: "Bangalore",
      address: "MSRIT Post, Bangalore 560054",
      contactNumber: "+91-80-23608888",
      bloodStock: {
        "A+": 21,
        "A-": 7,
        "B+": 26,
        "B-": 8,
        "AB+": 13,
        "AB-": 4,
        "O+": 33,
        "O-": 10
      }
    },
    {
      id: 46,
      name: "Sakra World Hospital",
      city: "Bangalore",
      address: "Outer Ring Road, Marathahalli, Bangalore 560103",
      contactNumber: "+91-80-42999999",
      bloodStock: {
        "A+": 18,
        "A-": 6,
        "B+": 22,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 28,
        "O-": 9
      }
    },
    {
      id: 47,
      name: "SRM Medical College Hospital",
      city: "Chennai",
      address: "SRM Nagar, Kattankulathur, Chennai 603203",
      contactNumber: "+91-44-27452270",
      bloodStock: {
        "A+": 24,
        "A-": 8,
        "B+": 29,
        "B-": 10,
        "AB+": 15,
        "AB-": 5,
        "O+": 38,
        "O-": 12
      }
    },
    {
      id: 48,
      name: "Kauvery Hospital",
      city: "Chennai",
      address: "No. 199, Luz Church Road, Mylapore, Chennai 600004",
      contactNumber: "+91-44-40006000",
      bloodStock: {
        "A+": 17,
        "A-": 5,
        "B+": 21,
        "B-": 7,
        "AB+": 11,
        "AB-": 3,
        "O+": 27,
        "O-": 8
      }
    },
    {
      id: 49,
      name: "Gandhi Hospital",
      city: "Hyderabad",
      address: "Musheerabad, Secunderabad, Hyderabad 500003",
      contactNumber: "+91-40-27505566",
      bloodStock: {
        "A+": 27,
        "A-": 9,
        "B+": 32,
        "B-": 11,
        "AB+": 17,
        "AB-": 5,
        "O+": 42,
        "O-": 13
      }
    },
    {
      id: 50,
      name: "Manipal Hospital",
      city: "Goa",
      address: "Dona Paula, Panaji, Goa 403004",
      contactNumber: "+91-832-2456730",
      bloodStock: {
        "A+": 15,
        "A-": 5,
        "B+": 19,
        "B-": 6,
        "AB+": 10,
        "AB-": 3,
        "O+": 24,
        "O-": 8
      }
    }
  ];

  // List of major Indian cities
  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
    "Ahmedabad", "Pune", "Jaipur", "Gurgaon", "Lucknow","Guna", "Kanpur", "Chandigarh", "Bhopal", "Bhilai", "Goa"
  ];

  // Blood types
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // State variables
  const [activeTab, setActiveTab] = useState("patient"); // patient or donor
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Search for blood availability (patient mode)
  const searchBloodAvailability = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredHospitals = sampleHospitals.filter(hospital => {
        // If city is selected, filter by city
        if (selectedCity && hospital.city !== selectedCity) {
          return false;
        }
        
        // Filter by blood type availability
        return hospital.bloodStock[selectedBloodType] > 0;
      });
      
      // Sort by availability
      const sortedHospitals = filteredHospitals.sort((a, b) => 
        b.bloodStock[selectedBloodType] - a.bloodStock[selectedBloodType]
      );
      
      setResults(sortedHospitals);
      setShowResults(true);
      setLoading(false);
    }, 800); // simulate network delay
  };

  // Find hospitals for donation (donor mode)
  const findDonationHospitals = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredHospitals = sampleHospitals.filter(hospital => {
        return hospital.city === selectedCity;
      });
      
      setResults(filteredHospitals);
      setShowResults(true);
      setLoading(false);
    }, 800); // simulate network delay
  };

  // Handle search button click based on active tab
  const handleSearch = () => {
    if (activeTab === "patient") {
      if (!selectedBloodType) {
        alert("Please select a blood type");
        return;
      }
      searchBloodAvailability();
    } else {
      if (!selectedCity) {
        alert("Please select a city");
        return;
      }
      findDonationHospitals();
    }
  };

  // Reset search and go back to form
  const resetSearch = () => {
    setShowResults(false);
    setResults([]);
    setSelectedBloodType("");
    setSelectedCity("");
  };

  // Determine availability status text and class
  const getAvailabilityStatus = (count) => {
    if (count > 20) return { text: "High Availability", class: "high" };
    if (count > 10) return { text: "Good Availability", class: "good" };
    if (count > 5) return { text: "Limited Availability", class: "limited" };
    return { text: "Critical Low Stock", class: "critical" };
  };

  return (
    <div className="blood-availability-wrapper">
      <h1 className="blood-title">Blood Connect India</h1>
      
      {!showResults ? (
        <div className="search-container fade-in">
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === "patient" ? "active" : ""}`}
              onClick={() => setActiveTab("patient")}
            >
              Need Blood
            </button>
            <button 
              className={`tab-btn ${activeTab === "donor" ? "active" : ""}`}
              onClick={() => setActiveTab("donor")}
            >
              Donate Blood
            </button>
          </div>
          
          <div className="search-form">
            {activeTab === "patient" ? (
              <div className="form-description">
                <p>Find hospitals with available blood of your required type</p>
              </div>
            ) : (
              <div className="form-description">
                <p>Find hospitals where you can donate blood in your city</p>
              </div>
            )}
            
            <div className="form-fields">
              <div className="form-group">
                <label>Select City</label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {indianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              {activeTab === "patient" && (
                <div className="form-group">
                  <label>Blood Type</label>
                  <select 
                    value={selectedBloodType} 
                    onChange={(e) => setSelectedBloodType(e.target.value)}
                  >
                    <option value="">Select Blood Type</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button 
                className="search-btn" 
                onClick={handleSearch}
                disabled={loading || (activeTab === "patient" && !selectedBloodType) || (activeTab === "donor" && !selectedCity)}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="results-container fade-in">
          <h2 className="results-title">
            {activeTab === "patient" 
              ? `Available ${selectedBloodType} Blood ${selectedCity ? `in ${selectedCity}` : ''}`
              : `Hospitals Accepting Donations in ${selectedCity}`}
          </h2>
          
          {results.length > 0 ? (
            <div className="hospital-grid">
              {results.map(hospital => (
                <div key={hospital.id} className="hospital-card">
                  <h3 className="hospital-name">{hospital.name}</h3>
                  
                  {activeTab === "patient" && (
                    <>
                      <div className="blood-type-badge">{selectedBloodType}</div>
                      <div className="units-available">
                        {hospital.bloodStock[selectedBloodType]} 
                        <span className="unit-text"> units available</span>
                      </div>
                      <div className={`availability-status ${getAvailabilityStatus(hospital.bloodStock[selectedBloodType]).class}`}>
                        {getAvailabilityStatus(hospital.bloodStock[selectedBloodType]).text}
                      </div>
                    </>
                  )}
                  
                  <div className="hospital-details">
                    <p className="hospital-city"><span className="detail-label">City:</span> {hospital.city}</p>
                    <p className="hospital-address"><span className="detail-label">Address:</span> {hospital.address}</p>
                    <p className="hospital-contact">
                      <span className="detail-label">Contact:</span> 
                      <a href={`tel:${hospital.contactNumber}`}>{hospital.contactNumber}</a>
                    </p>
                  </div>
                  
                  <button className="contact-btn">Contact Hospital</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No hospitals found matching your criteria</h3>
              <p>Please try another search or expand your criteria</p>
            </div>
          )}
          
          <button className="back-btn" onClick={resetSearch}>
            Start New Search
          </button>
        </div>
      )}
    </div>
  );
};

export default BloodAvailability;