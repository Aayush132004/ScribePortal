

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
import INDIA_LOCATIONS from '../../data/indiaLocations.json'; // NEW


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
    state: '',
    district: '',          // NEW
    cityOrVillage: '',     // NEW
    pincode: '',           // NEW
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
                            

    districtRequired: 'District is required.',      // NEW
    cityRequired: 'City / Village is required.',    // UPDATED (was City)
    pincodeRequired: 'Pincode is required.',        // NEW
    pincodeInvalid: 'Please enter a valid 6-digit pincode.', // NEW


    // Qualification options
    qualifications: {
  "below10": "Below 10th Standard",
  "10th": "10th Standard (SSC/Matric)",
  "12th": "12th Standard (HSC/Intermediate)",
  "diploma": "Diploma (Polytechnic / 1–3 Years)",
  "iti": "ITI (Industrial Training Institute)",
  "ug": "Undergraduate Degree (Bachelor’s)",
  "ba": "B.A. (Bachelor of Arts)",
  "bsc": "B.Sc. (Bachelor of Science)",
  "bcom": "B.Com (Bachelor of Commerce)",
  "bba": "BBA (Bachelor of Business Administration)",
  "bca": "BCA (Bachelor of Computer Applications)",
  "btech": "B.Tech / B.E. (Engineering)",
  "llb": "LLB (Bachelor of Law)",
  "mbbs": "MBBS (Bachelor of Medicine)",
  "bpharm": "B.Pharm (Pharmacy)",
  "nursing": "B.Sc Nursing / GNM",
  "pg": "Postgraduate Degree (Master’s)",
  "ma": "M.A. (Master of Arts)",
  "msc": "M.Sc. (Master of Science)",
  "mcom": "M.Com (Master of Commerce)",
  "mba": "MBA (Master of Business Administration)",
  "mca": "MCA (Master of Computer Applications)",
  "mtech": "M.Tech / M.E.",
  "mpharm": "M.Pharm",
  "mphil": "M.Phil",
  "phd": "PhD / Doctorate",
  "postDoctoral": "Post Doctoral Research",
  "professional": "Professional Qualification",
  "ca": "CA (Chartered Accountant)",
  "cs": "CS (Company Secretary)",
  "cma": "CMA (Cost Accountant)",
  "other": "Other"
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
   state: 'State',
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
    city: 'शहर / गाँव',                            // UPDATED
    district: 'ज़िला',                              // NEW
    pincode: 'पिनकोड',                              // NEW

    districtRequired: 'ज़िला आवश्यक है।',          // NEW
    cityRequired: 'शहर / गाँव आवश्यक है।',         // UPDATED
    pincodeRequired: 'पिनकोड आवश्यक है।',          // NEW
    pincodeInvalid: 'कृपया एक वैध 6-अंकीय पिनकोड दर्ज करें।', // NEW


    // Qualification options
    qualifications:{
  "below10": "10वीं से कम योग्यता",
  "10th": "10वीं पास (SSC/मैट्रिक)",
  "12th": "12वीं पास (HSC/इंटरमीडिएट)",
  "diploma": "डिप्लोमा (पॉलीटेक्निक / 1–3 वर्ष)",
  "iti": "आईटीआई (औद्योगिक प्रशिक्षण संस्थान)",
  "ug": "स्नातक (Bachelor’s)",
  "ba": "बी.ए. (कला स्नातक)",
  "bsc": "बी.एससी. (विज्ञान स्नातक)",
  "bcom": "बी.कॉम (वाणिज्य स्नातक)",
  "bba": "बीबीए (व्यवसाय प्रशासन स्नातक)",
  "bca": "बीसीए (कंप्यूटर अनुप्रयोग स्नातक)",
  "btech": "बी.टेक / बी.ई. (इंजीनियरिंग)",
  "llb": "एलएलबी (कानून स्नातक)",
  "mbbs": "एमबीबीएस (चिकित्सा स्नातक)",
  "bpharm": "बी.फार्म (फार्मेसी)",
  "nursing": "बी.एससी नर्सिंग / जीएनएम",
  "pg": "स्नातकोत्तर (Master’s)",
  "ma": "एम.ए. (कला स्नातकोत्तर)",
  "msc": "एम.एससी. (विज्ञान स्नातकोत्तर)",
  "mcom": "एम.कॉम (वाणिज्य स्नातकोत्तर)",
  "mba": "एमबीए (व्यवसाय प्रशासन स्नातकोत्तर)",
  "mca": "एमसीए (कंप्यूटर अनुप्रयोग स्नातकोत्तर)",
  "mtech": "एम.टेक / एम.ई.",
  "mpharm": "एम.फार्म",
  "mphil": "एम.फिल",
  "phd": "पीएचडी (डॉक्टरेट)",
  "postDoctoral": "पोस्ट डॉक्टोरल शोध",
  "professional": "व्यावसायिक योग्यता",
  "ca": "सीए (चार्टर्ड अकाउंटेंट)",
  "cs": "सीएस (कंपनी सेक्रेटरी)",
  "cma": "सीएमए (कॉस्ट अकाउंटेंट)",
  "other": "अन्य"
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
    state: z.string()
    .min(1, { message: t.stateRequired }),                       // UPDATED

   district: z.string()                                           // NEW
    .min(1, { message: t.districtRequired }),

   cityOrVillage: z.string()                                      // NEW (replaces city)
    .min(1, { message: t.cityRequired }),

   pincode: z.string()                                            // NEW
    .min(1, { message: t.pincodeRequired })
    .regex(/^[1-9]\d{5}$/, { message: t.pincodeInvalid }),

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
              <p className="text-xs text-gray-300">JPG, PNG, WEBP up to 5MB</p>
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
    const watchState = watch('state'); // NEW: used for district dropdown


  // File previews
  const profilePreview = useFilePreview(profileFiles);
  const qualificationPreview = useFilePreview(qualificationFiles);
  const aadhaarPreview = useFilePreview(aadhaarFiles);
    useEffect(() => {                    // NEW: reset when language changes
    setValue('state', '');
    setValue('district', '');
  }, [language, setValue]);

  useEffect(() => {                    // NEW: clear district when state changes
    setValue('district', '');
  }, [watchState, setValue]);

 const statesList = useMemo(          // NEW
    () => INDIA_LOCATIONS[language].states,
    [language]
  );

  const districtsList = useMemo(       // NEW
    () => INDIA_LOCATIONS[language].districts,
    [language]
  );

  // Theme classes
  const baseClasses = highContrast ? 'bg-black text-white' : 'bg-gray-900 text-gray-100';
  const borderClasses = highContrast ? 'border-white' : 'border-gray-700';
  const buttonPrimaryClasses = highContrast
    ? 'bg-white text-black border border-white hover:bg-gray-200 focus:bg-gray-200'
    : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700';
  const linkClasses = highContrast
    ? 'text-white underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white'
    : 'text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500';
      const inputBgClasses = highContrast ? 'bg-gray-800' : 'bg-gray-700';          // NEW
  const inputBorderClasses = highContrast ? 'border-white' : 'border-gray-600'; // NEW
  const focusRingClasses = highContrast                                           // NEW
    ? 'focus:border-white focus:ring-white'
    : 'focus:border-blue-500 focus:ring-blue-500';


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
                
                               {/* State - dropdown */}                     {/* NEW */}
                <div className="relative">                  {/* NEW */}
                  <label  htmlFor="state"  className="block text-sm font-medium mb-2">
                    {t.state || (language === 'en' ? 'State' : 'राज्य')}
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      id="state"
                      {...register('state')}
                      className={`w-full p-3 pl-10 pr-10 rounded-md appearance-none
                        ${inputBgClasses} ${inputBorderClasses} border
                        ${errors.state ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        focus:outline-none focus:ring-2 ${focusRingClasses}
                        transition-all duration-200`}
                    >
                      <option value="">
                        {language === 'en' ? 'Select State' : 'राज्य चुनें'}
                      </option>
                      {statesList.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                  {errors.state && (
                    <p
                      id="state-error"
                      role="alert"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertTriangle size={14} className="mr-1" />
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* District - dependent dropdown */}        {/* NEW */}
                <div className="relative">                  {/* NEW */}
                  <label htmlFor="district" className="block text-sm font-medium mb-2">
                     {t.district || (language === 'en' ? 'District' : 'ज़िला')}
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      id="district"
                      {...register('district')}
                      disabled={!watchState}
                      className={`w-full p-3 pl-10 pr-10 rounded-md appearance-none
                        ${inputBgClasses} ${inputBorderClasses} border
                        ${errors.district ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        focus:outline-none focus:ring-2 ${focusRingClasses}
                        ${!watchState ? 'opacity-60 cursor-not-allowed' : ''}
                        transition-all duration-200`}
                    >
                      {!watchState && (
                        <option value="">
                          {language === 'en'
                            ? 'Select state first'
                            : 'पहले राज्य चुनें'}
                        </option>
                      )}
                      {watchState && (
                        <>
                          <option value="">
                            {language === 'en'
                              ? 'Select District'
                              : 'ज़िला चुनें'}
                          </option>
                          {(districtsList[watchState] || []).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      )}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                  {errors.district && (
                    <p
                      id="district-error"
                      role="alert"
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertTriangle size={14} className="mr-1" />
                      {errors.district.message}
                    </p>
                  )}
                </div>

                {/* City / Village */}                       {/* UPDATED (name) */}
                <FormField
                  label={t.city}
                  name="cityOrVillage"                      // UPDATED
                  icon={MapPin}
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder={language === 'en'
                    ? 'Enter city or village'
                    : 'अपना शहर / गाँव दर्ज करें'}
                />

                {/* Pincode */}                              {/* NEW */}
                <FormField
                  label={t.pincode}
                  name="pincode"
                  register={register}
                  errors={errors}
                  highContrast={highContrast}
                  placeholder={language === 'en'
                    ? 'Enter 6-digit pincode'
                    : '6 अंकों का पिनकोड दर्ज करें'}
                  maxLength={6}
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