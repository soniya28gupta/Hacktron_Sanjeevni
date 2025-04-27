import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import '../css/LandingPage.css';
import heroimage from '../assets/hero-image.jpg';
import blooddonation from '../assets/blooddonation.avif';
import appointmentimg from '../assets/appointments.png';
import hospitalimg from '../assets/hospitals.webp';
import doctorimg from '../assets/doctor.jpg';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle navigation
  const handleLearnMoreClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`landing-page ${isScrolled ? 'shrink' : ''}`}>
      <div className={`hero ${isScrolled ? 'shrink' : ''}`}>
        <div className="landing-overlay">
          <h1 className="landing-main-title">Sukhayu</h1>
          <h2 className="landing-sub-title">Find the care you deserve</h2>
          <button className="landing-button">Explore More</button>
        </div>
        <img src={heroimage} alt="Healthcare Hero" className="landing-hero-image" />
      </div>
      <div className={`content ${isScrolled ? 'shrink' : ''}`}>
        <h2>Our Services</h2>
        <div className="contentboxes">
          <div className="content-box">
            <img src={blooddonation} alt="Blood Donation" />
            Find Blood Availability near you
            <button 
              className="content-button"
              onClick={() => handleLearnMoreClick('/blood-availability')}
            >
              Learn More
            </button>
          </div>
          <div className="content-box">
            <img src={appointmentimg} alt="Appointments" />
            Get online appointments with doctors
            <button 
              className="content-button"
              onClick={() => handleLearnMoreClick('/appointments')}
            >
              Learn More
            </button>
          </div>
          <div className="content-box">
            <img src={hospitalimg} alt="Hospitals" />
            Find nearby hospitals
            <button 
              className="content-button"
              onClick={() => handleLearnMoreClick('/hospitals')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className={`mission ${isScrolled ? 'shrink' : ''}`}>
        <h2 style={{marginLeft:'2.3vw'}}>Our Mission</h2>
        <div className="mission-content">
          <p style={{marginLeft:'2vw'}}>
            Our mission is to provide a comprehensive platform that connects patients with healthcare providers, 
            ensuring easy access to medical services and information.
            We aim to empower individuals to take control of their health by offering resources for blood donation,
            online appointments, and nearby hospital information.
            We are committed to improving healthcare accessibility and enhancing the overall patient experience.
          </p>
          <div className="doctor">
            <img src={doctorimg} alt="Doctor" />
          </div>
        </div>
      </div>
      <div className={`testimonials ${isScrolled ? 'shrink' : ''}`}>
        <h2>What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-box">
            <p>"This platform made it so easy to find blood donors in my area. Highly recommended!"</p>
            <h4>-Manu Singh </h4>
          </div>
          <div className="testimonial-box">
            <p>"Booking an appointment with a doctor has never been this simple. Great service!"</p>
            <h4>- Mansi Sharma</h4>
          </div>
          <div className="testimonial-box">
            <p>"I found the nearest hospital in seconds. This platform is a lifesaver!"</p>
            <h4>- Aryan Rathi</h4>
          </div>
          <div className="testimonial-box">
            <p>"The user-friendly interface and quick access to resources are amazing!"</p>
            <h4>- Mohit Shrivastav</h4>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          
          height: '100px', // Decreased height
        }}
      >
        <p>&copy; 2023 Sukhayu. All rights reserved.</p>
        <p>Contact us: support@sukhayu.com | +1 234 567 890</p>
        <div className="footer-links">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#accessibility-statement">Accessibility Statement</a>
          <a href="#terms-conditions">Terms & Conditions</a>
          <a href="#refund-policy">Refund Policy</a>
        </div>
        <div className="footer-about">
          <p>
            Sukhayu is dedicated to connecting patients with healthcare providers, offering resources for blood donation, 
            online appointments, and hospital information. We strive to make healthcare accessible and convenient for everyone.
          </p>
        </div>
        <div className="footer-social">
          <p>Follow us:</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
