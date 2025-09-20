

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Phone, MessageSquare, Users, AlertCircle, Calendar, MapPin, Globe, FileText, Clock, X, CheckCircle, Hourglass, Check, XCircle, Star, StarOff } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';
import { Link } from 'react-router';

const BookingScribe = () => {
    // Access global state for theme and language from context
    const { language, highContrast } = useGlobal();
    const { user } = useGlobal();
    const [announcements, setAnnouncements] = useState('');
    const [permanentStudents, setPermanentStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);
    const [isLoadingPending, setIsLoadingPending] = useState(true);
    const [isLoadingAccepted, setIsLoadingAccepted] = useState(true);
    const [isLoadingRejected, setIsLoadingRejected] = useState(true);
    const [showPendingDetails, setShowPendingDetails] = useState({});
    const [showAcceptedDetails, setShowAcceptedDetails] = useState({});
    const [showRejectedDetails, setShowRejectedDetails] = useState({});
    const [processingRequests, setProcessingRequests] = useState({});

    // Translations
    const translations = {
        en: {
            mainContent: 'Scribe Request Management',
            permanentStudentsHeading: 'Your Permanent Students',
            pendingRequestsHeading: 'Pending Requests',
            acceptedRequestsHeading: 'Accepted Requests',
            rejectedRequestsHeading: 'Rejected Requests',
            noPermanentStudents: 'You currently have no permanent students assigned.',
            noPendingRequests: 'You have no pending requests at the moment.',
            noAcceptedRequests: 'You have no accepted requests at the moment.',
            noRejectedRequests: 'You have no rejected requests at the moment.',
            fullName: 'Full Name',
            age: 'Age',
            mobileNumber: 'Mobile Number',
            email: 'Email',
            educationLevel: 'Education Level',
            disability: 'Disability',
            call: 'Call',
            chat: 'Chat',
            accept: 'Accept',
            reject: 'Reject',
            calling: 'Calling',
            chatting: 'Initiating chat',
            accepting: 'Accepting request',
            rejecting: 'Rejecting request',
            callInitiated: (name) => `Call initiated with ${name}.`,
            chatInitiated: (name) => `Chat initiated with ${name}.`,
            requestAccepted: (name) => `Request from ${name} has been accepted.`,
            requestRejected: (name) => `Request from ${name} has been rejected.`,
            loading: 'Loading permanent students...',
            loadingPending: 'Loading pending requests...',
            loadingAccepted: 'Loading accepted requests...',
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
            pending: 'Pending',
            rejected: 'Rejected',
            
            requestId: 'Request ID',
            studentName: 'Student Name',
            studentContact: 'Student Contact',
            requestingStudent: 'Requesting Student',
            awaitingResponse: 'Awaiting Your Response',
            rating: 'Rating',
            notRatedYet: 'Not rated yet',
            outOfFive: 'out of 5 stars',
            ratedBy: 'Rated by student'
        },
        hi: {
            mainContent: 'स्क्राइब अनुरोध प्रबंधन',
            permanentStudentsHeading: 'आपके स्थायी छात्र',
            pendingRequestsHeading: 'लंबित अनुरोध',
            acceptedRequestsHeading: 'स्वीकृत अनुरोध',
            rejectedRequestsHeading: 'अस्वीकृत अनुरोध',
            noPermanentStudents: 'आपके पास वर्तमान में कोई स्थायी छात्र नहीं हैं।',
            noPendingRequests: 'आपके पास इस समय कोई लंबित अनुरोध नहीं है।',
            noAcceptedRequests: 'आपके पास इस समय कोई स्वीकृत अनुरोध नहीं है।',
            noRejectedRequests: 'आपके पास इस समय कोई अस्वीकृत अनुरोध नहीं है।',
            fullName: 'पूरा नाम',
            age: 'आयु',
            mobileNumber: 'मोबाइल नंबर',
            email: 'ईमेल',
            educationLevel: 'शिक्षा स्तर',
            disability: 'विकलांगता',
            call: 'कॉल करें',
            chat: 'चैट करें',
            accept: 'स्वीकार करें',
            reject: 'अस्वीकार करें',
            calling: 'कॉल कर रहे हैं',
            chatting: 'चैट शुरू कर रहे हैं',
            accepting: 'अनुरोध स्वीकार कर रहे हैं',
            rejecting: 'अनुरोध अस्वीकार कर रहे हैं',
            callInitiated: (name) => `${name} के साथ कॉल शुरू की गई।`,
            chatInitiated: (name) => `${name} के साथ चैट शुरू की गई।`,
            requestAccepted: (name) => `${name} का अनुरोध स्वीकार किया गया।`,
            requestRejected: (name) => `${name} का अनुरोध अस्वीकार किया गया।`,
            loading: 'स्थायी छात्र लोड हो रहे हैं...',
            loadingPending: 'लंबित अनुरोध लोड हो रहे हैं...',
            loadingAccepted: 'स्वीकृत अनुरोध लोड हो रहे हैं...',
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
            pending: 'लंबित',
            rejected: 'अस्वीकृत',
            noDescription: 'कोई विवरण प्रदान नहीं किया गया',
            requestId: 'अनुरोध आईडी',
            studentName: 'छात्र का नाम',
            studentContact: 'छात्र संपर्क',
            requestingStudent: 'अनुरोध करने वाला छात्र',
            awaitingResponse: 'आपकी प्रतिक्रिया की प्रतीक्षा में',
            rating: 'रेटिंग',
            notRatedYet: 'अभी तक रेट नहीं किया गया',
            outOfFive: '5 में से',
            ratedBy: 'छात्र द्वारा रेट किया गया'
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

    // Fetch permanent students data from API
    const getPermanentStudents = async () => {
        if (!user || !user._id) {
            console.log("User not logged in or user ID not available.");
            setIsLoading(false);
            return;
        }

        try {
            console.log(`Fetching permanent students for scribe ID: ${user._id}`);
            const res = await axiosClient.post("/auth/getPermanentStudents", { user });
            console.log("API Response:", res.data);
            setPermanentStudents(res.data.permanentStudents || []);
        } catch (error) {
            console.error('Failed to fetch permanent students:', error);
            setPermanentStudents([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch pending requests
    const getPendingRequests = async () => {
        if (!user || !user._id) {
            console.log("User not logged in or user ID not available.");
            setIsLoadingPending(false);
            return;
        }

        try {
            const res = await axiosClient.post("/auth/getScribeRequests", { 
                user, 
                status: "wait" 
            });
            console.log("Pending requests response:", res.data);
            
            const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
            setPendingRequests(requests);
        } catch (error) {
            console.error('Failed to fetch pending requests:', error);
            setPendingRequests([]);
        } finally {
            setIsLoadingPending(false);
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
            const res = await axiosClient.post("/auth/getScribeRequests", { 
                user, 
                status: "accepted" 
            });
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

    // Fetch rejected requests
    const getRejectedRequests = async () => {
        if (!user || !user._id) {
            console.log("User not logged in or user ID not available.");
            setIsLoadingRejected(false);
            return;
        }

        try {
            const res = await axiosClient.post("/auth/getScribeRequests", { 
                user, 
                status: "rejected" 
            });
            console.log("Rejected requests response:", res.data);
            
            const requests = Array.isArray(res.data) ? res.data : res.data.requests || [];
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
            getPermanentStudents();
            getPendingRequests();
            getAcceptedRequests();
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

    const acceptButtonClasses = highContrast
        ? 'btn bg-green-800 text-white border border-white hover:bg-green-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    const rejectButtonClasses = highContrast
        ? 'btn bg-red-800 text-white border border-white hover:bg-red-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    const secondaryButtonClasses = highContrast
        ? 'btn bg-gray-800 text-white border border-white hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
        : 'btn bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    const handleCallStudent = (studentId, studentName) => {
        setAnnouncements(t.callInitiated(studentName));
        console.log(`Initiating call with student ID: ${studentId} (Name: ${studentName})`);
        alert(`${t.calling} ${studentName}... (ID: ${studentId}) - Simulated`);
    };

    const handleChatStudent = (studentId, studentName) => {
        setAnnouncements(t.chatInitiated(studentName));
        console.log(`Initiating chat with student ID: ${studentId} (Name: ${studentName})`);
        alert(`${t.chatting} ${studentName}... (ID: ${studentId}) - Simulated`);
    };

    const handleAcceptRequest = async (requestId, studentName) => {
        setProcessingRequests(prev => ({ ...prev, [requestId]: 'accepting' }));
        
        try {
            const res = await axiosClient.post("/auth/acceptRequest", { 
                requestId,
                scribeId: user._id
            });
            
            if (res.data.success) {
                setAnnouncements(t.requestAccepted(studentName));
                // Remove from pending and add to accepted
                setPendingRequests(prev => prev.filter(req => req._id !== requestId));
                // Refresh accepted requests
                getAcceptedRequests();
            }
        } catch (error) {
            console.error('Failed to accept request:', error);
            alert('Failed to accept request. Please try again.');
        } finally {
            setProcessingRequests(prev => {
                const newState = { ...prev };
                delete newState[requestId];
                return newState;
            });
        }
    };

    const handleRejectRequest = async (requestId, studentName) => {
        setProcessingRequests(prev => ({ ...prev, [requestId]: 'rejecting' }));
        
        try {
            const res = await axiosClient.post("/auth/rejectRequest", { 
                requestId,
                scribeId: user._id
            });
            
            if (res.data.success) {
                setAnnouncements(t.requestRejected(studentName));
                // Remove from pending and add to rejected
                setPendingRequests(prev => prev.filter(req => req._id !== requestId));
                // Refresh rejected requests
                getRejectedRequests();
            }
        } catch (error) {
            console.error('Failed to reject request:', error);
            alert('Failed to reject request. Please try again.');
        } finally {
            setProcessingRequests(prev => {
                const newState = { ...prev };
                delete newState[requestId];
                return newState;
            });
        }
    };

    const togglePendingDetails = (requestId) => {
        setShowPendingDetails(prev => ({
            ...prev,
            [requestId]: !prev[requestId]
        }));
    };

    const toggleAcceptedDetails = (requestId) => {
        setShowAcceptedDetails(prev => ({
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

    // Component to render star rating
    const StarRating = ({ rating, maxRating = 5 }) => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    className={`inline-block ${
                        i <= rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : highContrast 
                                ? 'text-gray-500' 
                                : 'text-gray-400'
                    }`}
                    aria-hidden="true"
                />
            );
        }
        return (
            <div className="flex items-center gap-1">
                <div className="flex">{stars}</div>
                <span className="text-sm ml-1">
                    {rating}/{maxRating}
                </span>
            </div>
        );
    };

    // Component to render rating information
    const RatingDisplay = ({ request }) => {
        if (request.rating && request.rating > 0) {
            return (
                <div className="flex items-center text-sm">
                    <Star size={16} className="mr-2 text-yellow-400" aria-hidden="true" />
                    <strong className="mr-2">{t.rating}:</strong>
                    <StarRating rating={request.rating} />
                    <span className="ml-2 text-xs text-gray-400">({t.ratedBy})</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-sm">
                    <StarOff size={16} className="mr-2 text-gray-400" aria-hidden="true" />
                    <strong className="mr-2">{t.rating}:</strong>
                    <span className="text-gray-400 italic">{t.notRatedYet}</span>
                </div>
            );
        }
    };

    return (
        <div className={`min-h-screen ${baseClasses} transition-colors duration-300 font-sans  `}>
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {announcements}
            </div>
            
            <Navbar />

            <main id="main-content" role="main" aria-label={t.mainContent} className="container mx-auto px-4 py-8 space-y-12 ">
                {/* Pending Requests Section */}
                {/* <section aria-labelledby="pending-requests-heading">
                    <h2 id="pending-requests-heading" className={`text-3xl font-bold mb-8 text-yellow-500`}>
                        {t.pendingRequestsHeading}
                    </h2>

                    {isLoadingPending ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mr-3"></div>
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.loadingPending}
                            </p>
                        </div>
                    ) : pendingRequests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pendingRequests.map((request) => (
                                <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-yellow-500`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-yellow-400 flex items-center">
                                            <Hourglass size={18} className="mr-2" aria-hidden="true" />
                                            {t.pending}
                                        </h3>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            highContrast ? 'bg-yellow-800 text-white' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {t.awaitingResponse}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="flex items-center text-sm">
                                            <Users size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.studentName}:</strong> 
                                            {request.studentId?.fullName || 'N/A'}
                                        </p>
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

                                    {showPendingDetails[request._id] && (
                                        <div className={`mt-4 p-3 rounded-lg ${
                                            highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                        }`}>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                            </p>
                                            {request.studentId && (
                                                <div className="text-sm mb-2">
                                                    <strong>{t.studentContact}:</strong>
                                                    <p className="mt-1 text-gray-300">
                                                        {t.mobileNumber}: {request.studentId.mobileNumber || 'N/A'}
                                                    </p>
                                                    {request.studentId.email && (
                                                        <p className="text-gray-300">
                                                            {t.email}: {request.studentId.email}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            <div className="text-sm">
                                                <strong>{t.description}:</strong>
                                                <p className="mt-1 text-gray-300">
                                                    {request.description || t.noDescription}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleAcceptRequest(request._id, request.studentId?.fullName)}
                                            disabled={processingRequests[request._id] === 'accepting'}
                                            className={`${acceptButtonClasses} flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                            aria-label={`${t.accept} request from ${request.studentId?.fullName}`}
                                        >
                                            {processingRequests[request._id] === 'accepting' ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <Check size={14} aria-hidden="true" />
                                            )}
                                            <span>{processingRequests[request._id] === 'accepting' ? t.accepting : t.accept}</span>
                                        </button>
                                        <button
                                            onClick={() => handleRejectRequest(request._id, request.studentId?.fullName)}
                                            disabled={processingRequests[request._id] === 'rejecting'}
                                            className={`${rejectButtonClasses} flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                            aria-label={`${t.reject} request from ${request.studentId?.fullName}`}
                                        >
                                            {processingRequests[request._id] === 'rejecting' ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <XCircle size={14} aria-hidden="true" />
                                            )}
                                            <span>{processingRequests[request._id] === 'rejecting' ? t.rejecting : t.reject}</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => togglePendingDetails(request._id)}
                                        className={`${secondaryButtonClasses} w-full mt-2 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                        aria-label={showPendingDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    >
                                        <FileText size={16} aria-hidden="true" />
                                        <span>
                                            {showPendingDetails[request._id] ? t.hideDetails : t.viewDetails}
                                        </span>
                                    </button>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className={`${cardClasses} p-6 text-center rounded-lg`}>
                            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-500" />
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.noPendingRequests}
                            </p>
                        </div>
                    )}
                </section> */}

                {/* Accepted Requests Section */}
                <section aria-labelledby="accepted-requests-heading">
                    <h2 id="accepted-requests-heading" className={`text-3xl font-bold mb-8 text-green-500 flex items-center justify-center`}>
                        {t.acceptedRequestsHeading}
                    </h2>

                    {isLoadingAccepted ? (
                        <div className="flex items-center justify-center py-8 ">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mr-3"></div>
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.loadingAccepted}
                            </p>
                        </div>
                    ) : acceptedRequests.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {acceptedRequests.map((request) => (
                                <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-green-500`}>
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
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="flex items-center text-sm">
                                            <Users size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.studentName}:</strong> 
                                            {request.studentId?.fullName || 'N/A'}
                                        </p>
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
                                        {/* Rating Display */}
                                        <RatingDisplay request={request} />
                                    </div>

                                    {showAcceptedDetails[request._id] && (
                                        <div className={`mt-4 p-3 rounded-lg ${
                                            highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                        }`}>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                            </p>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                            </p>
                                            {request.studentId && (
                                                <div className="text-sm mb-2">
                                                    <strong>{t.studentContact}:</strong>
                                                    <p className="mt-1 text-gray-300">
                                                        {t.mobileNumber}: {request.studentId.mobileNumber || 'N/A'}
                                                    </p>
                                                    {request.studentId.email && (
                                                        <p className="text-gray-300">
                                                            {t.email}: {request.studentId.email}
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
                                            {/* Detailed Rating in expanded view */}
                                            {request.rating && request.rating > 0 && (
                                                <div className="text-sm mt-3 pt-3 border-t border-gray-600">
                                                    <strong>{t.rating}:</strong>
                                                    <div className="mt-1">
                                                        <StarRating rating={request.rating} />
                                                        <p className="text-xs text-gray-400 mt-1">{t.ratedBy}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Action buttons for accepted requests */}
                                    {request.studentId && (
                                        
                                        <div className="flex gap-2 mt-4">
                                            
                                            <button
                                                onClick={() => handleCallStudent(request.studentId._id, request.studentId.fullName)}
                                                className={`${buttonClasses} flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
                                                aria-label={`${t.call} ${request.studentId.fullName}`}
                                            >
                                                <Phone size={14} aria-hidden="true" />
                                                <span>{t.call}</span>
                                            </button>
                                            <Link to={`/chat/${request.studentId._id}`} className="flex-1">
                                                <button
                                                    className={`${buttonClasses} w-full flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm`}
                                                    aria-label={`${t.chat} ${request.studentId.fullName}`}
                                                >
                                                    <MessageSquare size={14} aria-hidden="true" />
                                                    <span>{t.chat}</span>
                                                </button>
                                            </Link>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => toggleAcceptedDetails(request._id)}
                                        className={`${secondaryButtonClasses} w-full mt-2 py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
                                        aria-label={showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                    >
                                        <FileText size={16} aria-hidden="true" />
                                        <span>
                                            {showAcceptedDetails[request._id] ? t.hideDetails : t.viewDetails}
                                        </span>
                                    </button>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className={`${cardClasses} p-6 text-center rounded-lg`}>
                            <AlertCircle size={48} className="mx-auto mb-4 text-green-500" />
                            <p className={`text-lg text-gray-300 ${highContrast ? 'text-white' : ''}`}>
                                {t.noAcceptedRequests}
                            </p>
                        </div>
                    )}
                </section>

                {/* Rejected Requests Section */}
                <section aria-labelledby="rejected-requests-heading">
                    <h2 id="rejected-requests-heading" className={`text-3xl font-bold mb-8 text-red-500 flex items-center justify-center`}>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rejectedRequests.map((request) => (
                                <article key={request._id} className={`${cardClasses} p-6 shadow-lg rounded-lg border-l-4 border-red-500`}>
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
                                    
                                    <div className="space-y-2 mb-4">
                                        <p className="flex items-center text-sm">
                                            <Users size={16} className="mr-2 text-blue-400" aria-hidden="true" />
                                            <strong className="mr-2">{t.studentName}:</strong> 
                                            {request.studentId?.fullName || 'N/A'}
                                        </p>
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
                                        <div className={`mt-4 p-3 rounded-lg ${
                                            highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-700'
                                        }`}>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestId}:</strong> <code className="text-xs">{request._id}</code>
                                            </p>
                                            <p className="text-sm mb-2">
                                                <strong>{t.requestedOn}:</strong> {formatDate(request.createdAt)}
                                            </p>
                                            {request.studentId && (
                                                <div className="text-sm mb-2">
                                                    <strong>{t.studentContact}:</strong>
                                                    <p className="mt-1 text-gray-300">
                                                        {t.mobileNumber}: {request.studentId.mobileNumber || 'N/A'}
                                                    </p>
                                                    {request.studentId.email && (
                                                        <p className="text-gray-300">
                                                            {t.email}: {request.studentId.email}
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
                        <div className={`${cardClasses} p-6 text-center rounded-lg`}>
                            <AlertCircle size={48} className="mx-auto mb-4 text-red-500 " />
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

export default BookingScribe;