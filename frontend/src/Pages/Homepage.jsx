import React, { useState } from 'react';
import { ChevronDown, Users, BookOpen, Eye, Contrast, Volume2, Globe } from 'lucide-react';
import { useNavigate } from 'react-router';
import useGlobal from '../utils/GlobalContext';


const Homepage = () => {
  const {language, setLanguage}= useGlobal();
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();
   const {highContrast, setHighContrast} = useGlobal();
  const [announcements, setAnnouncements] = useState('');
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "ScribeConnect - Bridging Learning Through Accessibility",
      subtitle: "Connecting scribes with students for inclusive education",
      loginButton: "Login", // New text for the combined login button
      scribeRegister: "Register as Scribe",
      studentRegister: "Register as Student",
      aboutTitle: "About ScribeConnect",
      aboutText: "ScribeConnect is a revolutionary platform designed to make education accessible for all. We connect qualified scribes with students who need assistance, creating an inclusive learning environment where everyone can thrive.",
      featuresTitle: "Our Features",
      feature1Title: "Professional Scribes",
      feature1Text: "Certified and trained scribes ready to assist with examinations and learning",
      feature2Title: "Student Support",
      feature2Text: "Comprehensive support system for students with diverse learning needs",
      feature3Title: "Accessible Design",
      feature3Text: "Platform built with accessibility at its core, supporting screen readers and various assistive technologies",
      contactTitle: "Contact Us",
      contactText: "Email: support@scribeconnect.com | Phone: +91-1234567890",
      copyright: "© 2025 ScribeConnect. All rights reserved.",
      highContrastLabel: "High Contrast Mode",
      languageLabel: "Select Language",
      skipToMain: "Skip to main content",
      navigation: "Main Navigation",
      mainContent: "Main Content",
      loginPrompt: "Already have an account?", // New text for login prompt
      registerPrompt: "Don't have an account yet?" // New text for register prompt
    },
    hi: {
      title: "स्क्राइबकनेक्ट - सुगम्यता के द्वारा शिक्षा को जोड़ना",
      subtitle: "समावेशी शिक्षा के लिए स्क्राइब और छात्रों को जोड़ना",
      loginButton: "लॉगिन करें", // New text for the combined login button
      scribeRegister: "स्क्राइब के रूप में पंजीकरण",
      studentRegister: "छात्र के रूप में पंजीकरण",
      aboutTitle: "स्क्राइबकनेक्ट के बारे में",
      aboutText: "स्क्राइबकनेक्ट एक क्रांतिकारी प्लेटफॉर्म है जो सभी के लिए शिक्षा को सुलभ बनाने के लिए डिज़ाइन किया गया है। हम योग्य स्क्राइब को उन छात्रों से जोड़ते हैं जिन्हें सहायता की आवश्यकता है।",
      featuresTitle: "हमारी विशेषताएं",
      feature1Title: "पेशेवर स्क्राइब",
      feature1Text: "परीक्षा और शिक्षण में सहायता के लिए प्रमाणित और प्रशिक्षित स्क्राइब",
      feature2Title: "छात्र सहायता",
      feature2Text: "विविध शिक्षण आवश्यकताओं वाले छात्रों के लिए व्यापक सहायता प्रणाली",
      feature3Title: "सुगम्य डिज़ाइन",
      feature3Text: "प्लेटफॉर्म अपने मूल में सुगम्यता के साथ बनाया गया है",
      contactTitle: "संपर्क करें",
      contactText: "ईमेल: support@scribeconnect.com | फोन: +91-1234567890",
      copyright: "© 2025 स्क्राइबकनेक्ट। सभी अधिकार सुरक्षित।",
      highContrastLabel: "उच्च कंट्रास्ट मोड",
      languageLabel: "भाषा चुनें",
      skipToMain: "मुख्य सामग्री पर जाएं",
      navigation: "मुख्य नेवीगेशन",
      mainContent: "मुख्य सामग्री",
      loginPrompt: "पहले से ही एक खाता है?",
      registerPrompt: "अभी तक खाता नहीं है?"
    }
  };


  const t = translations[language];

  const announce = (message) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 1000);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announce(highContrast ? "High contrast disabled" : "High contrast enabled");
  };

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    announce(`Language changed to ${newLang === 'en' ? 'English' : 'Hindi'}`);
  };

  const baseClasses = highContrast
    ? "bg-black text-white"
    : "bg-gray-900 text-gray-100";

  const cardClasses = highContrast
    ? "bg-gray-900 border-white border-2"
    : "bg-gray-800 border-gray-700";

  const buttonClasses = highContrast
    ? "bg-white text-black border-2 border-white hover:bg-gray-200"
    : "bg-blue-600 text-white hover:bg-blue-700";

  const outlineButtonClasses = highContrast
    ? 'border-white text-white hover:bg-white hover:text-black'
    : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'; // Unified for both register buttons

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300`}>
      {/* Screen Reader Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements}
      </div>

      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        onFocus={() => announce("Skip link focused")}
      >
        {t.skipToMain}
      </a>

      {/* Header */}
      <header className="border-b border-gray-700" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-400" aria-hidden="true" />
              <span className="text-2xl font-bold">ScribeConnect</span>
            </div>

            {/* Accessibility Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className={`btn btn-sm ${buttonClasses} flex items-center space-x-2`}
                  aria-label="languageSelector"
                  role="button"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <ul
                  tabIndex={0}
                  className={`dropdown-content z-[1] menu p-2 shadow ${cardClasses} rounded-box w-32`}
                  role="listbox"
                  aria-label="Language options"
                >
                  <li role="option">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`${language === 'en' ? 'bg-blue-600 text-white' : ''} hover:bg-blue-500 hover:text-white`}
                      aria-selected={language === 'en'}
                    >
                      English
                    </button>
                  </li>
                  <li role="option">
                    <button
                      onClick={() => changeLanguage('hi')}
                      className={`${language === 'hi' ? 'bg-blue-600 text-white' : ''} hover:bg-blue-500 hover:text-white`}
                      aria-selected={language === 'hi'}
                    >
                      हिंदी
                    </button>
                  </li>
                </ul>
              </div>

              {/* High Contrast Toggle */}
              <button
                onClick={toggleHighContrast}
                className={`btn btn-sm ${buttonClasses} flex items-center space-x-2`}
                aria-label={t.highContrastLabel}
                aria-pressed={highContrast}
              >
                <Contrast className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{highContrast ? 'Normal' : 'High Contrast'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-700" role="navigation" aria-label={t.navigation}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center">
            <div className="flex space-x-8">
              <a href="#about" className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:underline py-2">
                About
              </a>
              <a href="#features" className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:underline py-2">
                Features
              </a>
              <a href="#contact" className="hover:text-blue-400 focus:text-blue-400 focus:outline-none focus:underline py-2">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" role="main" aria-label={t.mainContent}>
        {/* Hero Section */}
        <section className="py-20" aria-labelledby="hero-title">
          <div className="container mx-auto px-4 text-center">
            <h1 id="hero-title" className="text-5xl font-bold mb-6">
              {t.title}
            </h1>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              {t.subtitle}
            </p>

            {/* Centralized Login and Separate Registration Buttons */}
            <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
              {/* Single Login Button */}
              <p className="text-lg font-medium">{t.loginPrompt}</p>
              <button
                onClick={() => navigate("/login")} 
                className={`btn btn-lg ${buttonClasses} w-full`}
              >
                {t.loginButton}
              </button>

              <div className="w-full h-px bg-gray-700 my-4" aria-hidden="true"></div> {/* Divider */}

              {/* Registration Buttons */}
              <p className="text-lg font-medium">{t.registerPrompt}</p>
              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={() => navigate("/scribeRegister")}
                  className={`btn btn-lg btn-outline ${outlineButtonClasses} w-full flex items-center justify-center`}
                >
                  <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                  {t.scribeRegister}
                </button>
                <button
                  onClick={() => navigate("/studentRegister")}
                  className={`btn btn-lg btn-outline ${highContrast ? 'border-white text-white hover:bg-white hover:text-black' : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white'} w-full flex items-center justify-center`}
                >
                  <BookOpen className="h-5 w-5 mr-2" aria-hidden="true" />
                  {t.studentRegister}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t border-gray-700" aria-labelledby="about-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="about-title" className="text-4xl font-bold mb-8">
                {t.aboutTitle}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {t.aboutText}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 border-t border-gray-700" aria-labelledby="features-title">
          <div className="container mx-auto px-4">
            <h2 id="features-title" className="text-4xl font-bold text-center mb-16">
              {t.featuresTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className={`card ${cardClasses} shadow-xl`}>
                <div className="card-body text-center">
                  <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="card-title text-xl justify-center mb-4">
                    {t.feature1Title}
                  </h3>
                  <p className="text-gray-300">
                    {t.feature1Text}
                  </p>
                </div>
              </div>
              <div className={`card ${cardClasses} shadow-xl`}>
                <div className="card-body text-center">
                  <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="card-title text-xl justify-center mb-4">
                    {t.feature2Title}
                  </h3>
                  <p className="text-gray-300">
                    {t.feature2Text}
                  </p>
                </div>
              </div>
              <div className={`card ${cardClasses} shadow-xl`}>
                <div className="card-body text-center">
                  <Eye className="h-12 w-12 text-purple-400 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="card-title text-xl justify-center mb-4">
                    {t.feature3Title}
                  </h3>
                  <p className="text-gray-300">
                    {t.feature3Text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-gray-700" aria-labelledby="contact-title">
          <div className="container mx-auto px-4 text-center">
            <h2 id="contact-title" className="text-4xl font-bold mb-8">
              {t.contactTitle}
            </h2>
            <p className="text-lg text-gray-300">
              {t.contactText}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-blue-400" aria-hidden="true" />
            <span className="text-xl font-bold">ScribeConnect</span>
          </div>
          <p className="text-gray-400">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;