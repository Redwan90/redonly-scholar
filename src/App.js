import React, { useState, useEffect } from 'react';
import { Search, Upload, Brain, Calendar, Download, Bell, BookOpen, Globe, Target, FileText, Users, Award, Plus, Filter, Star, Clock, DollarSign, MapPin, GraduationCap, LogIn, User, Settings } from 'lucide-react';

const ScholarshipFinder = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('');
  const [minGPA, setMinGPA] = useState('');
  const [userGPA, setUserGPA] = useState('3.7');
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [customField, setCustomField] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sample scholarship data
  const scholarships = [
    {
      id: 1,
      title: "Global Innovation Fellowship 2025",
      organization: "Tech Foundation",
      amount: "$50,000",
      deadline: "2025-08-15",
      field: "Computer Science & Technology",
      level: "Graduate",
      location: "Global",
      description: "Fellowship for innovative tech projects addressing global challenges",
      matchScore: 95,
      minGPA: 3.5,
      requirements: ["3.5+ GPA", "Research experience", "Innovation project", "Programming portfolio"],
      saved: false,
      eligibleGPA: true
    },
    {
      id: 2,
      title: "Climate Research Scholarship",
      organization: "Green Earth Initiative",
      amount: "$25,000",
      deadline: "2025-09-01",
      field: "Environmental Science & Sustainability",
      level: "Undergraduate",
      location: "International",
      description: "Supporting students working on climate change solutions",
      matchScore: 88,
      minGPA: 3.0,
      requirements: ["3.0+ GPA", "Environmental focus", "Research proposal", "Community service"],
      saved: true,
      eligibleGPA: true
    },
    {
      id: 3,
      title: "Medical Innovation Grant",
      organization: "Health Research Institute",
      amount: "$75,000",
      deadline: "2025-07-30",
      field: "Medicine & Healthcare",
      level: "PhD",
      location: "USA",
      description: "For medical students developing innovative healthcare solutions",
      matchScore: 92,
      minGPA: 3.7,
      requirements: ["3.7+ GPA", "Medical school enrollment", "Innovation project", "Research publication"],
      saved: false,
      eligibleGPA: true
    },
    {
      id: 4,
      title: "Engineering Excellence Award",
      organization: "Future Engineers Foundation",
      amount: "$35,000",
      deadline: "2025-08-20",
      field: "Engineering & Applied Sciences",
      level: "Graduate",
      location: "North America",
      description: "Supporting engineering students working on sustainable solutions",
      matchScore: 85,
      minGPA: 3.3,
      requirements: ["3.3+ GPA", "Engineering project", "Leadership experience", "Sustainability focus"],
      saved: false,
      eligibleGPA: true
    },
    {
      id: 5,
      title: "Business Innovation Scholarship",
      organization: "Entrepreneurship Institute",
      amount: "$20,000",
      deadline: "2025-09-15",
      field: "Business & Entrepreneurship",
      level: "Undergraduate",
      location: "Global",
      description: "For students with innovative business ideas and entrepreneurial spirit",
      matchScore: 78,
      minGPA: 3.2,
      requirements: ["3.2+ GPA", "Business plan", "Startup experience", "Financial literacy"],
      saved: false,
      eligibleGPA: true
    },
    {
      id: 6,
      title: "Arts & Humanities Fellowship",
      organization: "Cultural Heritage Foundation",
      amount: "$30,000",
      deadline: "2025-07-25",
      field: "Arts, Humanities & Social Sciences",
      level: "Graduate",
      location: "Europe",
      description: "Supporting research in arts, literature, and cultural studies",
      matchScore: 82,
      minGPA: 3.4,
      requirements: ["3.4+ GPA", "Portfolio submission", "Research proposal", "Language proficiency"],
      saved: false,
      eligibleGPA: true
    }
  ];

  const aiTools = [
    {
      icon: FileText,
      title: "Personal Statement Generator",
      description: "AI-powered personal statement creation tailored to your goals",
      action: "Generate Statement"
    },
    {
      icon: Users,
      title: "CV Builder",
      description: "Professional CV templates optimized for academic applications",
      action: "Build CV"
    },
    {
      icon: Upload,
      title: "Document Feedback",
      description: "Get AI feedback on your SOP, CV, and application materials",
      action: "Upload & Analyze"
    },
    {
      icon: Brain,
      title: "Smart Matching",
      description: "AI analyzes your profile to find the best opportunities",
      action: "Find Matches"
    }
  ];

  useEffect(() => {
    // Simulate notifications
    setNotifications([
      { id: 1, type: 'deadline', message: 'Climate Research Scholarship deadline in 7 days - RedOnlyTech Alert', urgent: true },
      { id: 2, type: 'match', message: 'RedOnlyTech AI found new match: Data Science Fellowship', urgent: false },
      { id: 3, type: 'reminder', message: 'Complete your Medical Innovation Grant application via redonly.tech', urgent: false }
    ]);
  }, []);

  const toggleSaveOpportunity = (scholarshipId) => {
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    if (scholarship) {
      if (savedOpportunities.find(s => s.id === scholarshipId)) {
        setSavedOpportunities(prev => prev.filter(s => s.id !== scholarshipId));
      } else {
        setSavedOpportunities(prev => [...prev, scholarship]);
      }
    }
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = searchQuery === '' || 
      scholarship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const fieldToCheck = customField || selectedField;
    const matchesField = fieldToCheck === '' || 
      scholarship.field.toLowerCase().includes(fieldToCheck.toLowerCase());
    
    const matchesLevel = degreeLevel === '' || scholarship.level === degreeLevel;
    
    const gpaFilter = minGPA === '' || scholarship.minGPA <= parseFloat(minGPA);
    const userGPAEligible = userGPA === '' || parseFloat(userGPA) >= scholarship.minGPA;
    
    return matchesSearch && matchesField && matchesLevel && gpaFilter && userGPAEligible;
  });

  const renderAuthModal = () => (
    showAuthModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to RedOnlyTech</h2>
            <p className="text-gray-400">Sign in to access your scholarship dashboard</p>
          </div>
          
          <div className="space-y-4">
            {/* Google Sign In */}
            <button 
              onClick={() => {setIsLoggedIn(true); setShowAuthModal(false);}}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            {/* Microsoft Sign In */}
            <button 
              onClick={() => {setIsLoggedIn(true); setShowAuthModal(false);}}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h11v11H0V0zm13 0h11v11H13V0zM0 13h11v11H0V13zm13 0h11v11H13V13z"/>
              </svg>
              Continue with Microsoft
            </button>
            
            {/* GitHub Sign In */}
            <button 
              onClick={() => {setIsLoggedIn(true); setShowAuthModal(false);}}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium border border-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
              </div>
            </div>
            
            {/* Email Sign In */}
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                onClick={() => {setIsLoggedIn(true); setShowAuthModal(false);}}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg transition-colors font-medium"
              >
                Continue with Email
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    )
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back to RedOnlyTech Scholar! 🎓</h1>
        <p className="text-blue-100 mb-4">Computer Science Graduate • GPA: {userGPA} • Powered by redonly.tech</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">AI Match Score</span>
            </div>
            <p className="text-2xl font-bold">92%</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Saved</span>
            </div>
            <p className="text-2xl font-bold">{savedOpportunities.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Deadlines</span>
            </div>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <span className="font-semibold">Eligible</span>
            </div>
            <p className="text-2xl font-bold">{scholarships.filter(s => parseFloat(userGPA) >= s.minGPA).length}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiTools.map((tool, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer group">
            <tool.icon className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white mb-2">{tool.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              {tool.action} →
            </button>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-400" />
          Recent Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className={`p-3 rounded-lg flex items-center gap-3 ${
              notification.urgent ? 'bg-orange-900/30 border border-orange-500/50' : 'bg-gray-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                notification.urgent ? 'bg-orange-400' : 'bg-blue-400'
              }`} />
              <span className="text-white flex-1">{notification.message}</span>
              {notification.urgent && (
                <span className="text-orange-400 text-xs font-medium px-2 py-1 bg-orange-900/50 rounded">
                  URGENT
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">RedOnlyTech Scholarship Discovery</h1>
        <p className="text-gray-400">Find scholarships, fellowships, and internships powered by AI at redonly.tech</p>
      </div>

      {/* Search Filters */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scholarships, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <select
              value={selectedField}
              onChange={(e) => {
                setSelectedField(e.target.value);
                setCustomField('');
              }}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Fields</option>
              <option value="Computer Science & Technology">Computer Science & Technology</option>
              <option value="Environmental Science & Sustainability">Environmental Science & Sustainability</option>
              <option value="Medicine & Healthcare">Medicine & Healthcare</option>
              <option value="Engineering & Applied Sciences">Engineering & Applied Sciences</option>
              <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
              <option value="Arts, Humanities & Social Sciences">Arts, Humanities & Social Sciences</option>
              <option value="custom">Other (Type Below)</option>
            </select>
          </div>
          
          {selectedField === 'custom' && (
            <div>
              <input
                type="text"
                placeholder="Enter your field of study..."
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div>
            <select
              value={degreeLevel}
              onChange={(e) => setDegreeLevel(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="PhD">PhD</option>
              <option value="Postdoc">Postdoc</option>
            </select>
          </div>
          
          <div>
            <input
              type="number"
              step="0.1"
              min="0"
              max="4.0"
              placeholder="Your GPA"
              value={userGPA}
              onChange={(e) => setUserGPA(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced
          </button>
        </div>
        
        {/* GPA and Additional Filters */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Minimum GPA Required</label>
              <select
                value={minGPA}
                onChange={(e) => setMinGPA(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Any GPA</option>
                <option value="2.5">2.5+</option>
                <option value="3.0">3.0+</option>
                <option value="3.2">3.2+</option>
                <option value="3.5">3.5+</option>
                <option value="3.7">3.7+</option>
                <option value="3.8">3.8+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Scholarship Amount</label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Any Amount</option>
                <option value="10000">$10,000+</option>
                <option value="25000">$25,000+</option>
                <option value="50000">$50,000+</option>
                <option value="75000">$75,000+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Location Preference</label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Anywhere</option>
                <option value="Global">Global</option>
                <option value="USA">USA</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="International">International</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Deadline</label>
              <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">Any Deadline</option>
                <option value="30">Next 30 days</option>
                <option value="60">Next 60 days</option>
                <option value="90">Next 90 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Found {filteredScholarships.length} opportunities
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
              Best Match
            </button>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
              Deadline
            </button>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
              Amount
            </button>
          </div>
        </div>

        {filteredScholarships.map(scholarship => (
          <div key={scholarship.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{scholarship.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    scholarship.matchScore >= 90 ? 'bg-green-900 text-green-300' :
                    scholarship.matchScore >= 80 ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {scholarship.matchScore}% Match
                  </span>
                </div>
                <p className="text-blue-400 mb-2">{scholarship.organization}</p>
                <p className="text-gray-300 mb-3">{scholarship.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {scholarship.amount}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {scholarship.deadline}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {scholarship.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {scholarship.level}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    parseFloat(userGPA) >= scholarship.minGPA 
                      ? 'bg-green-900/50 text-green-300' 
                      : 'bg-orange-900/50 text-orange-300'
                  }`}>
                    <span>GPA: {scholarship.minGPA}+ required</span>
                    {parseFloat(userGPA) >= scholarship.minGPA ? ' ✓' : ' ✗'}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleSaveOpportunity(scholarship.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    savedOpportunities.find(s => s.id === scholarship.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  }`}
                >
                  <Star className={`w-5 h-5 ${
                    savedOpportunities.find(s => s.id === scholarship.id) ? 'fill-current' : ''
                  }`} />
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-3">
              <p className="text-sm text-gray-400 mb-2">Requirements:</p>
              <div className="flex flex-wrap gap-2">
                {scholarship.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAITools = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">RedOnlyTech AI Application Suite</h1>
        <p className="text-gray-400">Create compelling applications with our advanced AI assistance at redonly.tech</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Generator */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <h2 className="text-xl font-bold text-white">AI Document Generator</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Document Type</label>
              <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option>Personal Statement</option>
                <option>Cover Letter</option>
                <option>Research Proposal</option>
                <option>Motivation Letter</option>
                <option>Statement of Purpose</option>
                <option>Diversity Statement</option>
              </select>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Auto-filled from your profile:</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">Field:</span>
                  <span className="text-white">Computer Science & Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GPA:</span>
                  <span className="text-white">{userGPA}/4.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white">Graduate</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Your Goals & Achievements</label>
              <textarea 
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-24"
                placeholder="Describe your research interests, career goals, achievements, and what makes you unique..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Target Scholarship</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                  <option>Global Innovation Fellowship</option>
                  <option>Climate Research Scholarship</option>
                  <option>Medical Innovation Grant</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Tone</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                  <option>Professional</option>
                  <option>Academic</option>
                  <option>Personal</option>
                  <option>Confident</option>
                </select>
              </div>
            </div>
            
            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-colors">
              Generate Document with RedOnlyTech AI ✨
            </button>
          </div>
        </div>

        {/* Upload Feedback */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-8 h-8 text-green-400" />
            <h2 className="text-xl font-bold text-white">Document Feedback</h2>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Upload your SOP, CV, or cover letter</p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
              <label 
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer mt-3"
              >
                Choose File
              </label>
            </div>
            {uploadedFile && (
              <div className="bg-gray-700 rounded-lg p-3 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-white flex-1">{uploadedFile.name}</span>
                <button className="text-red-400 hover:text-red-300">Remove</button>
              </div>
            )}
            <button 
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              disabled={!uploadedFile}
            >
              Analyze with AI
            </button>
          </div>
        </div>

        {/* CV Builder */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Professional CV Builder</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                <h4 className="font-medium text-white mb-1">Academic CV</h4>
                <p className="text-xs text-gray-400">Research-focused template</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors">
                <h4 className="font-medium text-white mb-1">Professional CV</h4>
                <p className="text-xs text-gray-400">Industry-standard format</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
              Start Building CV
            </button>
          </div>
        </div>

        {/* Smart Matching */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Smart Opportunity Matching</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Profile Completeness</h4>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-orange-400 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <p className="text-sm text-gray-400 mt-1">85% complete</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Your Profile</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Field of Study:</span>
                  <span className="text-white">Computer Science & Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Degree Level:</span>
                  <span className="text-white">Graduate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current GPA:</span>
                  <span className={`font-medium ${parseFloat(userGPA) >= 3.5 ? 'text-green-400' : parseFloat(userGPA) >= 3.0 ? 'text-yellow-400' : 'text-orange-400'}`}>
                    {userGPA}/4.0
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Complete your profile to get better matches:</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Add research interests & publications</li>
                <li>• Upload official transcripts</li>
                <li>• Set location preferences</li>
                <li>• Add extracurricular activities</li>
                <li>• Include language proficiencies</li>
              </ul>
            </div>
            <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">RedOnlyTech Profile</h1>
          <p className="text-gray-400">Manage your academic profile on redonly.tech</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Sarah"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Johnson"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                defaultValue="sarah.johnson@redonly.tech"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone</label>
              <input 
                type="tel" 
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Country</label>
              <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Academic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Field of Study</label>
              <input 
                type="text" 
                defaultValue="Computer Science & Technology"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Current Degree Level</label>
                <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option>Undergraduate</option>
                  <option selected>Graduate</option>
                  <option>PhD</option>
                  <option>Postdoc</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Current GPA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  max="4.0"
                  value={userGPA}
                  onChange={(e) => setUserGPA(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">University/Institution</label>
              <input 
                type="text" 
                defaultValue="Stanford University"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Expected Graduation</label>
              <input 
                type="month" 
                defaultValue="2025-05"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Research Interests</label>
              <textarea 
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                placeholder="Machine Learning, Artificial Intelligence, Computer Vision..."
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Scholarship Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Preferred Locations</label>
              <div className="grid grid-cols-2 gap-2">
                {['Global', 'USA', 'Europe', 'Asia', 'North America', 'International'].map(location => (
                  <label key={location} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span className="text-gray-300 text-sm">{location}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Minimum Scholarship Amount</label>
              <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option>Any Amount</option>
                <option>$5,000+</option>
                <option>$10,000+</option>
                <option>$25,000+</option>
                <option>$50,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Opportunity Types</label>
              <div className="space-y-2">
                {['Scholarships', 'Fellowships', 'Research Grants', 'Internships', 'Study Abroad'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
                    <span className="text-gray-300 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Skills & Experience</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Technical Skills</label>
              <input 
                type="text" 
                placeholder="Python, Machine Learning, React, Data Analysis..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Languages</label>
              <input 
                type="text" 
                placeholder="English (Native), Spanish (Fluent), French (Intermediate)..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Publications & Awards</label>
              <textarea 
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                placeholder="List your publications, awards, honors, and achievements..."
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Work Experience</label>
              <textarea 
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-20"
                placeholder="Research assistant, internships, relevant work experience..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Status */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Profile Completion</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">85%</span>
            </div>
            <h3 className="font-medium text-white">Overall Completion</h3>
            <p className="text-gray-400 text-sm">Great progress!</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-medium text-white">Profile Strength</h3>
            <p className="text-green-400 text-sm">Strong</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-medium text-white">Match Quality</h3>
            <p className="text-blue-400 text-sm">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSaved = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Saved Opportunities</h1>
        <span className="text-gray-400">{savedOpportunities.length} saved</span>
      </div>

      {savedOpportunities.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No saved opportunities yet</h3>
          <p className="text-gray-500 mb-4">Start exploring with RedOnlyTech AI and save opportunities you're interested in</p>
          <button 
            onClick={() => setActiveTab('search')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse Opportunities
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedOpportunities.map(scholarship => (
            <div key={scholarship.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{scholarship.title}</h3>
                    <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-medium">
                      SAVED
                    </span>
                  </div>
                  <p className="text-blue-400 mb-2">{scholarship.organization}</p>
                  <p className="text-gray-300 mb-3">{scholarship.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {scholarship.amount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {scholarship.deadline}
                    </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {scholarship.amount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {scholarship.deadline}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {scholarship.location}
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      parseFloat(userGPA) >= scholarship.minGPA 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-orange-900/50 text-orange-300'
                    }`}>
                      <span>GPA: {scholarship.minGPA}+ required</span>
                      {parseFloat(userGPA) >= scholarship.minGPA ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      parseFloat(userGPA) >= scholarship.minGPA 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-red-900/50 text-red-300'
                    }`}>
                      <span>GPA: {scholarship.minGPA}+ required</span>
                      {parseFloat(userGPA) >= scholarship.minGPA ? ' ✓' : ' ✗'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleSaveOpportunity(scholarship.id)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Star className="w-5 h-5 text-white fill-current" />
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'ai-tools', label: 'AI Tools', icon: Brain },
    { id: 'saved', label: 'Saved', icon: Star },
    { id: 'profile', label: 'Profile', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Auth Modal */}
      {renderAuthModal()}
      
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold">RedOnlyTech Scholar</h1>
              <p className="text-sm text-gray-400">redonly.tech - Your Academic Future, Powered by AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-sm font-medium">S</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen border-r border-gray-700 p-4">
          <div className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {item.id === 'saved' && savedOpportunities.length > 0 && (
                  <span className="ml-auto bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {savedOpportunities.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-lg border border-blue-500/30">
            <h3 className="font-medium text-white mb-2">🚀 RedOnlyTech Pro</h3>
            <p className="text-xs text-gray-400 mb-3">Unlock unlimited AI generation and premium templates on redonly.tech</p>
            <button className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'search' && renderSearch()}
            {activeTab === 'ai-tools' && renderAITools()}
            {activeTab === 'saved' && renderSaved()}
            {activeTab === 'profile' && renderProfile()}
          </div>
          
          {/* Footer */}
          <footer className="mt-16 border-t border-gray-700 pt-8">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-xl font-bold text-white">RedOnlyTech Scholar</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering students worldwide with AI-powered scholarship discovery
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <a href="https://redonly.tech" className="hover:text-blue-400 transition-colors">
                  🌐 redonly.tech
                </a>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
                <span>•</span>
                <span>Contact Support</span>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                © 2025 RedOnlyTech. All rights reserved. Powered by redonly.tech
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipFinder;