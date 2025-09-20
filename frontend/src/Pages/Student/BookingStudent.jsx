
// import React, { useState, useEffect, useRef } from 'react';
// import { BookOpen, Phone, MessageSquare, Users, AlertCircle, Calendar, MapPin, Globe, FileText, Clock, X, CheckCircle, Hourglass, Star } from 'lucide-react';
// import useGlobal from '../../utils/GlobalContext';
// import Navbar from '../../components/Navbar';
// import axiosClient from '../../utils/axiosClient';
// import { Link } from 'react-router';

// const BookingStudent = () => {
// // Access global state for theme and language from context
// const { language, highContrast } = useGlobal();
// const { user } = useGlobal();
// const [announcements, setAnnouncements] = useState('');
// const [permanentScribe, setPermanentScribe] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const [acceptedRequests, setAcceptedRequests] = useState([]);
// const [waitingRequests, setWaitingRequests] = useState([]);
// const [rejectedRequests, setRejectedRequests] = useState([]);
// const [isLoadingAccepted, setIsLoadingAccepted] = useState(true);
// const [isLoadingWaiting, setIsLoadingWaiting] = useState(true);
// const [isLoadingRejected, setIsLoadingRejected] = useState(true);
// const [showAcceptedDetails, setShowAcceptedDetails] = useState({});
// const [showWaitingDetails, setShowWaitingDetails] = useState({});
// const [showRejectedDetails, setShowRejectedDetails] = useState({});
// const [showRatingModal, setShowRatingModal] = useState(false);
// const [selectedRequest, setSelectedRequest] = useState(null);
// const [selectedRating, setSelectedRating] = useState(0);
// const [hoverRating, setHoverRating] = useState(0);
// const [isSubmittingRating, setIsSubmittingRating] = useState(false);

// // Translations
// const translations = {
//     en: {
//         mainContent: 'Scribe Booking Page',
//         permanentScribeHeading: 'Your Permanent Scribe',
//         acceptedRequestsHeading: 'Accepted Requests',
//         waitingRequestsHeading: 'Waiting Requests',
//         rejectedRequestsHeading: 'Rejected Requests',
//         noPermanentScribe: 'You currently have no permanent scribe assigned.',
//         noAcceptedRequests: 'You have no accepted requests at the moment.',
//         noWaitingRequests: 'You have no waiting requests at the moment.',
//         noRejectedRequests: 'You have no rejected requests at the moment.',
//         fullName: 'Full Name',
//         age: 'Age',
//         mobileNumber: 'Mobile Number',
//         email: 'Email',
//         highestQualification: 'Highest Qualification',
//         call: 'Call',
//         chat: 'Chat',
//         calling: 'Calling',
//         chatting: 'Initiating chat',
//         callInitiated: (name) => `Call initiated with ${name}.`,
//         chatInitiated: (name) => `Chat initiated with ${name}.`,
//         loading: 'Loading scribe data...',
//         loadingAccepted: 'Loading accepted requests...',
//         loadingWaiting: 'Loading waiting requests...',
//         loadingRejected: 'Loading rejected requests...',
//         appName: 'ScribeConnect',
//         tagline: 'Bridging Learning Through Accessibility',
//         city: 'City',
//         date: 'Date',
//         language: 'Language',
//         description: 'Description',
//         requestedOn: 'Requested On',
//         acceptedOn: 'Accepted On',
//         rejectedOn: 'Rejected On',
//         viewDetails: 'View Details',
//         hideDetails: 'Hide Details',
//         status: 'Status',
//         accepted: 'Accepted',
//         waiting: 'Waiting',
//         rejected: 'Rejected',
//         noDescription: 'No description provided',
//         requestId: 'Request ID',
//         scribeName: 'Scribe Name',
//         scribeContact: 'Scribe Contact',
//         assignedScribe: 'Assigned Scribe',
//         pendingApproval: 'Pending Approval',
//         rateScribe: 'Rate Scribe',
//         rateThisScribe: 'Rate this Scribe',
//         selectRating: 'Select your rating',
//         submitRating: 'Submit Rating',
//         cancel: 'Cancel',
//         ratingSubmitted: 'Rating submitted successfully!',
//         alreadyRated: 'Already Rated',
//         rated: 'Rated',
//         stars: 'stars',
//         ratingSuccess: (name, rating) => `Successfully rated ${name} with ${rating} stars!`,
//         ratingError: 'Failed to submit rating. Please try again.',
//         submittingRating: 'Submitting rating...',
//         currentRating: 'Your Rating'
//     },
//     hi: {
//         mainContent: 'स्क्राइब बुकिंग पृष्ठ',
//         permanentScribeHeading: 'आपके स्थायी स्क्राइब',
//         acceptedRequestsHeading: 'स्वीकृत अनुरोध',
//         waitingRequestsHeading: 'प्रतीक्षारत अनुरोध',
//         rejectedRequestsHeading: 'अस्वीकृत अनुरोध',
//         noPermanentScribe: 'आपके पास वर्तमान में कोई स्थायी स्क्राइब नहीं है।',
//         noAcceptedRequests: 'आपके पास इस समय कोई स्वीकृत अनुरोध नहीं है।',
//         noWaitingRequests: 'आपके पास इस समय कोई प्रतीक्षारत अनुरोध नहीं है।',
//         noRejectedRequests: 'आपके पास इस समय कोई अस्वीकृत अनुरोध नहीं है।',
//         fullName: 'पूरा नाम',
//         age: 'आयु',
//         mobileNumber: 'मोबाइल नंबर',
//         email: 'ईमेल',
//         highestQualification: 'उच्चतम योग्यता',
//         call: 'कॉल करें',
//         chat: 'चैट करें',
//         calling: 'कॉल कर रहे हैं',
//         chatting: 'चैट शुरू कर रहे हैं',
//         callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
//         chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
//         loading: 'स्क्राइब डेटा लोड हो रहा है...',
//         loadingAccepted: 'स्वीकृत अनुरोध लोड हो रहे हैं...',
//         loadingWaiting: 'प्रतीक्षारत अनुरोध लोड हो रहे हैं...',
//         loadingRejected: 'अस्वीकृत अनुरोध लोड हो रहे हैं...',
//         appName: 'स्क्राइबकनेक्ट',
//         tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
//         city: 'शहर',
//         date: 'दिनांक',
//         language: 'भाषा',
//         description: 'विवरण',
//         requestedOn: 'अनुरोध किया गया',
//         acceptedOn: 'स्वीकृत किया गया',
//         rejectedOn: 'अस्वीकृत किया गया',
//         viewDetails: 'विवरण देखें',
//         hideDetails: 'विवरण छुपाएं',
//         status: 'स्थिति',
//         accepted: 'स्वीकृत',
//         waiting: 'प्रतीक्षारत',
//         rejected: 'अस्वीकृत',
//         noDescription: 'कोई विवरण प्रदान नहीं किया गया',
//         requestId: 'अनुरोध आईडी',
//         scribeName: 'स्क्राइब का नाम',
//         scribeContact: 'स्क्राइब संपर्क',
//         assignedScribe: 'नियुक्त स्क्राइब',
//         pendingApproval: 'अनुमोदन लंबित',
//         rateScribe: 'स्क्राइब को रेट करें',
//         rateThisScribe: 'इस स्क्राइब को रेट करें',
//         selectRating: 'अपनी रेटिंग चुनें',
//         submitRating: 'रेटिंग सबमिट करें',
//         cancel: 'रद्द करें',
//         ratingSubmitted: 'रेटिंग सफलतापूर्वक सबमिट की गई!',
//         alreadyRated: 'पहले से रेट किया गया',
//         rated: 'रेट किया गया',
//         stars: 'स्टार',
//         ratingSuccess: (name, rating) => `${name} को ${rating} स्टार के साथ सफलतापूर्वक रेट किया गया!`,
//         ratingError: 'रेटिंग सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
//         submittingRating: 'रेटिंग सबमिट कर रहे हैं...',
//         currentRating: 'आपकी रेटिंग'
//     }
// };

// const t = translations[language];

// // Effect for announcements to clear them after some time
// useEffect(() => {
//     if (announcements) {
//         const timeout = setTimeout(() => setAnnouncements(''), 3000);
//         return () => clearTimeout(timeout);
//     }
// }, [announcements]);

// // Fetch permanent scribe data from API
// const getPermanentScribe = async () => {
//     if (!user || !user._id) {
//         console.log("User not logged in or user ID not available.");
//         setIsLoading(false);
//         return;
//     }

//     try {
//         console.log(`Fetching permanent scribe for user ID: ${user._id}`);
//         const res = await axiosClient.post("/auth/getPermanentScribe", { user });
//         console.log("API Response:", res.data);
//         setPermanentScribe(res.data.permanentscibe);
//     } catch (error) {
//         console.error('Failed to fetch permanent scribe:', error);
//         setPermanentScribe(null);
//     } finally {
//         setIsLoading(false);
//     }
// };

// // Fetch accepted requests
// const getAcceptedRequests = async () => {
//     if (!user || !user._id) {
//         console.log("User not logged in or user ID not available.");
//         setIsLoadingAccepted(false);
//         return;
//     }

//     try {
//         const res = await axiosClient.post("/auth/getStudentRequests", { 
//             user, 
//             status: "accepted" 
//         })
//         console.log("Accepted requests response:", res.data);
        
//         const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
//         setAcceptedRequests(requests);
//     } catch (error) {
//         console.error('Failed to fetch accepted requests:', error);
//         setAcceptedRequests([]);
//     } finally {
//         setIsLoadingAccepted(false);
//     }
// };

// // Fetch waiting requests
// const getWaitingRequests = async () => {
//     if (!user || !user._id) {
//         console.log("User not logged in or user ID not available.");
//         setIsLoadingWaiting(false);
//         return;
//     }

//     try {
//         const res = await axiosClient.post("/auth/getStudentRequests", { 
//             user, 
//             status: "wait" 
//         });
//         console.log("Waiting requests response:", res.data);
        
//         const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
//         setWaitingRequests(requests);
//     } catch (error) {
//         console.error('Failed to fetch waiting requests:', error);
//         setWaitingRequests([]);
//     } finally {
//         setIsLoadingWaiting(false);
//     }
// };

// // Fetch rejected requests
// const getRejectedRequests = async () => {
//     if (!user || !user._id) {
//         console.log("User not logged in or user ID not available.");
//         setIsLoadingRejected(false);
//         return;
//     }

//     try {
//         const res = await axiosClient.post("/auth/getRejectedRequests", { user });
//         console.log("Rejected requests response:", res.data);
        
//         const requests = Array.isArray(res.data) ? res.data : res.data.rejectedRequests || [];
//         setRejectedRequests(requests);
//     } catch (error) {
//         console.error('Failed to fetch rejected requests:', error);
//         setRejectedRequests([]);
//     } finally {
//         setIsLoadingRejected(false);
//     }
// };

// // Call the fetch functions when the user object is available
// useEffect(() => {
//     if (user) {
//         getPermanentScribe();
//         getAcceptedRequests();
//         getWaitingRequests();
//         getRejectedRequests();
//     }
// }, [user]);

// // Theme-dependent classes
// const baseClasses = highContrast
//     ? 'bg-black text-white'
//     : 'bg-gray-900 text-gray-100';

// const cardClasses = highContrast
//     ? 'card bg-gray-900 border border-white shadow-lg text-white'
//     : 'card bg-gray-800 shadow-xl text-gray-100';

// const buttonClasses = highContrast
//     ? 'btn bg-white text-black border-white hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
//     : 'btn bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';

// const secondaryButtonClasses = highContrast
//     ? 'btn bg-gray-800 text-white border border-white hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
//     : 'btn bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900';

// const ratingButtonClasses = highContrast
//     ? 'btn bg-yellow-600 text-black border-yellow-600 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black'
//     : 'btn bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900';

// const handleCallScribe = (scribeId, scribeName) => {
//     setAnnouncements(t.callInitiated(scribeName));
//     console.log(`Initiating call with scribe ID: ${scribeId} (Name: ${scribeName})`);
//     alert(`${t.calling} ${scribeName}... (ID: ${scribeId}) - Simulated`);
// };

// const handleChatScribe = (scribeId, scribeName) => {
//     setAnnouncements(t.chatInitiated(scribeName));
//     console.log(`Initiating chat with scribe ID: ${scribeId} (Name: ${scribeName})`);
//     alert(`${t.chatting} ${scribeName}... (ID: ${scribeId}) - Simulated`);
// };

// const toggleAcceptedDetails = (requestId) => {
//     setShowAcceptedDetails(prev => ({
//         ...prev,
//         [requestId]: !prev[requestId]
//     }));
// };

// const toggleWaitingDetails = (requestId) => {
//     setShowWaitingDetails(prev => ({
//         ...prev,
//         [requestId]: !prev[requestId]
//     }));
// };

// const toggleRejectedDetails = (requestId) => {
//     setShowRejectedDetails(prev => ({
//         ...prev,
//         [requestId]: !prev[requestId]
//     }));
// };

// // Rating functions
// const openRatingModal = (request) => {
//     setSelectedRequest(request);
//     setSelectedRating(0);
//     setHoverRating(0);
//     setShowRatingModal(true);
// };

// const closeRatingModal = () => {
//     setShowRatingModal(false);
//     setSelectedRequest(null);
//     setSelectedRating(0);
//     setHoverRating(0);
// };

// const submitRating = async () => {
//     if (!selectedRequest || !selectedRating) return;

//     setIsSubmittingRating(true);

//     try {
//         const response = await axiosClient.post('/auth/rateScribe', {
//             requestId: selectedRequest._id,
//             rating: selectedRating,
//             user: user
//         });

//         if (response.data.success) {
//             setAnnouncements(t.ratingSuccess(selectedRequest.scribeId.fullName, selectedRating));
            
//             // Update the local state to reflect the rating
//             setAcceptedRequests(prev => 
//                 prev.map(req => 
//                     req._id === selectedRequest._id 
//                         ? { ...req, rating: selectedRating }
//                         : req
//                 )
//             );
            
//             closeRatingModal();
//         } else {
//             setAnnouncements(t.ratingError);
//         }
//     } catch (error) {
//         console.error('Error submitting rating:', error);
//         setAnnouncements(t.ratingError);
//     } finally {
//         setIsSubmittingRating(false);
//     }
// };

// const renderStarRating = (rating, interactive = false, onStarClick = null, onStarHover = null, onStarLeave = null) => {
//     return (
//         <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                     key={star}
//                     size={interactive ? 24 : 16}
//                     className={`${
//                         star <= (interactive ? (hoverRating || selectedRating) : rating)
//                             ? 'text-yellow-400 fill-current'
//                             : 'text-gray-400'
//                     } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
//                     onClick={interactive ? () => onStarClick(star) : undefined}
//                     onMouseEnter={interactive ? () => onStarHover(star) : undefined}
//                     onMouseLeave={interactive ? onStarLeave : undefined}
//                 />
//             ))}
//         </div>
//     );
// };

// const formatDate = (dateString) => {
//     try {
//         const date = new Date(dateString);
//         return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     } catch (error) {
//         return dateString;
//     }
// };

// return (
//     <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
//         <div aria-live="polite" aria-atomic="true" className="sr-only">
//             {announcements}
//         </div>
        
//         <Navbar />

//         {/* Rating Modal */}
//         {showRatingModal && selectedRequest && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className={`${cardClasses} p-6 rounded-lg max-w-md w-full mx-4`}>
//                     <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-xl font-semibold text-yellow-400">
//                             {t.rateThisScribe}
//                         </h3>
//                         <button
//                             onClick={closeRatingModal}
//                             className={`${secondaryButtonClasses} p-2 rounded-lg`}
//                             aria-label={t.cancel}
//                         >
//                             <X size={20} />
//                         </button>
//                     </div>
                    
//                     <div className="mb-4">
//                         <p className="text-lg font-medium mb-2">
//                             {selectedRequest.scribeId.fullName}
//                         </p>
//                         <p className="text-sm text-gray-400">
//                             {t.selectRating}
//                         </p>
//                     </div>

//                     <div className="flex justify-center mb-6">
//                         {renderStarRating(
//                             selectedRating,
//                             true,
//                             setSelectedRating,
//                             setHoverRating,
//                             () => setHoverRating(0)
//                         )}
//                     </div>

//                     <div className="flex gap-3">
//                         <button
//                             onClick={closeRatingModal}
//                             className={`${secondaryButtonClasses} flex-1 py-2 px-4 rounded-lg transition-all duration-200`}
//                             disabled={isSubmittingRating}
//                         >
//                             {t.cancel}
//                         </button>
//                         <button
//                             onClick={submitRating}
//                             disabled={!selectedRating || isSubmittingRating}
//                             className={`${ratingButtonClasses} flex-1 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
//                         >
//                             {isSubmittingRating ? (
//                                 <>
//                                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
//                                     <span>{t.submittingRating}</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Star size={16} />
//                                     <span>{t.submitRating}</span>
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )}

//         <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8 space-y-12">
//             {/* Accepted Requests Section */}
//             <section aria-labelledby="accepted-requests-heading">
//                 <h2 id="accepted-requests-heading" className={`text-3xl font-bold mb-8 text-green-500`}>
//                     {t.acceptedRequestsHeading}
//                 </h2>

//                 {isLoadingAccepted ? (
//                     <div className="flex items-center justify-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mr-3"></div>
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.loadingAccepted}
//                         </p>
//                     </div>
//                 ) : acceptedRequests.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {acceptedRequests.map((request) => (
//                             <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-green-500`}>
//                                 <div className="flex items-center justify-between mb-3">
//                                     <h3 className="text-lg font-semibold text-green-400 flex items-center">
//                                         <CheckCircle size={18} className="mr-2" aria-hidden="true" />
//                                         {t.accepted}
//                                     </h3>
//                                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                                         highContrast ? 'bg-green-800 text-white' : 'bg-green-100 text-green-800'
//                                     }`}>
//                                         {t.status}: {t.accepted}
//                                     </span>
//                                 </div>
                                
//                                 <div className="space-y-2 mb-4">
//                                     <p className="flex items-center text-sm">
//                                         <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.city}:</strong> {request.city}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.language}:</strong> {request.language}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.acceptedOn}:</strong> {formatDate(request.updatedAt)}
//                                     </p>
//                                     {request.scribeId && (
//                                         <p className="flex items-center text-sm">
//                                             <Users size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                             <strong className="mr-2">{t.assignedScribe}:</strong> 
//                                             {request.scribeId.fullName || 'N/A'}
//                                         </p>
//                                     )}
                                    
//                                     {/* Display current rating if exists */}
//                                     {request.rating && (
//                                         <div className="flex items-center text-sm">
//                                             <Star size={16} className="mr-2 text-yellow-400" aria-hidden="true" />
//                                             <strong className="mr-2">{t.currentRating}:</strong>
//                                             <div className="flex items-center ml-1">
//                                                 {renderStarRating(request.rating)}
//                                                 <span className="ml-2 text-xs text-gray-400">
//                                                     ({request.rating}/5)
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {showAcceptedDetails[request._id] && (
//                                     <div className={`mt-4 p-3 rounded-lg ${
//                                         highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
//                                     }`}>
//                                         <p className="text-sm mb-2">
//                                             <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
//                                         </p>
//                                         <p className="text-sm mb-2">
//                                             <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
//                                         </p>
//                                         {request.scribeId && (
//                                             <div className="text-sm mb-2">
//                                                 <strong>{t.scribeContact}:</strong>
//                                                 <p className="mt-1 text-gray-300">
//                                                     {t.mobileNumber}: {request.scribeId.mobileNumber || 'N/A'}
//                                                 </p>
//                                                 {request.scribeId.email && (
//                                                     <p className="text-gray-300">
//                                                         {t.email}: {request.scribeId.email}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         )}
//                                         <div className="text-sm">
//                                             <strong>{t.description}:</strong>
//                                             <p className="mt-1 text-gray-300">
//                                                 {request.description || t.noDescription}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Action buttons for accepted requests */}
//                                 <div className="space-y-2 mt-4">
//                                     {request.scribeId && (
//                                         <div className="flex gap-2">
//                                             <button
//                                                 onClick={() => handleCallScribe(request.scribeId._id, request.scribeId.fullName)}
//                                                 className={`${buttonClasses} flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
//                                                 aria-label={`${t.call} ${request.scribeId.fullName}`}
//                                             >
//                                                 <Phone size={14} aria-hidden="true" />
//                                                 <span>{t.call}</span>
//                                             </button>
//                                             <Link to={`/chat/${request.scribeId._id}`} className="flex-1">
//                                                 <button
//                                                     className={`${buttonClasses} w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
//                                                     aria-label={`${t.chat} ${request.scribeId.fullName}`}
//                                                 >
//                                                     <MessageSquare size={14} aria-hidden="true" />
//                                                     <span>{t.chat}</span>
//                                                 </button>
//                                             </Link>
//                                         </div>
//                                     )}

//                                     {/* Rating button - only show if not already rated */}
//                                     {request.scribeId && !request.rating && (
//                                         <button
//                                             onClick={() => openRatingModal(request)}
//                                             className={`${ratingButtonClasses} w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200`}
//                                             aria-label={`${t.rateScribe} ${request.scribeId.fullName}`}
//                                         >
//                                             <Star size={16} aria-hidden="true" />
//                                             <span>{t.rateScribe}</span>
//                                         </button>
//                                     )}

//                                     {/* Show rated status if already rated */}
//                                     {request.rating && (
//                                         <div className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
//                                             highContrast ? 'bg-gray-700 border border-gray-600' : 'bg-gray-600'
//                                         }`}>
//                                             <CheckCircle size={16} className="text-green-400" aria-hidden="true" />
//                                             <span className="text-sm text-green-400">{t.alreadyRated}</span>
//                                         </div>
//                                     )}

//                                     <button
//                                         onClick={() => toggleAcceptedDetails(request._id)}
//                                         className={`${secondaryButtonClasses} w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
//                                         aria-label={showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                     >
//                                         <FileText size={16} aria-hidden="true" />
//                                         <span>
//                                             {showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                         </span>
//                                     </button>
//                                 </div>
//                             </article>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className={`${cardClasses} p-6 text-center rounded-lg`}>
//                         <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.noAcceptedRequests}
//                         </p>
//                     </div>
//                 )}
//             </section>

//             {/* Waiting Requests Section */}
//             <section aria-labelledby="waiting-requests-heading">
//                 <h2 id="waiting-requests-heading" className={`text-3xl font-bold mb-8 text-yellow-500`}>
//                     {t.waitingRequestsHeading}
//                 </h2>

//                 {isLoadingWaiting ? (
//                     <div className="flex items-center justify-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mr-3"></div>
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.loadingWaiting}
//                         </p>
//                     </div>
//                 ) : waitingRequests.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {waitingRequests.map((request) => (
//                             <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-yellow-500`}>
//                                 <div className="flex items-center justify-between mb-3">
//                                     <h3 className="text-lg font-semibold text-yellow-400 flex items-center">
//                                         <Hourglass size={18} className="mr-2" aria-hidden="true" />
//                                         {t.waiting}
//                                     </h3>
//                                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                                         highContrast ? 'bg-yellow-800 text-white' : 'bg-yellow-100 text-yellow-800'
//                                     }`}>
//                                         {t.status}: {t.waiting}
//                                     </span>
//                                 </div>
                                
//                                 <div className="space-y-2 mb-4">
//                                     <p className="flex items-center text-sm">
//                                         <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.city}:</strong> {request.city}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.language}:</strong> {request.language}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.requestedOn}:</strong> {formatDate(request.createdAt)}
//                                     </p>
//                                 </div>

//                                 <div className={`mb-4 p-3 rounded-lg ${
//                                     highContrast ? 'bg-yellow-900 border border-yellow-600' : 'bg-yellow-100'
//                                 }`}>
//                                     <p className={`text-sm font-medium ${
//                                         highContrast ? 'text-yellow-200' : 'text-yellow-800'
//                                     }`}>
//                                         {t.pendingApproval}
//                                     </p>
//                                 </div>

//                                 {showWaitingDetails[request._id] && (
//                                     <div className={`mt-4 p-3 rounded-lg ${
//                                         highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
//                                     }`}>
//                                         <p className="text-sm mb-2">
//                                             <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
//                                         </p>
//                                         <div className="text-sm">
//                                             <strong>{t.description}:</strong>
//                                             <p className="mt-1 text-gray-300">
//                                                 {request.description || t.noDescription}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <button
//                                     onClick={() => toggleWaitingDetails(request._id)}
//                                     className={`${secondaryButtonClasses} w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
//                                     aria-label={showWaitingDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                 >
//                                     <FileText size={16} aria-hidden="true" />
//                                     <span>
//                                         {showWaitingDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                     </span>
//                                 </button>
//                             </article>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className={`${cardClasses} p-6 text-center rounded-lg`}>
//                         <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.noWaitingRequests}
//                         </p>
//                     </div>
//                 )}
//             </section>

//             {/* Rejected Requests Section */}
//             <section aria-labelledby="rejected-requests-heading">
//                 <h2 id="rejected-requests-heading" className={`text-3xl font-bold mb-8 text-red-500`}>
//                     {t.rejectedRequestsHeading}
//                 </h2>

//                 {isLoadingRejected ? (
//                     <div className="flex items-center justify-center py-8">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mr-3"></div>
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.loadingRejected}
//                         </p>
//                     </div>
//                 ) : rejectedRequests.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {rejectedRequests.map((request) => (
//                             <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-red-500`}>
//                                 <div className="flex items-center justify-between mb-3">
//                                     <h3 className="text-lg font-semibold text-red-400 flex items-center">
//                                         <X size={18} className="mr-2" aria-hidden="true" />
//                                         {t.rejected}
//                                     </h3>
//                                     <span className={`px-2 py-1 rounded text-xs font-medium ${
//                                         highContrast ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'
//                                     }`}>
//                                         {t.status}: {t.rejected}
//                                     </span>
//                                 </div>
                                
//                                 <div className="space-y-2 mb-4">
//                                     <p className="flex items-center text-sm">
//                                         <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.city}:</strong> {request.city}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.language}:</strong> {request.language}
//                                     </p>
//                                     <p className="flex items-center text-sm">
//                                         <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
//                                         <strong className="mr-2">{t.rejectedOn}:</strong> {formatDate(request.updatedAt)}
//                                     </p>
//                                 </div>

//                                 {showRejectedDetails[request._id] && (
//                                     <div className={`mt-4 p-3 rounded-lg ${
//                                         highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
//                                     }`}>
//                                         <p className="text-sm mb-2">
//                                             <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
//                                         </p>
//                                         <p className="text-sm mb-2">
//                                             <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
//                                         </p>
//                                         <div className="text-sm">
//                                             <strong>{t.description}:</strong>
//                                             <p className="mt-1 text-gray-300">
//                                                 {request.description || t.noDescription}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <button
//                                     onClick={() => toggleRejectedDetails(request._id)}
//                                     className={`${secondaryButtonClasses} w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
//                                     aria-label={showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                 >
//                                     <FileText size={16} aria-hidden="true" />
//                                     <span>
//                                         {showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
//                                     </span>
//                                 </button>
//                             </article>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className={`${cardClasses} p-6 text-center rounded-lg`}>
//                         <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
//                         <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
//                             {t.noRejectedRequests}
//                         </p>
//                     </div>
//                 )}
//             </section>
//         </main>

//         <footer className={`py-6 px-6 text-center text-sm ${highContrast ? 'bg-black border-t border-white' : 'bg-gray-900 border-t border-gray-700'}`} role="contentinfo">
//             <p>&copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}</p>
//         </footer>
//     </div>
// );
// };

// export default BookingStudent;
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Phone, MessageSquare, Users, AlertCircle, Calendar, MapPin, Globe, FileText, Clock, X, CheckCircle, Hourglass, Star } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const BookingStudent = () => {
// Access global state for theme and language from context
const { language, highContrast } = useGlobal();
const { user } = useGlobal();
const [announcements, setAnnouncements] = useState('');
const [permanentScribe, setPermanentScribe] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [acceptedRequests, setAcceptedRequests] = useState([]);
const [waitingRequests, setWaitingRequests] = useState([]);
const [rejectedRequests, setRejectedRequests] = useState([]);
const [isLoadingAccepted, setIsLoadingAccepted] = useState(true);
const [isLoadingWaiting, setIsLoadingWaiting] = useState(true);
const [isLoadingRejected, setIsLoadingRejected] = useState(true);
const [showAcceptedDetails, setShowAcceptedDetails] = useState({});
const [showWaitingDetails, setShowWaitingDetails] = useState({});
const [showRejectedDetails, setShowRejectedDetails] = useState({});
const [showRatingModal, setShowRatingModal] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);
const [selectedRating, setSelectedRating] = useState(0);
const [hoverRating, setHoverRating] = useState(0);
const [isSubmittingRating, setIsSubmittingRating] = useState(false);

// Translations
const translations = {
    en: {
        mainContent: 'Scribe Booking Page',
        permanentScribeHeading: 'Your Permanent Scribe',
        acceptedRequestsHeading: 'Accepted Requests',
        waitingRequestsHeading: 'Waiting Requests',
        rejectedRequestsHeading: 'Rejected Requests',
        noPermanentScribe: 'You currently have no permanent scribe assigned.',
        noAcceptedRequests: 'You have no accepted requests at the moment.',
        noWaitingRequests: 'You have no waiting requests at the moment.',
        noRejectedRequests: 'You have no rejected requests at the moment.',
        fullName: 'Full Name',
        age: 'Age',
        mobileNumber: 'Mobile Number',
        email: 'Email',
        highestQualification: 'Highest Qualification',
        call: 'Call',
        chat: 'Chat',
        calling: 'Calling',
        chatting: 'Initiating chat',
        callInitiated: (name) => `Call initiated with ${name}.`,
        chatInitiated: (name) => `Chat initiated with ${name}.`,
        loading: 'Loading scribe data...',
        loadingAccepted: 'Loading accepted requests...',
        loadingWaiting: 'Loading waiting requests...',
        loadingRejected: 'Loading rejected requests...',
        appName: 'ScribeConnect',
        tagline: 'Bridging Learning Through Accessibility',
        city: 'City',
        date: 'Date',
        language: 'Language',
        description: 'Description',
        requestedOn: 'Requested On',
        acceptedOn: 'Accepted On',
        rejectedOn: 'Rejected On',
        viewDetails: 'View Details',
        hideDetails: 'Hide Details',
        status: 'Status',
        accepted: 'Accepted',
        waiting: 'Waiting',
        rejected: 'Rejected',
        noDescription: 'No description provided',
        requestId: 'Request ID',
        scribeName: 'Scribe Name',
        scribeContact: 'Scribe Contact',
        assignedScribe: 'Assigned Scribe',
        pendingApproval: 'Pending Approval',
        rateScribe: 'Rate Scribe',
        rateThisScribe: 'Rate this Scribe',
        selectRating: 'Select your rating',
        submitRating: 'Submit Rating',
        cancel: 'Cancel',
        ratingSubmitted: 'Rating submitted successfully!',
        alreadyRated: 'Already Rated',
        rated: 'Rated',
        stars: 'stars',
        ratingSuccess: (name, rating) => `Successfully rated ${name} with ${rating} stars!`,
        ratingError: 'Failed to submit rating. Please try again.',
        submittingRating: 'Submitting rating...',
        currentRating: 'Your Rating'
    },
    hi: {
        mainContent: 'स्क्राइब बुकिंग पृष्ठ',
        permanentScribeHeading: 'आपके स्थायी स्क्राइब',
        acceptedRequestsHeading: 'स्वीकृत अनुरोध',
        waitingRequestsHeading: 'प्रतीक्षारत अनुरोध',
        rejectedRequestsHeading: 'अस्वीकृत अनुरोध',
        noPermanentScribe: 'आपके पास वर्तमान में कोई स्थायी स्क्राइब नहीं है।',
        noAcceptedRequests: 'आपके पास इस समय कोई स्वीकृत अनुरोध नहीं है।',
        noWaitingRequests: 'आपके पास इस समय कोई प्रतीक्षारत अनुरोध नहीं है।',
        noRejectedRequests: 'आपके पास इस समय कोई अस्वीकृत अनुरोध नहीं है।',
        fullName: 'पूरा नाम',
        age: 'आयु',
        mobileNumber: 'मोबाइल नंबर',
        email: 'ईमेल',
        highestQualification: 'उच्चतम योग्यता',
        call: 'कॉल करें',
        chat: 'चैट करें',
        calling: 'कॉल कर रहे हैं',
        chatting: 'चैट शुरू कर रहे हैं',
        callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
        chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
        loading: 'स्क्राइब डेटा लोड हो रहा है...',
        loadingAccepted: 'स्वीकृत अनुरोध लोड हो रहे हैं...',
        loadingWaiting: 'प्रतीक्षारत अनुरोध लोड हो रहे हैं...',
        loadingRejected: 'अस्वीकृत अनुरोध लोड हो रहे हैं...',
        appName: 'स्क्राइबकनेक्ट',
        tagline: 'पहुंच के माध्यम से शिक्षा को जोड़ना',
        city: 'शहर',
        date: 'दिनांक',
        language: 'भाषा',
        description: 'विवरण',
        requestedOn: 'अनुरोध किया गया',
        acceptedOn: 'स्वीकृत किया गया',
        rejectedOn: 'अस्वीकृत किया गया',
        viewDetails: 'विवरण देखें',
        hideDetails: 'विवरण छुपाएं',
        status: 'स्थिति',
        accepted: 'स्वीकृत',
        waiting: 'प्रतीक्षारत',
        rejected: 'अस्वीकृत',
        noDescription: 'कोई विवरण प्रदान नहीं किया गया',
        requestId: 'अनुरोध आईडी',
        scribeName: 'स्क्राइब का नाम',
        scribeContact: 'स्क्राइब संपर्क',
        assignedScribe: 'नियुक्त स्क्राइब',
        pendingApproval: 'अनुमोदन लंबित',
        rateScribe: 'स्क्राइब को रेट करें',
        rateThisScribe: 'इस स्क्राइब को रेट करें',
        selectRating: 'अपनी रेटिंग चुनें',
        submitRating: 'रेटिंग सबमिट करें',
        cancel: 'रद्द करें',
        ratingSubmitted: 'रेटिंग सफलतापूर्वक सबमिट की गई!',
        alreadyRated: 'पहले से रेट किया गया',
        rated: 'रेट किया गया',
        stars: 'स्टार',
        ratingSuccess: (name, rating) => `${name} को ${rating} स्टार के साथ सफलतापूर्वक रेट किया गया!`,
        ratingError: 'रेटिंग सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
        submittingRating: 'रेटिंग सबमिट कर रहे हैं...',
        currentRating: 'आपकी रेटिंग'
    }
};

const t = translations[language];

// Effect for announcements to clear them after some time
useEffect(() => {
    if (announcements) {
        const timeout = setTimeout(() => setAnnouncements(''), 3000);
        return () => clearTimeout(timeout);
    }
}, [announcements]);

// Fetch permanent scribe data from API
const getPermanentScribe = async () => {
    if (!user || !user._id) {
        console.log("User not logged in or user ID not available.");
        setIsLoading(false);
        return;
    }

    try {
        console.log(`Fetching permanent scribe for user ID: ${user._id}`);
        const res = await axiosClient.post("/auth/getPermanentScribe", { user });
        console.log("API Response:", res.data);
        setPermanentScribe(res.data.permanentscibe);
    } catch (error) {
        console.error('Failed to fetch permanent scribe:', error);
        setPermanentScribe(null);
    } finally {
        setIsLoading(false);
    }
};

// Fetch accepted requests
const getAcceptedRequests = async () => {
    if (!user || !user._id) {
        console.log("User not logged in or user ID not available.");
        setIsLoadingAccepted(false);
        return;
    }

    try {
        const res = await axiosClient.post("/auth/getStudentRequests", { 
            user, 
            status: "accepted" 
        })
        console.log("Accepted requests response:", res.data);
        
        const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
        setAcceptedRequests(requests);
    } catch (error) {
        console.error('Failed to fetch accepted requests:', error);
        setAcceptedRequests([]);
    } finally {
        setIsLoadingAccepted(false);
    }
};

// Fetch waiting requests
const getWaitingRequests = async () => {
    if (!user || !user._id) {
        console.log("User not logged in or user ID not available.");
        setIsLoadingWaiting(false);
        return;
    }

    try {
        const res = await axiosClient.post("/auth/getStudentRequests", { 
            user, 
            status: "wait" 
        });
        console.log("Waiting requests response:", res.data);
        
        const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
        setWaitingRequests(requests);
    } catch (error) {
        console.error('Failed to fetch waiting requests:', error);
        setWaitingRequests([]);
    } finally {
        setIsLoadingWaiting(false);
    }
};

// Fetch rejected requests
const getRejectedRequests = async () => {
    if (!user || !user._id) {
        console.log("User not logged in or user ID not available.");
        setIsLoadingRejected(false);
        return;
    }

    try {
        const res = await axiosClient.post("/auth/getRejectedRequests", { user });
        console.log("Rejected requests response:", res.data);
        
        const requests = Array.isArray(res.data) ? res.data : res.data.rejectedRequests || [];
        setRejectedRequests(requests);
    } catch (error) {
        console.error('Failed to fetch rejected requests:', error);
        setRejectedRequests([]);
    } finally {
        setIsLoadingRejected(false);
    }
};

// Call the fetch functions when the user object is available
useEffect(() => {
    if (user) {
        getPermanentScribe();
        getAcceptedRequests();
        getWaitingRequests();
        getRejectedRequests();
    }
}, [user]);

// Theme-dependent classes
const baseClasses = highContrast
    ? 'bg-black text-white'
    : 'bg-gray-900 text-gray-100';

const cardClasses = highContrast
    ? 'card bg-gray-900 border border-white shadow-lg text-white'
    : 'card bg-gray-800 shadow-xl text-gray-100';

const buttonClasses = highContrast
    ? 'btn bg-white text-black border-white hover:bg-gray-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
    : 'btn bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900';

const secondaryButtonClasses = highContrast
    ? 'btn bg-gray-800 text-white border border-white hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
    : 'btn bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900';

const ratingButtonClasses = highContrast
    ? 'btn bg-yellow-600 text-black border-yellow-600 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black'
    : 'btn bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900';

const handleCallScribe = (scribeId, scribeName) => {
    setAnnouncements(t.callInitiated(scribeName));
    console.log(`Initiating call with scribe ID: ${scribeId} (Name: ${scribeName})`);
    alert(`${t.calling} ${scribeName}... (ID: ${scribeId}) - Simulated`);
};

const handleChatScribe = (scribeId, scribeName) => {
    setAnnouncements(t.chatInitiated(scribeName));
    console.log(`Initiating chat with scribe ID: ${scribeId} (Name: ${scribeName})`);
    alert(`${t.chatting} ${scribeName}... (ID: ${scribeId}) - Simulated`);
};

const toggleAcceptedDetails = (requestId) => {
    setShowAcceptedDetails(prev => ({
        ...prev,
        [requestId]: !prev[requestId]
    }));
};

const toggleWaitingDetails = (requestId) => {
    setShowWaitingDetails(prev => ({
        ...prev,
        [requestId]: !prev[requestId]
    }));
};

const toggleRejectedDetails = (requestId) => {
    setShowRejectedDetails(prev => ({
        ...prev,
        [requestId]: !prev[requestId]
    }));
};

// Rating functions
const openRatingModal = (request) => {
    setSelectedRequest(request);
    setSelectedRating(0);
    setHoverRating(0);
    setShowRatingModal(true);
};

const closeRatingModal = () => {
    setShowRatingModal(false);
    setSelectedRequest(null);
    setSelectedRating(0);
    setHoverRating(0);
};

const submitRating = async () => {
    if (!selectedRequest || !selectedRating) return;

    setIsSubmittingRating(true);

    try {
        const response = await axiosClient.post('/auth/rateScribe', {
            requestId: selectedRequest._id,
            rating: selectedRating,
            user: user
        });

        if (response.data.success) {
            setAnnouncements(t.ratingSuccess(selectedRequest.scribeId.fullName, selectedRating));
            
            // Update the local state to reflect the rating
            setAcceptedRequests(prev => 
                prev.map(req => 
                    req._id === selectedRequest._id 
                        ? { ...req, rating: selectedRating }
                        : req
                )
            );
            
            closeRatingModal();
        } else {
            setAnnouncements(t.ratingError);
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
        setAnnouncements(t.ratingError);
    } finally {
        setIsSubmittingRating(false);
    }
};

const renderStarRating = (rating, interactive = false, onStarClick = null, onStarHover = null, onStarLeave = null) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={interactive ? 24 : 16}
                    className={`${
                        star <= (interactive ? (hoverRating || selectedRating) : rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                    } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                    onClick={interactive ? () => onStarClick(star) : undefined}
                    onMouseEnter={interactive ? () => onStarHover(star) : undefined}
                    onMouseLeave={interactive ? onStarLeave : undefined}
                />
            ))}
        </div>
    );
};

const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return dateString;
    }
};

return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans`}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcements}
        </div>
        
        <Navbar />

        {/* Rating Modal */}
        {showRatingModal && selectedRequest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className={`${cardClasses} p-6 rounded-lg max-w-md w-full mx-4`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-yellow-400">
                            {t.rateThisScribe}
                        </h3>
                        <button
                            onClick={closeRatingModal}
                            className={`${secondaryButtonClasses} p-2 rounded-lg`}
                            aria-label={t.cancel}
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-lg font-medium mb-2">
                            {selectedRequest.scribeId.fullName}
                        </p>
                        <p className="text-sm text-gray-400">
                            {t.selectRating}
                        </p>
                    </div>

                    <div className="flex justify-center mb-6">
                        {renderStarRating(
                            selectedRating,
                            true,
                            setSelectedRating,
                            setHoverRating,
                            () => setHoverRating(0)
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={closeRatingModal}
                            className={`${secondaryButtonClasses} flex-1 py-2 px-4 rounded-lg transition-all duration-200`}
                            disabled={isSubmittingRating}
                        >
                            {t.cancel}
                        </button>
                        <button
                            onClick={submitRating}
                            disabled={!selectedRating || isSubmittingRating}
                            className={`${ratingButtonClasses} flex-1 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmittingRating ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    <span>{t.submittingRating}</span>
                                </>
                            ) : (
                                <>
                                    <Star size={16} />
                                    <span>{t.submitRating}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}

        <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8 space-y-12">
            {/* Accepted Requests Section */}
            <section aria-labelledby="accepted-requests-heading" className="text-center">
                <h2 id="accepted-requests-heading" className={`text-3xl font-bold mb-8 text-green-500`}>
                    {t.acceptedRequestsHeading}
                </h2>

                {isLoadingAccepted ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mr-3"></div>
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.loadingAccepted}
                        </p>
                    </div>
                ) : acceptedRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {acceptedRequests.map((request) => (
                            <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-green-500 w-full max-w-md`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-green-400 flex items-center">
                                        <CheckCircle size={18} className="mr-2" aria-hidden="true" />
                                        {t.accepted}
                                    </h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        highContrast ? 'bg-green-800 text-white' : 'bg-green-100 text-green-800'
                                    }`}>
                                        {t.status}: {t.accepted}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 mb-4 text-left">
                                    <p className="flex items-center text-sm">
                                        <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.city}:</strong> {request.city}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.language}:</strong> {request.language}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.acceptedOn}:</strong> {formatDate(request.updatedAt)}
                                    </p>
                                    {request.scribeId && (
                                        <p className="flex items-center text-sm">
                                            <Users size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.assignedScribe}:</strong> 
                                            {request.scribeId.fullName || 'N/A'}
                                        </p>
                                    )}
                                    
                                    {/* Display current rating if exists */}
                                    {request.rating && (
                                        <div className="flex items-center text-sm">
                                            <Star size={16} className="mr-2 text-yellow-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.currentRating}:</strong>
                                            <div className="flex items-center ml-1">
                                                {renderStarRating(request.rating)}
                                                <span className="ml-2 text-xs text-gray-400">
                                                    ({request.rating}/5)
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {showAcceptedDetails[request._id] && (
                                    <div className={`mt-4 p-3 rounded-lg text-left ${
                                        highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                    }`}>
                                        <p className="text-sm mb-2">
                                            <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                        </p>
                                        <p className="text-sm mb-2">
                                            <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                        </p>
                                        {request.scribeId && (
                                            <div className="text-sm mb-2">
                                                <strong>{t.scribeContact}:</strong>
                                                <p className="mt-1 text-gray-300">
                                                    {t.mobileNumber}: {request.scribeId.mobileNumber || 'N/A'}
                                                </p>
                                                {request.scribeId.email && (
                                                    <p className="text-gray-300">
                                                        {t.email}: {request.scribeId.email}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {/* <div className="text-sm">
                                            <strong>{t.description}:</strong>
                                            <p className="mt-1 text-gray-300">
                                                {request.description || t.noDescription}
                                            </p>
                                        </div> */}
                                    </div>
                                )}

                                {/* Action buttons for accepted requests */}
                                <div className="space-y-2 mt-4">
                                    {request.scribeId && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCallScribe(request.scribeId._id, request.scribeId.fullName)}
                                                className={`${buttonClasses} flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
                                                aria-label={`${t.call} ${request.scribeId.fullName}`}
                                            >
                                                <Phone size={14} aria-hidden="true" />
                                                <span>{t.call}</span>
                                            </button>
                                            <Link to={`/chat/${request.scribeId._id}`} className="flex-1">
                                                <button
                                                    className={`${buttonClasses} w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
                                                    aria-label={`${t.chat} ${request.scribeId.fullName}`}
                                                >
                                                    <MessageSquare size={14} aria-hidden="true" />
                                                    <span>{t.chat}</span>
                                                </button>
                                            </Link>
                                        </div>
                                    )}

                                    {/* Rating button - only show if not already rated */}
                                    {request.scribeId && !request.rating && (
                                        <button
                                            onClick={() => openRatingModal(request)}
                                            className={`${ratingButtonClasses} w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200`}
                                            aria-label={`${t.rateScribe} ${request.scribeId.fullName}`}
                                        >
                                            <Star size={16} aria-hidden="true" />
                                            <span>{t.rateScribe}</span>
                                        </button>
                                    )}

                                    {/* Show rated status if already rated */}
                                    {request.rating && (
                                        <div className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                                            highContrast ? 'bg-gray-700 border border-gray-600' : 'bg-gray-600'
                                        }`}>
                                            <CheckCircle size={16} className="text-green-400" aria-hidden="true" />
                                            <span className="text-sm text-green-400">{t.alreadyRated}</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => toggleAcceptedDetails(request._id)}
                                        className={`${secondaryButtonClasses} w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                        aria-label={showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    >
                                        <FileText size={16} aria-hidden="true" />
                                        <span>
                                            {showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                        </span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={`${cardClasses} p-6 text-center rounded-lg max-w-md mx-auto`}>
                        <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.noAcceptedRequests}
                        </p>
                    </div>
                )}
            </section>

            {/* Waiting Requests Section */}
            <section aria-labelledby="waiting-requests-heading" className="text-center">
                <h2 id="waiting-requests-heading" className={`text-3xl font-bold mb-8 text-yellow-500`}>
                    {t.waitingRequestsHeading}
                </h2>

                {isLoadingWaiting ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mr-3"></div>
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.loadingWaiting}
                        </p>
                    </div>
                ) : waitingRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {waitingRequests.map((request) => (
                            <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-yellow-500 w-full max-w-md`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-yellow-400 flex items-center">
                                        <Hourglass size={18} className="mr-2" aria-hidden="true" />
                                        {t.waiting}
                                    </h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        highContrast ? 'bg-yellow-800 text-white' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {t.status}: {t.waiting}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 mb-4 text-left">
                                    <p className="flex items-center text-sm">
                                        <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.city}:</strong> {request.city}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.language}:</strong> {request.language}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                    </p>
                                </div>

                                <div className={`mb-4 p-3 rounded-lg text-center ${
                                    highContrast ? 'bg-yellow-900 border border-yellow-600' : 'bg-yellow-100'
                                }`}>
                                    <p className={`text-sm font-medium ${
                                        highContrast ? 'text-yellow-200' : 'text-yellow-800'
                                    }`}>
                                        {t.pendingApproval}
                                    </p>
                                </div>

                                {showWaitingDetails[request._id] && (
                                    <div className={`mt-4 p-3 rounded-lg text-left ${
                                        highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                    }`}>
                                        <p className="text-sm mb-2">
                                            <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                        </p>
                                        {/* <div className="text-sm">
                                            <strong>{t.description}:</strong>
                                            <p className="mt-1 text-gray-300">
                                                {request.description || t.noDescription}
                                            </p>
                                        </div> */}
                                    </div>
                                )}

                                <button
                                    onClick={() => toggleWaitingDetails(request._id)}
                                    className={`${secondaryButtonClasses} w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                    aria-label={showWaitingDetails[request._id] ? t.hideDetails : t.viewDetails}
                                >
                                    <FileText size={16} aria-hidden="true" />
                                    <span>
                                        {showWaitingDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    </span>
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={`${cardClasses} p-6 text-center rounded-lg max-w-md mx-auto`}>
                        <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.noWaitingRequests}
                        </p>
                    </div>
                )}
            </section>

            {/* Rejected Requests Section */}
            <section aria-labelledby="rejected-requests-heading" className="text-center">
                <h2 id="rejected-requests-heading" className={`text-3xl font-bold mb-8 text-red-500`}>
                    {t.rejectedRequestsHeading}
                </h2>

                {isLoadingRejected ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mr-3"></div>
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.loadingRejected}
                        </p>
                    </div>
                ) : rejectedRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {rejectedRequests.map((request) => (
                            <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-red-500 w-full max-w-md`}>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-red-400 flex items-center">
                                        <X size={18} className="mr-2" aria-hidden="true" />
                                        {t.rejected}
                                    </h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        highContrast ? 'bg-red-800 text-white' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {t.status}: {t.rejected}
                                    </span>
                                </div>
                                
                                <div className="space-y-2 mb-4 text-left">
                                    <p className="flex items-center text-sm">
                                        <MapPin size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.city}:</strong> {request.city}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Calendar size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.date}:</strong> {formatDate(request.date)}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Globe size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.language}:</strong> {request.language}
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <Clock size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                        <strong className="mr-2">{t.rejectedOn}:</strong> {formatDate(request.updatedAt)}
                                    </p>
                                </div>

                                {showRejectedDetails[request._id] && (
                                    <div className={`mt-4 p-3 rounded-lg text-left ${
                                        highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                    }`}>
                                        <p className="text-sm mb-2">
                                            <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                        </p>
                                        <p className="text-sm mb-2">
                                            <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                        </p>
                                        {/* <div className="text-sm">
                                            <strong>{t.description}:</strong>
                                            <p className="mt-1 text-gray-300">
                                                {request.description || t.noDescription}
                                            </p>
                                        </div> */}
                                    </div>
                                )}

                                <button
                                    onClick={() => toggleRejectedDetails(request._id)}
                                    className={`${secondaryButtonClasses} w-full mt-4 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                    aria-label={showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                >
                                    <FileText size={16} aria-hidden="true" />
                                    <span>
                                        {showRejectedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    </span>
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={`${cardClasses} p-6 text-center rounded-lg max-w-md mx-auto`}>
                        <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
                        <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                            {t.noRejectedRequests}
                        </p>
                    </div>
                )}
            </section>
        </main>

        <footer className={`py-6 px-6 text-center text-sm ${highContrast ? 'bg-black border-t border-white' : 'bg-gray-900 border-t border-gray-700'}`} role="contentinfo">
            <p>&copy; {new Date().getFullYear()} {translations.en.appName}. {translations.en.tagline}</p>
        </footer>
    </div>
);
};

export default BookingStudent;
