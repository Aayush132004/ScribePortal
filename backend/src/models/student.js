// const mongoose =require("mongoose"); 
// const {Schema} = mongoose;

// const studentSchema = new mongoose.Schema({
//   aadhaarNumber: {
//     type: String,
//     required: [true, 'Aadhaar number is required.'],
//     unique: true, 
//     trim: true,
//     match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
//   },
//   fullName: {
//     type: String,
//     required: [true, 'Full name is required.'],
//     trim: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: [true, 'Mobile number is required.'],
//     unique: true, 
//     trim: true,
//     match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.']
//   },
//   email: {
//     type: String,
//     default: '',
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
//   },
//  age: {
//   type: Number,
//   required: [true, 'Age is required.'],
//   min: [5, 'Minimum age be 5 years.'],
//   max: [99, 'Maximum age is 99 years'],
// },

//   state: {
//     type: String,
//     required: [true, 'State is required.'],
//     trim: true,
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required.'],
//     trim: true,
//   },
 
//   educationLevel: {
//     type: String,
//     required: [true, 'Education level is required.'],
//     enum: ['High School', 'Undergraduate', 'Graduate', 'Postgraduate', 'Other'], 
//     trim: true,
//   },
//   disability: {
//     type: String,
//     default: 'None', 
//     trim: true,
//   },
//    profile: {
//     url:{
//             type:String,
           
//         },
//         cloudinaryPublicId:{
//             type:String,
//         }
//   },
//   adhaarCard:{
//     url:{
//             type:String,
           
//         },
//         cloudinaryPublicId:{
//             type:String,
//         }
//   },
//   role:{
//   type:String,
//   default:"student"
// },
//   password: {
//     type: String,
//     required: [true, 'Please provide a password.'],
//     minlength: [6, 'Password must be at least 6 characters long.'], 
//   },
//   permanentscibe : {
//     type: Schema.Types.ObjectId,
//     ref: 'Scribe' 
//   }
// }, { timestamps: true });

// const Student = mongoose.model('Student', studentSchema);

// module.exports = Student;


const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: [true, 'Aadhaar number is required.'],
    unique: true, 
    trim: true,
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required.'],
    unique: true, 
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.']
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
    min: [5, 'Minimum age be 5 years.'],
    max: [99, 'Maximum age is 99 years'],
  },

  // === LOCATION FIELDS ===
  state: {
    type: String,
    required: [true, 'State is required.'],
    trim: true,
  },
  district: {                      // NEW
    type: String,
    required: [true, 'District is required.'],  // NEW
    trim: true,                                // NEW
  },
  cityOrVillage: {                 // NEW
    type: String,
    required: [true, 'City/Village is required.'], // NEW
    trim: true,                                    // NEW
  },
  pincode: {                        // NEW
    type: String,
    required: [true, 'Pincode is required.'],              // NEW
    trim: true,                                            // NEW
    match: [/^[1-9]\d{5}$/, 'Please enter a valid 6-digit pincode.'] // NEW
  },

  city: {
    type: String,
    required: false,              // UPDATED: was required; now optional
    trim: true,
    // UPDATED: Deprecated - use district + cityOrVillage instead. Kept for old data / queries.
  },

  // === EDUCATION DETAILS ===

  highestQualification: {        // UPDATED: replaced educationLevel
    type: String,
    required: [true, 'Highest qualification is required.'], // UPDATED
    enum: [ // UPDATED: curated list
      'Below 10th',
      '10th',
      '12th',
      'Diploma',
      'B.Tech / B.E.',
      'B.Com',
      'B.Sc',
      'B.A.',
      'BBA / BBM',
      'LLB',
      'MBBS',
      'B.Ed',
      'M.Tech / M.E.',
      'M.Com',
      'M.Sc',
      'M.A.',
      'MBA',
      'MCA',
      'PhD',
      'Other'
    ],
    trim: true,
  },

  isCurrentlyStudying: {          // NEW: flag if currently studying
    type: Boolean,
    default: false,
  },

  currentCourse: {                // NEW: e.g. "B.Tech CSE", "Class 10"
    type: String,
    trim: true,
    // NEW: Optional, recommended if isCurrentlyStudying is true
  },

  currentYearOrClass: {          // NEW: e.g. "1st year", "2nd year", "12th"
    type: String,
    trim: true,
    // NEW: Optional, recommended if isCurrentlyStudying is true
  },

  disability: {
    type: String,
    default: 'None', 
    trim: true,
  },
  profile: {
    url: {
      type: String,
    },
    cloudinaryPublicId: {
      type: String,
    }
  },
  adhaarCard: {
    url: {
      type: String,
    },
    cloudinaryPublicId: {
      type: String,
    }
  },
  role: {
    type: String,
    default: "student"
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters long.'], 
  },
  permanentscibe: {
    type: Schema.Types.ObjectId,
    ref: 'Scribe' 
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
