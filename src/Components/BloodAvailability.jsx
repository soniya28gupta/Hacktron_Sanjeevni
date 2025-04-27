import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../../axiosConfig';
// Animation definitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// Styled components
const Container = styled.div`
  font-family:roboto, sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #d32f2f;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const FormContainer = styled.div`
  transition: all 0.3s ease;
  ${props => props.hidden && `
    opacity: 0;
    height: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
  `}
`;

const Select = styled.select`
  padding: 0.75rem;
  width: 100%;
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #333;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #b71c1c;
    transform: translateY(-2px);
  }
`;

const HospitalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const HospitalCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${scaleIn} 0.3s ease-out;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const HospitalName = styled.h3`
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const BloodTypeBadge = styled.span`
  display: inline-block;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const UnitsAvailable = styled.div`
  font-size: 1.5rem;
  color: #27ae60;
  font-weight: bold;
  margin: 1rem 0;
`;

const UnitText = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: normal;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 2rem;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const blood =[
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"

]




const BloodAvailability = () => {
  const [bloodType, setBloodType] = useState('');
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    console.log("Updated availability:", availability);
  }, [availability]);

  const checkAvailability = async () => {

    setLoading(true);
    try{

      const response =  await api.get(`/features/hospitals/blood/${bloodType}`);
     
      if (response.status === 200) {
        console.log(response.data)

        const hospitals = response.data.map(hospital => ({
          hospital: hospital.hospitalName,
          units: hospital.bloodStock[0].quantity ,// Assuming the first blood type matches the selected one
          address: hospital.address,
          contactNumber: hospital.contactNumber,
        }));
        console.log(hospitals)
        
        setAvailability(hospitals);
        console.log(availability)
       
        setShowForm(false); // Hide the form after checking availability
      }
      setLoading(false);

     
      




    }
    catch (error) {
      console.error('Error fetching blood availability:', error);
      setLoading(false);
      setShowForm(false);
      setAvailability([]); // Set to empty array if error occurs
    }



   
  };

  const resetForm = () => {
    setShowForm(true);
    setAvailability([]);
    setBloodType('');
  };

  return (
    <Container>
      <Title>Blood Availability Checker</Title>
      
      <FormContainer hidden={!showForm}>
        <label style={{marginRight: '1vw' }}>
          Select Blood Type
          <Select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
          >
            <option value="">Select a blood type</option>
            {blood.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </label>
        
        <Button onClick={checkAvailability} disabled={!bloodType || loading}>
          {loading ? 'Checking...' : 'Check Availability'}
        </Button>
      </FormContainer>

      {!showForm && availability !== null && (
        <>
          {availability.length > 0 ? (
            <>
              <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>
                Available {bloodType} Blood Donations
              </h2>
              <HospitalGrid>
                {availability.map((item, index) => (
                  <HospitalCard key={index}>
                    <HospitalName>{item.hospital}</HospitalName>
                    <BloodTypeBadge>{bloodType}</BloodTypeBadge>
                    <UnitsAvailable>
                      {item.units} <UnitText>units available</UnitText>
                    </UnitsAvailable>
                    <p>{item.address}</p>
                    <p style={{ color: '#7f8c8d' }}>
                      {item.units > 10 ? 'Good stock' : 'Limited availability'}
                    </p>
                  </HospitalCard>
                ))}
              </HospitalGrid>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <h2 style={{ color: '#e74c3c' }}>
                No availability found for blood type {bloodType}
              </h2>
              <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
                Please check back later or contact nearby blood banks directly.
              </p>
            </div>
          )}
          
          <div style={{ textAlign: 'center' }}>
            <BackButton onClick={resetForm}>
              Check Another Blood Type
            </BackButton>
          </div>
        </>
      )}
    </Container>
  );
};

export default BloodAvailability;