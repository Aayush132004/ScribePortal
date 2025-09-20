import React, { useState, useRef, useEffect } from 'react'
import { Users, Calendar, MapPin, FileText, Check, X, AlertCircle, Loader, RefreshCw } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';

const ScribeHome = () => {
  const { language, isAuthenticated, user, highContrast } = useGlobal();

  const [tempstudent, settempstudent] = useState();
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [reqdata, setReqdata] = useState(null);
  const [rejdec, setrejdec] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRejectRequest, setCurrentRejectRequest] = useState(null);
  const [announcements, setAnnouncements] = useState('');

  // Refs for accessibility
  const modalRef = useRef(null);
  const rejectTextareaRef = useRef(null);

  // Translations
  const translations = {
    en: {
      studentRequests: "Student Requests",
      reviewManage: "Review and manage student connection requests",
      getAllStudents: "Get All Students",
      loading: "Loading...",
      noPendingRequests: "No Pending Requests",
      noRequestsMessage: "There are currently no pending student connection requests waiting for approval.",
      studentId: "Student ID",
      requestDate: "Request Date",
      city: "City",
      language: "Language",
      description: "Description",
      status: "Status",
      accept: "Accept",
      reject: "Reject",
      accepting: "Accepting...",
      rejecting: "Rejecting...",
      rejectRequest: "Reject Request",
      rejectReason: "Please provide a reason for rejecting this request:",
      enterReason: "Enter rejection reason...",
      cancel: "Cancel",
      confirmReject: "Confirm Reject",
      requestAccepted: "Request accepted successfully!",
      requestRejected: "Request rejected successfully!",
      errorAccepting: "Error accepting request",
      errorRejecting: "Error rejecting request",
      provideReason: "Please provide a reason for rejection",
      closeModal: "Close modal",
      wait: "Pending"
    },
    hi: {
      studentRequests: "छात्र अनुरोध",
      reviewManage: "छात्र कनेक्शन अनुरोधों की समीक्षा और प्रबंधन करें",
      getAllStudents: "सभी छात्र प्राप्त करें",
      loading: "लोड हो रहा है...",
      noPendingRequests: "कोई लंबित अनुरोध नहीं",
      noRequestsMessage: "वर्तमान में अनुमोदन की प्रतीक्षा में कोई लंबित छात्र कनेक्शन अनुरोध नहीं हैं।",
      studentId: "छात्र आईडी",
      requestDate: "अनुरोध दिनांक",
      city: "शहर",
      language: "भाषा",
      description: "विवरण",
      status: "स्थिति",
      accept: "स्वीकार करें",
      reject: "अस्वीकार करें",
      accepting: "स्वीकार हो रहा है...",
      rejecting: "अस्वीकार हो रहा है...",
      rejectRequest: "अनुरोध अस्वीकार करें",
      rejectReason: "कृपया इस अनुरोध को अस्वीकार करने का कारण दें:",
      enterReason: "अस्वीकरण कारण दर्ज करें...",
      cancel: "रद्द करें",
      confirmReject: "अस्वीकार पुष्टि करें",
      requestAccepted: "अनुरोध सफलतापूर्वक स्वीकार किया गया!",
      requestRejected: "अनुरोध सफलतापूर्वक अस्वीकार किया गया!",
      errorAccepting: "अनुरोध स्वीकार करने में त्रुटि",
      errorRejecting: "अनुरोध अस्वीकार करने में त्रुटि",
      provideReason: "कृपया अस्वीकरण का कारण दें",
      closeModal: "मॉडल बंद करें",
      wait: "लंबित"
    }
  };

  const t = translations[language] || translations.en;

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

  const acceptButtonClasses = highContrast
    ? "bg-green-800 hover:bg-green-900 border-2 border-green-900 text-white"
    : "bg-green-600 hover:bg-green-700 text-white";

  const rejectButtonClasses = highContrast
    ? "bg-red-800 hover:bg-red-900 border-2 border-red-900 text-white"
    : "bg-red-600 hover:bg-red-700 text-white";

  const modalClasses = highContrast
    ? "bg-gray-900 border-white border-2 text-white"
    : "bg-gray-800 border-gray-700 border text-gray-100";

  const inputClasses = highContrast
    ? "border-2 border-white bg-gray-800 text-white focus:border-blue-400 placeholder-gray-300"
    : "border-gray-600 bg-gray-700 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400";

  const announce = (message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  };

  console.log(user, 1)

  const getallstudents = async () => {
    setLoading(true);
    announce(t.loading);
    try {
      const res = await axiosClient.post("/auth/getstudents", { user })
      console.log(res.data.data);
      settempstudent(res.data.data);
      console.log(res.data.data2, "tempstudent data2");
      setReqdata(res.data.data2);
      announce("Student requests loaded");
    } catch (error) {
      console.log(error)
      announce("Error loading student requests");
    } finally {
      setLoading(false);
    }
  }

  const formatToIST = (isoString) => {
    const date = new Date(isoString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };

    return date.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN', options);
  }

  const Accept = async (request) => {
    setAcceptingId(request._id);
    announce(t.accepting);
    try {
      const res = await axiosClient.post("/auth/acceptrequest", {
        request
      })
      announce(t.requestAccepted);
      getallstudents();
    } catch (error) {
      console.log(error)
      announce(t.errorAccepting);
    } finally {
      setAcceptingId(null);
    }
  }

  const handleRejectClick = (request) => {
    setCurrentRejectRequest(request);
    setShowRejectModal(true);
    setrejdec("");
    announce(`${t.rejectRequest} - ${t.studentId}: ${request.studentId}`);
  }

  const Reject = async () => {
    if (!currentRejectRequest) return;

    if (!rejdec.trim()) {
      announce(t.provideReason);
      return;
    }

    setRejectingId(currentRejectRequest._id);
    announce(t.rejecting);
    console.log("Rejecting request:", currentRejectRequest._id, "Reason:", rejdec);
    try {
      const res = await axiosClient.post("/auth/rejectrequest", {
        currentRejectRequest,
        status: 'rejected',
        rejectionReason: rejdec
      })
      announce(t.requestRejected);
      getallstudents();
      setShowRejectModal(false);
      setCurrentRejectRequest(null);
      setrejdec("");
    } catch (error) {
      console.log(error)
      announce(t.errorRejecting);
    } finally {
      setRejectingId(null);
    }
  }

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setCurrentRejectRequest(null);
    setrejdec("");
    announce("Reject modal closed");
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showRejectModal) {
        closeRejectModal();
      }
    };

    if (showRejectModal) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
      setTimeout(() => rejectTextareaRef.current?.focus(), 100);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showRejectModal]);

  useEffect(() => {
  getallstudents();
}, []); 

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300`}>
      {/* Screen Reader Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {t.studentRequests}
          </h1>
          <p className={`text-lg ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
            {t.reviewManage}
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={getallstudents}
            disabled={loading}
            className={`
              ${buttonClasses}
              font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
            `}
            aria-label={loading ? t.loading : t.getAllStudents}
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5" aria-hidden="true" />
                {t.loading}
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" aria-hidden="true" />
                {t.getAllStudents}
              </>
            )}
          </button>
        </div>

        {/* Student Requests List */}
        {reqdata != null && reqdata.length > 0 ? (
          <div className="space-y-4" role="main" aria-label={t.studentRequests}>
            {reqdata.filter(request => request.isAccepted === 'wait').map((request, index) => (
              <div key={request._id || index} className="max-w-4xl mx-auto">
                <div className={`
                  ${cardClasses} rounded-xl p-6 shadow-xl
                  transition-all duration-200 hover:shadow-2xl
                `}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Student Info */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                        ${highContrast ? 'bg-white text-black' : 'bg-blue-600 text-white'}
                      `}>
                        <Users className="w-6 h-6" aria-hidden="true" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2 truncate">
                          {t.studentId}: {request.studentId}
                        </h3>
                        <div className={`text-sm space-y-1 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">
                              <span className="sr-only">{t.requestDate}:</span>
                              {formatToIST(request.date)}
                            </span>
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">
                              <span className="sr-only">{t.city}:</span>
                              {request.city}
                            </span>
                          </p>
                          <p className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">
                              <span className="sr-only">{t.language}:</span>
                              {request.language}
                            </span>
                          </p>
                          {/* {request.description && (
                            <p className="flex items-start">
                              <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span className="break-words">
                                <span className="sr-only">{t.description}:</span>
                                {request.description}
                              </span>
                            </p>
                          )} */}
                          <p className="flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                            <span>
                              <span className="sr-only">{t.status}:</span>
                              {t.wait}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex gap-3">
                      {/* Accept Button */}
                      <button
                        onClick={() => Accept(request)}
                        disabled={acceptingId === request._id || rejectingId === request._id}
                        className={`
                          ${acceptButtonClasses}
                          font-medium py-2 px-4 rounded-lg transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                        `}
                        aria-label={acceptingId === request._id ? t.accepting : `${t.accept} ${t.studentId} ${request.studentId}`}
                      >
                        {acceptingId === request._id ? (
                          <>
                            <Loader className="animate-spin h-4 w-4" aria-hidden="true" />
                            <span>{t.accepting}</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" aria-hidden="true" />
                            <span>{t.accept}</span>
                          </>
                        )}
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleRejectClick(request)}
                        disabled={acceptingId === request._id || rejectingId === request._id}
                        className={`
                          ${rejectButtonClasses}
                          font-medium py-2 px-4 rounded-lg transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
                        `}
                        aria-label={`${t.reject} ${t.studentId} ${request.studentId}`}
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                        <span>{t.reject}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reqdata != null && reqdata.filter(request => request.isAccepted === 'wait').length === 0 ? (
          /* Empty State */
          <div className="text-center py-12" role="status" aria-label={t.noPendingRequests}>
            <div className={`
              w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
              ${highContrast ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}
            `}>
              <Users className="w-12 h-12" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {t.noPendingRequests}
            </h3>
            <p className={highContrast ? 'text-gray-300' : 'text-gray-500'}>
              {t.noRequestsMessage}
            </p>
          </div>
        ) : null}

        {/* Reject Modal */}
        {showRejectModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeRejectModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reject-modal-title"
          >
            <div
              ref={modalRef}
              className={`${modalClasses} rounded-xl shadow-2xl max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 id="reject-modal-title" className="text-lg font-semibold">
                    {t.rejectRequest}
                  </h3>
                  <button
                    onClick={closeRejectModal}
                    className={`
                      ${highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'}
                      rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    aria-label={t.closeModal}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <p className={`mb-4 ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>
                  {t.rejectReason}
                </p>

                <textarea
                  ref={rejectTextareaRef}
                  value={rejdec}
                  onChange={(e) => setrejdec(e.target.value)}
                  placeholder={t.enterReason}
                  className={`
                    w-full p-3 border rounded-lg resize-none h-32 transition-colors
                    ${inputClasses}
                    outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  aria-describedby="rejection-reason-help"
                />
                <div id="rejection-reason-help" className="sr-only">
                  {t.rejectReason}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={closeRejectModal}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-gray-500
                      ${highContrast
                        ? 'bg-gray-700 text-white hover:bg-gray-600 border-2 border-gray-600'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }
                    `}
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={Reject}
                    disabled={rejectingId !== null || !rejdec.trim()}
                    className={`
                      flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2
                      focus:outline-none focus:ring-2 focus:ring-red-500
                      ${rejectButtonClasses}
                    `}
                  >
                    {rejectingId !== null ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" aria-hidden="true" />
                        <span>{t.rejecting}</span>
                      </>
                    ) : (
                      t.confirmReject
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScribeHome;