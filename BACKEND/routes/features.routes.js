import express, { Router } from 'express';
import { authenticate } from '../middleware/authenticate.middleware.js';
import Hospital from '../models/hospital.models.js';
export const router2 = express.Router();



// POST route to create a hospital
router2.post('/addHospital', authenticate, async (req, res) => {
  try {
    const { hospitalName, address, contactNumber, bloodStock } = req.body;

    // userRef comes from your Firebase-auth middleware
    const userRef = req.user.id;

    // Check if hospital already exists for this user
    const existing = await Hospital.findOne({ userRef });
    if (existing) {
      return res.status(400).json({ message: 'Hospital already exists for this user.' });
    }

    const newHospital = new Hospital({
      userRef,
      hospitalName,
      address,
      contactNumber,
      bloodStock,
    });

    await newHospital.save();
    res.status(201).json({ message: 'Hospital created successfully.', hospital: newHospital });

  } catch (error) {
    console.error('Error creating hospital:', error);
    res.status(500).json({ message: 'Server error while creating hospital.' });
  }
});

// Route to fetch hospitals with a specific blood type
router2.get('/hospitals/blood/:bloodType', async (req, res) => {
    console.log("get hospitals called")
  try {
    const { bloodType } = req.params;
    console.log(bloodType)

    // Find hospitals that have the specified blood type in their blood stock
    const hospitals = await Hospital.find({
      'bloodStock.bloodType': bloodType,
      'bloodStock.quantity': { $gt: 0 } // Ensure quantity is greater than 0
    }, {
      hospitalName: 1,
      address: 1,
      contactNumber: 1,
      'bloodStock.$': 1 // Only include the matching blood type in the result
    });

    console.log(hospitals)

    if (hospitals.length === 0) {
      return res.status(404).json({ message: 'No hospitals found with the specified blood type.' });
    }



    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals with blood type:', error);
    res.status(500).json({ message: 'Server error while fetching hospitals.' });
  }
});









