// import React, { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import useGlobal from '../../utils/GlobalContext';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
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
//   ChevronDown,
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
//     mainContent: 'Scribe Registration Page',
//     createYourAccount: 'Become a Scribe',
//     aadhaarNumber: 'Aadhaar Number',
//     fullName: 'Full Name',
//     age: 'Age',
//     emailAddress: 'Email Address',
//     phoneNumber: 'Mobile Number',
//     state: 'State',
//     city: 'City',
//     highestQualification: 'Highest Qualification',
//     password: 'Password',
//     confirmPassword: 'Confirm Password',
//     showPassword: 'Show Password',
//     hidePassword: 'Hide Password',
//     userType: 'Register as',
//     scribe: 'Scribe',
//     profileImage: 'Profile Image (JPG/PNG/WEBP)',
//     qualificationProof: 'Qualification Certificate (JPG/PNG/WEBP)',
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
//     selectQualification: 'Select your highest qualification',

//     // Qualification options
//     qualifications: {
//       '10th': '10th Grade',
//       '12th': '12th Grade',
//       'diploma': 'Diploma',
//       'graduation': 'Graduation (Bachelor\'s)',
//       'postGraduation': 'Post Graduation (Master\'s)',
//       'phd': 'PhD',
//       'other': 'Other'
//     },

//     // Validation messages
//     aadhaarRequired: 'Aadhaar number is required.',
//     aadhaarInvalid: 'Please enter a valid 12-digit Aadhaar number.',
//     fullNameRequired: 'Full Name is required.',
//     ageRequired: 'Age is required.',
//     ageMin: 'Age must be at least 10 years.',
//     ageMax: 'Age cannot exceed 99 years.',
//     emailInvalid: 'Please enter a valid email address.',
//     phoneRequired: 'Mobile number is required.',
//     phoneInvalid: 'Please enter a valid 10-digit mobile number.',
//     stateRequired: 'State is required.',
//     cityRequired: 'City is required.',
//     qualificationRequired: 'Highest qualification is required.',
//     passwordRequired: 'Password is required.',
//     passwordMinLength: 'Password must be at least 6 characters.',
//     passwordMismatch: 'Passwords do not match.',
//     profileImageRequired: 'Profile image is required.',
//     qualificationProofRequired: 'Qualification certificate image is required.',
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
//     mainContent: 'स्क्राइब पंजीकरण पृष्ठ',
//     createYourAccount: 'स्क्राइब बनें',
//     aadhaarNumber: 'आधार नंबर',
//     fullName: 'पूरा नाम',
//     age: 'आयु',
//     emailAddress: 'ईमेल पता',
//     phoneNumber: 'मोबाइल नंबर',
//     state: 'राज्य',
//     city: 'शहर',
//     highestQualification: 'उच्चतम योग्यता',
//     password: 'पासवर्ड',
//     confirmPassword: 'पासवर्ड की पुष्टि करें',
//     showPassword: 'पासवर्ड दिखाएं',
//     hidePassword: 'पासवर्ड छुपाएं',
//     userType: 'इसके रूप में पंजीकरण करें',
//     scribe: 'स्क्राइब',
//     profileImage: 'प्रोफ़ाइल छवि (JPG/PNG/WEBP)',
//     qualificationProof: 'योग्यता प्रमाणपत्र (JPG/PNG/WEBP)',
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
//     selectQualification: 'अपनी उच्चतम योग्यता चुनें',

//     // Qualification options
//     qualifications: {
//       '10th': '10वीं कक्षा',
//       '12th': '12वीं कक्षा',
//       'diploma': 'डिप्लोमा',
//       'graduation': 'स्नातक',
//       'postGraduation': 'स्नातकोत्तर',
//       'phd': 'पीएचडी',
//       'other': 'अन्य'
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
//     qualificationRequired: 'उच्चतम योग्यता आवश्यक है।',
//     passwordRequired: 'पासवर्ड आवश्यक है।',
//     passwordMinLength: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए।',
//     passwordMismatch: 'पासवर्ड मेल नहीं खाते हैं।',
//     profileImageRequired: 'प्रोफ़ाइल छवि आवश्यक है।',
//     qualificationProofRequired: 'योग्यता प्रमाणपत्र छवि आवश्यक है।',
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

// const scribeRegistrationSchema = (t) => z.object({
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
// email: z.string()
//   .min(1, { message: t.emailRequired }) 
//   .regex(/^\S+@\S+\.\S+$/, { message: t.emailInvalid }), 
//   mobileNumber: z.string()
//     .min(1, { message: t.phoneRequired })
//     .regex(/^\d{10}$/, { message: t.phoneInvalid }),
//   state: z.string()
//     .min(1, { message: t.stateRequired }),
//   city: z.string()
//     .min(1, { message: t.cityRequired }),
//   highestQualification: z.string()
//     .min(1, { message: t.qualificationRequired }),
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
//   qualificationImgLink: z.any()
//     .refine((files) => files?.length > 0, { message: t.qualificationProofRequired })
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
//   userType: z.literal('scribe'),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: t.passwordMismatch,
//   path: ['confirmPassword'],
// });


// const ScribeRegister = () => {
//   const navigate=useNavigate();
//   const {language, setLanguage}= useGlobal();
//   const {isAuthenticated,setIsAuthenticated}=useGlobal();
//   const {user,setUser}=useGlobal();
//    const {highContrast, setHighContrast} = useGlobal();
//   const [announcements, setAnnouncements] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [registrationStatus, setRegistrationStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState({ profile: 0, qualification: 0, aadhaar: 0 });
//   const [currentOperation, setCurrentOperation] = useState('');

//   // File previews
//   const [profilePreview, setProfilePreview] = useState(null);
//   const [qualificationPreview, setQualificationPreview] = useState(null);
//   const [aadhaarPreview, setAadhaarPreview] = useState(null);

//   const languageDropdownRef = useRef(null);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

//   const t = translations[language];

//   // React Hook Form setup
//   const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
//     resolver: zodResolver(scribeRegistrationSchema(t)),
//     mode: 'onTouched',
//     defaultValues: {
//       aadhaarNumber: '',
//       fullName: '',
//       age: '',
//       mobileNumber: '',
//       email: '',
//       state: '',
//       city: '',
//       highestQualification: '',
//       password: '',
//       confirmPassword: '',
//       profile: null,
//       qualificationImgLink: null,
//       aadhaarCard: null,
//       userType: 'scribe',
//     },
//   });

//   const watchProfile = watch('profile');
//   const watchQualification = watch('qualificationImgLink');
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
//     if (watchQualification && watchQualification.length > 0 && watchQualification[0] instanceof File) {
//       const url = URL.createObjectURL(watchQualification[0]);
//       setQualificationPreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setQualificationPreview(null);
//     }
//   }, [watchQualification]);

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
//       // Pass fileType as a query parameter to get a specific signature
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
//         upload_url, // Use the URL provided by your backend
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
//         cloudinaryPublicId: uploadRes.data.public_id, // This is the temporary public_id
//       };

//     } catch (error) {
//       console.error(`Error uploading ${fileType} to Cloudinary:`, error);
//       throw new Error(t.generalUploadError);
//     }
//   };

//   const onSubmit = async (data) => {
//     setRegistrationStatus('');
//     setIsLoading(true);
//     setUploadProgress({ profile: 0, qualification: 0, aadhaar: 0 });
//     setAnnouncements('Initiating registration process...');

//     try {
//       setCurrentOperation(t.uploadingFiles);
//       setAnnouncements(t.uploadingFiles);

//       // Upload all files to Cloudinary concurrently
//       const [profileData, qualificationData, aadhaarData] = await Promise.all([
//         uploadToCloudinary(data.profile[0], 'profile'),
//         uploadToCloudinary(data.qualificationImgLink[0], 'qualification'),
//         uploadToCloudinary(data.aadhaarCard[0], 'aadhaar'),
//       ]);
      
//       // Register the user (backend will handle renaming assets to final folders)
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
//         highestQualification: data.highestQualification,
//         password: data.password,
//         profile: { url: profileData.secureUrl, cloudinaryPublicId: profileData.cloudinaryPublicId },
//         aadhaarCard: { url: aadhaarData.secureUrl, cloudinaryPublicId: aadhaarData.cloudinaryPublicId },
//         qualificationImgLink: { url: qualificationData.secureUrl, cloudinaryPublicId: qualificationData.cloudinaryPublicId },
//       };

//       const registerRes = await axiosClient.post("/auth/registerScribe", registrationPayload);
//       //////////////////////////////////////////
//       console.log("registrationDetail",registerRes);

//       if (registerRes.status === 201) {
//         setRegistrationStatus('success');
//         setAnnouncements(t.registrationSuccess);
//         reset();
//         setProfilePreview(null);
//         setUser({...registerRes?.data?.user,role:"scribe"})
//         setQualificationPreview(null);
//         setAadhaarPreview(null);
//         setIsAuthenticated(true);
//         navigate("/scribeHome");
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
//       setUploadProgress({ profile: 0, qualification: 0, aadhaar: 0 });
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
//                     placeholder="e.g., scribe@example.com"
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

//               {/* Highest Qualification - Select Dropdown */}
//               <div className="md:col-span-2">
//                 <label htmlFor="highestQualification" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.highestQualification}
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="highestQualification"
//                     {...register('highestQualification')}
//                     className={`w-full p-3 pr-10 rounded-md ${inputBgClasses} ${inputBorderDefaultClasses} border focus:outline-none focus:border-2 ${focusBorderClasses} ${errors.highestQualification ? 'border-red-500' : ''} appearance-none`}
//                     aria-required="true"
//                     aria-invalid={!!errors.highestQualification}
//                     aria-describedby={errors.highestQualification ? "highestQualification-error" : null}
//                   >
//                     <option value="">{t.selectQualification}</option>
//                     {Object.keys(t.qualifications).map((key) => (
//                       <option key={key} value={key}>{t.qualifications[key]}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} aria-hidden="true" />
//                 </div>
//                 {errors.highestQualification && (
//                   <p id="highestQualification-error" role="alert" className="text-red-500 text-sm mt-1">
//                     {errors.highestQualification.message}
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

//             {/* User Type - Locked to Scribe */}
//             <div className="mb-6">
//               <fieldset>
//                 <legend className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                   {t.userType}
//                 </legend>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="userType-scribe"
//                     name="userType"
//                     value="scribe"
//                     checked={true}
//                     readOnly
//                     {...register('userType')}
//                     className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-not-allowed"
//                     aria-label={t.scribe}
//                   />
//                   <label htmlFor="userType-scribe" className="ml-2 flex items-center cursor-not-allowed">
//                     <Users size={18} className="text-blue-500 mr-1" aria-hidden="true" />
//                     <span className={`text-base ${highContrast ? 'text-white' : 'text-gray-200'}`}>
//                       {t.scribe}
//                     </span>
//                   </label>
//                 </div>
//               </fieldset>
//             </div>

//             {/* File Uploads Section */}
//             <h3 className={`text-xl font-bold mb-4 ${highContrast ? 'text-white' : 'text-blue-300'}`}>
//               Required Documents
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

//               {/* Qualification Certificate Upload */}
//               <div className="flex flex-col items-center">
//                 <label
//                   htmlFor="qualificationImgLink"
//                   className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${highContrast ? 'border-white hover:bg-gray-900' : 'border-gray-600 hover:bg-gray-700'} ${errors.qualificationImgLink ? 'border-red-500' : ''}`}
//                 >
//                   {qualificationPreview ? (
//                     <img
//                       src={qualificationPreview}
//                       alt="Qualification certificate preview"
//                       className="max-h-full max-w-full object-contain p-1 rounded-lg"
//                     />
//                   ) : (
//                     <>
//                       <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
//                       <p className={`text-sm text-center ${highContrast ? 'text-white' : 'text-gray-400'}`}>
//                         {t.qualificationProof}
//                       </p>
//                     </>
//                   )}
//                   <input
//                     type="file"
//                     id="qualificationImgLink"
//                     {...register('qualificationImgLink')}
//                     className="hidden"
//                     accept="image/jpeg,image/png,image/webp"
//                     aria-describedby={errors.qualificationImgLink ? "qualificationImgLink-error" : null}
//                   />
//                 </label>
//                 {errors.qualificationImgLink && (
//                   <p id="qualificationImgLink-error" role="alert" className="text-red-500 text-sm mt-1 text-center">
//                     {errors.qualificationImgLink.message}
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
//             {(uploadProgress.profile > 0 || uploadProgress.qualification > 0 || uploadProgress.aadhaar > 0) && isLoading && (
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
//                 {uploadProgress.qualification > 0 && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-xs text-gray-500 w-20">Certificate:</span>
//                     <div className="flex-1 bg-gray-700 rounded-full h-2">
//                       <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.qualification}%` }}></div>
//                     </div>
//                     <span className="text-xs text-gray-500 w-10">{uploadProgress.qualification}%</span>
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
//             <button onClick={()=>navigate("/login")}className={`${linkClasses} font-semibold inline-flex items-center`} aria-label={t.loginNow}>
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

// export default ScribeRegister;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useGlobal from '../../utils/GlobalContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  BookOpen,
  Globe,
  Sun,
  Moon,
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Smartphone,
  CheckCircle,
  XCircle,
  UploadCloud,
  ChevronDown,
  User,
  Calendar,
  MapPin,
  GraduationCap,
  Languages,
  Lock,
  AlertTriangle,
  Check,
} from 'lucide-react';
import axios from 'axios';
import axiosClient from '../../utils/axiosClient';
import { useNavigate } from 'react-router';

// --- Constants ---
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const KNOWN_LANGUAGES_OPTIONS = [
  "English", "Hindi", "Marathi", "Bengali", "Tamil", "Telugu", 
  "Kannada", "Malayalam", "Gujarati", "Punjabi", "Odia", "Assamese"
];

// --- Translations Object ---
const translations = {
  en: {
    skipToMain: 'Skip to main content',
    scribeConnect: 'ScribeConnect',
    tagline: 'Bridging Learning Through Accessibility',
    navigation: 'Main navigation',
    mainContent: 'Scribe Registration Page',
    createYourAccount: 'Become a Scribe',
    personalInfo: 'Personal Information',
    documentUpload: 'Required Documents',
    aadhaarNumber: 'Aadhaar Number',
    fullName: 'Full Name',
    age: 'Age',
    emailAddress: 'Email Address',
    phoneNumber: 'Mobile Number',
    state: 'State',
    city: 'City',
    highestQualification: 'Highest Qualification',
    knownLanguages: 'Known Languages',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    profileImage: 'Profile Image',
    qualificationProof: 'Qualification Certificate',
    aadhaarCardImage: 'Aadhaar Card ',
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
    selectQualification: 'Select your highest qualification',
    selectLanguages: 'Select known languages',
    uploadProgress: 'Upload Progress',
    fileSelected: 'File selected',
    removeFile: 'Remove file',

    // Qualification options
    qualifications: {
      '10th': '10th Grade',
      '12th': '12th Grade',
      'diploma': 'Diploma',
      'graduation': 'Graduation (Bachelor\'s)',
      'postGraduation': 'Post Graduation (Master\'s)',
      'phd': 'PhD',
      'other': 'Other'
    },

    // Validation messages
    aadhaarRequired: 'Aadhaar number is required.',
    aadhaarInvalid: 'Please enter a valid 12-digit Aadhaar number.',
    fullNameRequired: 'Full Name is required.',
    fullNameMinLength: 'Full name must be at least 2 characters.',
    ageRequired: 'Age is required.',
    ageMin: 'Age must be at least 18 years.',
    ageMax: 'Age cannot exceed 99 years.',
    emailRequired: 'Email address is required.',
    emailInvalid: 'Please enter a valid email address.',
    phoneRequired: 'Mobile number is required.',
    phoneInvalid: 'Please enter a valid 10-digit mobile number.',
    stateRequired: 'State is required.',
    cityRequired: 'City is required.',
    qualificationRequired: 'Highest qualification is required.',
    knownLanguagesRequired: 'Please select at least one language.',
    passwordRequired: 'Password is required.',
    passwordMinLength: 'Password must be at least 8 characters.',
    passwordPattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    passwordMismatch: 'Passwords do not match.',
    profileImageRequired: 'Profile image is required.',
    qualificationProofRequired: 'Qualification certificate image is required.',
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
    mainContent: 'स्क्राइब पंजीकरण पृष्ठ',
    createYourAccount: 'स्क्राइब बनें',
    personalInfo: 'व्यक्तिगत जानकारी',
    documentUpload: 'आवश्यक दस्तावेज़',
    aadhaarNumber: 'आधार नंबर',
    fullName: 'पूरा नाम',
    age: 'आयु',
    emailAddress: 'ईमेल पता',
    phoneNumber: 'मोबाइल नंबर',
    state: 'राज्य',
    city: 'शहर',
    highestQualification: 'उच्चतम योग्यता',
    knownLanguages: 'ज्ञात भाषाएँ',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छुपाएं',
    profileImage: 'प्रोफ़ाइल छवि (JPG/PNG/WEBP)',
    qualificationProof: 'योग्यता प्रमाणपत्र (JPG/PNG/WEBP)',
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
    selectQualification: 'अपनी उच्चतम योग्यता चुनें',
    selectLanguages: 'ज्ञात भाषाएँ चुनें',
    uploadProgress: 'अपलोड प्रगति',
    fileSelected: 'फ़ाइल चुनी गई',
    removeFile: 'फ़ाइल हटाएं',

    // Qualification options
    qualifications: {
      '10th': '10वीं कक्षा',
      '12th': '12वीं कक्षा',
      'diploma': 'डिप्लोमा',
      'graduation': 'स्नातक',
      'postGraduation': 'स्नातकोत्तर',
      'phd': 'पीएचडी',
      'other': 'अन्य'
    },

    // Validation messages
    aadhaarRequired: 'आधार नंबर आवश्यक है।',
    aadhaarInvalid: 'कृपया एक वैध 12 अंकों का आधार नंबर दर्ज करें।',
    fullNameRequired: 'पूरा नाम आवश्यक है।',
    fullNameMinLength: 'पूरा नाम कम से कम 2 अक्षरों का होना चाहिए।',
    ageRequired: 'आयु आवश्यक है।',
    ageMin: 'आयु कम से कम 18 वर्ष होनी चाहिए।',
    ageMax: 'आयु 99 वर्ष से अधिक नहीं हो सकती।',
    emailRequired: 'ईमेल पता आवश्यक है।',
    emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें।',
    phoneRequired: 'मोबाइल नंबर आवश्यक है।',
    phoneInvalid: 'कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।',
    stateRequired: 'राज्य आवश्यक है।',
    cityRequired: 'शहर आवश्यक है।',
    qualificationRequired: 'उच्चतम योग्यता आवश्यक है।',
    knownLanguagesRequired: 'कृपया कम से कम एक भाषा चुनें।',
    passwordRequired: 'पासवर्ड आवश्यक है।',
    passwordMinLength: 'पासवर्ड कम से कम 8 वर्णों का होना चाहिए।',
    passwordPattern: 'पासवर्ड में कम से कम एक बड़ा अक्षर, एक छोटा अक्षर, एक संख्या और एक विशेष चिह्न होना चाहिए।',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते हैं।',
    profileImageRequired: 'प्रोफ़ाइल छवि आवश्यक है।',
    qualificationProofRequired: 'योग्यता प्रमाणपत्र छवि आवश्यक है।',
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

// --- Custom Hooks ---
const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState('');

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

  return { announcements, setAnnouncements };
};

const useFilePreview = (file) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file && file.length > 0 && file[0] instanceof File) {
      const url = URL.createObjectURL(file[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  return preview;
};

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  return { isOpen, setIsOpen, ref };
};

// --- Validation Schema ---
const createValidationSchema = (t) => z.object({
  aadhaarNumber: z.string()
    .min(1, { message: t.aadhaarRequired })
    .regex(/^\d{12}$/, { message: t.aadhaarInvalid }),
  fullName: z.string()
    .min(1, { message: t.fullNameRequired })
    .min(2, { message: t.fullNameMinLength })
    .trim(),
  age: z.coerce.number()
    .min(18, { message: t.ageMin })
    .max(99, { message: t.ageMax }),
  email: z.string()
    .min(1, { message: t.emailRequired })
    .email({ message: t.emailInvalid }),
  mobileNumber: z.string()
    .min(1, { message: t.phoneRequired })
    .regex(/^\d{10}$/, { message: t.phoneInvalid }),
  state: z.string()
    .min(1, { message: t.stateRequired }),
  city: z.string()
    .min(1, { message: t.cityRequired }),
  highestQualification: z.string()
    .min(1, { message: t.qualificationRequired }),
  knownLanguages: z.array(z.string())
    .nonempty({ message: t.knownLanguagesRequired }),
  password: z.string()
    .min(8, { message: t.passwordMinLength })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { 
      message: t.passwordPattern 
    }),
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
  qualificationImgLink: z.any()
    .refine((files) => files?.length > 0, { message: t.qualificationProofRequired })
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
}).refine((data) => data.password === data.confirmPassword, {
  message: t.passwordMismatch,
  path: ['confirmPassword'],
});

// --- Components ---
const LoadingSpinner = () => (
  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2" aria-hidden="true"></span>
);

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  icon: Icon, 
  register, 
  errors, 
  highContrast,
  className = '',
  ...props 
}) => {
  const inputBgClasses = highContrast ? 'bg-gray-800' : 'bg-gray-700';
  const inputBorderClasses = highContrast ? 'border-white' : 'border-gray-600';
  const focusClasses = highContrast ? 'focus:border-white focus:ring-white' : 'focus:border-blue-500 focus:ring-blue-500';
  const errorClasses = errors[name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        )}
        <input
          type={type}
          id={name}
          {...register(name)}
          className={`w-full p-3 ${Icon ? 'pl-10' : ''} rounded-md ${inputBgClasses} ${inputBorderClasses} ${errorClasses} border focus:outline-none focus:ring-2 ${focusClasses} transition-all duration-200`}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          {...props}
        />
      </div>
      {errors[name] && (
        <p id={`${name}-error`} role="alert" className="text-red-500 text-sm mt-1 flex items-center">
          <AlertTriangle size={14} className="mr-1" />
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

const FileUpload = ({ 
  name, 
  label, 
  register, 
  errors, 
  preview, 
  uploadProgress, 
  highContrast,
  onRemove 
}) => {
  const borderClasses = highContrast ? 'border-white' : 'border-gray-600';
  const hoverClasses = highContrast ? 'hover:bg-gray-900' : 'hover:bg-gray-700';
  const errorClasses = errors[name] ? 'border-red-500' : '';

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <label
          htmlFor={name}
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${borderClasses} ${hoverClasses} ${errorClasses}`}
        >
          {preview ? (
            <div className="relative w-full h-full p-2">
              <img 
                src={preview} 
                alt={`${name} preview`} 
                className="w-full h-full object-contain rounded" 
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove?.(name);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                aria-label="Remove file"
              >
                <XCircle size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <UploadCloud size={32} className={`mb-2 ${highContrast ? 'text-white' : 'text-gray-400'}`} />
              <p className="text-sm font-medium mb-1">Click to upload</p>
              <p className="text-xs text-gray-500">JPG, PNG, WEBP up to 5MB</p>
            </div>
          )}
          <input
            type="file"
            id={name}
            {...register(name)}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => register(name).onChange(e)}
          />
        </label>
        
        {uploadProgress[name] > 0 && uploadProgress[name] < 100 && (
          <div className="absolute bottom-0 left-0 right-0 bg-blue-600 h-1 rounded-b-lg">
            <div 
              className="bg-blue-400 h-full transition-all duration-300 rounded-b-lg"
              style={{ width: `${uploadProgress[name]}%` }}
            />
          </div>
        )}
      </div>
      
      {errors[name] && (
        <p role="alert" className="text-red-500 text-sm mt-1 text-center flex items-center justify-center">
          <AlertTriangle size={14} className="mr-1" />
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

const LanguageSelector = ({ 
  selectedLanguages, 
  onToggle, 
  highContrast, 
  t, 
  error 
}) => {
  const { isOpen, setIsOpen, ref } = useDropdown();
  
  const inputBgClasses = highContrast ? 'bg-gray-800' : 'bg-gray-700';
  const inputBorderClasses = highContrast ? 'border-white' : 'border-gray-600';
  const focusClasses = highContrast ? 'focus:border-white focus:ring-white' : 'focus:border-blue-500 focus:ring-blue-500';
  const dropdownBgClasses = highContrast ? 'bg-black border-white' : 'bg-gray-800';

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium mb-2">{t.knownLanguages}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 text-left rounded-md flex justify-between items-center ${inputBgClasses} ${inputBorderClasses} ${error ? 'border-red-500' : ''} border focus:outline-none focus:ring-2 ${focusClasses} transition-all duration-200`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate flex items-center">
          <Languages size={18} className="mr-2 text-gray-400" />
          {selectedLanguages.length > 0 ? (
            <span className="flex items-center">
              {selectedLanguages.slice(0, 2).join(', ')}
              {selectedLanguages.length > 2 && ` +${selectedLanguages.length - 2}`}
            </span>
          ) : (
            t.selectLanguages
          )}
        </span>
        <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <ul 
          role="listbox" 
          aria-multiselectable="true"
          className={`absolute mt-1 w-full rounded-md shadow-lg z-20 max-h-60 overflow-auto ${dropdownBgClasses} ring-1 ring-black ring-opacity-5`}
        >
          {KNOWN_LANGUAGES_OPTIONS.map(lang => (
            <li 
              key={lang}
              role="option"
              aria-selected={selectedLanguages.includes(lang)}
              onClick={() => onToggle(lang)}
              className={`p-3 cursor-pointer hover:bg-blue-600 hover:text-white flex items-center justify-between transition-colors ${
                selectedLanguages.includes(lang) ? 'bg-blue-700 text-white' : ''
              }`}
            >
              <span>{lang}</span>
              {selectedLanguages.includes(lang) && <Check size={16} />}
            </li>
          ))}
        </ul>
      )}
      
      {error && (
        <p role="alert" className="text-red-500 text-sm mt-1 flex items-center">
          <AlertTriangle size={14} className="mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );
};

// --- Main Component ---
const ScribeRegister = () => {
  const navigate = useNavigate();
  const { language, setLanguage, setIsAuthenticated, setUser, highContrast, setHighContrast } = useGlobal();
  const { announcements, setAnnouncements } = useAnnouncements();
  
  const [showPassword, setShowPassword] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ profile: 0, qualification: 0, aadhaar: 0 });
  const [currentOperation, setCurrentOperation] = useState('');

  const languageDropdown = useDropdown();
  
  const t = translations[language];
  const validationSchema = useMemo(() => createValidationSchema(t), [t]);

  // React Hook Form setup
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    reset, 
    formState: { errors, isValid, dirtyFields } 
  } = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: {
      aadhaarNumber: '',
      fullName: '',
      age: '',
      mobileNumber: '',
      email: '',
      state: '',
      city: '',
      highestQualification: '',
      knownLanguages: [],
      password: '',
      confirmPassword: '',
      profile: null,
      qualificationImgLink: null,
      aadhaarCard: null,
    },
  });

  const watchedFields = watch(['profile', 'qualificationImgLink', 'aadhaarCard', 'knownLanguages']);
  const [profileFiles, qualificationFiles, aadhaarFiles, selectedLanguages] = watchedFields;

  // File previews
  const profilePreview = useFilePreview(profileFiles);
  const qualificationPreview = useFilePreview(qualificationFiles);
  const aadhaarPreview = useFilePreview(aadhaarFiles);

  // Theme classes
  const baseClasses = highContrast ? 'bg-black text-white' : 'bg-gray-900 text-gray-100';
  const borderClasses = highContrast ? 'border-white' : 'border-gray-700';
  const buttonPrimaryClasses = highContrast
    ? 'bg-white text-black border border-white hover:bg-gray-200 focus:bg-gray-200'
    : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700';
  const linkClasses = highContrast
    ? 'text-white underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white'
    : 'text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500';

  // Event handlers
  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    setAnnouncements(t.languageChangedTo(lang === 'en' ? 'English' : 'Hindi'));
    languageDropdown.setIsOpen(false);
  }, [setLanguage, setAnnouncements, t, languageDropdown]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(!highContrast);
    setAnnouncements(!highContrast ? t.highContrastEnabled : t.highContrastDisabled);
  }, [highContrast, setHighContrast, setAnnouncements, t]);

  const handleKnownLanguageToggle = useCallback((language) => {
    const currentSelection = selectedLanguages || [];
    const newSelection = currentSelection.includes(language)
      ? currentSelection.filter(lang => lang !== language)
      : [...currentSelection, language];
    setValue('knownLanguages', newSelection, { shouldValidate: true });
  }, [selectedLanguages, setValue]);

  const handleFileRemove = useCallback((fieldName) => {
    setValue(fieldName, null);
  }, [setValue]);

  // Cloudinary Upload function
  const uploadToCloudinary = useCallback(async (file, fileType) => {
    try {
      const signatureRes = await axiosClient.get(`/auth/uploadSignature?fileType=${fileType}`);
      const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureRes.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('public_id', public_id);

      const uploadRes = await axios.post(upload_url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({ ...prev, [fileType]: percentCompleted }));
        },
      });

      return {
        secureUrl: uploadRes.data.secure_url,
        cloudinaryPublicId: uploadRes.data.public_id,
      };
    } catch (error) {
      console.error(`Error uploading ${fileType} to Cloudinary:`, error);
      throw new Error(t.generalUploadError);
    }
  }, [t.generalUploadError]);

  const onSubmit = useCallback(async (data) => {
    setRegistrationStatus('');
    setIsLoading(true);
    setUploadProgress({ profile: 0, qualification: 0, aadhaar: 0 });
    setAnnouncements('Initiating registration process...');

    try {
      setCurrentOperation(t.uploadingFiles);
      setAnnouncements(t.uploadingFiles);

      const [profileData, qualificationData, aadhaarData] = await Promise.all([
        uploadToCloudinary(data.profile[0], 'profile'),
        uploadToCloudinary(data.qualificationImgLink[0], 'qualification'),
        uploadToCloudinary(data.aadhaarCard[0], 'aadhaar'),
      ]);

      setCurrentOperation(t.submittingRegistration);
      setAnnouncements(t.submittingRegistration);

      const registrationPayload = {
        ...data,
        age: parseInt(data.age),
        userType: 'scribe',
        profile: { url: profileData.secureUrl, cloudinaryPublicId: profileData.cloudinaryPublicId },
        aadhaarCard: { url: aadhaarData.secureUrl, cloudinaryPublicId: aadhaarData.cloudinaryPublicId },
        qualificationImgLink: { url: qualificationData.secureUrl, cloudinaryPublicId: qualificationData.cloudinaryPublicId },
      };

      const registerRes = await axiosClient.post("/auth/registerScribe", registrationPayload);

      if (registerRes.status === 201) {
        setRegistrationStatus('success');
        setAnnouncements(t.registrationSuccess);
        reset();
        setUser({ ...registerRes?.data?.user, role: "scribe" });
        setIsAuthenticated(true);
        
        // Navigate after a brief delay to show success message
        setTimeout(() => navigate("/scribeHome"), 1500);
      } else {
        throw new Error(registerRes.data.message || t.registrationError);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus('error');
      const errorMessage = error.response?.data?.message || error.message || t.registrationError;
      setAnnouncements(errorMessage);
    } finally {
      setIsLoading(false);
      setUploadProgress({ profile: 0, qualification: 0, aadhaar: 0 });
      setCurrentOperation('');
    }
  }, [t, uploadToCloudinary, setAnnouncements, reset, setUser, setIsAuthenticated, navigate]);

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
      {/* Screen Reader Live Region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      {/* Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:p-2 focus:rounded-md focus:z-50 focus:shadow-lg"
      >
        {t.skipToMain}
      </a>

      {/* Header */}
      <header className={`py-4 px-6 md:px-12 flex justify-between items-center ${borderClasses} border-b shadow-sm`} role="banner">
        <div className="flex items-center space-x-3">
          <BookOpen size={32} className="text-blue-500" aria-hidden="true" />
          <div>
            <h1 className="text-2xl font-bold">{t.scribeConnect}</h1>
            <p className="text-sm text-gray-400">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative" ref={languageDropdown.ref}>
            <button
              onClick={() => languageDropdown.setIsOpen(!languageDropdown.isOpen)}
              className={`flex items-center p-2 rounded-md ${
                highContrast ? 'bg-gray-800 text-white border border-white' : 'bg-gray-800 text-gray-100'
              } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-200`}
              aria-haspopup="true"
              aria-expanded={languageDropdown.isOpen}
              aria-label={t.languageSwitcher}
            >
              <Globe size={20} aria-hidden="true" />
              <span className="ml-2 hidden sm:inline-block">
                {language === 'en' ? t.english : t.hindi}
              </span>
              <ChevronDown 
                size={16} 
                className={`ml-1 transform transition-transform ${languageDropdown.isOpen ? 'rotate-180' : ''}`} 
                aria-hidden="true" 
              />
            </button>
            
            {languageDropdown.isOpen && (
              <ul
                role="listbox"
                className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${
                  highContrast ? 'bg-black border border-white' : 'bg-gray-800'
                } ring-1 ring-black ring-opacity-5 focus:outline-none z-30`}
              >
                {['en', 'hi'].map(langCode => (
                  <li
                    key={langCode}
                    role="option"
                    aria-selected={language === langCode}
                    onClick={() => handleLanguageChange(langCode)}
                    className={`py-3 px-4 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-200 ${
                      language === langCode ? 'bg-blue-600 text-white' : ''
                    }`}
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLanguageChange(langCode);
                      }
                    }}
                  >
                    {langCode === 'en' ? t.english : t.hindi}
                    {language === langCode && <Check size={16} className="inline ml-2" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-md ${
              highContrast ? 'bg-white text-black' : 'bg-gray-800 text-gray-100'
            } hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-200`}
            aria-pressed={highContrast}
            aria-label={highContrast ? t.normalMode : t.highContrastMode}
            title={highContrast ? t.normalMode : t.highContrastMode}
          >
            {highContrast ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="flex flex-col items-center justify-center py-8 px-4">
        <div className={`w-full max-w-4xl p-8 rounded-xl shadow-2xl ${
          highContrast ? 'bg-black border border-white' : 'bg-gray-800'
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${highContrast ? 'text-white' : 'text-blue-400'}`}>
              {t.createYourAccount}
            </h2>
            <p className="text-gray-400">Fill in your details to register as a scribe</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
            {/* Personal Information Section */}
            <section aria-labelledby="personal-info-heading">
              <h3 
                id="personal-info-heading" 
                className={`text-xl font-semibold mb-4 flex items-center ${
                  highContrast ? 'text-white' : 'text-blue-300'
                }`}
              >
                <User size={20} className="mr-2" />
                {t.personalInfo}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label={t.fullName}
                  name="fullName"
                  icon={User}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter your full name"
                  className="md:col-span-1"
                />
                
                <FormField
                  label={t.aadhaarNumber}
                  name="aadhaarNumber"
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                />
                
                <FormField
                  label={t.age}
                  name="age"
                  type="number"
                  icon={Calendar}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  min={18}
                  max={99}
                  placeholder="Enter your age"
                />
                
                <FormField
                  label={t.phoneNumber}
                  name="mobileNumber"
                  type="tel"
                  icon={Smartphone}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
                
                <FormField
                  label={t.emailAddress}
                  name="email"
                  type="email"
                  icon={Mail}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter your email address"
                />
                
                <FormField
                  label={t.state}
                  name="state"
                  icon={MapPin}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter your state"
                />
                
                <FormField
                  label={t.city}
                  name="city"
                  icon={MapPin}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Enter your city"
                />

                {/* Highest Qualification */}
                <div className="relative">
                  <label htmlFor="highestQualification" className="block text-sm font-medium mb-2">
                    {t.highestQualification}
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      id="highestQualification"
                      {...register('highestQualification')}
                      className={`w-full p-3 pl-10 pr-10 rounded-md appearance-none ${
                        highContrast ? 'bg-gray-800 border-white' : 'bg-gray-700 border-gray-600'
                      } border focus:outline-none focus:ring-2 ${
                        highContrast ? 'focus:border-white focus:ring-white' : 'focus:border-blue-500 focus:ring-blue-500'
                      } ${errors.highestQualification ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} transition-all duration-200`}
                      aria-invalid={!!errors.highestQualification}
                    >
                      <option value="">{t.selectQualification}</option>
                      {Object.entries(t.qualifications).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                  {errors.highestQualification && (
                    <p role="alert" className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertTriangle size={14} className="mr-1" />
                      {errors.highestQualification.message}
                    </p>
                  )}
                </div>

                {/* Known Languages */}
                <LanguageSelector
                  selectedLanguages={selectedLanguages || []}
                  onToggle={handleKnownLanguageToggle}
                  highContrast={highContrast}
                  t={t}
                  error={errors.knownLanguages}
                />
              </div>
            </section>

            {/* Password Section */}
            <section aria-labelledby="password-heading" className="border-t pt-6 mt-6">
              <h3 
                id="password-heading" 
                className={`text-xl font-semibold mb-4 flex items-center ${
                  highContrast ? 'text-white' : 'text-blue-300'
                }`}
              >
                <Lock size={20} className="mr-2" />
                Security Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <FormField
                    label={t.password}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    register={register}
                    errors={errors}
                    highContrast={highContrast}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-400 hover:text-gray-200 focus:outline-none"
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                <FormField
                  label={t.confirmPassword}
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder="Confirm your password"
                />
              </div>
            </section>

            {/* Document Upload Section */}
            <section aria-labelledby="documents-heading" className="border-t pt-6">
              <h3 
                id="documents-heading" 
                className={`text-xl font-semibold mb-4 flex items-center ${
                  highContrast ? 'text-white' : 'text-blue-300'
                }`}
              >
                <UploadCloud size={20} className="mr-2" />
                {t.documentUpload}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUpload
                  name="profile"
                  label={t.profileImage}
                  register={register}
                  errors={errors}
                  preview={profilePreview}
                  uploadProgress={uploadProgress}
                  highContrast={highContrast}
                  onRemove={handleFileRemove}
                />
                
                <FileUpload
                  name="qualificationImgLink"
                  label={t.qualificationProof}
                  register={register}
                  errors={errors}
                  preview={qualificationPreview}
                  uploadProgress={uploadProgress}
                  highContrast={highContrast}
                  onRemove={handleFileRemove}
                />
                
                <FileUpload
                  name="aadhaarCard"
                  label={t.aadhaarCardImage}
                  register={register}
                  errors={errors}
                  preview={aadhaarPreview}
                  uploadProgress={uploadProgress}
                  highContrast={highContrast}
                  onRemove={handleFileRemove}
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black shadow-lg ${buttonPrimaryClasses} ${
                  isLoading || !isValid ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
                disabled={isLoading || !isValid}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner />
                    {currentOperation || 'Processing...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <User size={20} className="mr-2" />
                    {t.register}
                  </span>
                )}
              </button>
              
              {!isValid && Object.keys(errors).length > 0 && (
                <p className="text-yellow-500 text-sm mt-2 text-center flex items-center justify-center">
                  <AlertTriangle size={16} className="mr-1" />
                  Please fix the errors above to continue
                </p>
              )}
            </div>

            {/* Status Messages */}
            {registrationStatus && (
              <div 
                role="alert" 
                className={`p-4 rounded-lg text-white text-center flex items-center justify-center shadow-lg ${
                  registrationStatus === 'success' ? 'bg-green-700 border border-green-600' : 'bg-red-700 border border-red-600'
                }`}
              >
                {registrationStatus === 'success' ? (
                  <CheckCircle size={20} className="mr-2" />
                ) : (
                  <XCircle size={20} className="mr-2" />
                )}
                {announcements}
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center border-t pt-6">
            <p className="text-gray-400 mb-2">{t.alreadyHaveAccount}</p>
            <button 
              onClick={() => navigate("/login")} 
              className={`${linkClasses} font-semibold inline-flex items-center px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-600 hover:text-white`}
            >
              {t.loginNow}
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 px-6 text-center text-sm ${borderClasses} border-t ${
        highContrast ? 'text-white' : 'text-gray-400'
      } bg-opacity-50`}>
        <p>{t.copyright}</p>
      </footer>
    </div>
  );
};

export default ScribeRegister;