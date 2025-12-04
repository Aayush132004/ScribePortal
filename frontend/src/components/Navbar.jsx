import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Users, ChevronDown, LogOut, Menu, X, User, Globe, Eye, Contrast, History } from 'lucide-react';
import useGlobal from '../utils/GlobalContext';
import axiosClient from '../utils/axiosClient';
import { useNavigate, Link } from 'react-router-dom'; // Corrected import

const Navbar = () => {
  // Global state from context
  const navigate = useNavigate();
  const { language, setLanguage } = useGlobal();
  const { isAuthenticated, setIsAuthenticated } = useGlobal();
  const { user, setUser } = useGlobal();
  const { highContrast, setHighContrast } = useGlobal();

  // Local component state
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [announcements, setAnnouncements] = useState('');

  // Refs for accessibility
  const profileButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const languageButtonRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Language options
  const languageOptions = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }
  ];

  // Translations
  const translations = {
    en: {
      logoText: "ScribeConnect",
      tagline: "Bridging Learning Through Accessibility",
      dashboard: "Dashboard",
      bookings: "Bookings",
      history: "History",
      profile: "Profile",
     
      logout: "Logout",
      loggingOut: "Logging out...",
      menu: "Menu",
      closeMenu: "Close menu",
      profileMenu: "Profile menu",
      languageMenu: "Language menu",
      selectLanguage: "Select Language",
      contrastToggle: "Toggle high contrast",
      userRole: user?.role === 'scribe' ? 'Professional Scribe' : 'Student',
      location: user ? `${user.cityOrVillage}, ${user.state},${user.pincode}`: '',
      login: "Login",
      register: "Register"
    },
    hi: {
      logoText: "स्क्राइबकनेक्ट",
      tagline: "पहुंच के माध्यम से शिक्षा को जोड़ना",
      dashboard: "डैशबोर्ड",
      bookings: "बुकिंग",
      history: "इतिहास",
      profile: "प्रोफ़ाइल",
     
      logout: "लॉगआउट",
      loggingOut: "लॉगआउट हो रहा है...",
      menu: "मेन्यू",
      closeMenu: "मेन्यू बंद करें",
      profileMenu: "प्रोफ़ाइल मेन्यू",
      languageMenu: "भाषा मेन्यू",
      selectLanguage: "भाषा चुनें",
      contrastToggle: "उच्च कंट्रास्ट टॉगल करें",
      userRole: user?.role === 'scribe' ? 'पेशेवर स्क्राइब' : 'छात्र',
      location: user ? `${user.city}, ${user.state}` : '',
      login: "लॉगिन",
      register: "रजिस्टर"
    }
  };

  const t = translations[language] || translations.en;
  const currentLanguage = languageOptions.find(lang => lang.code === language) || languageOptions[0];

  // Announcement function
  const announce = (message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  };

  // Theme classes based on homepage styling
  const baseClasses = highContrast
    ? "bg-black text-white border-white"
    : "bg-gray-900 text-gray-100 border-gray-700";

  const cardClasses = highContrast
    ? "bg-gray-900 border-white border-2"
    : "bg-gray-800 border-gray-700";

  const buttonClasses = highContrast
    ? "bg-white text-black border-2 border-white hover:bg-gray-200"
    : "bg-blue-600 text-white hover:bg-blue-700";

  const outlineButtonClasses = highContrast
    ? 'border-white text-white hover:bg-white hover:text-black'
    : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white';

  // Keyboard navigation for dropdowns
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isProfileDropdownOpen) {
          setIsProfileDropdownOpen(false);
          profileButtonRef.current?.focus();
        }
        if (isLanguageDropdownOpen) {
          setIsLanguageDropdownOpen(false);
          languageButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isProfileDropdownOpen, isLanguageDropdownOpen]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axiosClient.post("auth/logout");
      
      setIsAuthenticated(false);
      setUser(null);
      
      announce(language === 'en' ? 'Successfully logged out' : 'सफलतापूर्वक लॉगआउट हो गया');
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
      announce(language === 'en' ? 'Logout failed. Please try again.' : 'लॉगआउट असफल। कृपया पुनः प्रयास करें।');
    }
  };

  // Language change handler
  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    
    const selectedLang = languageOptions.find(lang => lang.code === languageCode);
    announce(`Language changed to ${selectedLang.name}`);
  };

  // Toggle high contrast
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announce(highContrast ? "High contrast disabled" : "High contrast enabled");
  };

  const roleIcon = user?.role === 'scribe' ? Users : BookOpen;
  const roleColor = user?.role === 'scribe' ? 'text-blue-400' : 'text-green-400';
  const RoleIcon = roleIcon;

  return (
    <div className={`${baseClasses} transition-colors duration-300`}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>
      <header className="border-b border-gray-700" role="banner">
        <nav className="sticky top-0 z-50" role="navigation" aria-label="Main navigation">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-blue-400" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight">{t.logoText}</span>
                  <span className={`text-xs ${highContrast ? 'text-gray-300' : 'text-gray-400'} hidden sm:block`}>{t.tagline}</span>
                </div>
              </div>

              {/* --- MODIFIED: Desktop Navigation Links with History --- */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/dashboard" className={`${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'} font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1`}>
                    {t.dashboard}
                  </Link>
                  <Link to="/bookings" className={`${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'} font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1`}>
                    {t.bookings}
                  </Link>
                  {/* <Link to="/history" className={`${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'} font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1 flex items-center space-x-1`}>
                    <History className="h-4 w-4" aria-hidden="true" />
                    <span>{t.history}</span>
                  </Link> */}
                  <Link to="/profile" className={`${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'} font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1`}>
                    {t.profile}
                  </Link>
                </div>
              )}

              <div className="hidden md:flex items-center space-x-4">
                <div className="relative" ref={languageDropdownRef}>
                  <button ref={languageButtonRef} onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className={`btn btn-sm ${buttonClasses} flex items-center space-x-2`} aria-expanded={isLanguageDropdownOpen} aria-haspopup="menu" aria-label={t.languageMenu}>
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm font-medium">{currentLanguage.nativeName}</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border ${cardClasses} py-2 z-50`} role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button">
                      <div className={`px-3 py-2 text-xs font-medium border-b ${highContrast ? 'text-gray-300 border-white' : 'text-gray-400 border-gray-600'}`}>{t.selectLanguage}</div>
                      {languageOptions.map((lang) => (
                        <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-3 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${language === lang.code ? 'bg-blue-600 text-white' : highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-300 hover:bg-gray-700'}`} role="menuitem" aria-selected={language === lang.code}>
                          <span className="text-lg">{lang.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">{lang.name}</span>
                            <span className={`text-xs ${language === lang.code ? 'text-blue-200' : highContrast ? 'text-gray-400' : 'text-gray-500'}`}>{lang.nativeName}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={toggleHighContrast} className={`btn btn-sm ${buttonClasses} flex items-center space-x-2`} aria-label={t.contrastToggle} aria-pressed={highContrast}>
                  <Contrast className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium hidden sm:inline">{highContrast ? 'Normal' : 'High Contrast'}</span>
                </button>
                {isAuthenticated && user ? (
                  <div className="relative" ref={profileDropdownRef}>
                    <button ref={profileButtonRef} onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-gray-800'}`} aria-expanded={isProfileDropdownOpen} aria-haspopup="menu" aria-label={t.profileMenu}>
                      <div className="flex items-center space-x-3">
                        {user.profile?.url ? (<img src={user.profile.url} alt={`${user.fullName}'s profile`} className="h-8 w-8 rounded-full object-cover border-2 border-gray-600" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />) : null}
                        <div className={`h-8 w-8 rounded-full ${highContrast ? 'bg-white text-black' : 'bg-gray-700'} flex items-center justify-center ${user.profile?.url ? 'hidden' : 'flex'}`}><User className="h-4 w-4" /></div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">{user.fullName}</span>
                          <span className={`text-xs ${roleColor} flex items-center space-x-1`}><RoleIcon className="h-3 w-3" /><span>{t.userRole}</span></span>
                        </div>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-xl border ${cardClasses} py-2 z-50`} role="menu" aria-orientation="vertical" aria-labelledby="profile-menu-button">
                        <div className={`px-4 py-3 border-b ${highContrast ? 'border-white' : 'border-gray-600'}`}>
                          <p className="text-sm font-medium">{user.fullName}</p>
                          <p className={`text-xs ${highContrast ? 'text-gray-300' : 'text-gray-400'}`}>{t.location}</p>
                        </div>
                        {/* --- MODIFIED: Profile link removed from dropdown --- */}
                       
                        <hr className={`my-2 ${highContrast ? 'border-white' : 'border-gray-600'}`} />
                        <button onClick={handleLogout} disabled={isLoggingOut} className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 ${highContrast ? 'text-white hover:bg-gray-800 disabled:hover:bg-transparent' : 'text-red-400 hover:bg-red-900/20 disabled:hover:bg-transparent'}`} role="menuitem">
                          <LogOut className="h-4 w-4" aria-hidden="true" />
                          <span>{isLoggingOut ? t.loggingOut : t.logout}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link to="/login" className={`btn btn-sm btn-outline ${outlineButtonClasses}`}>{t.login}</Link>
                    <Link to="/register" className={`btn btn-sm ${buttonClasses}`}>{t.register}</Link>
                  </div>
                )}
              </div>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-300 hover:bg-gray-800'}`} aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? t.closeMenu : t.menu}>
                {isMobileMenuOpen ? (<X className="h-6 w-6" aria-hidden="true" />) : (<Menu className="h-6 w-6" aria-hidden="true" />)}
              </button>
            </div>
            {isMobileMenuOpen && (
              <div ref={mobileMenuRef} className={`md:hidden border-t ${highContrast ? 'border-white' : 'border-gray-700'} py-4 space-y-4`}>
                {isAuthenticated && user && (
                  <div className="flex items-center space-x-3 px-4">
                    {user.profile?.url ? (<img src={user.profile.url} alt={`${user.fullName}'s profile`} className="h-10 w-10 rounded-full object-cover border-2 border-gray-600" />) : (<div className={`h-10 w-10 rounded-full ${highContrast ? 'bg-white text-black' : 'bg-gray-700'} flex items-center justify-center`}><User className="h-5 w-5" /></div>)}
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className={`text-sm ${roleColor} flex items-center space-x-1`}><RoleIcon className="h-3 w-3" /><span>{t.userRole}</span></p>
                    </div>
                  </div>
                )}
                {isAuthenticated && (
                  <div className="space-y-2 px-4">
                    <Link to="/dashboard" className={`block py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded ${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'}`}>{t.dashboard}</Link>
                    <Link to="/bookings" className={`block py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded ${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'}`}>{t.bookings}</Link>
                    <Link to="/history" className={`block py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded ${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'} flex items-center space-x-2`}>
                      <History className="h-4 w-4" aria-hidden="true" />
                      <span>{t.history}</span>
                    </Link>
                    <Link to="/profile" className={`block py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded ${highContrast ? 'text-white hover:text-gray-300' : 'text-gray-300 hover:text-blue-400'}`}>{t.profile}</Link>
                  
                  </div>
                )}
                <div className={`px-4 pt-4 border-t ${highContrast ? 'border-white' : 'border-gray-700'} space-y-3`}>
                  <div className="space-y-2">
                    <span className="text-sm font-medium block">{t.selectLanguage}</span>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((lang) => (
                        <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`btn btn-sm flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${language === lang.code ? 'bg-blue-600 text-white' : highContrast ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">High Contrast</span>
                    <button onClick={toggleHighContrast} className={`btn btn-sm ${buttonClasses} flex items-center space-x-2`} aria-pressed={highContrast}>
                      <Contrast className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm font-medium">{highContrast ? 'Normal' : 'High Contrast'}</span>
                    </button>
                  </div>
                  {isAuthenticated ? (
                    <button onClick={handleLogout} disabled={isLoggingOut} className={`btn btn-sm w-full flex items-center justify-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 ${highContrast ? 'bg-white text-black hover:bg-gray-200 disabled:hover:bg-white' : 'bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600'}`}>
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      <span>{isLoggingOut ? t.loggingOut : t.logout}</span>
                    </button>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link to="/login" className={`btn btn-sm btn-outline ${outlineButtonClasses} w-full text-center`}>{t.login}</Link>
                      <Link to="/register" className={`btn btn-sm ${buttonClasses} w-full text-center`}>{t.register}</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;