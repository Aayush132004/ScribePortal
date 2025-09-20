// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const requestSchema = new mongoose.Schema({
//   studentId: {
//     type: Schema.Types.ObjectId,
//     ref: "Student",
//     required: true

//   },
//   scribeId: {
//     type: Schema.Types.ObjectId,
//     ref: "Scribe",
//     required: true
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required.'],
    
//   },
//   date: {
//     type: Date,
//     required: [true, 'Date is required.']
//   },
//   isAccepted: {
//     type: String,
//     enum: ["wait", "accepted", "rejected"],
//     default: "wait"
//   },
//   language: {
//     type: String,
//     required: [true, 'Language is required.'],
    
//   },
//   description: {
//     type: String,
//     trim: true,
//     default: ''
//   }
// }, { timestamps: true });

// const Request = mongoose.model('Request', requestSchema);
// module.exports = Request;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  scribeId: {
    type: Schema.Types.ObjectId,
    ref: "Scribe",
    required: true
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required.']
  },
  isAccepted: {
    type: String,
    enum: ["wait", "accepted", "rejected"],
    default: "wait"
  },
  language: {
    type: String,
    required: [true, 'Language is required.'],
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  // Added rating attribute
  rating: {
    type: Number,
    min: 1, // Optional: sets a minimum rating value
    max: 5  // Optional: sets a maximum rating value
  }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;