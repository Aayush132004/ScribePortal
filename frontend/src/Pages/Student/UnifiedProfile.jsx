// import React, { useState, useEffect, useRef } from 'react';
// import { User, Phone, Mail, MapPin, GraduationCap, FileText, Calendar, Shield, BookOpen, Users, Clock, X, Eye, ZoomIn, Download } from 'lucide-react';
// import axiosClient from '../../utils/axiosClient';
// import useGlobal from '../../utils/GlobalContext';
// import { Navigate } from 'react-router-dom';
// import Navbar from '../../components/Navbar';

// // Document Modal Component
// const DocumentModal = ({ isOpen, onClose, document, title, highContrast, language }) => {
//   const modalRef = useRef(null);
//   const [announcements, setAnnouncements] = useState('');

//   const translations = {
//     en: {
//       closeModal: "Close document view",
//       downloadDocument: "Download document",
//       documentView: "Document view",
//       loading: "Loading document...",
//       error: "Failed to load document"
//     },
//     hi: {
//       closeModal: "दस्तावेज़ देखना बंद करें",
//       downloadDocument: "दस्तावेज़ डाउनलोड करें",
//       documentView: "दस्तावेज़ देखें",
//       loading: "दस्तावेज़ लोड हो रहा है...",
//       error: "दस्तावेज़ लोड करने में असफल"
//     }
//   };

//   const t = translations[language] || translations.en;

//   // This function is defined once and memoized by useCallback
//   // to prevent re-creation on every render.
//   const announce = React.useCallback((message) => {
//     setAnnouncements(message);
//     setTimeout(() => setAnnouncements(''), 1000);
//   }, []);

//   // --- START: MODIFIED CODE ---
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       // ✅ SOLUTION: Use 'window.document' to refer to the global object.
//       window.document.addEventListener('keydown', handleKeyDown);
//       modalRef.current?.focus();
//       announce(`${title} ${t.documentView}`);
//     }

//     // ✅ FIX: The cleanup function now correctly removes the listener from 'window.document'.
//     return () => {
//       window.document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [isOpen, onClose, title, t.documentView, announce]); // Added announce to dependency array
//   // --- END: MODIFIED CODE ---

//   if (!isOpen) return null;

//   const modalClasses = highContrast
//     ? "bg-black text-white border-white border-2"
//     : "bg-gray-900 text-gray-100";

//   const buttonClasses = highContrast
//     ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
//     : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600";

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       {/* Screen Reader Announcements */}
//       <div aria-live="polite" aria-atomic="true" className="sr-only">
//         {announcements}
//       </div>

//       <div
//         ref={modalRef}
//         className={`${modalClasses} rounded-xl shadow-2xl max-w-4xl max-h-[90vh] w-full flex flex-col`}
//         onClick={(e) => e.stopPropagation()}
//         tabIndex={-1}
//       >
//         {/* Modal Header */}
//         <div className={`flex items-center justify-between p-6 border-b ${
//           highContrast ? 'border-white' : 'border-gray-700'
//         }`}>
//           <h2 id="modal-title" className="text-xl font-bold">
//             {title}
//           </h2>
//           <div className="flex items-center space-x-2">
//             <a
//               href={document}
//               download
//               className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
//               aria-label={t.downloadDocument}
//               title={t.downloadDocument}
//             >
//               <Download className="h-5 w-5" />
//             </a>
//             <button
//               onClick={onClose}
//               className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
//               aria-label={t.closeModal}
//               title={t.closeModal}
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Modal Content */}
//         <div className="flex-1 p-6 overflow-auto">
//           <img
//             src={document}
//             alt={title}
//             className="w-full h-auto rounded-lg border border-gray-600 shadow-lg"
//             style={{ maxHeight: '70vh', objectFit: 'contain' }}
//             onError={(e) => {
//               e.target.alt = t.error;
//               e.target.className = `${e.target.className} opacity-50`;
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// function UnifiedProfile() {
//   const [profileData, setProfileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [documentModal, setDocumentModal] = useState({ isOpen: false, document: null, title: '' });
//   const [announcements, setAnnouncements] = useState('');

//   // Global context
//   const { user, setUser, language, highContrast } = useGlobal();

//   // Translations
//   const translations = {
//     en: {
//       loadingProfile: "Loading profile...",
//       personalDetails: "Personal Details",
//       contactInfo: "Contact Info",
//       education: "Education",
//       qualification: "Qualification",
//       studentConnections: "Student Connections",
//       availability: "Availability",
//       documents: "Documents",
//       security: "Security",
//       fullName: "Full Name",
//       age: "Age",
//       disability: "Disability",
//       mobile: "Mobile",
//       email: "Email",
//       location: "Location",
//       educationLevel: "Education Level",
//       highestQualification: "Highest Qualification",
//       status: "Status",
//       active: "Active",
//       permanentStudents: "Permanent Students",
//       temporaryAssignments: "Temporary Assignments",
//       bookedDates: "Booked Dates",
//       available: "Available",
//       nextAvailable: "Next Available",
//       today: "Today",
//       aadhaarCard: "Aadhaar Card",
//       identityDocument: "Identity Document",
//       qualificationCertificate: "Qualification Certificate",
//       educationDocument: "Education Document",
//       verified: "Verified",
//       aadhaarNumber: "Aadhaar Number",
//       accountCreated: "Account Created",
//       none: "None",
//       notProvided: "Not provided",
//       years: "years",
//       viewDocument: "View document"
//     },
//     hi: {
//       loadingProfile: "प्रोफ़ाइल लोड हो रहा है...",
//       personalDetails: "व्यक्तिगत विवरण",
//       contactInfo: "संपर्क जानकारी",
//       education: "शिक्षा",
//       qualification: "योग्यता",
//       studentConnections: "छात्र कनेक्शन",
//       availability: "उपलब्धता",
//       documents: "दस्तावेज़",
//       security: "सुरक्षा",
//       fullName: "पूरा नाम",
//       age: "आयु",
//       disability: "विकलांगता",
//       mobile: "मोबाइल",
//       email: "ईमेल",
//       location: "स्थान",
//       educationLevel: "शिक्षा स्तर",
//       highestQualification: "उच्चतम योग्यता",
//       status: "स्थिति",
//       active: "सक्रिय",
//       permanentStudents: "स्थायी छात्र",
//       temporaryAssignments: "अस्थायी असाइनमेंट",
//       bookedDates: "बुक की गई तारीखें",
//       available: "उपलब्ध",
//       nextAvailable: "अगली उपलब्धता",
//       today: "आज",
//       aadhaarCard: "आधार कार्ड",
//       identityDocument: "पहचान दस्तावेज़",
//       qualificationCertificate: "योग्यता प्रमाणपत्र",
//       educationDocument: "शिक्षा दस्तावेज़",
//       verified: "सत्यापित",
//       aadhaarNumber: "आधार संख्या",
//       accountCreated: "खाता बनाया गया",
//       none: "कोई नहीं",
//       notProvided: "प्रदान नहीं किया गया",
//       years: "वर्ष",
//       viewDocument: "दस्तावेज़ देखें"
//     }
//   };

//   const t = translations[language] || translations.en;

//   const announce = (message) => {
//     setAnnouncements(message);
//     setTimeout(() => setAnnouncements(''), 1000);
//   };

//   // Theme classes
//   const baseClasses = highContrast
//     ? "bg-black text-white"
//     : "bg-gray-900 text-gray-100";

//   const cardClasses = highContrast
//     ? "bg-gray-900 border-white border-2 text-white"
//     : "bg-gray-800 border-gray-700 border text-gray-100";

//   const buttonClasses = highContrast
//     ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
//     : "bg-blue-600 text-white hover:bg-blue-700";

//   const badgeClasses = highContrast
//     ? "bg-white text-black border-2 border-white"
//     : "bg-green-100 text-green-800";

//   console.log("user is:", user);

//   const getProfileData = async () => {
//     try {
//       setIsLoading(true);
//       console.log(user._id, user.role);

//       const endpoint = user.role === "student" ? "/auth/getstudentprofile" : "/auth/getscribeprofile";
//       const response = await axiosClient.post(endpoint, { user });

//       const profileKey = user.role === "student" ? "student" : "scribe";
//       console.log(response.data[profileKey]);
//       setProfileData(response.data[profileKey]);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user && user._id) {
//       getProfileData();
//     } else {
//       setIsLoading(false);
//     }
//   }, [user]);

//   const openDocumentModal = (document, title) => {
//     setDocumentModal({ isOpen: true, document, title });
//     announce(`${t.viewDocument}: ${title}`);
//   };

//   const closeDocumentModal = () => {
//     setDocumentModal({ isOpen: false, document: null, title: '' });
//     announce("Document view closed");
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className={`min-h-screen ${baseClasses} flex items-center justify-center transition-colors duration-300`}>
//           {/* Screen Reader Announcements */}
//           <div aria-live="polite" aria-atomic="true" className="sr-only">
//             {announcements}
//           </div>

//           <div className="text-center">
//             <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
//               highContrast ? 'border-white' : 'border-blue-400'
//             }`}></div>
//             <p className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
//               {t.loadingProfile}
//             </p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!profileData) {
//     return <Navigate to="/login" />;
//   }

//   const isScribe = profileData.role === "scribe";

//   return (
//     <>
//       <Navbar />
//       <div className={`min-h-screen ${baseClasses} p-4 transition-colors duration-300`}>
//         {/* Screen Reader Announcements */}
//         <div aria-live="polite" aria-atomic="true" className="sr-only">
//           {announcements}
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Main Profile Card */}
//           <div className={`${cardClasses} rounded-2xl shadow-xl overflow-hidden mb-6`}>
//             <div className="p-8">
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//                 <div className="relative">
//                   <img
//                     src={profileData.profile?.url || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"}
//                     alt={`${profileData.fullName}'s profile`}
//                     className={`w-24 h-24 rounded-full object-cover border-4 ${
//                       highContrast ? 'border-white' : 'border-gray-600'
//                     }`}
//                   />
//                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
//                 </div>
//                 <div className="flex-1">
//                   <h1 className="text-2xl font-bold mb-1">{profileData.fullName}</h1>
//                   <p className={`mb-2 capitalize ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
//                     {profileData.role}
//                   </p>
//                   <div className={`flex items-center text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {profileData.city}, {profileData.state}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Information Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Personal Details */}
//             <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//               <div className="flex items-center mb-4">
//                 <User className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                 <h2 className="font-semibold">{t.personalDetails}</h2>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.fullName}
//                   </label>
//                   <p className="font-medium">{profileData.fullName}</p>
//                 </div>
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.age}
//                   </label>
//                   <p className="font-medium">{profileData.age} {t.years}</p>
//                 </div>
//                 {!isScribe && (
//                   <div>
//                     <label className={`text-xs font-medium uppercase tracking-wide ${
//                       highContrast ? 'text-gray-300' : 'text-gray-500'
//                     }`}>
//                       {t.disability}
//                     </label>
//                     <p className="font-medium">{profileData.disability || t.none}</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//               <div className="flex items-center mb-4">
//                 <Phone className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                 <h2 className="font-semibold">{t.contactInfo}</h2>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.mobile}
//                   </label>
//                   <p className="font-medium">{profileData.mobileNumber}</p>
//                 </div>
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.email}
//                   </label>
//                   <p className="font-medium">{profileData.email || t.notProvided}</p>
//                 </div>
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.location}
//                   </label>
//                   <p className="font-medium">{profileData.city}, {profileData.state}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Education/Qualification */}
//             <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//               <div className="flex items-center mb-4">
//                 <GraduationCap className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                 <h2 className="font-semibold">
//                   {isScribe ? t.qualification : t.education}
//                 </h2>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {isScribe ? t.highestQualification : t.educationLevel}
//                   </label>
//                   <p className="font-medium">
//                     {isScribe ? profileData.highestQualification : profileData.educationLevel}
//                   </p>
//                 </div>
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.status}
//                   </label>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
//                     {t.active}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Scribe Information */}
//           {isScribe && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//               {/* Student Connections */}
//               <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//                 <div className="flex items-center mb-4">
//                   <Users className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                   <h2 className="font-semibold">{t.studentConnections}</h2>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
//                       {t.permanentStudents}
//                     </span>
//                     <span className="font-semibold">
//                       {profileData.permanentstudent?.length || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
//                       {t.temporaryAssignments}
//                     </span>
//                     <span className="font-semibold">
//                       {profileData.tempstudent?.length || 0}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
//                       {t.bookedDates}
//                     </span>
//                     <span className="font-semibold">
//                       {profileData.bookedDates?.length || 0}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Availability */}
//               <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//                 <div className="flex items-center mb-4">
//                   <Clock className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                   <h2 className="font-semibold">{t.availability}</h2>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>{t.status}</span>
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
//                       {t.available}
//                     </span>
//                   </div>
//                   <div>
//                     <label className={`text-xs font-medium uppercase tracking-wide ${
//                       highContrast ? 'text-gray-300' : 'text-gray-500'
//                     }`}>
//                       {t.nextAvailable}
//                     </label>
//                     <p className="font-medium">{t.today}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Documents and Security */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//             {/* Documents */}
//             <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//               <div className="flex items-center mb-4">
//                 <FileText className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                 <h2 className="font-semibold">{t.documents}</h2>
//               </div>
//               <div className="space-y-4">
//                 {/* Aadhaar Card */}
//                 <div className={`border rounded-xl p-4 ${
//                   highContrast ? 'border-white' : 'border-gray-600'
//                 }`}>
//                   <div className="flex items-center justify-between mb-3">
//                     <div>
//                       <h3 className="font-medium">{t.aadhaarCard}</h3>
//                       <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
//                         {t.identityDocument}
//                       </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses}`}>
//                         {t.verified}
//                       </span>
//                       <button
//                         onClick={() => openDocumentModal(
//                           profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
//                           t.aadhaarCard
//                         )}
//                         className={`p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
//                         aria-label={`${t.viewDocument} - ${t.aadhaarCard}`}
//                         title={`${t.viewDocument} - ${t.aadhaarCard}`}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <img
//                     src={profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"}
//                     alt={t.aadhaarCard}
//                     className={`w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${
//                       highContrast ? 'border-white' : 'border-gray-600'
//                     }`}
//                     onClick={() => openDocumentModal(
//                       profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
//                       t.aadhaarCard
//                     )}
//                   />
//                 </div>

//                 {/* Qualification Document (Scribe only) */}
//                 {isScribe && profileData.qualificationImgLink?.url && (
//                   <div className={`border rounded-xl p-4 ${
//                     highContrast ? 'border-white' : 'border-gray-600'
//                   }`}>
//                     <div className="flex items-center justify-between mb-3">
//                       <div>
//                         <h3 className="font-medium">{t.qualificationCertificate}</h3>
//                         <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
//                           {t.educationDocument}
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses}`}>
//                           {t.verified}
//                         </span>
//                         <button
//                           onClick={() => openDocumentModal(profileData.qualificationImgLink.url, t.qualificationCertificate)}
//                           className={`p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
//                           aria-label={`${t.viewDocument} - ${t.qualificationCertificate}`}
//                           title={`${t.viewDocument} - ${t.qualificationCertificate}`}
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                     <img
//                       src={profileData.qualificationImgLink.url}
//                       alt={t.qualificationCertificate}
//                       className={`w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${
//                         highContrast ? 'border-white' : 'border-gray-600'
//                       }`}
//                       onClick={() => openDocumentModal(profileData.qualificationImgLink.url, t.qualificationCertificate)}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Security Info */}
//             <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
//               <div className="flex items-center mb-4">
//                 <Shield className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
//                 <h2 className="font-semibold">{t.security}</h2>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.aadhaarNumber}
//                   </label>
//                   <p className="font-mono font-medium">
//                     {profileData.aadhaarNumber?.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
//                   </p>
//                 </div>
//                 <div>
//                   <label className={`text-xs font-medium uppercase tracking-wide ${
//                     highContrast ? 'text-gray-300' : 'text-gray-500'
//                   }`}>
//                     {t.accountCreated}
//                   </label>
//                   <div className="flex items-center font-medium">
//                     <Calendar className={`w-4 h-4 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-500'}`} />
//                     {new Date(profileData.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Document Modal */}
//       <DocumentModal
//         isOpen={documentModal.isOpen}
//         onClose={closeDocumentModal}
//         document={documentModal.document}
//         title={documentModal.title}
//         highContrast={highContrast}
//         language={language}
//       />
//     </>
//   );
// }

// export default UnifiedProfile;

import React, { useState, useEffect, useRef } from 'react';
import { User, Phone, Mail, MapPin, GraduationCap, FileText, Calendar, Shield, BookOpen, Users, Clock, X, Eye, ZoomIn, Download } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import useGlobal from '../../utils/GlobalContext';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Document Modal Component
const DocumentModal = ({ isOpen, onClose, document, title, highContrast, language }) => {
  const modalRef = useRef(null);
  const [announcements, setAnnouncements] = useState('');

  const translations = {
    en: {
      closeModal: "Close document view",
      downloadDocument: "Download document",
      documentView: "Document view",
      loading: "Loading document...",
      error: "Failed to load document"
    },
    hi: {
      closeModal: "दस्तावेज़ देखना बंद करें",
      downloadDocument: "दस्तावेज़ डाउनलोड करें",
      documentView: "दस्तावेज़ देखें",
      loading: "दस्तावेज़ लोड हो रहा है...",
      error: "दस्तावेज़ लोड करने में असफल"
    }
  };

  const t = translations[language] || translations.en;

  const announce = React.useCallback((message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      announce(`${title} ${t.documentView}`);
    }

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, title, t.documentView, announce]);

  if (!isOpen) return null;

  const modalClasses = highContrast
    ? "bg-black text-white border-white border-2"
    : "bg-gray-900 text-gray-100";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      <div
        ref={modalRef}
        className={`${modalClasses} rounded-xl shadow-2xl max-w-4xl max-h-[90vh] w-full flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className={`flex items-center justify-between p-6 border-b ${
          highContrast ? 'border-white' : 'border-gray-700'
        }`}>
          <h2 id="modal-title" className="text-xl font-bold">
            {title}
          </h2>
          <div className="flex items-center space-x-2">
            <a
              href={document}
              download
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
              aria-label={t.downloadDocument}
              title={t.downloadDocument}
            >
              <Download className="h-5 w-5" />
            </a>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
              aria-label={t.closeModal}
              title={t.closeModal}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <img
            src={document}
            alt={title}
            className="w-full h-auto rounded-lg border border-gray-600 shadow-lg"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
            onError={(e) => {
              e.target.alt = t.error;
              e.target.className = `${e.target.className} opacity-50`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Booked Dates Modal Component
const BookedDatesModal = ({ isOpen, onClose, bookedDates, highContrast, language }) => {
  const modalRef = useRef(null);
  const [announcements, setAnnouncements] = useState('');

  const translations = {
    en: {
      closeModal: "Close booked dates view",
      bookedDates: "Booked Dates",
      noDatesBooked: "No dates booked",
      totalBookings: "Total Bookings",
      upcomingBookings: "Upcoming Bookings",
      pastBookings: "Past Bookings",
      today: "Today"
    },
    hi: {
      closeModal: "बुक की गई तारीखों का दृश्य बंद करें",
      bookedDates: "बुक की गई तारीखें",
      noDatesBooked: "कोई तारीख बुक नहीं की गई",
      totalBookings: "कुल बुकिंग",
      upcomingBookings: "आगामी बुकिंग",
      pastBookings: "पिछली बुकिंग",
      today: "आज"
    }
  };

  const t = translations[language] || translations.en;

  const announce = React.useCallback((message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      announce(t.bookedDates);
    }

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, t.bookedDates, announce]);

  if (!isOpen) return null;

  const modalClasses = highContrast
    ? "bg-black text-white border-white border-2"
    : "bg-gray-900 text-gray-100";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600";

  const cardClasses = highContrast
    ? "bg-gray-900 border-white border-2 text-white"
    : "bg-gray-800 border-gray-700 border text-gray-100";

  // Sort and categorize dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sortedDates = bookedDates
    .map(date => new Date(date))
    .sort((a, b) => a - b);
  
  const upcomingDates = sortedDates.filter(date => date >= today);
  const pastDates = sortedDates.filter(date => date < today);

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const isToday = date.toDateString() === today.toDateString();
    const formattedDate = date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', options);
    
    return isToday ? `${formattedDate} (${t.today})` : formattedDate;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booked-dates-title"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      <div
        ref={modalRef}
        className={`${modalClasses} rounded-xl shadow-2xl max-w-4xl max-h-[90vh] w-full flex flex-col`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          highContrast ? 'border-white' : 'border-gray-700'
        }`}>
          <div className="flex items-center">
            <Calendar className={`w-6 h-6 mr-3 ${highContrast ? 'text-white' : 'text-blue-400'}`} />
            <h2 id="booked-dates-title" className="text-xl font-bold">
              {t.bookedDates}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
            aria-label={t.closeModal}
            title={t.closeModal}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-6 overflow-auto">
          {bookedDates.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className={`w-16 h-16 mx-auto mb-4 ${
                highContrast ? 'text-gray-300' : 'text-gray-500'
              }`} />
              <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                {t.noDatesBooked}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${cardClasses} rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold mb-1">{bookedDates.length}</div>
                  <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                    {t.totalBookings}
                  </div>
                </div>
                <div className={`${cardClasses} rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold mb-1 text-green-400">{upcomingDates.length}</div>
                  <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                    {t.upcomingBookings}
                  </div>
                </div>
                <div className={`${cardClasses} rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold mb-1 text-orange-400">{pastDates.length}</div>
                  <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                    {t.pastBookings}
                  </div>
                </div>
              </div>

              {/* Upcoming Dates */}
              {upcomingDates.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className={`w-5 h-5 mr-2 text-green-400`} />
                    {t.upcomingBookings}
                  </h3>
                  <div className="space-y-2">
                    {upcomingDates.map((date, index) => (
                      <div
                        key={`upcoming-${index}`}
                        className={`${cardClasses} rounded-lg p-4 flex items-center justify-between`}
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                          <span className="font-medium">{formatDate(date)}</span>
                        </div>
                        <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                          {Math.ceil((date - today) / (1000 * 60 * 60 * 24))} days from now
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Dates */}
              {pastDates.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Calendar className={`w-5 h-5 mr-2 text-orange-400`} />
                    {t.pastBookings}
                  </h3>
                  <div className="space-y-2">
                    {pastDates.reverse().map((date, index) => (
                      <div
                        key={`past-${index}`}
                        className={`${cardClasses} rounded-lg p-4 flex items-center justify-between opacity-75`}
                      >
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                          <span className="font-medium">{formatDate(date)}</span>
                        </div>
                        <div className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                          {Math.ceil((today - date) / (1000 * 60 * 60 * 24))} days ago
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function UnifiedProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [documentModal, setDocumentModal] = useState({ isOpen: false, document: null, title: '' });
  const [bookedDatesModal, setBookedDatesModal] = useState({ isOpen: false });
  const [announcements, setAnnouncements] = useState('');

  // Global context
  const { user, setUser, language, highContrast } = useGlobal();

  // Translations
  const translations = {
    en: {
      loadingProfile: "Loading profile...",
      personalDetails: "Personal Details",
      contactInfo: "Contact Info",
      education: "Education",
      qualification: "Qualification",
      studentConnections: "Student Connections",
      availability: "Availability",
      documents: "Documents",
      security: "Security",
      fullName: "Full Name",
      age: "Age",
      disability: "Disability",
      mobile: "Mobile",
      email: "Email",
      location: "Location",
      educationLevel: "Education Level",
      highestQualification: "Highest Qualification",
      status: "Status",
      active: "Active",
      permanentStudents: "Permanent Students",
      temporaryAssignments: "Temporary Assignments",
      bookedDates: "Booked Dates",
      available: "Available",
      
      aadhaarCard: "Aadhaar Card",
      identityDocument: "Identity Document",
      qualificationCertificate: "Qualification Certificate",
      educationDocument: "Education Document",
      verified: "Verified",
      aadhaarNumber: "Aadhaar Number",
      accountCreated: "Account Created",
      none: "None",
      notProvided: "Not provided",
      years: "years",
      viewDocument: "View document",
      clickToViewBookedDates: "Click to view all booked dates"
    },
    hi: {
      loadingProfile: "प्रोफ़ाइल लोड हो रहा है...",
      personalDetails: "व्यक्तिगत विवरण",
      contactInfo: "संपर्क जानकारी",
      education: "शिक्षा",
      qualification: "योग्यता",
      studentConnections: "छात्र कनेक्शन",
      availability: "उपलब्धता",
      documents: "दस्तावेज़",
      security: "सुरक्षा",
      fullName: "पूरा नाम",
      age: "आयु",
      disability: "विकलांगता",
      mobile: "मोबाइल",
      email: "ईमेल",
      location: "स्थान",
      educationLevel: "शिक्षा स्तर",
      highestQualification: "उच्चतम योग्यता",
      status: "स्थिति",
      active: "सक्रिय",
      permanentStudents: "स्थायी छात्र",
      temporaryAssignments: "अस्थायी असाइनमेंट",
      bookedDates: "बुक की गई तारीखें",
      available: "उपलब्ध",
      nextAvailable: "अगली उपलब्धता",
      today: "आज",
      aadhaarCard: "आधार कार्ड",
      identityDocument: "पहचान दस्तावेज़",
      qualificationCertificate: "योग्यता प्रमाणपत्र",
      educationDocument: "शिक्षा दस्तावेज़",
      verified: "सत्यापित",
      aadhaarNumber: "आधार संख्या",
      accountCreated: "खाता बनाया गया",
      none: "कोई नहीं",
      notProvided: "प्रदान नहीं किया गया",
      years: "वर्ष",
      viewDocument: "दस्तावेज़ देखें",
      clickToViewBookedDates: "सभी बुक की गई तारीखें देखने के लिए क्लिक करें"
    }
  };

  const t = translations[language] || translations.en;

  const announce = (message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  };

  // Theme classes
  const baseClasses = highContrast
    ? "bg-black text-white"
    : "bg-gray-900 text-gray-100";

  const cardClasses = highContrast
    ? "bg-gray-900 border-white border-2 text-white"
    : "bg-gray-800 border-gray-700 border text-gray-100";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
    : "bg-blue-600 text-white hover:bg-blue-700";

  const badgeClasses = highContrast
    ? "bg-white text-black border-2 border-white"
    : "bg-green-100 text-green-800";

  const clickableCardClasses = highContrast
    ? "bg-gray-900 border-white border-2 text-white hover:bg-gray-800 cursor-pointer transition-colors"
    : "bg-gray-800 border-gray-700 border text-gray-100 hover:bg-gray-750 cursor-pointer transition-colors";

  console.log("user is:", user);

  const getProfileData = async () => {
    try {
      setIsLoading(true);
      console.log(user._id, user.role);

      const endpoint = user.role === "student" ? "/auth/getstudentprofile" : "/auth/getscribeprofile";
      const response = await axiosClient.post(endpoint, { user });

      const profileKey = user.role === "student" ? "student" : "scribe";
      console.log(response.data[profileKey]);
      setProfileData(response.data[profileKey]);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getProfileData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const openDocumentModal = (document, title) => {
    setDocumentModal({ isOpen: true, document, title });
    announce(`${t.viewDocument}: ${title}`);
  };

  const closeDocumentModal = () => {
    setDocumentModal({ isOpen: false, document: null, title: '' });
    announce("Document view closed");
  };

  const openBookedDatesModal = () => {
    setBookedDatesModal({ isOpen: true });
    announce(t.clickToViewBookedDates);
  };

  const closeBookedDatesModal = () => {
    setBookedDatesModal({ isOpen: false });
    announce("Booked dates view closed");
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className={`min-h-screen ${baseClasses} flex items-center justify-center transition-colors duration-300`}>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcements}
          </div>

          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
              highContrast ? 'border-white' : 'border-blue-400'
            }`}></div>
            <p className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
              {t.loadingProfile}
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!profileData) {
    return <Navigate to="/login" />;
  }

  const isScribe = profileData.role === "scribe";

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${baseClasses} p-4 transition-colors duration-300`}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcements}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Profile Card */}
          <div className={`${cardClasses} rounded-2xl shadow-xl overflow-hidden mb-6`}>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img
                    src={profileData.profile?.url || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt={`${profileData.fullName}'s profile`}
                    className={`w-24 h-24 rounded-full object-cover border-4 ${
                      highContrast ? 'border-white' : 'border-gray-600'
                    }`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{profileData.fullName}</h1>
                  <p className={`mb-2 capitalize ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                    {profileData.role}
                  </p>
                  <div className={`flex items-center text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.city}, {profileData.state}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Details */}
            <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center mb-4">
                <User className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                <h2 className="font-semibold">{t.personalDetails}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.fullName}
                  </label>
                  <p className="font-medium">{profileData.fullName}</p>
                </div>
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.age}
                  </label>
                  <p className="font-medium">{profileData.age} {t.years}</p>
                </div>
                {!isScribe && (
                  <div>
                    <label className={`text-xs font-medium uppercase tracking-wide ${
                      highContrast ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {t.disability}
                    </label>
                    <p className="font-medium">{profileData.disability || t.none}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center mb-4">
                <Phone className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                <h2 className="font-semibold">{t.contactInfo}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.mobile}
                  </label>
                  <p className="font-medium">{profileData.mobileNumber}</p>
                </div>
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.email}
                  </label>
                  <p className="font-medium">{profileData.email || t.notProvided}</p>
                </div>
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.location}
                  </label>
                  <p className="font-medium">{profileData.city}, {profileData.state}</p>
                </div>
              </div>
            </div>

            {/* Education/Qualification */}
            <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center mb-4">
                <GraduationCap className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                <h2 className="font-semibold">
                  {isScribe ? t.qualification : t.education}
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {isScribe ? t.highestQualification : t.educationLevel}
                  </label>
                  <p className="font-medium">
                    {isScribe ? profileData.highestQualification : profileData.educationLevel}
                  </p>
                </div>
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.status}
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
                    {t.active}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Scribe Information */}
          {isScribe && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Student Connections */}
              <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
                <div className="flex items-center mb-4">
                  <Users className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                  <h2 className="font-semibold">{t.studentConnections}</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
                      {t.permanentStudents}
                    </span>
                    <span className="font-semibold">
                      {profileData.permanentstudent?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
                      {t.temporaryAssignments}
                    </span>
                    <span className="font-semibold">
                      {profileData.tempstudent?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>
                      {t.bookedDates}
                    </span>
                    <span className="font-semibold">
                      {profileData.bookedDates?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability - Clickable for Scribe */}
              <div 
                className={`${isScribe ? clickableCardClasses : cardClasses} rounded-2xl shadow-xl p-6`}
                onClick={isScribe ? openBookedDatesModal : undefined}
                role={isScribe ? "button" : undefined}
                tabIndex={isScribe ? 0 : undefined}
                aria-label={isScribe ? t.clickToViewBookedDates : undefined}
                onKeyDown={isScribe ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openBookedDatesModal();
                  }
                } : undefined}
              >
                <div className="flex items-center mb-4">
                  <Clock className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                  <h2 className="font-semibold">{t.availability}</h2>
                  {isScribe && (
                    <div className={`ml-auto text-xs px-2 py-1 rounded ${
                      highContrast ? 'bg-white text-black' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {t.clickToViewBookedDates}
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={highContrast ? 'text-gray-300' : 'text-gray-400'}>{t.status}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
                      {t.available}
                    </span>
                  </div>
                  <div>
                    <label className={`text-xs font-medium uppercase tracking-wide ${
                      highContrast ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {t.nextAvailable}
                    </label>
                    <p className="font-medium">{t.today}</p>
                  </div>
                  {isScribe && profileData.bookedDates?.length > 0 && (
                    <div>
                      <label className={`text-xs font-medium uppercase tracking-wide ${
                        highContrast ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {t.bookedDates}
                      </label>
                      <p className={`font-medium ${highContrast ? 'text-blue-300' : 'text-blue-400'}`}>
                        {profileData.bookedDates.length} dates booked
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents and Security */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Documents */}
            <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center mb-4">
                <FileText className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                <h2 className="font-semibold">{t.documents}</h2>
              </div>
              <div className="space-y-4">
                {/* Aadhaar Card */}
                <div className={`border rounded-xl p-4 ${
                  highContrast ? 'border-white' : 'border-gray-600'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{t.aadhaarCard}</h3>
                      <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                        {t.identityDocument}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses}`}>
                        {t.verified}
                      </span>
                      <button
                        onClick={() => openDocumentModal(
                          profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
                          t.aadhaarCard
                        )}
                        className={`p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
                        aria-label={`${t.viewDocument} - ${t.aadhaarCard}`}
                        title={`${t.viewDocument} - ${t.aadhaarCard}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <img
                    src={profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    alt={t.aadhaarCard}
                    className={`w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${
                      highContrast ? 'border-white' : 'border-gray-600'
                    }`}
                    onClick={() => openDocumentModal(
                      profileData.aadhaarCard?.url || profileData.adhaarCard?.url || "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400",
                      t.aadhaarCard
                    )}
                  />
                </div>

                {/* Qualification Document (Scribe only) */}
                {isScribe && profileData.qualificationImgLink?.url && (
                  <div className={`border rounded-xl p-4 ${
                    highContrast ? 'border-white' : 'border-gray-600'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{t.qualificationCertificate}</h3>
                        <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
                          {t.educationDocument}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses}`}>
                          {t.verified}
                        </span>
                        <button
                          onClick={() => openDocumentModal(profileData.qualificationImgLink.url, t.qualificationCertificate)}
                          className={`p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
                          aria-label={`${t.viewDocument} - ${t.qualificationCertificate}`}
                          title={`${t.viewDocument} - ${t.qualificationCertificate}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <img
                      src={profileData.qualificationImgLink.url}
                      alt={t.qualificationCertificate}
                      className={`w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity ${
                        highContrast ? 'border-white' : 'border-gray-600'
                      }`}
                      onClick={() => openDocumentModal(profileData.qualificationImgLink.url, t.qualificationCertificate)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Security Info */}
            <div className={`${cardClasses} rounded-2xl shadow-xl p-6`}>
              <div className="flex items-center mb-4">
                <Shield className={`w-5 h-5 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`} />
                <h2 className="font-semibold">{t.security}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.aadhaarNumber}
                  </label>
                  <p className="font-mono font-medium">
                    {profileData.aadhaarNumber?.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}
                  </p>
                </div>
                <div>
                  <label className={`text-xs font-medium uppercase tracking-wide ${
                    highContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {t.accountCreated}
                  </label>
                  <div className="flex items-center font-medium">
                    <Calendar className={`w-4 h-4 mr-2 ${highContrast ? 'text-gray-300' : 'text-gray-500'}`} />
                    {new Date(profileData.createdAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Modal */}
      <DocumentModal
        isOpen={documentModal.isOpen}
        onClose={closeDocumentModal}
        document={documentModal.document}
        title={documentModal.title}
        highContrast={highContrast}
        language={language}
      />

      {/* Booked Dates Modal */}
      {isScribe && (
        <BookedDatesModal
          isOpen={bookedDatesModal.isOpen}
          onClose={closeBookedDatesModal}
          bookedDates={profileData.bookedDates || []}
          highContrast={highContrast}
          language={language}
        />
      )}
    </>
  );
}

export default UnifiedProfile;