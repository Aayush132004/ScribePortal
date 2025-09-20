

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const scribeSchema = new mongoose.Schema({
//   aadhaarNumber: {
//     type: String,
//     required: [true, 'Aadhaar number is required.'],
//     unique: true, 
//     match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
//   },
//   fullName: {
//     type: String,
//     required: [true, 'Full name is required.'],
//     trim: true,
//   },
//   age: {
//     type: Number,
//     required: [true, 'Age is required.'],
//     min: [10, 'Minimum age be 10 years.'],
//     max: [99, 'Maximum age is 99 years'],
//   },
//   mobileNumber: {
//     type: String,
//     required: [true, 'Mobile number is required.'],
//     unique:true,
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
//   state: {
//     type: String,
//     required: [true, 'State is required.'],
//   },
//   city: {
//     type: String,
//     required: [true, 'City is required.'],
//   },
//   highestQualification: {
//     type: String,
//     required: [true, 'Highest qualification is required.'],
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required.'],
//   },
//   qualificationImgLink: {
//     url: { type: String },
//     cloudinaryPublicId: { type: String }
//   },
//   profile: {
//     url: { type:String },
//     cloudinaryPublicId: { type:String }
//   },
//   aadhaarCard: {
//     url: { type: String },
//     cloudinaryPublicId: { type:String }
//   },
//   role: {
//     type: String,
//     default: "scribe"
//   },
//   tempstudent: [
//     {
//       student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
//       date: { type: Date }
//     }
//   ],
//   permanentstudent: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Student' 
//     }
//   ],
//   bookedDates: [{ type: Date }],

//   // ⭐ Ratings
//   ratings: [
//     {
//       value: { type: Number, min: 1, max: 5, required: true },
//       givenBy: { type: Schema.Types.ObjectId, ref: 'Student' },
//       date: { type: Date, default: Date.now }
//     }
//   ],
//   averageRating: {
//     type: Number,
//     default: 0
//   },

//   // Custom field for account created date (in addition to timestamps)
//   accountCreatedDate: {
//     type: Date,
//     default: Date.now
//   }

// }, { timestamps: true });

// // Middleware to auto-update average rating
// scribeSchema.pre('save', function(next) {
//   if (this.ratings.length > 0) {
//     const sum = this.ratings.reduce((acc, r) => acc + r.value, 0);
//     this.averageRating = sum / this.ratings.length;
//   }
//   next();
// });

// const Scribe = mongoose.model('Scribe', scribeSchema);
// module.exports = Scribe;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const scribeSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: [true, 'Aadhaar number is required.'],
    unique: true, 
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
    min: [10, 'Minimum age be 10 years.'],
    max: [99, 'Maximum age is 99 years'],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required.'],
    unique:true,
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
  state: {
    type: String,
    required: [true, 'State is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  highestQualification: {
    type: String,
    required: [true, 'Highest qualification is required.'],
  },
  // ⭐ Array of known languages
  knownLanguages: {
    type: [String],
    required: [true, 'Please specify at least one known language.'],
    default: []
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  qualificationImgLink: {
    url: { type: String },
    cloudinaryPublicId: { type: String }
  },
  profile: {
    url: { type:String },
    cloudinaryPublicId: { type:String }
  },
  aadhaarCard: {
    url: { type: String },
    cloudinaryPublicId: { type:String }
  },
  role: {
    type: String,
    default: "scribe"
  },
  tempstudent: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      date: { type: Date }
    }
  ],
  permanentstudent: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student' 
    }
  ],
  bookedDates: [{ type: Date }],

  // ⭐ Ratings
  ratings: [
    {
      value: { type: Number, min: 1, max: 5, required: true },
      givenBy: { type: Schema.Types.ObjectId, ref: 'Student' },
      date: { type: Date, default: Date.now }
    }
  ],
  averageRating: {
    type: Number,
    default: 0
  },

  // Custom field for account created date (in addition to timestamps)
  accountCreatedDate: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

// Middleware to auto-update average rating
scribeSchema.pre('save', function(next) {
  if (this.isModified('ratings') && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, r) => acc + r.value, 0);
    this.averageRating = sum / this.ratings.length;
  }
  next();
});

const Scribe = mongoose.model('Scribe', scribeSchema);
module.exports = Scribe;