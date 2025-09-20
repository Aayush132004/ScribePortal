const Scribe = require("../src/models/scribe"); // Adjust path if needed
const Student=require("../src/models/student");
const Request = require("../src/models/request"); // Adjust path if needed

const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // Don't forget to install: npm install bcrypt
const jwt = require('jsonwebtoken'); // Don't forget to install: npm install jsonwebtoken
const { upsertStreamUser } = require("../src/config/stream");
const { trace } = require("../src/routes/userAuth");


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// --- Controller 1: Generate Upload Signature ---
const uploadSignature = async (req, res) => {
    try {
        const tempUploadId = uuidv4();
        const timestamp = Math.round(new Date().getTime() / 1000);

        // Get file type from query param (e.g., /uploadSignature?fileType=profile)
        const fileType = req.query.fileType || 'misc'; 

        // Construct the base public_id. This will now include the intended folder path.
        // We will make sure this *exact* string is used in frontend FormData.
        let folderPrefix;
        let resource_type = 'image'; // Default for images

        if (fileType === 'profile') {
            folderPrefix = 'blindHelper/temp_profiles';
        } else if (fileType === 'qualification') {
            folderPrefix = 'blindHelper/temp_qualifications';
            // If qualification is PDF, uncomment next line:
            // resource_type = 'raw';
        } else if (fileType === 'aadhaar') {
            folderPrefix = 'blindHelper/temp_aadhaar';
        } else {
            folderPrefix = 'blindHelper/temp_misc';
        }
        
        // This public_id will now contain the full path including the temporary folder.
        // Cloudinary will infer the folder from this public_id.
        const public_id = `${folderPrefix}/${tempUploadId}_${timestamp}`; 

        // IMPORTANT CHANGE HERE:
        // Only include parameters in uploadParams that are absolutely necessary for signing
        // AND that will match the parameters sent directly in the frontend's FormData.
        // Cloudinary's error implies it only saw public_id and timestamp as signed.
        const uploadParams = {
            timestamp: timestamp,
            public_id: public_id, // Use the full public_id in signing
            // DO NOT include 'folder' or 'resource_type' here if they are not part of the signed string Cloudinary expects.
            // If you wanted to sign 'folder', it would need to be passed in uploadParams here.
            // But based on your error, it's NOT expected to be signed for this request.
        };

        const signature = cloudinary.utils.api_sign_request(
            uploadParams,
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            signature,
            timestamp,
            public_id, // Send this full, signed public_id
            api_key: process.env.CLOUDINARY_API_KEY,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            // Ensure the upload URL matches the resource type
            upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`
        });
    } catch (err) {
        console.error('Error generating upload signature:', err);
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }
};

// --- Controller 2: Register User and Rename Cloudinary Assets ---
// const registerScribe = async (req, res) => {
//     try {
//         const {
//             aadhaarNumber,
//             fullName,
//             age,
//             mobileNumber,
//             email,
//             state,
//             city,
//             highestQualification,
//             password,
//             profile, // Contains { url: tempUrl, cloudinaryPublicId: tempPublicId }
//             aadhaarCard,
//             qualificationImgLink
//         } = req.body;

//         // --- Backend Validation (Crucial for security and data integrity) ---
//         // This should mirror your Zod schema for full protection.
//         if (!fullName || fullName.trim().length === 0) {
//             return res.status(400).json({ message: "Full name is required." });
//         }
//         if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
//             return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required." });
//         }
//         if (!age || age < 10 || age > 99) {
//             return res.status(400).json({ message: "Age must be between 10 and 99 years." });
//         }
//         if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
//             return res.status(400).json({ message: "Valid 10-digit mobile number is required." });
//         }
//         if (email && !/^\S+@\S+\.\S+$/.test(email)) { // Email is optional, but if present, must be valid
//             return res.status(400).json({ message: "Please enter a valid email address." });
//         }
//         if (!state || state.trim().length === 0) {
//             return res.status(400).json({ message: "State is required." });
//         }
//         if (!city || city.trim().length === 0) {
//             return res.status(400).json({ message: "City is required." });
//         }
//         if (!highestQualification || highestQualification.trim().length === 0) {
//             return res.status(400).json({ message: "Highest qualification is required." });
//         }
//         if (!password || password.length < 6) {
//             return res.status(400).json({ message: "Password must be at least 6 characters." });
//         }
//         // No need to validate confirmPassword here, frontend handles it.

//         // Check for existing user by unique fields from your schema
//         const existingUserMobile = await Scribe.findOne({ mobileNumber });
//         if (existingUserMobile) {
//             return res.status(409).json({ message: "User with this mobile number is already registered." });
//         }
//         const existingUserAadhaar = await Scribe.findOne({ aadhaarNumber }); // Assuming Aadhaar is unique
//         if (existingUserAadhaar) {
//             return res.status(409).json({ message: "User with this Aadhaar number is already registered." });
//         }
//         if (email && email.trim().length > 0) {
//             const existingUserEmail = await Scribe.findOne({ email });
//             if (existingUserEmail) {
//                 return res.status(409).json({ message: "User with this email is already registered." });
//             }
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the user first. Initially, image URLs/publicIds can be placeholders.
//         const newScribe = await Scribe.create({
//             aadhaarNumber,
//             fullName,
//             age,
//             mobileNumber,
//             email: email || '', // Save as empty string if not provided
//             state,
//             city,
//             highestQualification,
//             password: hashedPassword,
//             profile: { url: '', cloudinaryPublicId: '' }, // Placeholder
//             aadhaarCard: { url: '', cloudinaryPublicId: '' }, // Placeholder
//             qualificationImgLink: { url: '', cloudinaryPublicId: '' }, // Placeholder
//         });

//         const actualUserId = newScribe._id.toString(); // Get the new user's actual ID

//         try{
//             await upsertStreamUser({
//                 //these are the fields that stream needs to create a user
//                 id: newScribe._id.toString(),
//                 name: newScribe.fullName,
//                 image: newScribe.profile?.url || '',
//             })
//             console.log('Stream user created successfully for:', newScribe._id);
//         }
//         catch(err){
//             console.error('Error creating Stream user:', err);
//         }

//         // --- Cloudinary Asset Renaming ---
//         // This function renames the temporary asset to its permanent user-specific location
//         const renameAsset = async (tempPublicId, destinationFolder) => {
//             try {
//                 // Extract original filename part from the tempPublicId
//                 // e.g., 'blindHelper/temp_profiles/temp_asset_uuid_timestamp' -> 'temp_asset_uuid_timestamp'
//                 const originalFilenamePart = tempPublicId.split('/').pop();
                
//                 // Construct the new permanent public ID
//                 const newPublicId = `${destinationFolder}/${actualUserId}/${originalFilenamePart}`;
                
//                 const result = await cloudinary.uploader.rename(tempPublicId, newPublicId, {
//                     overwrite: true // Overwrite if an asset with the newPublicId already exists (unlikely during new registration)
//                 });
//                 return {
//                     url: result.secure_url,
//                     cloudinaryPublicId: result.public_id,
//                 };
//             } catch (renameErr) {
//                 console.error(`Error renaming Cloudinary asset ${tempPublicId}:`, renameErr.message, renameErr.http_code);
//                 // CRITICAL: Handle this failure appropriately.
//                 // Options:
//                 // 1. Delete the newly created Scribe user in MongoDB.
//                 // 2. Mark the user as "registration incomplete" or "document verification pending".
//                 // 3. Keep the temporary Cloudinary assets and retry renaming later (requires cleanup logic).
//                 // For this example, we re-throw, which will cause the entire registration to fail.
//                 throw new Error(`Failed to finalize document upload. Please try again. (Asset: ${tempPublicId})`);
//             }
//         };

//         // Rename and get final secure URLs and public IDs for all assets
//         const finalProfile = await renameAsset(profile.cloudinaryPublicId, `blindHelper/profiles`);
//         const finalAadhaarCard = await renameAsset(aadhaarCard.cloudinaryPublicId, `blindHelper/aadhaar_cards`);
//         const finalQualificationImgLink = await renameAsset(qualificationImgLink.cloudinaryPublicId, `blindHelper/qualification_certs`);

//         // Update the newly created user document with the final Cloudinary URLs
//         newScribe.profile = finalProfile;
//         newScribe.aadhaarCard = finalAadhaarCard;
//         newScribe.qualificationImgLink = finalQualificationImgLink;
//         await newScribe.save(); // Save the user with the updated image links

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: newScribe._id, email: newScribe.email, mobileNumber: newScribe.mobileNumber },
//             process.env.JWT_KEY,
//             { expiresIn: '2h' } // 2 hours expiry
//         );

//         // Set cookie
//         res.cookie('token', token, {
//             maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
//             httpOnly: true, // Prevent client-side JS access
//             secure: true, // Send only over HTTPS in production
//             sameSite: 'None', // Important for cross-origin frontend/backend deployments
//         });

//         const reply = {
//             _id: newScribe._id,
//             fullName: newScribe.fullName,
//             profile: newScribe.profile.url,
//             state: newScribe.state,
//             city: newScribe.city,
//         };

//         res.status(201).json({ // 201 Created is appropriate for registration
//             user: reply,
//             message: "Successfully Registered"
//         });

//     } catch (e) {
//         console.error("Registration error:", e);
//         let errorMessage = "Registration failed due to an unexpected error.";
//         let statusCode = 500;

//         // Specific error messages for duplicate keys (Mongoose)
//         if (e.code === 11000 && e.keyPattern) {
//             if (e.keyPattern.mobileNumber) {
//                 errorMessage = "Mobile number is already registered.";
//                 statusCode = 409;
//             } else if (e.keyPattern.email) {
//                 errorMessage = "Email is already registered.";
//                 statusCode = 409;
//             } else if (e.keyPattern.aadhaarNumber) {
//                 errorMessage = "Aadhaar number is already registered.";
//                 statusCode = 409;
//             }
//         } else if (e.message) {
//             // Catch custom errors thrown (e.g., from renameAsset or initial validation)
//             errorMessage = e.message;
//             statusCode = 400; // Client-side error likely
//             if (e.message.includes('Failed to finalize upload')) { // From renameAsset failure
//                 statusCode = 500;
//             }
//         }

//         res.status(statusCode).json({ message: errorMessage });
//     }
// };
const registerScribe = async (req, res) => {
  try {
    const {
      aadhaarNumber,
      fullName,
      age,
      mobileNumber,
      email,
      state,
      city,
      highestQualification,
      knownLanguages, // New field
      password,
      profile,
      aadhaarCard,
      qualificationImgLink
    } = req.body;

    // --- Backend Validation ---
    if (!fullName || fullName.trim().length === 0) {
      return res.status(400).json({ message: "Full name is required." });
    }
    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required." });
    }
    if (!age || age < 10 || age > 99) {
      return res.status(400).json({ message: "Age must be between 10 and 99 years." });
    }
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ message: "Valid 10-digit mobile number is required." });
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (!state || state.trim().length === 0) {
      return res.status(400).json({ message: "State is required." });
    }
    if (!city || city.trim().length === 0) {
      return res.status(400).json({ message: "City is required." });
    }
    if (!highestQualification || highestQualification.trim().length === 0) {
      return res.status(400).json({ message: "Highest qualification is required." });
    }
    if (!knownLanguages || !Array.isArray(knownLanguages) || knownLanguages.length === 0) {
      return res.status(400).json({ message: "Please specify at least one known language." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUserMobile = await Scribe.findOne({ mobileNumber });
    if (existingUserMobile) {
      return res.status(409).json({ message: "User with this mobile number is already registered." });
    }
    const existingUserAadhaar = await Scribe.findOne({ aadhaarNumber });
    if (existingUserAadhaar) {
      return res.status(409).json({ message: "User with this Aadhaar number is already registered." });
    }
    if (email && email.trim().length > 0) {
      const existingUserEmail = await Scribe.findOne({ email });
      if (existingUserEmail) {
        return res.status(409).json({ message: "User with this email is already registered." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newScribe = await Scribe.create({
      aadhaarNumber,
      fullName,
      age,
      mobileNumber,
      email: email || '',
      state,
      city,
      highestQualification,
      knownLanguages,
      password: hashedPassword,
      profile: { url: '', cloudinaryPublicId: '' },
      aadhaarCard: { url: '', cloudinaryPublicId: '' },
      qualificationImgLink: { url: '', cloudinaryPublicId: '' },
    });

    const actualUserId = newScribe._id.toString();

    try {
      await upsertStreamUser({
        id: newScribe._id.toString(),
        name: newScribe.fullName,
        image: newScribe.profile?.url || '',
      });
      console.log('Stream user created successfully for:', newScribe._id);
    } catch (err) {
      console.error('Error creating Stream user:', err);
    }

    const renameAsset = async (tempPublicId, destinationFolder) => {
      try {
        const originalFilenamePart = tempPublicId.split('/').pop();
        const newPublicId = `${destinationFolder}/${actualUserId}/${originalFilenamePart}`;
        const result = await cloudinary.uploader.rename(tempPublicId, newPublicId, {
          overwrite: true
        });
        return {
          url: result.secure_url,
          cloudinaryPublicId: result.public_id,
        };
      } catch (renameErr) {
        console.error(`Error renaming Cloudinary asset ${tempPublicId}:`, renameErr.message, renameErr.http_code);
        throw new Error(`Failed to finalize document upload. Please try again. (Asset: ${tempPublicId})`);
      }
    };

    const finalProfile = await renameAsset(profile.cloudinaryPublicId, `blindHelper/profiles`);
    const finalAadhaarCard = await renameAsset(aadhaarCard.cloudinaryPublicId, `blindHelper/aadhaar_cards`);
    const finalQualificationImgLink = await renameAsset(qualificationImgLink.cloudinaryPublicId, `blindHelper/qualification_certs`);

    newScribe.profile = finalProfile;
    newScribe.aadhaarCard = finalAadhaarCard;
    newScribe.qualificationImgLink = finalQualificationImgLink;
    await newScribe.save();

    const token = jwt.sign(
      { id: newScribe._id, email: newScribe.email, mobileNumber: newScribe.mobileNumber },
      process.env.JWT_KEY,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    const reply = {
      _id: newScribe._id,
      fullName: newScribe.fullName,
      profile: newScribe.profile.url,
      state: newScribe.state,
      city: newScribe.city,
    };

    res.status(201).json({
      user: reply,
      message: "Successfully Registered"
    });

  } catch (e) {
    console.error("Registration error:", e);
    let errorMessage = "Registration failed due to an unexpected error.";
    let statusCode = 500;

    if (e.code === 11000 && e.keyPattern) {
      if (e.keyPattern.mobileNumber) {
        errorMessage = "Mobile number is already registered.";
        statusCode = 409;
      } else if (e.keyPattern.email) {
        errorMessage = "Email is already registered.";
        statusCode = 409;
      } else if (e.keyPattern.aadhaarNumber) {
        errorMessage = "Aadhaar number is already registered.";
        statusCode = 409;
      }
    } else if (e.message) {
      errorMessage = e.message;
      statusCode = 400;
      if (e.message.includes('Failed to finalize upload')) {
        statusCode = 500;
      }
    }

    res.status(statusCode).json({ message: errorMessage });
  }
};
const registerStudent = async (req, res) => {
    try {
        const {
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email,
            state,
            city,
            educationLevel,
            disability,
            password,
            profile, // Contains { url: tempUrl, cloudinaryPublicId: tempPublicId }
            aadhaarCard,
        } = req.body;
        // console.log(req.body);

        // --- Backend Validation (Crucial for security and data integrity) ---
        // This should mirror your Zod schema for full protection.
        if (!fullName || fullName.trim().length === 0) {
            return res.status(400).json({ message: "Full name is required." });
        }
        if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
            return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required." });
        }
        if (!age || age < 10 || age > 99) {
            return res.status(400).json({ message: "Age must be between 10 and 99 years." });
        }
        if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ message: "Valid 10-digit mobile number is required." });
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) { // Email is optional, but if present, must be valid
            return res.status(400).json({ message: "Please enter a valid email address." });
        }
        if (!state || state.trim().length === 0) {
            return res.status(400).json({ message: "State is required." });
        }
        if (!city || city.trim().length === 0) {
            return res.status(400).json({ message: "City is required." });
        }
        if (!disability|| disability.trim().length === 0) {
            return res.status(400).json({ message: "Type Of Disability is required." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        // No need to validate confirmPassword here, frontend handles it.

        // Check for existing user by unique fields from your schema
        const existingUserMobile = await Student.findOne({ mobileNumber });
        if (existingUserMobile) {
            return res.status(409).json({ message: "User with this mobile number is already registered." });
        }
        const existingUserAadhaar = await Student.findOne({ aadhaarNumber }); // Assuming Aadhaar is unique
        if (existingUserAadhaar) {
            return res.status(409).json({ message: "User with this Aadhaar number is already registered." });
        }
        if (email && email.trim().length > 0) {
            const existingUserEmail = await Student.findOne({ email });
            if (existingUserEmail) {
                return res.status(409).json({ message: "User with this email is already registered." });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user first. Initially, image URLs/publicIds can be placeholders.
        const newStudent = await Student.create({
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email: email || '', // Save as empty string if not provided
            state,
            city,
            disability,
            educationLevel,
            password: hashedPassword,
            profile: { url: '', cloudinaryPublicId: '' }, // Placeholder
            aadhaarCard: { url: '', cloudinaryPublicId: '' }, // Placeholder
           
        });

        const actualUserId = newStudent._id.toString(); // Get the new user's actual ID

        try{
            await upsertStreamUser({
                //these are the fields that stream needs to create a user
                id: newStudent._id.toString(),
                name: newStudent.fullName,
                image: newStudent.profile?.url || '',
            })
            console.log('Stream user created successfully for:', newStudent._id);
        }
        catch(err){
            console.error('Error creating Stream user:', err);
        }

        // --- Cloudinary Asset Renaming ---
        // This function renames the temporary asset to its permanent user-specific location
        const renameAsset = async (tempPublicId, destinationFolder) => {
            try {
                // Extract original filename part from the tempPublicId
                // e.g., 'blindHelper/temp_profiles/temp_asset_uuid_timestamp' -> 'temp_asset_uuid_timestamp'
                const originalFilenamePart = tempPublicId.split('/').pop();
                
                // Construct the new permanent public ID
                const newPublicId = `${destinationFolder}/${actualUserId}/${originalFilenamePart}`;
                
                const result = await cloudinary.uploader.rename(tempPublicId, newPublicId, {
                    overwrite: true // Overwrite if an asset with the newPublicId already exists (unlikely during new registration)
                });
                return {
                    url: result.secure_url,
                    cloudinaryPublicId: result.public_id,
                };
            } catch (renameErr) {
                console.error(`Error renaming Cloudinary asset ${tempPublicId}:`, renameErr.message, renameErr.http_code);
                // CRITICAL: Handle this failure appropriately.
                // Options:
                // 1. Delete the newly created Scribe user in MongoDB.
                // 2. Mark the user as "registration incomplete" or "document verification pending".
                // 3. Keep the temporary Cloudinary assets and retry renaming later (requires cleanup logic).
                // For this example, we re-throw, which will cause the entire registration to fail.
                throw new Error(`Failed to finalize document upload. Please try again. (Asset: ${tempPublicId})`);
            }
        };

        // Rename and get final secure URLs and public IDs for all assets
        const finalProfile = await renameAsset(profile.cloudinaryPublicId, `blindHelper/profiles`);
        const finalAadhaarCard = await renameAsset(aadhaarCard.cloudinaryPublicId, `blindHelper/aadhaar_cards`);

        // Update the newly created user document with the final Cloudinary URLs
        newStudent.profile = finalProfile;
        newStudent.adhaarCard = finalAadhaarCard;
       
        await newStudent.save(); // Save the user with the updated image links

        // Generate JWT token
        const token = jwt.sign(
            { id: newStudent._id, email: newStudent.email, mobileNumber: newStudent.mobileNumber },
            process.env.JWT_KEY,
            { expiresIn: '2h' } // 2 hours expiry
        );

        // Set cookie
        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
            httpOnly: true, // Prevent client-side JS access
            secure: true, // Send only over HTTPS in production
            sameSite: 'None' 
        });

        const reply = {
            _id: newStudent._id,
            fullName: newStudent.fullName,
            profile: newStudent.profile.url,
            state: newStudent.state,
            city: newStudent.city,
        };

        res.status(201).json({ // 201 Created is appropriate for registration
            user: reply,
            message: "Successfully Registered"
        });

    } catch (e) {
        console.error("Registration error:", e);
        let errorMessage = "Registration failed due to an unexpected error.";
        let statusCode = 500;

        // Specific error messages for duplicate keys (Mongoose)
        if (e.code === 11000 && e.keyPattern) {
            if (e.keyPattern.mobileNumber) {
                errorMessage = "Mobile number is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.email) {
                errorMessage = "Email is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.aadhaarNumber) {
                errorMessage = "Aadhaar number is already registered.";
                statusCode = 409;
            }
        } else if (e.message) {
            // Catch custom errors thrown (e.g., from renameAsset or initial validation)
            errorMessage = e.message;
            statusCode = 400; // Client-side error likely
            if (e.message.includes('Failed to finalize upload')) { // From renameAsset failure
                statusCode = 500;
            }
        }

        res.status(statusCode).json({ message: errorMessage });
    }
};

// --- Login Controllers ---
const login = async (req, res) => {
    
    try {
         let user;
        // console.log("body",req.body)
        const { mobileNumber,email, password,loginType,loginAs } = req.body;


        if(loginType==="email"){
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        if(loginAs==="scribe")
         user = await Scribe.findOne({ email:email }) // Corrected from emailId
        else
         user=await Student.findOne({email:email})
      
       
    }
    else{ 
         if(!mobileNumber || !password) 
            return res.status(400).json({ message: "Mobile Number and password are required." });
          if(loginAs==="scribe")
          user = await Scribe.findOne({ mobileNumber:mobileNumber }) // Corrected from emailId
          else 
              user=await Student.findOne({mobileNumber:mobileNumber})

            
    }
     if (!user) {
        // console.log("no user");
            return res.status(404).json({ message: "User not found." });
        }

        // console.log("user is ",user)
        

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        // console.log("match",match);

        const token = jwt.sign(
            { id: user._id, email: user.email, mobileNumber: user.mobileNumber },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
          sameSite: 'None' 

        });

        const reply = {
            _id: user._id,
            fullName: user.fullName,
            profile: user.profile ? user.profile.url : null,
            state: user.state,
            city: user.city,
        }

        res.status(200).json({ // 200 OK for successful login
            user: reply,
            message: "Login successful"
        });
    } catch (e) {
        console.error("Login error", e);
        res.status(500).json({ message: e.message || "Login failed due to an unexpected error." });
    }
};



const logout = async (req, res) => {
    try {
        // console.log("test-logout");
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
          sameSite: 'None' 
        });
         console.log("logged out")
        res.status(200).send("Logged Out Successfully");
       
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).send("Error logging out: " + err.message);
    }
};

const stdreq = async (req, res) => {
    try {
        console.log("hi");
        const {examDate,examTime , city , examLanguage  } = req.body;

        avlscb = await Scribe.find({ city: city });
        console.log(avlscb);
        res.status(200).send( {data : avlscb});
     
    } catch (err) {
        console.error('Error generating upload signature:', err);
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }
};

const seltscb = async (req, res) => {
    try {
        
        const { scb , user , date , scribeRequest} = req.body;
        console.log(scribeRequest , "scb details");
        if (!scb || ! user) {
      return res.status(400).json({ error: 'scribeId and studentId are required' });
    }
     const existingRequest = await Request.findOne({
      studentId: user._id,
      scribeId: scb._id,
      date: date
    });

    if(existingRequest == null){
        const newRequest = new Request({
            studentId: user._id,
            scribeId: scb._id,
            city: scribeRequest.city,
            date: date, 
            language: scribeRequest.examLanguage,
    }
    );
    await newRequest.save();
    console.log("new request created");
    // }else{
    //     res.status(400).json({ error: 'Request already exists for this student and scribe on this date' });
    // }
}

  console.log(existingRequest , "existing request");

    const updatedScribe = await Scribe.findByIdAndUpdate(
      scb._id,
      {
        $push: {
          tempstudent: {
            student: user._id,
            date: new Date(date)
          }
        }
      },
      { new: true }
    ).populate('tempstudent.student'); // populate inner student


    if (!updatedScribe) {
      return res.status(404).json({ error: 'Scribe not found' });
    }

    res.status(200).json({ data: updatedScribe });
     
    } catch (err) {
        console.error('Error generating upload signature:', err);
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }
};

const getstudents = async(req , res)=>{
    try {

        const {user} = req.body;
        // console.log(user , "ussr")
        console.log( user._id ,"scribe details")


        const scb = await Scribe.findById(user._id);
        const reqest = await Request.find({scribeId: user._id})
        console.log(reqest , "request details");
        // console.log(scb , "fing id");
        res.status(200).json({data : scb.tempstudent  , data2 : reqest});
        
    } catch (error) {
       res.status(500).json({ error: 'Failed to generate upload credential' });
    }
}

const getPermanentStudents = async(req , res)=>{
    try {
        console.log(req.body)

        const {user } = req.body;
        console.log(user , "ussr")
        console.log( user._id ,"scribe details")

        
        const permanentStudent = await Scribe.findOne({"_id":user._id}).select("permanentstudent").populate("permanentstudent", "fullName city mobileNumber email educationLevel age");
        
        console.log("123456",permanentStudent);
        res.status(200).json(permanentStudent);
       
        
    } catch (error) {
       res.status(500).json({ error: 'Failed to generate upload credential jnkjn',error });
    }
}

const getPermanentScribe = async(req , res)=>{
    try {
        console.log(req.body)

        const {user } = req.body;
        console.log(user , "ussr")
        console.log( user._id ,"student details")

        
        const permanentScribe = await Student.findById(user._id).select("permanentscibe").populate("permanentscibe", "fullName city mobileNumber email");
        res.status(200).json(permanentScribe);
       
        
    } catch (error) {
       res.status(500).json({ error: 'Failed to generate upload credential jnkjn',error });
    }
}


const accept = async(req , res) =>{
   
    try {

        const {user , std} = req.body;
        console.log(std);
        console.log(user);

        const  updatedstudent= await Student.findByIdAndUpdate(
            std.student,
            {$set : { permanentscibe : user._id}}
        );

        // const updatedscribe = await Scribe.findByIdAndUpdate(
        //     user._id,
        //     {$add : { permanentstudent : std.student._id
        //   } } , $push : { bookedDates : std.date}}
        // );
        const updatedscribe = await Scribe.findByIdAndUpdate(
            user._id,
            {$addToSet : { permanentstudent : std.student } , $push : { bookedDates : std.date}}
            
        );



        // console.log(user , "jj");
        // console.log(std , "kk");

        res.status(200).json({data : " hi"});
        
        
    } catch (error) {
       res.status(500).json({ error: 'Failed to generate upload credential' });
    }

}

const acceptrequest = async(req , res) =>{

    try {

        const {request} = req.body;
        console.log(request._id , "request id");
        // console.log(user);
        const updatedRequest = await Request.findByIdAndUpdate(
            request._id,
            { isAccepted: "accepted" },
            { new: true }
        );

        const updatedscribe = await Scribe.findByIdAndUpdate(
            request.scribeId,
            {$addToSet : { permanentstudent : request.studentId } , $push : { bookedDates : request.date}}
            
        );

        const  updatedstudent= await Student.findByIdAndUpdate(
            request.studentId,
            {$set : { permanentscibe : request.scribeId} }
        );
        // const updatedScribe = await Scribe.findByIdAndUpdate(
        //     request.scribeId,
        //     { bookedDates: request.date },
        //     { new: true }
        // );
       

      res.json({data : "hi"});
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }

}

const getStudentRequests = async(req , res) =>{
    try {
        const {user ,status} = req.body; 
        const updatedRequest = await Request.find({
            studentId: user._id,
            isAccepted: status, // status can be "pending", "accepted", or "rejected"
            date:{$gt:new Date()}
        }
           
        ).populate('scribeId');
        res.status(200).json(updatedRequest);

    }catch (error) {
        console.error('Error fetching student requests:', error);
        res.status(500).json({ error: 'Failed to fetch student requests' });
    }   
} 

const getScribeRequests = async(req , res) =>{
    try {
        const {user ,status} = req.body; 
        const updatedRequest = await Request.find({
            scribeId: user._id,
            isAccepted: status, // status can be "pending", "accepted", or "rejected"
            date:{$gt:new Date()}
        }
           
        ).populate('studentId');
        res.status(200).json(updatedRequest);

    }catch (error) {
        console.error('Error fetching student requests:', error);
        res.status(500).json({ error: 'Failed to fetch student requests' });
    }   
}


const rejectrequest = async(req , res) =>{

    try {

        const {currentRejectRequest , status ,rejectionReason } = req.body;
        console.log(rejectionReason , "rejjj");
        const updatedRequest = await Request.findByIdAndUpdate(
            currentRejectRequest._id,
            { isAccepted: "rejected", description: rejectionReason },
            { new: true }
        );
        console.log(updatedRequest , "updated request");
        
        // console.log(currentRejectRequest , "current reject request");

        res.json({data : "hi"});
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }
}

const getRejectedRequests = async(req , res) =>{
    try {
        const {user} = req.body;
        console.log(user , "user details");
        const rejectedRequests = await Request.find({ studentId: user._id, isAccepted: "rejected" })
        console.log(rejectedRequests , "rejected requests");

        res.status(200).json(rejectedRequests);
    }   
    catch (error) {
        console.error('Error fetching rejected requests:', error);
        res.status(500).json({ error: 'Failed to fetch rejected requests' });
    }
}; 

const getstudentprofile = async (req, res) => {
    try {
        const { user } = req.body; // Assuming userId is passed as a URL parameter
        console.log(user , "user details");
        const student = await Student.findById(user._id)
        console.log(student , "student details");
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }else{
           res.status(200).json({student});
        }
                

    }catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
}

const getscribeprofile = async (req, res) => {
    try {
        const { user } = req.body; // Assuming userId is passed as a URL parameter
        console.log(user , "user details");
        const scribe = await Scribe.findById(user._id)
        console.log(scribe , "student details");
        if (!scribe) {
            return res.status(404).json({ error: 'Student not found' });
        }else{
           res.status(200).json({scribe});
        }
                

    }catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
}

const getStudentHistory=async(req,res)=>{
    try{
    const {user}=req.body;
    // console.log("hi");
    const history=await Request.find({studentId:user._id,date: {$lt: new Date()}}).populate("scribeId","fullName").select("city date language scribeId")
    // console.log("history is",history);
    const resHistory=history.map((data)=>{
        return {
            "id":data._id,
            "scribeName":data.scribeId.fullName,
            "city":data.city,
            "date":data.date,
            "language":data.language
        }

    })
    res.status(200).json({
        "history":resHistory
    });
    }
    catch(e){
        res.status(400).json({
            "message":"Internal Server Error",
        })
    }
  
}

const getScribeHistory=async(req,res)=>{
    try{
    const {user}=req.body;
    // console.log("hi");
    const history=await Request.find({scribeId:user._id,date: {$lt: new Date()} }).populate("studentId","fullName").select("city date language scribeId")
    // console.log("history is",history);
    const resHistory=history.map((data)=>{
        return {
            "id":data._id,
            "studentName":data.studentId.fullName,
            "city":data.city,
            "date":data.date,
            "language":data.language
        }

    })
    res.status(200).json({
        "history":resHistory
    });
    }
    catch(e){
        res.status(400).json({
            "message":"Internal Server Error",
        })
    }
  
}

const rateScribe = async (req, res) => {
    try {
        const { requestId, rating, user } = req.body;

        // Validate input
        if (!requestId || !rating || !user || !user._id) {
            return res.status(400).json({
                success: false,
                message: 'Request ID, rating, and user information are required'
            });
        }

        // Validate rating value
        if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be an integer between 1 and 5'
            });
        }

        // Find the request
        const request = await Request.findById(requestId).populate('scribeId');
        
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check if the request belongs to the user
        if (request.studentId.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to rate this request'
            });
        }

        // Check if request is accepted
        if (request.isAccepted !== 'accepted') {
            return res.status(400).json({
                success: false,
                message: 'Can only rate accepted requests'
            });
        }

        // Check if already rated
        if (request.rating) {
            return res.status(400).json({
                success: false,
                message: 'This request has already been rated'
            });
        }

        // Update request with rating
        request.rating = rating;
        await request.save();

        // Add rating to scribe's ratings array
        const scribe = await Scribe.findById(request.scribeId._id);
        if (scribe) {
            scribe.ratings.push({
                value: rating,
                givenBy: user._id,
                date: new Date()
            });
            
            // The average rating will be automatically calculated by the pre-save middleware
            await scribe.save();
        }

        res.status(200).json({
            success: true,
            message: 'Rating submitted successfully',
            data: {
                requestId: request._id,
                rating: request.rating,
                scribeAverageRating: scribe.averageRating
            }
        });

    } catch (error) {
        console.error('Error rating scribe:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

          
module.exports = { registerScribe, uploadSignature, login, logout,registerStudent, getscribeprofile,getPermanentScribe  , stdreq , seltscb , getstudents , accept, getPermanentStudents , acceptrequest , rejectrequest , getRejectedRequests  , getStudentRequests , getstudentprofile,getStudentHistory,getScribeHistory , getScribeRequests , rateScribe};