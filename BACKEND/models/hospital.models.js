import mongoose from 'mongoose';

const bloodUnitSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const hospitalSchema = new mongoose.Schema({
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  address: String,
  contactNumber: String,
  bloodStock: [bloodUnitSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
