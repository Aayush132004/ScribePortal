


import React, { useState, useCallback } from 'react';
import { Calendar, Clock, MapPin, Languages, User, Star, Award, Search, Send, CheckCircle, Info, X, Mail, Phone, BookUser, Building } from 'lucide-react';
import useGlobal from '../../utils/GlobalContext';
import INDIA_LOCATIONS from '../../data/indiaLocations.json';
import Navbar from '../../components/Navbar';
import axiosClient from '../../utils/axiosClient';

const StudentHome = () => {
  const { user, highContrast,language } = useGlobal();
  // Location lists based on current UI language (en/hi)
const statesList = INDIA_LOCATIONS[language]?.states || INDIA_LOCATIONS.en.states;
const districtsMap = INDIA_LOCATIONS[language]?.districts|| INDIA_LOCATIONS.en.districts;


  // State aligned with the provided reference code
  const [availablescribe, setAvailablescribe] = useState(null);
  const [selectingScribe, setSelectingScribe] = useState(null);
  const [selectedScribeDetails, setSelectedScribeDetails] = useState(null); // State for modal
  const [scribeRequest, setScribeRequest] = useState({
    examDate: '',
    examTime: '',
    state: '',
    district:'',
    city: '',
    examLanguage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState('');
  const [error, setError] = useState('');

  // Expanded list of Indian cities as requested
  
  // Languages from the reference code
  const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
    'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Odia', 'Punjabi',
    'Assamese', 'Nepali', 'Sanskrit'
  ].sort();

  // --- Theme Classes ---
  const baseClasses = highContrast ? "bg-black text-white" : "bg-gray-900 text-gray-100";
  const cardClasses = highContrast ? "bg-gray-900 border-white border-2 text-white" : "bg-gray-800 border-gray-700 border text-gray-100";
  const textMuted = highContrast ? "text-gray-300" : "text-gray-400";
  const inputClasses = highContrast
    ? "bg-black border-2 border-white text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
    : "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500";
  const buttonPrimaryClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200 border-2 border-white"
    : "bg-blue-600 text-white hover:bg-blue-700";

  // --- Handlers aligned with reference ---
  const announce = (message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 2000);
  };

  const handleInputChange = (field, value) => {
    setScribeRequest(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmitRequest = async () => {
    const requiredFields = ['examDate', 'examTime', 'district','state', 'examLanguage'];
    const missingFields = requiredFields.filter(field => !scribeRequest[field].trim());

    if (missingFields.length > 0) {
      const errorMsg = `Please fill in all required fields: ${missingFields.join(', ')}`;
      setError(errorMsg);
      announce(`Error: ${errorMsg}`);
      return;
    }

    setIsSubmitting(true);
    announce("Searching for available scribes...");
    try {
      //sending district data in city
      scribeRequest.city=scribeRequest.district;
      const response = await axiosClient.post('/auth/stdreq', scribeRequest);
      setAvailablescribe(response.data.data);
      announce(response.data.data.length > 0 ? `Found ${response.data.data.length} available scribes.` : "No scribes found for the selected criteria.");
    } catch (err) {
      console.error('Error submitting request:', err);
      const errorMsg = 'Failed to find scribes. Please try again later.';
      setError(errorMsg);
      announce(`Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const select = useCallback(async (scb) => {
    setSelectingScribe(scb.fullName);
    announce(`Sending request to ${scb.fullName}...`);
    try {
      await axiosClient.post('/auth/seltscb', {
        scb,
        user,
        date: scribeRequest.examDate,
        scribeRequest
      });
      announce(`Request sent to ${scb.fullName} successfully!`);
      // Close modal if open
      if (selectedScribeDetails) {
        setSelectedScribeDetails(null);
      }
      setAvailablescribe(prev => prev.filter(s => s._id !== scb._id));
    } catch (err) {
      console.error('Error selecting scribe:', err);
      announce(`Error: Failed to send request to ${scb.fullName}.`);
    } finally {
      setSelectingScribe(null);
    }
  }, [user, scribeRequest, selectedScribeDetails]);

  const isDateBooked = (scribe, targetDate) => {
    if (!targetDate) return false;
    const target = new Date(targetDate).toDateString();
    return scribe.bookedDates && scribe.bookedDates.some(date => new Date(date).toDateString() === target);
  };

  // NEW: Check if scribe knows the required language
  const knowsLanguage = (scribe, language) => {
    if (!language || !scribe.knownLanguages) return false;
    return scribe.knownLanguages.includes(language);
  };

  // NEW: Combined filter function for better readability
  const getFilteredScribes = () => {
    if (!availablescribe) return [];
    
    return availablescribe.filter(scb => 
      !isDateBooked(scb, scribeRequest.examDate) && 
      knowsLanguage(scb, scribeRequest.examLanguage)
    );
  };

  // Calculate years of experience from account creation date
  const calculateExperience = (accountCreatedDate) => {
    if (!accountCreatedDate) return "Beginner";
    const createdDate = new Date(accountCreatedDate);
    const today = new Date();
    let yearDiff = today.getFullYear() - createdDate.getFullYear();
    if (today.getMonth() < createdDate.getMonth() || (today.getMonth() === createdDate.getMonth() && today.getDate() < createdDate.getDate())) {
      yearDiff--;
    }
    return yearDiff < 1 ? "Beginner" : `${yearDiff}+`;
  };

  const getScribeRating = (scribe) => {
    if (!scribe.averageRating || parseFloat(scribe.averageRating) === 0) return 'Beginner';
    return parseFloat(scribe.averageRating).toFixed(1);
  };

  const isBeginnerRating = (scribe) => !scribe.averageRating || parseFloat(scribe.averageRating) === 0;
  const isBeginnerExperience = (accountCreatedDate) => calculateExperience(accountCreatedDate) === "Beginner";

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300`}>
      <Navbar />
      <div aria-live="polite" aria-atomic="true" className="sr-only">{announcements}</div>

      <main id="main-content" role="main" className="container mx-auto px-4 py-8" tabIndex={-1}>
  {/* Level-one page heading for accessibility (screen readers and outline) */}
  <h1 className="sr-only">Find a Scribe for Your Exam</h1>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className={`${cardClasses} rounded-2xl p-8 shadow-2xl`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Find a Scribe for Your Exam</h2>
              <p className={`mt-2 ${textMuted}`}>Fill in your exam details to see who's available.</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="examDate" className="block text-sm font-semibold mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" />Exam Date</label>
                  <input id="examDate" type="date" value={scribeRequest.examDate} onChange={(e) => handleInputChange('examDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={`w-full p-3 rounded-lg border-2 transition-all ${inputClasses}`} required />
                </div>
                <div>
                  <label htmlFor="examTime" className="block text-sm font-semibold mb-2 flex items-center gap-2"><Clock className="w-4 h-4" />Exam Time</label>
                  <input id="examTime" type="time" value={scribeRequest.examTime} onChange={(e) => handleInputChange('examTime', e.target.value)} className={`w-full p-3 rounded-lg border-2 transition-all ${inputClasses}`} required />
                </div>
              </div>
            {/* STATE DROPDOWN */}
             <div>
  <label
    htmlFor="state"
    className="block text-sm font-semibold mb-2 flex items-center gap-2"
  >
    <MapPin className="w-4 h-4" />State
  </label>

  <select
    id="state"
    value={scribeRequest.state}
    onChange={(e) => {
      handleInputChange('state', e.target.value);
      handleInputChange('district', ''); // reset district when state changes
    }}
    className={`w-full p-3 rounded-lg border-2 transition-all ${inputClasses}`}
    required
  >
    <option value="">Select State</option>
    {statesList.map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
            </div>

          {/* DISTRICT DROPDOWN (depends on state) */}
          <div>
  <label
    htmlFor="district"
    className="block text-sm font-semibold mb-2 flex items-center gap-2"
  >
    <MapPin className="w-4 h-4" />District
  </label>

  <select
    id="district"
    value={scribeRequest.district}
    onChange={(e) => handleInputChange('district', e.target.value)}
    disabled={!scribeRequest.state}
    className={`w-full p-3 rounded-lg border-2 transition-all ${inputClasses} ${
      !scribeRequest.state ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    required
  >
    <option value="">
      {scribeRequest.state ? 'Select District' : 'Select State first'}
    </option>

    {scribeRequest.state &&
      (districtsMap[scribeRequest.state] || []).map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      ))}
  </select>
         </div>

              <div>
                <label htmlFor="examLanguage" className="block text-sm font-semibold mb-2 flex items-center gap-2"><Languages className="w-4 h-4" />Exam Language</label>
                <select id="examLanguage" value={scribeRequest.examLanguage} onChange={(e) => handleInputChange('examLanguage', e.target.value)} className={`w-full p-3 rounded-lg border-2 transition-all ${inputClasses}`} required>
                  <option value="">Select exam language</option>
                  {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button type="button" onClick={handleSubmitRequest} disabled={isSubmitting} className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonPrimaryClasses}`}>
                {isSubmitting ? (<> <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> <span>Searching...</span></>) : (<> <Search className="w-5 h-5" /> <span>Find Scribes</span></>)}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {availablescribe != null && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Available Scribes</h2>
              <p className={`text-lg mt-1 ${textMuted}`}>
                Showing results for <span className="font-semibold text-blue-400">{new Date(scribeRequest.examDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span> in <span className="font-semibold text-blue-400">{scribeRequest.examLanguage}</span>
              </p>
            </div>
            
            {getFilteredScribes().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredScribes().map((scb) => (
                  <div key={scb._id} className={`${cardClasses} rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-transform hover:scale-105`}>
                    <div className="cursor-pointer" onClick={() => setSelectedScribeDetails(scb)}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative flex-shrink-0">
                          <img src={scb.profile?.url || `https://i.pravatar.cc/150?u=${scb._id}`} alt={scb.fullName} className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"/>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{scb.fullName}</h3>
                          <p className={textMuted}>{scb.cityOrVillage},{scb.district}</p>
                           <p className={textMuted}>{scb.pincode}</p>
                          <p className={textMuted}> {scb.state}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400"/>
                          <span>Experience: {isBeginnerExperience(scb.accountCreatedDate) ? 'Beginner' : `${calculateExperience(scb.accountCreatedDate)} years`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400"/>
                          <span>Rating: {isBeginnerRating(scb) ? 'No Rating' : `${getScribeRating(scb)}/5`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-green-400"/>
                          <span>Languages: {scb.knownLanguages?.join(', ') || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); select(scb); }} disabled={selectingScribe === scb.fullName} className={`w-full mt-6 py-2.5 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonPrimaryClasses}`}>
                      {selectingScribe === scb.fullName ? (<> <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> <span>Sending...</span></>) : (<> <Send className="w-4 h-4" /> <span>Send Request</span></>)}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${cardClasses} p-8 text-center rounded-2xl`}>
                <h3 className="text-2xl font-bold mb-2">No Scribes Available</h3>
                <p className={textMuted}>
                  {availablescribe.length === 0 
                    ? "No scribes found matching your criteria. Please try different search parameters."
                    : `No scribes are available who know ${scribeRequest.examLanguage} and are free on the selected date. Please try a different date or language.`
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Scribe Details Modal */}
      {selectedScribeDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300" onClick={() => setSelectedScribeDetails(null)}>
          <div className={`${cardClasses} rounded-2xl p-8 shadow-2xl max-w-md w-full m-4 transform transition-all duration-300 scale-95 hover:scale-100`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedScribeDetails(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center">
              <img src={selectedScribeDetails.profile?.url || `https://i.pravatar.cc/150?u=${selectedScribeDetails._id}`} alt={selectedScribeDetails.fullName} className="w-24 h-24 rounded-full object-cover border-4 border-gray-600 mx-auto mb-4"/>
              <h2 className="text-2xl font-bold">{selectedScribeDetails.fullName}</h2>
              <p className={textMuted}>{selectedScribeDetails.city}, {selectedScribeDetails.state}</p>
            </div>
            <div className="border-t border-gray-700 my-6"></div>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3"><User className="w-5 h-5 text-blue-400"/><span>Age: {selectedScribeDetails.age} years</span></div>
              <div className="flex items-center gap-3"><BookUser className="w-5 h-5 text-blue-400"/><span>Qualification: {selectedScribeDetails.highestQualification}</span></div>
              <div className="flex items-center gap-3"><Languages className="w-5 h-5 text-green-400"/><span>Languages: {selectedScribeDetails.knownLanguages?.join(', ') || 'Not specified'}</span></div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-400"/><span>Email: {selectedScribeDetails.email || 'Not Provided'}</span></div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-400"/><span>Contact: {selectedScribeDetails.mobileNumber}</span></div>
              <div className="flex items-center gap-3"><Star className="w-5 h-5 text-yellow-400"/><span>Rating: {isBeginnerRating(selectedScribeDetails) ? 'Beginner' : `${getScribeRating(selectedScribeDetails)}/5`}</span></div>
              <div className="flex items-center gap-3"><Award className="w-5 h-5 text-yellow-400"/><span>Experience: {isBeginnerExperience(selectedScribeDetails.accountCreatedDate) ? 'Beginner' : `${calculateExperience(selectedScribeDetails.accountCreatedDate)} years`}</span></div>
            </div>
            <button onClick={() => select(selectedScribeDetails)} disabled={selectingScribe === selectedScribeDetails.fullName} className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonPrimaryClasses}`}>
              {selectingScribe === selectedScribeDetails.fullName ? (<> <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> <span>Sending...</span></>) : (<> <Send className="w-5 h-5" /> <span>Send Request</span></>)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHome;