

// import React, { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import useGlobal from '../../utils/GlobalContext';
// import {
//   BookOpen,
//   Globe,
//   Sun,
//   Moon,
//   Eye,
//   EyeOff,
//   Users,
//   ArrowRight,
//   Mail,
//   Smartphone,
//   CheckCircle,
//   XCircle,
//   UploadCloud,
//   Image,
//   IdCard,
//   ChevronDown, // Keep ChevronDown for the select dropdown icon
// } from 'lucide-react';
// import axios from 'axios';
// import axiosClient from '../../utils/axiosClient';
// import { useNavigate } from 'react-router';

// // --- Translations Object ---
// const translations = {
//   en: {
//     skipToMain: 'Skip to main content',
//     scribeConnect: 'ScribeConnect',
//     tagline: 'Bridging Learning Through Accessibility',
//     navigation: 'Main navigation',
//     mainContent: 'Student Registration Page', // Changed
//     createYourAccount: 'Become a Student', // Changed
//     aadhaarNumber: 'Aadhaar Number',
//     fullName: 'Full Name',
//     age: 'Age',
//     emailAddress: 'Email Address',
//     phoneNumber: 'Mobile Number',
//     state: 'State',
//     city: 'City',
   
//     educationLevel: 'Education Level', // Changed
//     disability: 'Type of Disability', // Added
//     password: 'Password',
//     confirmPassword: 'Confirm Password',
//     showPassword: 'Show Password',
//     hidePassword: 'Hide Password',
//     userType: 'Register as',
//     scribe: 'Scribe', // Retained for display in radio, though student is default
//     student: 'Student', // Added for display in radio
//     profileImage: 'Profile Image (JPG/PNG/WEBP)',
//     aadhaarCardImage: 'Aadhaar Card (JPG/PNG/WEBP)',
//     register: 'Register',
//     alreadyHaveAccount: 'Already have an account?',
//     loginNow: 'Login Now',
//     copyright: '© 2025 ScribeConnect. All rights reserved.',
//     highContrastMode: 'High Contrast Mode',
//     normalMode: 'Normal Mode',
//     languageSwitcher: 'Language switcher',
//     english: 'English',
//     hindi: 'Hindi',
//     languageChangedTo: (lang) => `Language changed to ${lang}.`,
//     highContrastEnabled: 'High contrast mode enabled.',
//     highContrastDisabled: 'High contrast mode disabled.',
//     selectEducationLevel: 'Select your education level', // Changed

//     // Education Level options (aligned with backend enum)
//     educationLevels: {
//       'High School': 'High School',
//       'Undergraduate': 'Undergraduate',
//       'Graduate': 'Graduate',
//       'Postgraduate': 'Postgraduate',
//       'Other': 'Other'
//     },

//     // Validation messages
//     aadhaarRequired: 'Aadhaar number is required.',
//     aadhaarInvalid: 'Please enter a valid 12-digit Aadhaar number.',
//     fullNameRequired: 'Full Name is required.',
//     ageRequired: 'Age is required.',
//     ageMin: 'Age must be at least 10 years.', // Backend is 10, keeping consistent for now
//     ageMax: 'Age cannot exceed 99 years.',
//     emailInvalid: 'Please enter a valid email address.',
//     phoneRequired: 'Mobile number is required.',
//     phoneInvalid: 'Please enter a valid 10-digit mobile number.',
//     stateRequired: 'State is required.',
//     cityRequired: 'City is required.',
    
//     educationLevelRequired: 'Education level is required.', // Changed
//     disabilityRequired: 'Type of Disability is required.', // Added
//     passwordRequired: 'Password is required.',
//     passwordMinLength: 'Password must be at least 6 characters.',
//     passwordMismatch: 'Passwords do not match.',
//     profileImageRequired: 'Profile image is required.',
//     aadhaarCardImageRequired: 'Aadhaar card image is required.',
//     fileTypeInvalidImage: 'Invalid file type. Please upload JPG, PNG, or WEBP.',
//     fileSizeExceeded: (maxSizeMB) => `File size must be up to ${maxSizeMB} MB.`,
//     generalUploadError: 'Failed to upload files.',

//     registrationSuccess: 'Registration successful! Please log in.',
//     registrationError: 'Registration failed. Please try again.',
//     uploadingFiles: 'Uploading files...',
//     submittingRegistration: 'Submitting registration...',
//   },
//   hi: {
//     skipToMain: 'मुख्य सामग्री पर जाएँ',
//     scribeConnect: 'स्क्राइबकनेक्ट',
//     tagline: 'पहुँच के माध्यम से शिक्षा को जोड़ना',
//     navigation: 'मुख्य नेविगेशन',
//     mainContent: 'छात्र पंजीकरण पृष्ठ', // Changed
//     createYourAccount: 'छात्र बनें', // Changed
//     aadhaarNumber: 'आधार नंबर',
//     fullName: 'पूरा नाम',
//     age: 'आयु',
//     emailAddress: 'ईमेल पता',
//     phoneNumber: 'मोबाइल नंबर',
//     state: 'राज्य',
//     city: 'शहर',
 
//     educationLevel: 'शिक्षा का स्तर', // Changed
//     disability: 'विकलांगता का प्रकार', // Added
//     password: 'पासवर्ड',
//     confirmPassword: 'पासवर्ड की पुष्टि करें',
//     showPassword: 'पासवर्ड दिखाएं',
//     hidePassword: 'पासवर्ड छुपाएं',
//     userType: 'इसके रूप में पंजीकरण करें',
//     scribe: 'स्क्राइब',
//     student: 'छात्र',
//     profileImage: 'प्रोफ़ाइल छवि (JPG/PNG/WEBP)',
//     aadhaarCardImage: 'आधार कार्ड (JPG/PNG/WEBP)',
//     register: 'पंजीकरण करें',
//     alreadyHaveAccount: 'पहले से ही एक खाता है?',
//     loginNow: 'अभी लॉगिन करें',
//     copyright: '© 2025 स्क्राइबकनेक्ट। सभी अधिकार सुरक्षित।',
//     highContrastMode: 'उच्च कंट्रास्ट मोड',
//     normalMode: 'सामान्य मोड',
//     languageSwitcher: 'भाषा चयनकर्ता',
//     english: 'अंग्रेजी',
//     hindi: 'हिंदी',
//     languageChangedTo: (lang) => `भाषा बदलकर ${lang} हो गई है।`,
//     highContrastEnabled: 'उच्च कंट्रास्ट मोड सक्षम किया गया।',
//     highContrastDisabled: 'उच्च कंट्रास्ट मोड अक्षम किया गया।',
//     selectEducationLevel: 'अपनी शिक्षा का स्तर चुनें', // Changed

//     // Education Level options
//     educationLevels: {
//       'High School': 'हाई स्कूल',
//       'Undergraduate': 'स्नातक',
//       'Graduate': 'स्नातकोत्तर',
//       'Postgraduate': 'पोस्ट ग्रेजुएट',
//       'Other': 'अन्य'
//     },

//     // Validation messages
//     aadhaarRequired: 'आधार नंबर आवश्यक है।',
//     aadhaarInvalid: 'कृपया एक वैध 12 अंकों का आधार नंबर दर्ज करें।',
//     fullNameRequired: 'पूरा नाम आवश्यक है।',
//     ageRequired: 'आयु आवश्यक है।',
//     ageMin: 'आयु कम से कम 10 वर्ष होनी चाहिए।',
//     ageMax: 'आयु 99 वर्ष से अधिक नहीं हो सकती।',
//     emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें।',
//     phoneRequired: 'मोबाइल नंबर आवश्यक है।',
//     phoneInvalid: 'कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।',
//     stateRequired: 'राज्य आवश्यक है।',
//     cityRequired: 'शहर आवश्यक है।',

//     educationLevelRequired: 'शिक्षा का स्तर आवश्यक है।', // Changed
//     disabilityRequired: 'विकलांगता का प्रकार आवश्यक है।', // Added
//     passwordRequired: 'पासवर्ड आवश्यक है।',
//     passwordMinLength: 'पासवर्ड कम से से 6 वर्णों का होना चाहिए।',
//     passwordMismatch: 'पासवर्ड मेल नहीं खाते हैं।',
//     profileImageRequired: 'प्रोफ़ाइल छवि आवश्यक है।',
//     aadhaarCardImageRequired: 'आधार कार्ड छवि आवश्यक है।',
//     fileTypeInvalidImage: 'अमान्य फ़ाइल प्रकार। कृपया JPG, PNG, या WEBP अपलोड करें।',
//     fileSizeExceeded: (maxSizeMB) => `फ़ाइल का आकार ${maxSizeMB} MB तक होना चाहिए।`,
//     generalUploadError: 'फ़ाइलें अपलोड करने में विफल।',

//     registrationSuccess: 'पंजीकरण सफल! कृपया लॉगिन करें।',
//     registrationError: 'पंजीकरण विफल। कृपया पुनः प्रयास करें।',
//     uploadingFiles: 'फ़ाइलें अपलोड हो रही हैं...',
//     submittingRegistration: 'पंजीकरण जमा हो रहा है...',
//   },
// };

// // --- Zod Schema for Validation ---
// const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// const studentRegistrationSchema = (t) => z.object({
//   aadhaarNumber: z.string()
//     .min(1, { message: t.aadhaarRequired })
//     .regex(/^\d{12}$/, { message: t.aadhaarInvalid }),
//   fullName: z.string()
//     .min(1, { message: t.fullNameRequired })
//     .trim(),
//   age: z.coerce.number()
//     .min(1, { message: t.ageRequired })
//     .min(10, { message: t.ageMin })
//     .max(99, { message: t.ageMax }),
//   email: z.string()
//     .min(1, { message: t.emailRequired })
//     .regex(/^\S+@\S+\.\S+$/, { message: t.emailInvalid }),
//   mobileNumber: z.string()
//     .min(1, { message: t.phoneRequired })
//     .regex(/^\d{10}$/, { message: t.phoneInvalid }),
//   state: z.string()
//     .min(1, { message: t.stateRequired }),
//   city: z.string()
//     .min(1, { message: t.cityRequired }),
 
//   educationLevel: z.enum([
//     'High School',
//     'Undergraduate',
//     'Graduate',
//     'Postgraduate',
//     'Other'
//   ], {
//     errorMap: () => ({ message: t.educationLevelRequired })
//   }),
//   disability: z.string()
//     .min(1, { message: t.disabilityRequired })
//     .trim(),
//   password: z.string()
//     .min(1, { message: t.passwordRequired })
//     .min(6, { message: t.passwordMinLength }),
//   confirmPassword: z.string()
//     .min(1, { message: t.passwordRequired }),
//   profile: z.any()
//     .refine((files) => files?.length > 0, { message: t.profileImageRequired })
//     .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, {
//       message: t.fileSizeExceeded(MAX_IMAGE_SIZE / (1024 * 1024)),
//     })
//     .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
//       message: t.fileTypeInvalidImage,
//     }),
//   aadhaarCard: z.any()
//     .refine((files) => files?.length > 0, { message: t.aadhaarCardImageRequired })
//     .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, {
//       message: t.fileSizeExceeded(MAX_IMAGE_SIZE / (1024 * 1024)),
//     })
//     .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
//       message: t.fileTypeInvalidImage,
//     }),
//   userType: z.literal('student'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: t.passwordMismatch,
//   path: ['confirmPassword'],
// });


// const StudentRegister = () => {
//   const navigate = useNavigate();
//   const {language, setLanguage}= useGlobal();
//   const {isAuthenticated,setIsAuthenticated}=useGlobal();
//   const {user,setUser}=useGlobal();
//    const {highContrast, setHighContrast} = useGlobal();
//   const [announcements, setAnnouncements] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [registrationStatus, setRegistrationStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({ profile: 0, aadhaar: 0 });
//   const [currentOperation, setCurrentOperation] = useState('');

//   // File previews
//   const [profilePreview, setProfilePreview] = useState(null);
//   const [aadhaarPreview, setAadhaarPreview] = useState(null);

//   const languageDropdownRef = useRef(null);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

//   const t = translations[language];

//   // React Hook Form setup
//   const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
//     resolver: zodResolver(studentRegistrationSchema(t)),
//     mode: 'onTouched',
//     defaultValues: {
//       aadhaarNumber: '',
//       fullName: '',
//       age: '',
//       mobileNumber: '',
//       email: '',
//       state: '',
//       city: '',
     
//       educationLevel: '', // Initialize as empty string for select
//       disability: '',
//       password: '',
//       confirmPassword: '',
//       profile: null,
//       aadhaarCard: null,
//       userType: 'student',
//     },
//   });

//   const watchProfile = watch('profile');
//   const watchAadhaar = watch('aadhaarCard');

//   // Handle file preview generation
//   useEffect(() => {
//     if (watchProfile && watchProfile.length > 0 && watchProfile[0] instanceof File) {
//       const url = URL.createObjectURL(watchProfile[0]);
//       setProfilePreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setProfilePreview(null);
//     }
//   }, [watchProfile]);

//   useEffect(() => {
//     if (watchAadhaar && watchAadhaar.length > 0 && watchAadhaar[0] instanceof File) {
//       const url = URL.createObjectURL(watchAadhaar[0]);
//       setAadhaarPreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setAadhaarPreview(null);
//     }
//   }, [watchAadhaar]);

//   // Base classes for the theme
//   const baseClasses = highContrast
//     ? 'bg-black text-white'
//     : 'bg-gray-900 text-gray-100';

//   const focusBorderClasses = highContrast
//     ? 'focus:border-white'
//     : 'focus:border-blue-500';

//   const buttonPrimaryClasses = highContrast
//     ? 'bg-white text-black border border-white hover:bg-gray-200 focus:bg-gray-200'
//     : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700';

//   const linkClasses = highContrast
//     ? 'text-white underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white'
//     : 'text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500';

//   const borderClasses = highContrast ? 'border-white' : 'border-gray-700';
//   const inputBgClasses = highContrast ? 'bg-gray-800' : 'bg-gray-700';
//   const inputBorderDefaultClasses = highContrast ? 'border-white' : 'border-gray-600';

//   // Handle announcements
//   useEffect(() => {
//     if (announcements) {
//       const liveRegion = document.querySelector('[aria-live="polite"]');
//       if (liveRegion) {
//         liveRegion.textContent = announcements;
//         const timer = setTimeout(() => liveRegion.textContent = '', 3000);
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [announcements]);

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     setAnnouncements(t.languageChangedTo(lang === 'en' ? 'English' : 'Hindi'));
//     setIsLanguageDropdownOpen(false);
//   };

//   const toggleHighContrast = () => {
//     setHighContrast(!highContrast);
//     setAnnouncements(
//       !highContrast ? t.highContrastEnabled : t.highContrastDisabled
//     );
//   };

//   // Cloudinary Upload function
//   const uploadToCloudinary = async (file, fileType) => {
//     try {
//       const signatureRes = await axiosClient.get(`/auth/uploadSignature?fileType=${fileType}`);
//       const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureRes.data;

//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('api_key', api_key);
//       formData.append('timestamp', timestamp);
//       formData.append('signature', signature);
//       formData.append('public_id', public_id);
//       const resource_type = 'image';

//       const uploadRes = await axios.post(
//         upload_url,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(prev => ({ ...prev, [fileType]: percentCompleted }));
//           },
//         }
//       );

//       return {
//         secureUrl: uploadRes.data.secure_url,
//         cloudinaryPublicId: uploadRes.data.public_id,
//       };

//     } catch (error) {
//       console.error(`Error uploading ${fileType} to Cloudinary:`, error);
//       throw new Error(t.generalUploadError);
//     }
//   };

//   const onSubmit = async (data) => {
//     setRegistrationStatus('');
//     setIsLoading(true);
//     setUploadProgress({ profile: 0, aadhaar: 0 });
//     setAnnouncements('Initiating registration process...');

//     try {
//       setCurrentOperation(t.uploadingFiles);
//       setAnnouncements(t.uploadingFiles);

//       const [profileData, aadhaarData] = await Promise.all([
//         uploadToCloudinary(data.profile[0], 'profile'),
//         uploadToCloudinary(data.aadhaarCard[0], 'aadhaar'),
//       ]);

//       setCurrentOperation(t.submittingRegistration);
//       setAnnouncements(t.submittingRegistration);

//       const registrationPayload = {
//         aadhaarNumber: data.aadhaarNumber,
//         fullName: data.fullName,
//         age: parseInt(data.age),
//         mobileNumber: data.mobileNumber,
//         email: data.email || '',
//         state: data.state,
//         city: data.city,
       
//         educationLevel: data.educationLevel, // Using selected value from dropdown
//         disability: data.disability,
//         password: data.password,
//         profile: { url: profileData.secureUrl, cloudinaryPublicId: profileData.cloudinaryPublicId },
//         aadhaarCard: { url: aadhaarData.secureUrl, cloudinaryPublicId: aadhaarData.cloudinaryPublicId },
//       };

//       const registerRes = await axiosClient.post("/auth/registerStudent", registrationPayload);
//       console.log("registrationDetail", registerRes);

//       if (registerRes.status === 201) {
//         setRegistrationStatus('success');
//         setAnnouncements(t.registrationSuccess);
//         reset();
//         setProfilePreview(null);
//         setAadhaarPreview(null);
//         setUser({...registerRes?.data?.user,role:"student"});
//         setIsAuthenticated(true);
//         navigate("/studentHome");
//       } else {
//         setRegistrationStatus('error');
//         setAnnouncements(registerRes.data.message || t.registrationError);
//       }
     

//     } catch (error) {
//       console.error('Registration failed:', error);
//       setRegistrationStatus('error');
//       const errorMessage = error.response?.data?.message || error.message || t.registrationError;
//       setAnnouncements(errorMessage);
//     } finally {
//       setIsLoading(false);
//       setUploadProgress({ profile: 0, aadhaar: 0 });
//       setCurrentOperation('');
   
      
//     }
//   };

//   // Close language dropdown on outside click or escape key
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
//         setIsLanguageDropdownOpen(false);
//       }
//     };

//     const handleEscapeKey = (event) => {
//       if (event.key === 'Escape' && isLanguageDropdownOpen) {
//         setIsLanguageDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleEscapeKey);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEscapeKey);
//     };
//   }, [isLanguageDropdownOpen]);

//   return (
//     <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
//       {/* Screen Reader Announcements */}
//       <div aria-live="polite" aria-atomic="true" className="sr-only">
//         {announcements}
//       </div>

//       {/* Skip Link */}
//       <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:p-2 focus:rounded-md z-50">
//         {t.skipToMain}
//       </a>

//       {/* Header */}
//       <header className={`py-4 px-6 md:px-12 flex justify-between items-center ${borderClasses} border-b`} role="banner">
//         <div className="flex items-center space-x-3">
//           <BookOpen size={32} className="text-blue-500" aria-hidden="true" />
//           <h1 className="text-2xl font-bold">
//             <span className="sr-only">ScribeConnect</span>
//             <span aria-hidden="true">{t.scribeConnect}</span>
//           </h1>
//           <p className="sr-only" id="tagline-description">{t.tagline}</p>
//         </div>

//         <div className="flex items-center space-x-4">
//           {/* Language Switcher */}
//           <div className="relative" ref={languageDropdownRef}>
//             <button
//               onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//               className={`flex items-center p-2 rounded-md ${highContrast ? 'bg-gray-800 text-white border border-white' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:border-white focus:border-2 transition-all duration-150`}
//               aria-haspopup="true"
//               aria-expanded={isLanguageDropdownOpen}
//               aria-label={t.languageSwitcher}
//             >
//               <Globe size={20} aria-hidden="true" />
//               <span className="ml-2 hidden sm:inline-block">
//                 {language === 'en' ? t.english : t.hindi}
//               </span>
//               <ChevronDown size={16} className="ml-1" aria-hidden="true" />
//             </button>
//             {isLanguageDropdownOpen && (
//               <ul
//                 role="listbox"
//                 className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${highContrast ? 'bg-black border border-white' : 'bg-gray-800'} ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
//                 tabIndex="-1"
//                 aria-activedescendant={language === 'en' ? 'lang-en' : 'lang-hi'}
//               >
//                 <li
//                   id="lang-en"
//                   role="option"
//                   aria-selected={language === 'en'}
//                   onClick={() => handleLanguageChange('en')}
//                   className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'en' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white transition-all duration-150`}
//                   tabIndex="0"
//                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLanguageChange('en'); }}
//                 >
//                   {t.english}
//                 </li>
//                 <li
//                   id="lang-hi"
//                   role="option"
//                   aria-selected={language === 'hi'}
//                   onClick={() => handleLanguageChange('hi')}
//                   className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'hi' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white transition-all duration-150`}
//                   tabIndex="0"
//                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLanguageChange('hi'); }}
//                 >
//                   {t.hindi}
//                 </li>
//               </ul>
//             )}
//           </div>

//           {/* High Contrast Toggle */}
//           <button
//             onClick={toggleHighContrast}
//             className={`p-2 rounded-md ${highContrast ? 'bg-white text-black' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:border-white focus:border-2 transition-all duration-150`}
//             aria-pressed={highContrast}
//             aria-label={highContrast ? t.normalMode : t.highContrastMode}
//           >
//             {highContrast ? (
//               <Sun size={20} aria-hidden="true" />
//             ) : (
//               <Moon size={20} aria-hidden="true" />
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main id="main-content" role="main" aria-label={t.mainContent} className="flex flex-col items-center justify-center py-12 px-4">
//         <div className={`w-full max-w-2xl p-8 rounded-lg shadow-xl ${highContrast ? 'bg-black border border-white' : 'bg-gray-800'}`}>
//           <h2 className={`text-3xl font-bold text-center mb-6 ${highContrast ? 'text-white' : 'text-blue-400'}`}>
//             {t.createYourAccount}
//           </h2>

//           <form onSubmit={handleSubmit(onSubmit)} noValidate>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="fullName" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.fullName}
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   {...register('fullName')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.fullName ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.fullName}
//                   aria-describedby={errors.fullName ? "fullName-error" : null}
//                 />
//                 {errors.fullName && (
//                   <p id="fullName-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.fullName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Aadhaar Number */}
//               <div>
//                 <label htmlFor="aadhaarNumber" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.aadhaarNumber}
//                 </label>
//                 <input
//                   type="text"
//                   id="aadhaarNumber"
//                   {...register('aadhaarNumber')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.aadhaarNumber ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.aadhaarNumber}
//                   aria-describedby={errors.aadhaarNumber ? "aadhaarNumber-error" : null}
//                   placeholder="e.g., 123456789012"
//                 />
//                 {errors.aadhaarNumber && (
//                   <p id="aadhaarNumber-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.aadhaarNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* Age */}
//               <div>
//                 <label htmlFor="age" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.age}
//                 </label>
//                 <input
//                   type="number"
//                   id="age"
//                   {...register('age')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.age ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.age}
//                   aria-describedby={errors.age ? "age-error" : null}
//                   min="10"
//                   max="99"
//                 />
//                 {errors.age && (
//                   <p id="age-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.age.message}
//                   </p>
//                 )}
//               </div>

//               {/* Mobile Number */}
//               <div>
//                 <label htmlFor="mobileNumber" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.phoneNumber}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     id="mobileNumber"
//                     {...register('mobileNumber')}
//                     className={`w-full p-3 pl-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.mobileNumber ? 'border-red-500' : ''}`}
//                     aria-required="true"
//                     aria-invalid={!!errors.mobileNumber}
//                     aria-describedby={errors.mobileNumber ? "mobileNumber-error" : null}
//                     placeholder="e.g., 9876543210"
//                   />
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2">
//                     <Smartphone size={18} className="text-gray-400" aria-hidden="true" />
//                   </span>
//                 </div>
//                 {errors.mobileNumber && (
//                   <p id="mobileNumber-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.mobileNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* Email Address */}
//               <div>
//                 <label htmlFor="email" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.emailAddress}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     id="email"
//                     {...register('email')}
//                     className={`w-full p-3 pl-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.email ? 'border-red-500' : ''}`}
//                     aria-invalid={!!errors.email}
//                     aria-describedby={errors.email ? "email-error" : null}
//                     placeholder="e.g., student@example.com"
//                   />
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2">
//                     <Mail size={18} className="text-gray-400" aria-hidden="true" />
//                   </span>
//                 </div>
//                 {errors.email && (
//                   <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* State */}
//               <div>
//                 <label htmlFor="state" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.state}
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   {...register('state')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.state ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.state}
//                   aria-describedby={errors.state ? "state-error" : null}
//                   placeholder="e.g., Maharashtra"
//                 />
//                 {errors.state && (
//                   <p id="state-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.state.message}
//                   </p>
//                 )}
//               </div>

//               {/* City */}
//               <div>
//                 <label htmlFor="city" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.city}
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   {...register('city')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.city ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.city}
//                   aria-describedby={errors.city ? "city-error" : null}
//                   placeholder="e.g., Mumbai"
//                 />
//                 {errors.city && (
//                   <p id="city-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.city.message}
//                   </p>
//                 )}
//               </div>


//               {/* Education Level - Select Dropdown */}
//               <div>
//                 <label htmlFor="educationLevel" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.educationLevel}
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="educationLevel"
//                     {...register('educationLevel')}
//                     className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.educationLevel ? 'border-red-500' : ''} appearance-none`}
//                     aria-required="true"
//                     aria-invalid={!!errors.educationLevel}
//                     aria-describedby={errors.educationLevel ? "educationLevel-error" : null}
//                   >
//                     <option value="">{t.selectEducationLevel}</option>
//                     {Object.keys(t.educationLevels).map((key) => (
//                       <option key={key} value={key}>{t.educationLevels[key]}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} aria-hidden="true" />
//                 </div>
//                 {errors.educationLevel && (
//                   <p id="educationLevel-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.educationLevel.message}
//                   </p>
//                 )}
//               </div>

//               {/* Disability */}
//               <div>
//                 <label htmlFor="disability" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.disability}
//                 </label>
//                 <input
//                   type="text"
//                   id="disability"
//                   {...register('disability')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.disability ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.disability}
//                   aria-describedby={errors.disability ? "disability-error" : null}
//                   placeholder="e.g., Visual Impairment"
//                 />
//                 {errors.disability && (
//                   <p id="disability-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.disability.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <label htmlFor="password" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.password}
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     {...register('password')}
//                     className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.password ? 'border-red-500' : ''}`}
//                     aria-required="true"
//                     aria-invalid={!!errors.password}
//                     aria-describedby={errors.password ? "password-error" : null}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className={`absolute right-3 top-1/2 -translate-y-1/2 ${highContrast ? 'text-white' : 'text-gray-400'} hover:text-blue-500 focus:outline-none focus:border-white focus:border-2 rounded transition-all duration-150`}
//                     aria-label={showPassword ? t.hidePassword : t.showPassword}
//                   >
//                     {showPassword ? (
//                       <EyeOff size={20} aria-hidden="true" />
//                     ) : (
//                       <Eye size={20} aria-hidden="true" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p id="password-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.confirmPassword}
//                 </label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   id="confirmPassword"
//                   {...register('confirmPassword')}
//                   className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
//                   aria-required="true"
//                   aria-invalid={!!errors.confirmPassword}
//                   aria-describedby={errors.confirmPassword ? "confirmPassword-error" : null}
//                 />
//                 {errors.confirmPassword && (
//                   <p id="confirmPassword-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* User Type - Locked to Student */}
//             <div className="mb-6">
//               <fieldset>
//                 <legend className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.userType}
//                 </legend>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="userType-student"
//                     name="userType"
//                     value="student"
//                     checked={true}
//                     readOnly
//                     {...register('userType')}
//                     className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 cursor-not-allowed"
//                     aria-label={t.student}
//                   />
//                   <label htmlFor="userType-student" className="ml-2 flex items-center cursor-not-allowed">
//                     <BookOpen size={18} className="text-green-500 mr-1" aria-hidden="true" />
//                     <span className={`text-base ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                       {t.student}
//                     </span>
//                   </label>
//                 </div>
//               </fieldset>
//             </div>

//             {/* File Uploads Section */}
//             <h3 className={`text-xl font-bold mb-4 ${highContrast ? 'text-white' : 'text-blue-300'}`}>
//               Required Documents
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Profile Image Upload */}
//               <div className="flex flex-col items-center">
//                 <label
//                   htmlFor="profile"
//                   className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${highContrast ? 'border-white hover:bg-gray-900' : 'border-gray-600 hover:bg-gray-700'} ${errors.profile ? 'border-red-500' : ''}`}
//                 >
//                   {profilePreview ? (
//                     <img
//                       src={profilePreview}
//                       alt="Profile preview"
//                       className="max-h-full max-w-full object-contain p-1 rounded-lg"
//                     />
//                   ) : (
//                     <>
//                       <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
//                       <p className={`text-sm text-center ${highContrast ? 'text-white' : 'text-gray-400'}`}>
//                         {t.profileImage}
//                       </p>
//                     </>
//                   )}
//                   <input
//                     type="file"
//                     id="profile"
//                     {...register('profile')}
//                     className="hidden"
//                     accept="image/jpeg,image/png,image/webp"
//                     aria-describedby={errors.profile ? "profile-error" : null}
//                   />
//                 </label>
//                 {errors.profile && (
//                   <p id="profile-error" role="alert" className="text-red-500 text-sm mt-1 text-center">
//                     {errors.profile.message}
//                   </p>
//                 )}
//               </div>

//               {/* Aadhaar Card Upload */}
//               <div className="flex flex-col items-center">
//                 <label
//                   htmlFor="aadhaarCard"
//                   className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${highContrast ? 'border-white hover:bg-gray-900' : 'border-gray-600 hover:bg-gray-700'} ${errors.aadhaarCard ? 'border-red-500' : ''}`}
//                 >
//                   {aadhaarPreview ? (
//                     <img
//                       src={aadhaarPreview}
//                       alt="Aadhaar card preview"
//                       className="max-h-full max-w-full object-contain p-1 rounded-lg"
//                     />
//                   ) : (
//                     <>
//                       <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
//                       <p className={`text-sm text-center ${highContrast ? 'text-white' : 'text-gray-400'}`}>
//                         {t.aadhaarCardImage}
//                       </p>
//                     </>
//                   )}
//                   <input
//                     type="file"
//                     id="aadhaarCard"
//                     {...register('aadhaarCard')}
//                     className="hidden"
//                     accept="image/jpeg,image/png,image/webp"
//                     aria-describedby={errors.aadhaarCard ? "aadhaarCard-error" : null}
//                   />
//                 </label>
//                 {errors.aadhaarCard && (
//                   <p id="aadhaarCard-error" role="alert" className="text-red-500 text-sm mt-1 text-center">
//                     {errors.aadhaarCard.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:border-2 ${buttonPrimaryClasses} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//               disabled={isLoading}
//               aria-live="assertive"
//               aria-busy={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" aria-hidden="true"></span>
//                   {currentOperation || 'Processing...'}
//                 </span>
//               ) : (
//                 t.register
//               )}
//             </button>

//             {/* Status Messages */}
//             {registrationStatus === 'success' && (
//               <div role="alert" className="mt-4 p-3 rounded-md bg-green-700 text-white text-center flex items-center justify-center">
//                 <CheckCircle size={20} className="mr-2" aria-hidden="true" />
//                 {t.registrationSuccess}
//               </div>
//             )}
//             {registrationStatus === 'error' && (
//               <div role="alert" className="mt-4 p-3 rounded-md bg-red-700 text-white text-center flex items-center justify-center">
//                 <XCircle size={20} className="mr-2" aria-hidden="true" />
//                 {t.registrationError}
//               </div>
//             )}

//             {/* Upload Progress Indicators */}
//             {(uploadProgress.profile > 0 || uploadProgress.aadhaar > 0) && isLoading && (
//               <div className="mt-4 space-y-2">
//                 <div className="text-sm text-gray-400">Upload Progress:</div>
//                 {uploadProgress.profile > 0 && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs text-gray-500 w-20">Profile:</span>
//                     <div className="flex-1 bg-gray-700 rounded-full h-2">
//                       <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.profile}%` }}></div>
//                     </div>
//                     <span className="text-xs text-gray-500 w-10">{uploadProgress.profile}%</span>
//                   </div>
//                 )}
//                 {uploadProgress.aadhaar > 0 && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs text-gray-500 w-20">Aadhaar:</span>
//                     <div className="flex-1 bg-gray-700 rounded-full h-2">
//                       <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.aadhaar}%` }}></div>
//                     </div>
//                     <span className="text-xs text-gray-500 w-10">{uploadProgress.aadhaar}%</span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </form>

//           {/* Login Link */}
//           <div className={`mt-8 text-center ${highContrast ? 'text-white' : 'text-gray-300'}`}>
//             <p className="mb-2">{t.alreadyHaveAccount}</p>
//             <button onClick={() => navigate("/login")} className={`${linkClasses} font-semibold inline-flex items-center`} aria-label={t.loginNow}>
//               {t.loginNow}
//               <ArrowRight size={16} className="ml-1" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className={`py-6 px-6 md:px-12 text-center text-sm ${borderClasses} border-t ${highContrast ? 'text-white' : 'text-gray-400'}`} role="contentinfo">
//         <div className="flex items-center justify-center space-x-2 mb-2">
//           <BookOpen size={20} className="text-blue-500" aria-hidden="true" />
//           <span className="font-semibold">{t.scribeConnect}</span>
//         </div>
//         <p>{t.copyright}</p>
//       </footer>
//     </div>
//   );
// };

// export default StudentRegister;
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useGlobal from '../../utils/GlobalContext';
import {
  BookOpen,
  Globe,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Users,
  ArrowRight,
  Mail,
  Smartphone,
  CheckCircle,
  XCircle,
  UploadCloud,
  Image,
  IdCard,
  ChevronDown, // Keep ChevronDown for the select dropdown icon
} from 'lucide-react';
import axios from 'axios';
import axiosClient from '../../utils/axiosClient';
import { useNavigate } from 'react-router';
import INDIA_LOCATIONS from "../../data/indiaLocations.json";

// --- Translations Object ---
const translations = {
  en: {
    skipToMain: 'Skip to main content',
    scribeConnect: 'ScribeConnect',
    tagline: 'Bridging Learning Through Accessibility',
    navigation: 'Main navigation',
    mainContent: 'Student Registration Page',
    createYourAccount: 'Become a Student',
    aadhaarNumber: 'Aadhaar Number',
    fullName: 'Full Name',
    age: 'Age',
    emailAddress: 'Email Address',
    emailRequired: 'Email is required.', // NEW
    phoneNumber: 'Mobile Number',
    state: 'State',
    district: 'District', // NEW
   
    city: 'City / Village', // UPDATED: label mentions City/Village
    pincode: 'Pincode', // NEW

    educationLevel: 'Education Level', // (kept for compatibility, not used directly)
    highestQualification: 'Highest Qualification', // NEW
    isCurrentlyStudying: 'Are you currently studying?', // NEW
    currentCourse: 'Current Course / Class', // NEW
    currentYearOrClass: 'Current Year / Class', // NEW

    disability: 'Type of Disability',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    userType: 'Register as',
    scribe: 'Scribe',
    student: 'Student',
    profileImage: 'Profile Image (JPG/PNG/WEBP)',
    aadhaarCardImage: 'Aadhaar Card (JPG/PNG/WEBP)',
    register: 'Register',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login Now',
    copyright: '© 2025 ScribeConnect. All rights reserved.',
    highContrastMode: 'High Contrast Mode',
    normalMode: 'Normal Mode',
    languageSwitcher: 'Language switcher',
    english: 'English',
    hindi: 'Hindi',
    languageChangedTo: (lang) => `Language changed to ${lang}.`,
    highContrastEnabled: 'High contrast mode enabled.',
    highContrastDisabled: 'High contrast mode disabled.',
    selectEducationLevel: 'Select your highest qualification', // UPDATED

    // Education Level options (aligned with backend enum)
    educationLevels: { // UPDATED: more detailed list
      'Below 10th': 'Below 10th',
      '10th': '10th',
      '12th': '12th',
      'Diploma': 'Diploma',
      'B.Tech / B.E.': 'B.Tech / B.E.',
      'B.Com': 'B.Com',
      'B.Sc': 'B.Sc',
      'B.A.': 'B.A.',
      'BBA / BBM': 'BBA / BBM',
      'LLB': 'LLB',
      'MBBS': 'MBBS',
      'B.Ed': 'B.Ed',
      'M.Tech / M.E.': 'M.Tech / M.E.',
      'M.Com': 'M.Com',
      'M.Sc': 'M.Sc',
      'M.A.': 'M.A.',
      'MBA': 'MBA',
      'MCA': 'MCA',
      'PhD': 'PhD',
      'Other': 'Other',
    },

    // Validation messages
    aadhaarRequired: 'Aadhaar number is required.',
    aadhaarInvalid: 'Please enter a valid 12-digit Aadhaar number.',
    fullNameRequired: 'Full Name is required.',
    ageRequired: 'Age is required.',
    ageMin: 'Age must be at least 10 years.',
    ageMax: 'Age cannot exceed 99 years.',
    emailInvalid: 'Please enter a valid email address.',
    phoneRequired: 'Mobile number is required.',
    phoneInvalid: 'Please enter a valid 10-digit mobile number.',
    stateRequired: 'State is required.',
    districtRequired: 'District is required.', // NEW
    cityRequired: 'City/Village is required.', // UPDATED
    pincodeRequired: 'Pincode is required.', // NEW
    pincodeInvalid: 'Please enter a valid 6-digit pincode.', // NEW

    educationLevelRequired: 'Education level is required.',
    highestQualificationRequired: 'Highest qualification is required.', // NEW
    disabilityRequired: 'Type of Disability is required.',
    currentCourseRequired: 'Current course or class is required.', // NEW
    currentYearOrClassRequired: 'Current year or class is required.', // NEW

    passwordRequired: 'Password is required.',
    passwordMinLength: 'Password must be at least 6 characters.',
    passwordMismatch: 'Passwords do not match.',
    profileImageRequired: 'Profile image is required.',
    aadhaarCardImageRequired: 'Aadhaar card image is required.',
    fileTypeInvalidImage: 'Invalid file type. Please upload JPG, PNG, or WEBP.',
    fileSizeExceeded: (maxSizeMB) => `File size must be up to ${maxSizeMB} MB.`,
    generalUploadError: 'Failed to upload files.',

    registrationSuccess: 'Registration successful! Please log in.',
    registrationError: 'Registration failed. Please try again.',
    uploadingFiles: 'Uploading files...',
    submittingRegistration: 'Submitting registration...',
  },
  hi: {
    skipToMain: 'मुख्य सामग्री पर जाएँ',
    scribeConnect: 'स्क्राइबकनेक्ट',
    tagline: 'पहुँच के माध्यम से शिक्षा को जोड़ना',
    navigation: 'मुख्य नेविगेशन',
    mainContent: 'छात्र पंजीकरण पृष्ठ',
    createYourAccount: 'छात्र बनें',
    aadhaarNumber: 'आधार नंबर',
    fullName: 'पूरा नाम',
    age: 'आयु',
    emailAddress: 'ईमेल पता',
    emailRequired: 'ईमेल आवश्यक है।', // NEW
    phoneNumber: 'मोबाइल नंबर',
    state: 'राज्य',
    district: 'ज़िला', // NEW
 
    city: 'शहर / गाँव', // UPDATED
    pincode: 'पिनकोड', // NEW

    educationLevel: 'शिक्षा का स्तर',
    highestQualification: 'सबसे उच्च शिक्षा', // NEW
    isCurrentlyStudying: 'क्या आप वर्तमान में पढ़ रहे हैं?', // NEW
    currentCourse: 'वर्तमान कोर्स / कक्षा', // NEW
    currentYearOrClass: 'वर्तमान वर्ष / कक्षा', // NEW

    disability: 'विकलांगता का प्रकार',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छुपाएं',
    userType: 'इसके रूप में पंजीकरण करें',
    scribe: 'स्क्राइब',
    student: 'छात्र',
    profileImage: 'प्रोफ़ाइल छवि (JPG/PNG/WEBP)',
    aadhaarCardImage: 'आधार कार्ड (JPG/PNG/WEBP)',
    register: 'पंजीकरण करें',
    alreadyHaveAccount: 'पहले से ही एक खाता है?',
    loginNow: 'अभी लॉगिन करें',
    copyright: '© 2025 स्क्राइबकनेक्ट। सभी अधिकार सुरक्षित।',
    highContrastMode: 'उच्च कंट्रास्ट मोड',
    normalMode: 'सामान्य मोड',
    languageSwitcher: 'भाषा चयनकर्ता',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    languageChangedTo: (lang) => `भाषा बदलकर ${lang} हो गई है।`,
    highContrastEnabled: 'उच्च कंट्रास्ट मोड सक्षम किया गया।',
    highContrastDisabled: 'उच्च कंट्रास्ट मोड अक्षम किया गया।',
    selectEducationLevel: 'अपनी उच्चतम शिक्षा चुनें', // UPDATED

    // Education Level options
    educationLevels: { // UPDATED
      'Below 10th': '10वीं से कम',
      '10th': '10वीं',
      '12th': '12वीं',
      'Diploma': 'डिप्लोमा',
      'B.Tech / B.E.': 'बी.टेक / बी.ई.',
      'B.Com': 'बी.कॉम',
      'B.Sc': 'बी.एससी',
      'B.A.': 'बी.ए.',
      'BBA / BBM': 'बीबीए / बीबीएम',
      'LLB': 'एलएलबी',
      'MBBS': 'एमबीबीएस',
      'B.Ed': 'बी.एड',
      'M.Tech / M.E.': 'एम.टेक / एम.ई.',
      'M.Com': 'एम.कॉम',
      'M.Sc': 'एम.एससी',
      'M.A.': 'एम.ए.',
      'MBA': 'एमबीए',
      'MCA': 'एमसीए',
      'PhD': 'पीएचडी',
      'Other': 'अन्य',
    },

    // Validation messages
    aadhaarRequired: 'आधार नंबर आवश्यक है।',
    aadhaarInvalid: 'कृपया एक वैध 12 अंकों का आधार नंबर दर्ज करें।',
    fullNameRequired: 'पूरा नाम आवश्यक है।',
    ageRequired: 'आयु आवश्यक है।',
    ageMin: 'आयु कम से कम 10 वर्ष होनी चाहिए।',
    ageMax: 'आयु 99 वर्ष से अधिक नहीं हो सकती।',
    emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें।',
    phoneRequired: 'मोबाइल नंबर आवश्यक है।',
    phoneInvalid: 'कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।',
    stateRequired: 'राज्य आवश्यक है।',
    districtRequired: 'ज़िला आवश्यक है।', // NEW
    cityRequired: 'शहर/गाँव आवश्यक है।', // UPDATED
    pincodeRequired: 'पिनकोड आवश्यक है।', // NEW
    pincodeInvalid: 'कृपया एक वैध 6 अंकों का पिनकोड दर्ज करें।', // NEW

    educationLevelRequired: 'शिक्षा का स्तर आवश्यक है।',
    highestQualificationRequired: 'सबसे उच्च शिक्षा आवश्यक है।', // NEW
    disabilityRequired: 'विकलांगता का प्रकार आवश्यक है।',
    currentCourseRequired: 'वर्तमान कोर्स या कक्षा आवश्यक है।', // NEW
    currentYearOrClassRequired: 'वर्तमान वर्ष या कक्षा आवश्यक है।', // NEW

    passwordRequired: 'पासवर्ड आवश्यक है।',
    passwordMinLength: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए।',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते हैं।',
    profileImageRequired: 'प्रोफ़ाइल छवि आवश्यक है।',
    aadhaarCardImageRequired: 'आधार कार्ड छवि आवश्यक है।',
    fileTypeInvalidImage: 'अमान्य फ़ाइल प्रकार। कृपया JPG, PNG, या WEBP अपलोड करें।',
    fileSizeExceeded: (maxSizeMB) => `फ़ाइल का आकार ${maxSizeMB} MB तक होना चाहिए।`,
    generalUploadError: 'फ़ाइलें अपलोड करने में विफल।',

    registrationSuccess: 'पंजीकरण सफल! कृपया लॉगिन करें।',
    registrationError: 'पंजीकरण विफल। कृपया पुनः प्रयास करें।',
    uploadingFiles: 'फ़ाइलें अपलोड हो रही हैं...',
    submittingRegistration: 'पंजीकरण जमा हो रहा है...',
  },
};

// --- Zod Schema for Validation ---
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const studentRegistrationSchema = (t) => z.object({
  aadhaarNumber: z.string()
    .min(1, { message: t.aadhaarRequired })
    .regex(/^\d{12}$/, { message: t.aadhaarInvalid }),
  fullName: z.string()
    .min(1, { message: t.fullNameRequired })
    .trim(),
  age: z.coerce.number()
    .min(1, { message: t.ageRequired })
    .min(10, { message: t.ageMin })
    .max(99, { message: t.ageMax }),
  email: z.string()
    .min(1, { message: t.emailRequired }) // UPDATED
    .regex(/^\S+@\S+\.\S+$/, { message: t.emailInvalid }),
  mobileNumber: z.string()
    .min(1, { message: t.phoneRequired })
    .regex(/^\d{10}$/, { message: t.phoneInvalid }),
  state: z.string()
    .min(1, { message: t.stateRequired }),
  cityOrVillage: z.string() // NEW (replaces city in schema)
    .min(1, { message: t.cityRequired }),
  pincode: z.string() // NEW
    .min(1, { message: t.pincodeRequired })
    .regex(/^[1-9]\d{5}$/, { message: t.pincodeInvalid }),
    district: z.string().min(1, { message: t.districtRequired }),


  highestQualification: z.enum([ // NEW (replaces educationLevel)
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
  ], {
    errorMap: () => ({ message: t.highestQualificationRequired }),
  }),

  isCurrentlyStudying: z.boolean().optional().default(false), // NEW
  currentCourse: z.string().optional().or(z.literal('')), // NEW
  currentYearOrClass: z.string().optional().or(z.literal('')), // NEW

  disability: z.string()
    .min(1, { message: t.disabilityRequired })
    .trim(),
  password: z.string()
    .min(1, { message: t.passwordRequired })
    .min(6, { message: t.passwordMinLength }),
  confirmPassword: z.string()
    .min(1, { message: t.passwordRequired }),
  profile: z.any()
    .refine((files) => files?.length > 0, { message: t.profileImageRequired })
    .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, {
      message: t.fileSizeExceeded(MAX_IMAGE_SIZE / (1024 * 1024)),
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: t.fileTypeInvalidImage,
    }),
  aadhaarCard: z.any()
    .refine((files) => files?.length > 0, { message: t.aadhaarCardImageRequired })
    .refine((files) => files?.[0]?.size <= MAX_IMAGE_SIZE, {
      message: t.fileSizeExceeded(MAX_IMAGE_SIZE / (1024 * 1024)),
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: t.fileTypeInvalidImage,
    }),
  userType: z.literal('student'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: t.passwordMismatch,
    path: ['confirmPassword'],
  })
  .refine((data) => {
    if (!data.isCurrentlyStudying) return true;
    return (data.currentCourse || '').trim().length > 0;
  }, {
    message: t.currentCourseRequired,
    path: ['currentCourse'],
  })
  .refine((data) => {
    if (!data.isCurrentlyStudying) return true;
    return (data.currentYearOrClass || '').trim().length > 0;
  }, {
    message: t.currentYearOrClassRequired,
    path: ['currentYearOrClass'],
  });

const StudentRegister = () => {
  
  const navigate = useNavigate();
  const {language, setLanguage}= useGlobal();
  //state and districts 
// NEW: Indian States (you can tweak order/labels if needed)
// NEW: dynamic states based on language selected
const statesList = INDIA_LOCATIONS[language].states;

// NEW: districts based on language + state
const districtsList = INDIA_LOCATIONS[language].districts;
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
  const {highContrast, setHighContrast} = useGlobal();
  const [announcements, setAnnouncements] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ profile: 0, aadhaar: 0 });
  const [currentOperation, setCurrentOperation] = useState('');

  // File previews
  const [profilePreview, setProfilePreview] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);

  const languageDropdownRef = useRef(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const t = translations[language];

  // React Hook Form setup
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(studentRegistrationSchema(t)),
    mode: 'onTouched',
    defaultValues: {
      aadhaarNumber: '',
      fullName: '',
      age: '',
      mobileNumber: '',
      email: '',
      state: '',
      district: '',          // NEW
      cityOrVillage: '',     // NEW
      pincode: '',           // NEW

      educationLevel: '',    // (kept in defaults, not used)
      highestQualification: '', // NEW
      isCurrentlyStudying: false, // NEW
      currentCourse: '',         // NEW
      currentYearOrClass: '',    // NEW

      disability: '',
      password: '',
      confirmPassword: '',
      profile: null,
      aadhaarCard: null,
      userType: 'student',
    },
  });
const watchProfile = watch('profile');
const watchAadhaar = watch('aadhaarCard');
const watchIsCurrentlyStudying = watch('isCurrentlyStudying'); // existing
const watchState = watch('state'); // NEW: to know which state is selected

  
  
  // Handle file preview generation
  useEffect(() => {
    if (watchProfile && watchProfile.length > 0 && watchProfile[0] instanceof File) {
      const url = URL.createObjectURL(watchProfile[0]);
      setProfilePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setProfilePreview(null);
    }
  }, [watchProfile]);

  useEffect(() => {
    if (watchAadhaar && watchAadhaar.length > 0 && watchAadhaar[0] instanceof File) {
      const url = URL.createObjectURL(watchAadhaar[0]);
      setAadhaarPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAadhaarPreview(null);
    }
  }, [watchAadhaar]);
  useEffect(() => {
  setValue("state", "");
  setValue("district", "");
}, [language]);


  // Base classes for the theme
  const baseClasses = highContrast
    ? 'bg-black text-white'
    : 'bg-gray-900 text-gray-100';

  const focusBorderClasses = highContrast
    ? 'focus:border-white'
    : 'focus:border-blue-500';

  const buttonPrimaryClasses = highContrast
    ? 'bg-white text-black border border-white hover:bg-gray-200 focus:bg-gray-200'
    : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700';

  const linkClasses = highContrast
    ? 'text-white underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white'
    : 'text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500';

  const borderClasses = highContrast ? 'border-white' : 'border-gray-700';
  const inputBgClasses = highContrast ? 'bg-gray-800' : 'bg-gray-700';
  const inputBorderDefaultClasses = highContrast ? 'border-white' : 'border-gray-600';

  // Handle announcements
  useEffect(() => {
    if (announcements) {
      const liveRegion = document.querySelector('[aria-live="polite"]');
      if (liveRegion) {
        liveRegion.textContent = announcements;
        const timer = setTimeout(() => liveRegion.textContent = '', 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [announcements]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setAnnouncements(t.languageChangedTo(lang === 'en' ? 'English' : 'Hindi'));
    setIsLanguageDropdownOpen(false);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    setAnnouncements(
      !highContrast ? t.highContrastEnabled : t.highContrastDisabled
    );
  };

  // Cloudinary Upload function
  const uploadToCloudinary = async (file, fileType) => {
    try {
      const signatureRes = await axiosClient.get(`/auth/uploadSignature?fileType=${fileType}`);
      const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureRes.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('public_id', public_id);
      const resource_type = 'image';

      const uploadRes = await axios.post(
        upload_url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prev => ({ ...prev, [fileType]: percentCompleted }));
          },
        }
      );

      return {
        secureUrl: uploadRes.data.secure_url,
        cloudinaryPublicId: uploadRes.data.public_id,
      };

    } catch (error) {
      console.error(`Error uploading ${fileType} to Cloudinary:`, error);
      throw new Error(t.generalUploadError);
    }
  };

  const onSubmit = async (data) => {
    setRegistrationStatus('');
    setIsLoading(true);
    setUploadProgress({ profile: 0, aadhaar: 0 });
    setAnnouncements('Initiating registration process...');

    try {
      setCurrentOperation(t.uploadingFiles);
      setAnnouncements(t.uploadingFiles);

      const [profileData, aadhaarData] = await Promise.all([
        uploadToCloudinary(data.profile[0], 'profile'),
        uploadToCloudinary(data.aadhaarCard[0], 'aadhaar'),
      ]);

      setCurrentOperation(t.submittingRegistration);
      setAnnouncements(t.submittingRegistration);

      const registrationPayload = {
        aadhaarNumber: data.aadhaarNumber,
        fullName: data.fullName,
        age: parseInt(data.age),
        mobileNumber: data.mobileNumber,
        email: data.email || '',
        state: data.state,
        district: data.district, // NEW
        cityOrVillage: data.cityOrVillage, // NEW
        pincode: data.pincode, // NEW

        highestQualification: data.highestQualification, // NEW
        isCurrentlyStudying: data.isCurrentlyStudying || false, // NEW
        currentCourse: data.currentCourse || '', // NEW
        currentYearOrClass: data.currentYearOrClass || '', // NEW

        disability: data.disability,
        password: data.password,
        profile: { url: profileData.secureUrl, cloudinaryPublicId: profileData.cloudinaryPublicId },
        aadhaarCard: { url: aadhaarData.secureUrl, cloudinaryPublicId: aadhaarData.cloudinaryPublicId },
      };

      const registerRes = await axiosClient.post("/auth/registerStudent", registrationPayload);
      console.log("registrationDetail", registerRes);

      if (registerRes.status === 201) {
        setRegistrationStatus('success');
        setAnnouncements(t.registrationSuccess);
        reset();
        setProfilePreview(null);
        setAadhaarPreview(null);
        setUser({...registerRes?.data?.user,role:"student"});
        setIsAuthenticated(true);
        navigate("/studentHome");
      } else {
        setRegistrationStatus('error');
        setAnnouncements(registerRes.data.message || t.registrationError);
      }

    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus('error');
      const errorMessage = error.response?.data?.message || error.message || t.registrationError;
      setAnnouncements(errorMessage);
    } finally {
      setIsLoading(false);
      setUploadProgress({ profile: 0, aadhaar: 0 });
      setCurrentOperation('');
    }
  };

  // Close language dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isLanguageDropdownOpen) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isLanguageDropdownOpen]);

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
      {/* Screen Reader Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      {/* Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:p-2 focus:rounded-md z-50">
        {t.skipToMain}
      </a>

      {/* Header */}
      <header className={`py-4 px-6 md:px-12 flex justify-between items-center ${borderClasses} border-b`} role="banner">
        <div className="flex items-center space-x-3">
          <BookOpen size={32} className="text-blue-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold">
            <span className="sr-only">ScribeConnect</span>
            <span aria-hidden="true">{t.scribeConnect}</span>
          </h1>
          <p className="sr-only" id="tagline-description">{t.tagline}</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`flex items-center p-2 rounded-md ${highContrast ? 'bg-gray-800 text-white border border-white' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:border-white focus:border-2 transition-all duration-150`}
              aria-haspopup="true"
              aria-expanded={isLanguageDropdownOpen}
              aria-label={t.languageSwitcher}
            >
              <Globe size={20} aria-hidden="true" />
              <span className="ml-2 hidden sm:inline-block">
                {language === 'en' ? t.english : t.hindi}
              </span>
              <ChevronDown size={16} className="ml-1" aria-hidden="true" />
            </button>
            {isLanguageDropdownOpen && (
              <ul
                role="listbox"
                className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${highContrast ? 'bg-black border border-white' : 'bg-gray-800'} ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}
                tabIndex="-1"
                aria-activedescendant={language === 'en' ? 'lang-en' : 'lang-hi'}
              >
                <li
                  id="lang-en"
                  role="option"
                  aria-selected={language === 'en'}
                  onClick={() => handleLanguageChange('en')}
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'en' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white transition-all duration-150`}
                  tabIndex="0"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLanguageChange('en'); }}
                >
                  {t.english}
                </li>
                <li
                  id="lang-hi"
                  role="option"
                  aria-selected={language === 'hi'}
                  onClick={() => handleLanguageChange('hi')}
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'hi' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white transition-all duration-150`}
                  tabIndex="0"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLanguageChange('hi'); }}
                >
                  {t.hindi}
                </li>
              </ul>
            )}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-md ${highContrast ? 'bg-white text-black' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:border-white focus:border-2 transition-all duration-150`}
            aria-pressed={highContrast}
            aria-label={highContrast ? t.normalMode : t.highContrastMode}
          >
            {highContrast ? (
              <Sun size={20} aria-hidden="true" />
            ) : (
              <Moon size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" aria-label={t.mainContent} className="flex flex-col items-center justify-center py-12 px-4">
        <div className={`w-full max-w-2xl p-8 rounded-lg shadow-xl ${highContrast ? 'bg-black border border-white' : 'bg-gray-800'}`}>
          <h2 className={`text-3xl font-bold text-center mb-6 ${highContrast ? 'text-white' : 'text-blue-400'}`}>
            {t.createYourAccount}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.fullName ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : null}
                />
                {errors.fullName && (
                  <p id="fullName-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Aadhaar Number */}
              <div>
                <label htmlFor="aadhaarNumber" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.aadhaarNumber}
                </label>
                <input
                  type="text"
                  id="aadhaarNumber"
                  {...register('aadhaarNumber')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.aadhaarNumber ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.aadhaarNumber}
                  aria-describedby={errors.aadhaarNumber ? "aadhaarNumber-error" : null}
                  placeholder="e.g., 123456789012"
                />
                {errors.aadhaarNumber && (
                  <p id="aadhaarNumber-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.aadhaarNumber.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.age}
                </label>
                <input
                  type="number"
                  id="age"
                  {...register('age')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.age ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? "age-error" : null}
                  min="10"
                  max="99"
                />
                {errors.age && (
                  <p id="age-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.phoneNumber}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="mobileNumber"
                    {...register('mobileNumber')}
                    className={`w-full p-3 pl-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.mobileNumber ? 'border-red-500' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.mobileNumber}
                    aria-describedby={errors.mobileNumber ? "mobileNumber-error" : null}
                    placeholder="e.g., 9876543210"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Smartphone size={18} className="text-gray-400" aria-hidden="true" />
                  </span>
                </div>
                {errors.mobileNumber && (
                  <p id="mobileNumber-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.emailAddress}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full p-3 pl-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.email ? 'border-red-500' : ''}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : null}
                    placeholder="e.g., student@example.com"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail size={18} className="text-gray-400" aria-hidden="true" />
                  </span>
                </div>
                {errors.email && (
                  <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* State */}
              {/* State - UPDATED to dropdown */}
               <div>
  <label htmlFor="state" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
    {t.state}
  </label>
  <div className="relative">
    <select
      id="state"
      {...register('state')} // UPDATED: still same field name
      className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.state ? 'border-red-500' : ''} appearance-none`}
      aria-required="true"
      aria-invalid={!!errors.state}
      aria-describedby={errors.state ? "state-error" : null}
      onChange={(e) => {
        // NEW: reset district when state changes (govt form style)
        const value = e.target.value;
        setValue('state', value);
        setValue('district', ''); // clear district selection
      }}
    >
      <option value="">{language === 'en' ? 'Select State' : 'राज्य चुनें'}</option>
      {statesList.map((state) => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} aria-hidden="true" />
  </div>
  {errors.state && (
    <p id="state-error" role="alert" className="text-red-500 text-sm mt-1">
      {errors.state.message}
    </p>
  )}
              </div>

              {/* District - NEW */}
             {/* District - UPDATED to dropdown dependent on state */}
              {/* District - UPDATED styling */}
              <div>
  <label
    htmlFor="district"
    className={`block text-sm font-medium mb-2 ${
      highContrast ? 'text-white' : 'text-gray-200'
    }`}
  >
    {t.district}
  </label>
  <div className="relative">
    <select
      id="district"
      {...register('district')}
      disabled={!watchState}
      className={`w-full p-3 pr-10 rounded-md
        ${inputBgClasses}                // UPDATED: uses dark bg
        ${inputBorderDefaultClasses}     // UPDATED: border style
        border
        focus:outline-none focus:border-2 ${focusBorderClasses}
        ${errors.district ? 'border-red-500' : ''}
        ${!watchState ? 'opacity-60 cursor-not-allowed' : ''}
        appearance-none
        ${highContrast ? 'text-white' : 'text-gray-100'} // UPDATED: text color
      `}
      aria-required="true"
      aria-invalid={!!errors.district}
      aria-describedby={errors.district ? 'district-error' : null}
    >
      {!watchState && (
        <option value="">
          {language === 'en' ? 'Select state first' : 'पहले राज्य चुनें'}
        </option>
      )}
      {watchState && (
        <>
          <option value="">
            {language === 'en' ? 'Select District' : 'ज़िला चुनें'}
          </option>
          {(districtsList[watchState] || []).map((dist) => (
            <option key={dist} value={dist}>
              {dist}
            </option>
          ))}
        </>
      )}
    </select>
    <ChevronDown
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      size={20}
      aria-hidden="true"
    />
  </div>
  {errors.district && (
    <p
      id="district-error"
      role="alert"
      className="text-red-500 text-sm mt-1"
    >
      {errors.district.message}
    </p>
  )}
              </div>

              {/* City / Village - UPDATED */}
              <div>
                <label htmlFor="cityOrVillage" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.city}
                </label>
                <input
                  type="text"
                  id="cityOrVillage"
                  {...register('cityOrVillage')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.cityOrVillage ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.cityOrVillage}
                  aria-describedby={errors.cityOrVillage ? "cityOrVillage-error" : null}
                  placeholder="e.g., Mumbai / Village name"
                />
                {errors.cityOrVillage && (
                  <p id="cityOrVillage-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.cityOrVillage.message}
                  </p>
                )}
              </div>

              {/* Pincode - NEW */}
              <div>
                <label htmlFor="pincode" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.pincode}
                </label>
                <input
                  type="text"
                  id="pincode"
                  {...register('pincode')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.pincode ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.pincode}
                  aria-describedby={errors.pincode ? "pincode-error" : null}
                  placeholder="e.g., 400001"
                />
                {errors.pincode && (
                  <p id="pincode-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.pincode.message}
                  </p>
                )}
              </div>

              {/* Highest Qualification - UPDATED Select Dropdown */}
              <div>
                <label htmlFor="highestQualification" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.highestQualification}
                </label>
                <div className="relative">
                  <select
                    id="highestQualification"
                    {...register('highestQualification')}
                    className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.highestQualification ? 'border-red-500' : ''} appearance-none`}
                    aria-required="true"
                    aria-invalid={!!errors.highestQualification}
                    aria-describedby={errors.highestQualification ? "highestQualification-error" : null}
                  >
                    <option value="">{t.selectEducationLevel}</option>
                    {Object.keys(t.educationLevels).map((key) => (
                      <option key={key} value={key}>{t.educationLevels[key]}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} aria-hidden="true" />
                </div>
                {errors.highestQualification && (
                  <p id="highestQualification-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.highestQualification.message}
                  </p>
                )}
              </div>

              {/* Disability */}
              <div>
                <label htmlFor="disability" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.disability}
                </label>
                <input
                  type="text"
                  id="disability"
                  {...register('disability')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.disability ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.disability}
                  aria-describedby={errors.disability ? "disability-error" : null}
                  placeholder="e.g., Visual Impairment"
                />
                {errors.disability && (
                  <p id="disability-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.disability.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label htmlFor="password" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password')}
                    className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.password ? 'border-red-500' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : null}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${highContrast ? 'text-white' : 'text-gray-400'} hover:text-blue-500 focus:outline-none focus:border-white focus:border-2 rounded transition-all duration-150`}
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                  >
                    {showPassword ? (
                      <EyeOff size={20} aria-hidden="true" />
                    ) : (
                      <Eye size={20} aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.confirmPassword}
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : null}
                />
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" role="alert" className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Currently Studying Section - NEW */}
            <div className="mb-4">
              <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                <input
                  type="checkbox"
                  {...register('isCurrentlyStudying')}
                  className="w-4 h-4"
                />
                <span>{t.isCurrentlyStudying}</span>
              </label>

              {watchIsCurrentlyStudying && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentCourse" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                      {t.currentCourse}
                    </label>
                    <input
                      type="text"
                      id="currentCourse"
                      {...register('currentCourse')}
                      className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.currentCourse ? 'border-red-500' : ''}`}
                      aria-invalid={!!errors.currentCourse}
                      aria-describedby={errors.currentCourse ? "currentCourse-error" : null}
                      placeholder="e.g., B.Tech CSE / Class 10"
                    />
                    {errors.currentCourse && (
                      <p id="currentCourse-error" role="alert" className="text-red-500 text-sm mt-1">
                        {errors.currentCourse.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="currentYearOrClass" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                      {t.currentYearOrClass}
                    </label>
                    <input
                      type="text"
                      id="currentYearOrClass"
                      {...register('currentYearOrClass')}
                      className={`w-full p-3 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.currentYearOrClass ? 'border-red-500' : ''}`}
                      aria-invalid={!!errors.currentYearOrClass}
                      aria-describedby={errors.currentYearOrClass ? "currentYearOrClass-error" : null}
                      placeholder="e.g., 1st year / 12th"
                    />
                    {errors.currentYearOrClass && (
                      <p id="currentYearOrClass-error" role="alert" className="text-red-500 text-sm mt-1">
                        {errors.currentYearOrClass.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Type - Locked to Student */}
            <div className="mb-6">
              <fieldset>
                <legend className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                  {t.userType}
                </legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="userType-student"
                    name="userType"
                    value="student"
                    checked={true}
                    readOnly
                    {...register('userType')}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 cursor-not-allowed"
                    aria-label={t.student}
                  />
                  <label htmlFor="userType-student" className="ml-2 flex items-center cursor-not-allowed">
                    <BookOpen size={18} className="text-green-500 mr-1" aria-hidden="true" />
                    <span className={`text-base ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                      {t.student}
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>

            {/* File Uploads Section */}
            <h3 className={`text-xl font-bold mb-4 ${highContrast ? 'text-white' : 'text-blue-300'}`}>
              Required Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="profile"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${highContrast ? 'border-white hover:bg-gray-900' : 'border-gray-600 hover:bg-gray-700'} ${errors.profile ? 'border-red-500' : ''}`}
                >
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="max-h-full max-w-full object-contain p-1 rounded-lg"
                    />
                  ) : (
                    <>
                      <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
                      <p className={`text-sm text-center ${highContrast ? 'text-white' : 'text-gray-400'}`}>
                        {t.profileImage}
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="profile"
                    {...register('profile')}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    aria-describedby={errors.profile ? "profile-error" : null}
                  />
                </label>
                {errors.profile && (
                  <p id="profile-error" role="alert" className="text-red-500 text-sm mt-1 text-center">
                    {errors.profile.message}
                  </p>
                )}
              </div>

              {/* Aadhaar Card Upload */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="aadhaarCard"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${highContrast ? 'border-white hover:bg-gray-900' : 'border-gray-600 hover:bg-gray-700'} ${errors.aadhaarCard ? 'border-red-500' : ''}`}
                >
                  {aadhaarPreview ? (
                    <img
                      src={aadhaarPreview}
                      alt="Aadhaar card preview"
                      className="max-h-full max-w-full object-contain p-1 rounded-lg"
                    />
                  ) : (
                    <>
                      <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
                      <p className={`text-sm text-center ${highContrast ? 'text-white' : 'text-gray-400'}`}>
                        {t.aadhaarCardImage}
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="aadhaarCard"
                    {...register('aadhaarCard')}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    aria-describedby={errors.aadhaarCard ? "aadhaarCard-error" : null}
                  />
                </label>
                {errors.aadhaarCard && (
                  <p id="aadhaarCard-error" role="alert" className="text-red-500 text-sm mt-1 text-center">
                    {errors.aadhaarCard.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:border-2 ${buttonPrimaryClasses} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              aria-live="assertive"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" aria-hidden="true"></span>
                  {currentOperation || 'Processing...'}
                </span>
              ) : (
                t.register
              )}
            </button>

            {/* Status Messages */}
            {registrationStatus === 'success' && (
              <div role="alert" className="mt-4 p-3 rounded-md bg-green-700 text-white text-center flex items-center justify-center">
                <CheckCircle size={20} className="mr-2" aria-hidden="true" />
                {t.registrationSuccess}
              </div>
            )}
            {registrationStatus === 'error' && (
              <div role="alert" className="mt-4 p-3 rounded-md bg-red-700 text-white text-center flex items-center justify-center">
                <XCircle size={20} className="mr-2" aria-hidden="true" />
                {t.registrationError}
              </div>
            )}

            {/* Upload Progress Indicators */}
            {(uploadProgress.profile > 0 || uploadProgress.aadhaar > 0) && isLoading && (
              <div className="mt-4 space-y-2">
                <div className="text-sm text-gray-400">Upload Progress:</div>
                {uploadProgress.profile > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-20">Profile:</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.profile}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 w-10">{uploadProgress.profile}%</span>
                  </div>
                )}
                {uploadProgress.aadhaar > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-20">Aadhaar:</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.aadhaar}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 w-10">{uploadProgress.aadhaar}%</span>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className={`mt-8 text-center ${highContrast ? 'text-white' : 'text-gray-300'}`}>
            <p className="mb-2">{t.alreadyHaveAccount}</p>
            <button onClick={() => navigate("/login")} className={`${linkClasses} font-semibold inline-flex items-center`} aria-label={t.loginNow}>
              {t.loginNow}
              <ArrowRight size={16} className="ml-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 px-6 md:px-12 text-center text-sm ${borderClasses} border-t ${highContrast ? 'text-white' : 'text-gray-400'}`} role="contentinfo">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <BookOpen size={20} className="text-blue-500" aria-hidden="true" />
          <span className="font-semibold">{t.scribeConnect}</span>
        </div>
        <p>{t.copyright}</p>
      </footer>
    </div>
  );
};

export default StudentRegister;
