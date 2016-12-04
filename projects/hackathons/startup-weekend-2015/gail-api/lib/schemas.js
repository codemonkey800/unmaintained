let mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let employeeSchema = new Schema({
    _id: String,
    name: String,
    passHash: String,
    title: String
});

let patientDocumentSchema = new Schema({
    _id: Number,
    dateOfCreation: Date,

    // Nurse fields
    name: String,
    age: Number,
    dob: Date,
    height: Number,
    weight: Number,
    bloodPressure: {
        dystol: Number,
        systol: Number
    },
    temperature: Number,
    symptoms: String,
    currentMedication: String,
    allergies: String,

    // Doctor fields
    diagnosis: String,
    perscription: String,
    followUp: Date,

    // Assigned people
    assignedNurse: String,
    assignedDoctor: String
});

module.exports = {
    patientDocumentSchema: patientDocumentSchema,
    employeeSchema: employeeSchema
};