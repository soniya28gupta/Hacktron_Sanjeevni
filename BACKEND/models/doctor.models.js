import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: Number, // Years of experience
            required: true,
        },
        availability: {
            type: Boolean,
            default: true,
        },
        hospital: {
            type: String, // Associated hospital/clinic
            required: true,
        },
        appointments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Appointment',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;