// ScribeLogin.jsx

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Globe, Sun, Moon, Eye, EyeOff, Users, ArrowRight, Mail, Smartphone, ToggleRight, ToggleLeft } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';
import axiosClient from '../utils/axiosClient';
import useGlobal from '../utils/GlobalContext';


// --- Translations Object ---
const translations = {
  en: {
    skipToMain: 'Skip to main content',
    scribeConnect: 'ScribeConnect',
    tagline: 'Bridging Learning Through Accessibility',
    navigation: 'Main navigation',
    mainContent: 'Login Page',
    loginToYourAccount: 'Login to Your Account',
    loginWithEmail: 'Login with Email',
    loginWithPhone: 'Login with Phone Number',
    emailAddress: 'Email Address', // Specific label for email
    phoneNumber: 'Phone Number', // Specific label for phone
    password: 'Password',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    userType: 'Login as',
    scribe: 'Scribe',
    student: 'Student',
    forgotPassword: 'Forgot Password?',
    login: 'Login',
    doNotHaveAccount: "Don't have an account?",
    registerNow: 'Register Now',
    copyright: '© 2025 ScribeConnect. All rights reserved.',
    highContrastMode: 'High Contrast Mode',
    normalMode: 'Normal Mode',
    languageSwitcher: 'Language switcher',
    english: 'English',
    hindi: 'Hindi',
    languageChangedTo: (lang) => `Language changed to ${lang}.`,
    highContrastEnabled: 'High contrast mode enabled.',
    highContrastDisabled: 'High contrast mode disabled.',
    emailRequired: 'Email is required.',
    emailInvalid: 'Please enter a valid email address.',
    phoneRequired: 'Phone number is required.',
    phoneInvalid: 'Please enter a valid 10-digit phone number.',
    passwordRequired: 'Password is required.',
    passwordMinLength: 'Password must be at least 6 characters.',
    loginSuccess: 'Login successful! Redirecting to dashboard.',
    loginError: 'Login failed. Please check your credentials.',
    pleaseSelectUserType: 'Please select a user type.',
    registerDescription: 'Join ScribeConnect today and empower your learning journey or provide invaluable assistance.',
    toggleToPhoneLogin: 'Switch to phone number login', // Announce toggle action
    toggleToEmailLogin: 'Switch to email login', // Announce toggle action
  },
  hi: {
    skipToMain: 'मुख्य सामग्री पर जाएँ',
    scribeConnect: 'स्क्राइबकनेक्ट',
    tagline: 'पहुँच के माध्यम से शिक्षा को जोड़ना',
    navigation: 'मुख्य नेविगेशन',
    mainContent: 'लॉगिन पृष्ठ',
    loginToYourAccount: 'अपने खाते में लॉग इन करें',
    loginWithEmail: 'ईमेल से लॉगिन करें',
    loginWithPhone: 'फ़ोन नंबर से लॉगिन करें',
    emailAddress: 'ईमेल पता',
    phoneNumber: 'फ़ोन नंबर',
    password: 'पासवर्ड',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छुपाएं',
    userType: 'इसके रूप में लॉग इन करें',
    scribe: 'स्क्राइब',
    student: 'छात्र',
    forgotPassword: 'पासवर्ड भूल गए?',
    login: 'लॉगिन करें',
    doNotHaveAccount: 'खाता नहीं है?',
    registerNow: 'अभी पंजीकरण करें',
    copyright: '© 2025 स्क्राइबकनेक्ट। सभी अधिकार सुरक्षित।',
    highContrastMode: 'उच्च कंट्रास्ट मोड',
    normalMode: 'सामान्य मोड',
    languageSwitcher: 'भाषा चयनकर्ता',
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    languageChangedTo: (lang) => `भाषा बदलकर ${lang} हो गई है।`,
    highContrastEnabled: 'उच्च कंट्रास्ट मोड सक्षम किया गया।',
    highContrastDisabled: 'उच्च कंट्रास्ट मोड अक्षम किया गया।',
    emailRequired: 'ईमेल आवश्यक है।',
    emailInvalid: 'कृपया एक वैध ईमेल पता दर्ज करें।',
    phoneRequired: 'फ़ोन नंबर आवश्यक है।',
    phoneInvalid: 'कृपया एक वैध 10 अंकों का फ़ोन नंबर दर्ज करें।',
    passwordRequired: 'पासवर्ड आवश्यक है।',
    passwordMinLength: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए।',
    loginSuccess: 'लॉगिन सफल! डैशबोर्ड पर रीडायरेक्ट कर रहा है।',
    loginError: 'लॉगिन विफल। कृपया अपनी साख जांचें।',
    pleaseSelectUserType: 'कृपया एक उपयोगकर्ता प्रकार का चयन करें।',
    registerDescription: 'आज ही स्क्राइबकनेक्ट से जुड़ें और अपनी सीखने की यात्रा को सशक्त करें या अमूल्य सहायता प्रदान करें।',
    toggleToPhoneLogin: 'फ़ोन नंबर लॉगिन पर स्विच करें',
    toggleToEmailLogin: 'ईमेल लॉगिन पर स्विच करें',
  },
};

// --- Axios Client Configuration ---


const Login = () => {
  const navigate=useNavigate();
 const {language, setLanguage}= useGlobal();
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
   const {highContrast, setHighContrast} = useGlobal();
  const [announcements, setAnnouncements] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(true); // New state to toggle between email/phone login
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('');
  const [loginIdentifierError, setLoginIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languageDropdownRef = useRef(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const t = translations[language];

  // Base classes for the theme
  const baseClasses = highContrast
    ? 'bg-black text-white'
    : 'bg-gray-900 text-gray-100';

  const accentClasses = highContrast
    ? 'border-white focus:ring-white'
    : 'border-blue-600 focus:ring-blue-600';

  const buttonPrimaryClasses = highContrast
    ? 'bg-white text-black border border-white hover:bg-gray-200 focus:bg-gray-200'
    : 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700';

  const linkClasses = highContrast
    ? 'text-white underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white'
    : 'text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600';

  const borderClasses = highContrast ? 'border-white' : 'border-gray-700';
  const inputBorderClasses = highContrast ? 'border-white' : 'border-gray-600';
  const focusRingClasses = highContrast ? 'focus:ring-white' : 'focus:ring-blue-600';

  useEffect(() => {
    // Announce dynamic content changes
    if (announcements) {
      const liveRegion = document.querySelector('[aria-live="polite"]');
      if (liveRegion) {
        liveRegion.textContent = announcements;
        // Clear announcement after a short delay
        setTimeout(() => {
          liveRegion.textContent = '';
        }, 3000);
      }
    }
  }, [announcements]);

  // Handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setAnnouncements(t.languageChangedTo(lang === 'en' ? 'English' : 'Hindi'));
    setIsLanguageDropdownOpen(false);
  };

  // Handle high contrast toggle
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    setAnnouncements(
      !highContrast ? t.highContrastEnabled : t.highContrastDisabled
    );
  };

  // Toggle between email and phone login
  const toggleLoginMethod = () => {
    setIsEmailLogin(!isEmailLogin);
    setLoginIdentifier(''); // Clear identifier when switching method
    setLoginIdentifierError(''); // Clear previous error
    setAnnouncements(!isEmailLogin ? t.toggleToEmailLogin : t.toggleToPhoneLogin);
  };

  // Validation for email or phone number
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isValidPhoneNumber = (value) => /^\d{10}$/.test(value); // Assumes 10-digit phone number

  const validateForm = () => {
    let isValid = true;
    setLoginIdentifierError('');
    setPasswordError('');
    setUserTypeError('');

    if (!loginIdentifier.trim()) {
      setLoginIdentifierError(isEmailLogin ? t.emailRequired : t.phoneRequired);
      isValid = false;
    } else if (isEmailLogin && !isValidEmail(loginIdentifier)) {
      setLoginIdentifierError(t.emailInvalid);
      isValid = false;
    } else if (!isEmailLogin && !isValidPhoneNumber(loginIdentifier)) {
      setLoginIdentifierError(t.phoneInvalid);
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t.passwordMinLength);
      isValid = false;
    }

    if (!userType) {
      setUserTypeError(t.pleaseSelectUserType);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus('');
    if (validateForm()) {
      setIsLoading(true);
      setAnnouncements('Attempting to log in...');

      const loginData = {
        loginAs:userType,
        password: password,
        loginType: isEmailLogin?"email":"mobileNumber",
      };

      if (isEmailLogin) {
        loginData.email = loginIdentifier;
        loginData.mobileNumber=''
      } else {
        loginData.mobileNumber = loginIdentifier;
        loginData.email=''
      }
     
      try {
        if(userType==="scribe"){
        const response = await axiosClient.post("/auth/login", loginData);

        if (response.status === 200) { // Assuming 200 OK for success
          setLoginStatus('success');
          setAnnouncements(t.loginSuccess);
          // In a real app, you'd handle token storage and redirection here
          console.log('Login successful:', response.data);
            setUser({...response?.data?.user,role:userType});
           setIsAuthenticated(true);
          if(userType==="scribe")
            navigate("/scribeHome")

          if(userType==="student")
            navigate("/studentHome")
        } else {
          // Handle non-200 responses if your backend sends them for logical errors
          setLoginStatus('error');
          setAnnouncements(t.loginError);
          console.error('Login failed with status:', response.status, response.data);
        }
      }

       if(userType==="student"){
        const response = await axiosClient.post("/auth/login", loginData);

        if (response.status === 200) { // Assuming 200 OK for success
          setLoginStatus('success');
          setAnnouncements(t.loginSuccess);
          // In a real app, you'd handle token storage and redirection here
          setUser({...response?.data?.user,role:userType});
           setIsAuthenticated(true);
          if(userType==="scribe")
            navigate("/scribeHome")

          if(userType==="student")
            navigate("/studentHome")
        
          console.log('Login successful:', response.data);
        } else {
          // Handle non-200 responses if your backend sends them for logical errors
          setLoginStatus('error');
          setAnnouncements(t.loginError);
          console.error('Login failed with status:', response.status, response.data);
        }
      }

      } catch (error) {
        setLoginStatus('error');
        if (error.response && error.response.data && error.response.data.message) {
          // If the backend sends a specific error message
          setAnnouncements(error.response.data.message);
          console.error('Login error:', error.response.data.message);
        } else {
          setAnnouncements(t.loginError);
          console.error('Login error:', error.message);
        }
      } finally {
        setIsLoading(false);
         
      }
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
              className={`flex items-center p-2 rounded-md ${highContrast ? 'bg-gray-800 text-white border border-white' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:ring-2 ${focusRingClasses}`}
              aria-haspopup="true"
              aria-expanded={isLanguageDropdownOpen}
              aria-label={t.languageSwitcher}
            >
              <Globe size={20} aria-hidden="true" />
              <span className="ml-2 hidden sm:inline-block">
                {language === 'en' ? t.english : t.hindi}
              </span>
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
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'en' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white`}
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
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-600 hover:text-white ${language === 'hi' ? 'bg-blue-600 text-white' : highContrast ? 'text-white' : 'text-gray-100'} focus:outline-none focus:bg-blue-600 focus:text-white`}
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
            className={`p-2 rounded-md ${highContrast ? 'bg-white text-black' : 'bg-gray-800 text-gray-100'} hover:bg-gray-700 focus:outline-none focus:ring-2 ${focusRingClasses}`}
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
      <main id="main-content" role="main" aria-label={t.mainContent} className="flex flex-col items-center justify-center py-12 px-4 min-h-[calc(100vh-140px)]"> {/* Adjusted min-height to push footer down */}
        <div className={`w-full max-w-md p-8 rounded-lg shadow-xl ${highContrast ? 'bg-black border border-white' : 'bg-gray-800'}`}>
          <h2 className={`text-3xl font-bold text-center mb-6 ${highContrast ? 'text-white' : 'text-blue-400'}`}>
            {t.loginToYourAccount}
          </h2>

          {/* Toggle for Email/Phone Login */}
          <div className="flex items-center justify-center mb-6">
            <span className={`text-lg font-medium ${isEmailLogin ? 'text-blue-400' : (highContrast ? 'text-white' : 'text-gray-400')}`}>
              {t.loginWithEmail}
            </span>
            <button
              onClick={toggleLoginMethod}
              className={`mx-4 p-2 rounded-full transition-colors duration-200 focus:outline-none `}
              aria-pressed={!isEmailLogin}
              aria-label={isEmailLogin ? t.toggleToPhoneLogin : t.toggleToEmailLogin}
            >
              {isEmailLogin ? (
                <ToggleLeft size={32} className="text-gray-400 hover:text-blue-500" aria-hidden="true" />
              ) : (
                <ToggleRight size={32} className="text-blue-500 hover:text-blue-600" aria-hidden="true" />
              )}
            </button>
            <span className={`text-lg font-medium ${!isEmailLogin ? 'text-blue-400' : (highContrast ? 'text-white' : 'text-gray-400')}`}>
              {t.loginWithPhone}
            </span>
          </div>
          {/* --- End Toggle --- */}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="login-identifier" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                {isEmailLogin ? t.emailAddress : t.phoneNumber}
              </label>
              <div className="relative">
                <input
                  type={isEmailLogin ? 'email' : 'tel'} // Use 'email' for email, 'tel' for phone number for better keyboard support on mobile
                  id="login-identifier"
                  className={`w-full p-3 rounded-md bg-gray-700 ${highContrast ? 'text-white border border-white' : 'text-gray-100 border border-gray-600'} focus:outline-none focus:ring-2 ${focusRingClasses} ${loginIdentifierError ? 'border-red-500' : ''} pl-10`}
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!loginIdentifierError}
                  aria-describedby={loginIdentifierError ? "login-identifier-error" : null}
                  placeholder={isEmailLogin ? "e.g., user@example.com" : "e.g., 9876543210"}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {isEmailLogin ? (
                    <Mail size={18} className="text-gray-400" aria-hidden="true" />
                  ) : (
                    <Smartphone size={18} className="text-gray-400" aria-hidden="true" />
                  )}
                </span>
              </div>
              {loginIdentifierError && (
                <p id="login-identifier-error" role="alert" className="text-red-500 text-sm mt-1">
                  {loginIdentifierError}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                {t.password}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full p-3 rounded-md bg-gray-700 ${highContrast ? 'text-white border border-white' : 'text-gray-100 border border-gray-600'} focus:outline-none focus:ring-2 ${focusRingClasses} pr-10 ${passwordError ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : null}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 top-7 flex items-center pr-3 ${highContrast ? 'text-white' : 'text-gray-400'} hover:text-blue-500 focus:outline-none  ${focusRingClasses}`}
                aria-label={showPassword ? t.hidePassword : t.showPassword}
              >
                {showPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
              {passwordError && (
                <p id="password-error" role="alert" className="text-red-500 text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mb-6">
              <legend className={`block text-sm font-medium mb-2 ${highContrast ? 'text-white' : 'text-gray-200'}`} aria-label={t.userType}>
                {t.userType}
              </legend>
              <div role="radiogroup" aria-labelledby="user-type-legend" className="flex space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="scribe"
                    checked={userType === 'scribe'}
                    onChange={() => setUserType('scribe')}
                    className="radio radio-primary accent-blue-600"
                    aria-label={t.scribe}
                  />
                  <Users size={18} className="ml-2 text-blue-500" aria-hidden="true" />
                  <span className={`ml-1 text-base ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                    {t.scribe}
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => setUserType('student')}
                    className="radio radio-success accent-green-600"
                    aria-label={t.student}
                  />
                  <BookOpen size={18} className="ml-2 text-green-500" aria-hidden="true" />
                  <span className={`ml-1 text-base ${highContrast ? 'text-white' : 'text-gray-200'}`}>
                    {t.student}
                  </span>
                </label>
              </div>
              {userTypeError && (
                <p id="user-type-error" role="alert" className="text-red-500 text-sm mt-1">
                  {userTypeError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              {/* <a href="#" className={`${linkClasses} text-sm`} aria-label={t.forgotPassword}>
                {t.forgotPassword}
              </a> */}
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition-colors duration-200 ${buttonPrimaryClasses} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              aria-live="assertive"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner mr-2" aria-hidden="true"></span>
                  Logging in...
                </span>
              ) : (
                t.login
              )}
            </button>

            {loginStatus === 'success' && (
              <div role="alert" className="mt-4 p-3 rounded-md bg-green-700 text-white text-center">
                {t.loginSuccess}
              </div>
            )}
            {loginStatus === 'error' && (
              <div role="alert" className="mt-4 p-3 rounded-md bg-red-700 text-white text-center">
                {t.loginError}
              </div>
            )}
          </form>

          <div className={`mt-8 text-center ${highContrast ? 'text-white' : 'text-gray-300'}`}>
            <p className="mb-2">{t.doNotHaveAccount}</p>
            <button onClick={()=>{navigate("/")}} className={`${linkClasses} font-semibold`} aria-label={t.registerNow}>
              {t.registerNow} <ArrowRight size={16} className="inline-block ml-1" aria-hidden="true" />
            </button>
            <p className="mt-4 text-sm opacity-80" aria-describedby="register-description">{t.registerDescription}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 px-6 md:px-12 text-center text-sm ${borderClasses} border-t ${highContrast ? 'text-white' : 'text-gray-400'}`} role="contentinfo">
        <p>&copy; {new Date().getFullYear()} {t.scribeConnect}. {t.copyright.split('. ')[1]}</p>
      </footer>
    </div>
  );
};

export default Login;