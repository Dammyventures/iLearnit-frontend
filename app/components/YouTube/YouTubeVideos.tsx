import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  category: string;
  views: string;
  duration: string;
  description: string;
}

interface CourseCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const UniversityCoursesPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);

  // YouTube Data API key
  const YOUTUBE_API_KEY = 'AIzaSyCCyCb6sZjvFgNwL66SwqYzhIsLsN09Fwo';

  // Subject to search query mapping - useMemo to prevent recreation on every render
  const subjectSearchMap = useMemo(() => ({
    'accounting': 'accounting principles',
    'actuarial-science': 'actuarial science',
    'adult-education': 'adult education',
    'agricultural-economics': 'agricultural economics',
    'agricultural-extension': 'agricultural extension',
    'agronomy': 'agronomy',
    'anatomy': 'human anatomy',
    'animal-science': 'animal science',
    'applied-geophysics': 'applied geophysics',
    'architecture': 'architecture principles',
    'archaeology': 'archaeology',
    'biochemistry': 'biochemistry',
    'biological-science': 'biological science',
    'biomedical-engineering': 'biomedical engineering',
    'botany': 'botany',
    'building-technology': 'building technology',
    'business-administration': 'business administration',
    'business-education': 'business education',
    'chemical-engineering': 'chemical engineering',
    'chemistry': 'chemistry',
    'civil-engineering': 'civil engineering',
    'computer-engineering': 'computer engineering',
    'computer-science': 'computer science',
    'cooperative-rural-development': 'cooperative rural development',
    'criminology-security': 'criminology',
    'dentistry': 'dentistry',
    'drama': 'drama performing arts',
    'early-childhood-education': 'early childhood education',
    'economics': 'economics',
    'education-biology': 'biology education',
    'education-chemistry': 'chemistry education',
    'education-computer-science': 'computer science education',
    'education-economics': 'economics education',
    'education-english': 'english education',
    'education-french': 'french education',
    'education-geography': 'geography education',
    'education-history': 'history education',
    'education-integrated-science': 'integrated science education',
    'education-mathematics': 'mathematics education',
    'education-physics': 'physics education',
    'education-political-science': 'political science education',
    'education-religious-studies': 'religious studies education',
    'educational-administration': 'educational administration',
    'educational-management': 'educational management',
    'electrical-electronics-engineering': 'electrical electronics engineering',
    'english-language': 'english language',
    'environmental-management': 'environmental management',
    'estate-management': 'estate management',
    'fisheries': 'fisheries',
    'fine-arts': 'fine arts',
    'forestry': 'forestry',
    'french': 'french language',
    'geography': 'geography',
    'geology': 'geology',
    'guidance-counselling': 'guidance counselling',
    'health-education': 'health education',
    'history': 'history',
    'home-economics': 'home economics',
    'hospitality-tourism': 'hospitality tourism',
    'human-anatomy': 'human anatomy',
    'human-kinetics': 'human kinetics',
    'human-nutrition-dietetics': 'human nutrition dietetics',
    'industrial-chemistry': 'industrial chemistry',
    'industrial-mathematics': 'industrial mathematics',
    'industrial-physics': 'industrial physics',
    'industrial-relations': 'industrial relations',
    'insurance': 'insurance',
    'international-relations': 'international relations',
    'islamic-studies': 'islamic studies',
    'law': 'law',
    'library-information-science': 'library information science',
    'linguistics': 'linguistics',
    'marketing': 'marketing',
    'mass-communication': 'mass communication',
    'mathematics': 'mathematics',
    'mechanical-engineering': 'mechanical engineering',
    'mechatronics-engineering': 'mechatronics engineering',
    'medical-laboratory-science': 'medical laboratory science',
    'medicine-surgery': 'medicine surgery',
    'microbiology': 'microbiology',
    'music': 'music',
    'nursing-science': 'nursing science',
    'nutrition-dietetics': 'nutrition dietetics',
    'petroleum-engineering': 'petroleum engineering',
    'pharmacy': 'pharmacy',
    'philosophy': 'philosophy',
    'physical-health-education': 'physical health education',
    'physics': 'physics',
    'physiology': 'physiology',
    'physiotherapy': 'physiotherapy',
    'political-science': 'political science',
    'psychology': 'psychology',
    'public-administration': 'public administration',
    'public-health': 'public health',
    'quantity-surveying': 'quantity surveying',
    'radiography': 'radiography',
    'religious-studies': 'religious studies',
    'sociology': 'sociology',
    'soil-science': 'soil science',
    'special-education': 'special education',
    'statistics': 'statistics',
    'surveying-geoinformatics': 'surveying geoinformatics',
    'teacher-education-science': 'teacher education science',
    'theatre-arts': 'theatre arts',
    'urban-regional-planning': 'urban regional planning',
    'veterinary-medicine': 'veterinary medicine',
    'visual-arts': 'visual arts',
    'yoruba': 'yoruba language',
    'zoology': 'zoology',
  }), []);

  // Subject to default video ID mapping - useMemo to prevent recreation on every render
  const subjectVideoMap = useMemo(() => ({
    'accounting': 'eyXKvOrDoqw',
    'actuarial-science': 'b-8mv1Cg9w4',
    'adult-education': 'meP6U76YnSQ',
    'agricultural-economics': 'STLMbzI3g48',
    'agricultural-extension': 'K2n4J1kUT-A',
    'agronomy': 'Zlc2ZqERr8s',
    'anatomy': 'pVkUCrgQCCc',
    'animal-science': 'F2prf71BaYA',
    'applied-geophysics': 'SQ6uoR-Fu5Q',
    'architecture': 'rPveNM9IqYk',
    'archaeology': 'pUstiwexvkI',
    'biochemistry': 'bMcnUYp8x8E',
    'biological-science': 'LUDws4JrIiI',
    'biomedical-engineering': 'Sn0bOX5Hau4',
    'botany': '8-G7D_sy7qE',
    'building-technology': 'K1k9_qOtD2E',
    'business-administration': 'fpK25UY_0iA',
    'business-education': 'R1BQ3j-eMZg',
    'chemical-engineering': 'RJeWKvQD90Y',
    'chemistry': '6OV3tmt9uhs',
    'civil-engineering': 'bFljMHTQ1QY',
    'computer-engineering': 'qV9EbyYlP_Q',
    'computer-science': '8mAITcNt710',
    'cooperative-rural-development': 'XCSY3LkxtMs',
    'criminology-security': '6to9ayqCtaY',
    'dentistry': 'scJH8HA8zAM',
    'drama': 'DH2kYsvBfS0',
    'early-childhood-education': 'FQiFGexkOyg',
    'economics': 'wCHm5SdNO5U',
    'education-biology': '3tisOnOkwzo',
    'education-chemistry': '5iTOphGnCtg',
    'education-computer-science': 'y2kg3MOk1sY',
    'education-economics': 'EJHPltmAULA',
    'education-english': 'CbPy_CjJR90',
    'education-french': 'RxCR3g6aYJ0',
    'education-geography': 'XL1XEbXvbBk',
    'education-history': 'dDUUeyJr2nA',
    'education-integrated-science': 'CTMLqurVpGo',
    'education-mathematics': 'eI4an8aSsgw',
    'education-physics': 'TTHazQeM8v8',
    'education-political-science': 'XpZqUYm-XvA',
    'education-religious-studies': 'kLkDPNmDBAo',
    'educational-administration': 'Kr-uxBIKL7E',
    'educational-management': 'O0RI6f-Ks8s',
    'electrical-electronics-engineering': 'dS4VU8KchWQ',
    'english-language': 'mKBbP4T5fbk',
    'environmental-management': 'oHbTgSqGo5c',
    'estate-management': 'K5c3ihwfg3g',
    'fisheries': 'bmNYSFRPyAo',
    'fine-arts': 'wtICBD0Ke_E',
    'forestry': 'VMz4bI0vyAU',
    'french': '15e8T5LTalI',
    'geography': 'A-4-_0-jD2g',
    'geology': 'AkgwxYfLN7Y',
    'guidance-counselling': 'd53ysIHbURM',
    'health-education': '18ouULYZdEI',
    'history': '6fHjonIWWoQ',
    'home-economics': '8z2po-jAqJY',
    'hospitality-tourism': 'iP0yfOfR79w',
    'human-anatomy': '0K4ZRjkd7bc',
    'human-kinetics': 'sXjwYe6K1EA',
    'human-nutrition-dietetics': 'xHajTRzk10U',
    'industrial-chemistry': 'DaXGsOY9mj0',
    'industrial-mathematics': '3whQJXdVFq8',
    'industrial-physics': 'ZihywtixUYo',
    'industrial-relations': 'DePwZRxAx1U',
    'insurance': '4xU_GpTcn8o',
    'international-relations': 'y32cFdicW1U',
    'islamic-studies': '2o9VUgYz-vA',
    'law': 'E66pl7A24Cw',
    'library-information-science': 'pfP7AjwIZI8',
    'linguistics': 'jQx_jZxdCbs',
    'marketing': '8Sj2tbh-ozE',
    'mass-communication': '99W9-1I66Jw',
    'mathematics': 'JbhBdOfMEPs',
    'mechanical-engineering': 'AwaVPJJEjAQ',
    'mechatronics-engineering': 'tgjgN-Up4DY',
    'medical-laboratory-science': 'C_NmnzyQb3Y',
    'medicine-surgery': '13XPFtL0v-8',
    'microbiology': 'fU0XO1X1tAE',
    'music': 'OtBqDgOsW1c',
    'nursing-science': 'C2l1wEDUbjY',
    'nutrition-dietetics': 'ljhNTku26Bk',
    'petroleum-engineering': 'Srd2X6yELHU',
    'pharmacy': '-KoMeoXT_m4',
    'philosophy': 'wwT4N_v0-WQ',
    'physical-health-education': 'S5JMPBkaWn0',
    'physics': 'mYcLuWHzfmE',
    'physiology': '6qk_LTVXZ2w',
    'physiotherapy': '_ovss6HeVok',
    'political-science': 'HgDCWE08ZAU',
    'psychology': 'ysda8PHQnGY',
    'public-administration': 'kOy25Q8Y_Gg',
    'public-health': '5aww-Bpgkf4',
    'quantity-surveying': 'povDzxA0G2U',
    'radiography': 'VJmu_TrRGRY',
    'religious-studies': 'JLD9Zg7mMaQ',
    'sociology': 'YnCJU6PaCio',
    'soil-science': 'udseIcrUxvA',
    'special-education': 'H90Po8tHbOU',
    'statistics': 'xxpc-HPKN28',
    'surveying-geoinformatics': 'Kp-2F0vLvAM',
    'teacher-education-science': '3645-Lm6D_U',
    'theatre-arts': 'sNWrOuwzax8',
    'urban-regional-planning': 'iFPokf8mwPk',
    'veterinary-medicine': 'TxVVdAdDNPI',
    'visual-arts': 'GQS7wPujL2k',
    'yoruba': '3Ne5TDM1nys',
    'zoology': 'ipOoEmrm4pI',
  }), []);

  // Course categories with relevant icons and descriptions - useMemo to prevent recreation on every render
const courseCategories = useMemo(() => [
    { id: 'accounting', name: 'Accounting', icon: '📊', description: 'Financial accounting, auditing, and taxation', color: 'bg-blue-100 text-blue-800' },
    { id: 'actuarial-science', name: 'Actuarial Science', icon: '📐', description: 'Risk assessment and financial modeling', color: 'bg-purple-100 text-purple-800' },
    { id: 'adult-education', name: 'Adult Education', icon: '👨‍🏫', description: 'Teaching methodologies for adult learners', color: 'bg-green-100 text-green-800' },
    { id: 'agricultural-economics', name: 'Agricultural Economics', icon: '🌾', description: 'Economic principles applied to agriculture', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'agricultural-engineering', name: 'Agricultural Engineering', icon: '🚜', description: 'Engineering solutions for agricultural problems', color: 'bg-amber-100 text-amber-800' },
    { id: 'agricultural-extension', name: 'Agricultural Extension', icon: '🌱', description: 'Dissemination of agricultural research', color: 'bg-lime-100 text-lime-800' },
    { id: 'agronomy', name: 'Agronomy', icon: '🌻', description: 'Crop production and soil management', color: 'bg-teal-100 text-teal-800' },
    { id: 'anatomy', name: 'Anatomy', icon: '🦴', description: 'Study of bodily structures', color: 'bg-pink-100 text-pink-800' },
    { id: 'animal-science', name: 'Animal Science', icon: '🐄', description: 'Animal biology and production', color: 'bg-brown-100 text-brown-800' },
    { id: 'applied-geophysics', name: 'Applied Geophysics', icon: '🧲', description: 'Geophysical methods for practical applications', color: 'bg-gray-100 text-gray-800' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️', description: 'Building design and construction', color: 'bg-orange-100 text-orange-800' },
    { id: 'archaeology', name: 'Archaeology', icon: '🏺', description: 'Study of human history through excavation', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'biochemistry', name: 'Biochemistry', icon: '🧪', description: 'Chemical processes in living organisms', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'biological-science', name: 'Biological Science', icon: '🔬', description: 'Study of living organisms', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'biomedical-engineering', name: 'Biomedical Engineering', icon: '⚕️', description: 'Engineering principles to medicine', color: 'bg-red-100 text-red-800' },
    { id: 'botany', name: 'Botany', icon: '🌿', description: 'Study of plant life', color: 'bg-green-100 text-green-800' },
    { id: 'building-technology', name: 'Building Technology', icon: '🏗️', description: 'Construction methods and materials', color: 'bg-stone-100 text-stone-800' },
    { id: 'business-administration', name: 'Business Administration', icon: '💼', description: 'Management and organizational leadership', color: 'bg-slate-100 text-slate-800' },
    { id: 'business-education', name: 'Business Education', icon: '📚', description: 'Teaching business concepts', color: 'bg-blue-100 text-blue-800' },
    { id: 'chemical-engineering', name: 'Chemical Engineering', icon: '⚗️', description: 'Chemical process design', color: 'bg-purple-100 text-purple-800' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', description: 'Study of matter and its properties', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'civil-engineering', name: 'Civil Engineering', icon: '🏗️', description: 'Infrastructure design and construction', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'computer-engineering', name: 'Computer Engineering', icon: '💻', description: 'Hardware and software integration', color: 'bg-teal-100 text-teal-800' },
    { id: 'computer-science', name: 'Computer Science', icon: '👨‍💻', description: 'Algorithms and programming', color: 'bg-blue-100 text-blue-800' },
    { id: 'cooperative-rural-development', name: 'Cooperative and Rural Development', icon: '🤝', description: 'Community-based development', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'criminology-security', name: 'Criminology and Security Studies', icon: '🔍', description: 'Crime analysis and prevention', color: 'bg-gray-100 text-gray-800' },
    { id: 'dentistry', name: 'Dentistry', icon: '🦷', description: 'Oral health and dental care', color: 'bg-white-100 text-white-800 border' },
    { id: 'drama', name: 'Drama/Performing Arts', icon: '🎭', description: 'Theatrical performance and production', color: 'bg-pink-100 text-pink-800' },
    { id: 'early-childhood-education', name: 'Early Childhood Education', icon: '🧸', description: 'Education for young children', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'economics', name: 'Economics', icon: '📈', description: 'Production and consumption of goods', color: 'bg-green-100 text-green-800' },
    { id: 'education-biology', name: 'Education and Biology', icon: '🧬', description: 'Teaching biological sciences', color: 'bg-lime-100 text-lime-800' },
    { id: 'education-chemistry', name: 'Education and Chemistry', icon: '⚗️', description: 'Teaching chemical sciences', color: 'bg-orange-100 text-orange-800' },
    { id: 'education-computer-science', name: 'Education and Computer Science', icon: '💻', description: 'Teaching computing concepts', color: 'bg-blue-100 text-blue-800' },
    { id: 'education-economics', name: 'Education and Economics', icon: '💰', description: 'Teaching economic principles', color: 'bg-amber-100 text-amber-800' },
    { id: 'education-english', name: 'Education and English', icon: '📖', description: 'Teaching English language', color: 'bg-red-100 text-red-800' },
    { id: 'education-french', name: 'Education and French', icon: '🥖', description: 'Teaching French language', color: 'bg-blue-100 text-blue-800' },
    { id: 'education-geography', name: 'Education and Geography', icon: '🗺️', description: 'Teaching geographical concepts', color: 'bg-teal-100 text-teal-800' },
    { id: 'education-history', name: 'Education and History', icon: '📜', description: 'Teaching historical events', color: 'bg-amber-100 text-amber-800' },
    { id: 'education-integrated-science', name: 'Education and Integrated Science', icon: '🔬', description: 'Teaching general science', color: 'bg-purple-100 text-purple-800' },
    { id: 'education-mathematics', name: 'Education and Mathematics', icon: '∫', description: 'Teaching mathematical concepts', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'education-physics', name: 'Education and Physics', icon: '⚛', description: 'Teaching physical principles', color: 'bg-gray-100 text-gray-800' },
    { id: 'education-political-science', name: 'Education and Political Science', icon: '🏛️', description: 'Teaching government systems', color: 'bg-blue-100 text-blue-800' },
    { id: 'education-religious-studies', name: 'Education and Religious Studies', icon: '☯️', description: 'Teaching religious concepts', color: 'bg-purple-100 text-purple-800' },
    { id: 'educational-administration', name: 'Educational Administration', icon: '👨‍💼', description: 'School management and leadership', color: 'bg-green-100 text-green-800' },
    { id: 'educational-management', name: 'Educational Management', icon: '📊', description: 'Administration of educational institutions', color: 'bg-teal-100 text-teal-800' },
    { id: 'electrical-electronics-engineering', name: 'Electrical and Electronics Engineering', icon: '⚡', description: 'Electrical systems and electronics', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'english-language', name: 'English Language', icon: '🔤', description: 'Study of English literature and language', color: 'bg-red-100 text-red-800' },
    { id: 'environmental-management', name: 'Environmental Management', icon: '🌍', description: 'Sustainable resource management', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'estate-management', name: 'Estate Management', icon: '🏢', description: 'Property management and valuation', color: 'bg-gray-100 text-gray-800' },
    { id: 'fisheries', name: 'Fisheries', icon: '🐟', description: 'Aquatic resource management', color: 'bg-blue-100 text-blue-800' },
    { id: 'fine-arts', name: 'Fine and Applied Arts', icon: '🎨', description: 'Visual arts and creative expression', color: 'bg-pink-100 text-pink-800' },
    { id: 'forestry', name: 'Forestry', icon: '🌲', description: 'Forest management and conservation', color: 'bg-green-100 text-green-800' },
    { id: 'french', name: 'French', icon: '🇫🇷', description: 'French language and literature', color: 'bg-blue-100 text-blue-800' },
    { id: 'geography', name: 'Geography', icon: '🗺️', description: 'Study of Earth and its features', color: 'bg-teal-100 text-teal-800' },
    { id: 'geology', name: 'Geology', icon: '⛰️', description: 'Study of Earth materials and processes', color: 'bg-stone-100 text-stone-800' },
    { id: 'guidance-counselling', name: 'Guidance and Counselling', icon: '💬', description: 'Personal and academic counseling', color: 'bg-purple-100 text-purple-800' },
    { id: 'health-education', name: 'Health Education', icon: '❤️', description: 'Promotion of healthy behaviors', color: 'bg-red-100 text-red-800' },
    { id: 'history', name: 'History', icon: '📜', description: 'Study of past events', color: 'bg-amber-100 text-amber-800' },
    { id: 'home-economics', name: 'Home Economics', icon: '🏠', description: 'Household management and nutrition', color: 'bg-pink-100 text-pink-800' },
    { id: 'hospitality-tourism', name: 'Hospitality and Tourism Management', icon: '🏨', description: 'Hotel and tourism industry management', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'human-anatomy', name: 'Human Anatomy', icon: '🦴', description: 'Structure of the human body', color: 'bg-pink-100 text-pink-800' },
    { id: 'human-kinetics', name: 'Human Kinetics', icon: '🏃', description: 'Human movement and exercise science', color: 'bg-red-100 text-red-800' },
    { id: 'human-nutrition-dietetics', name: 'Human Nutrition and Dietetics', icon: '🍎', description: 'Food science and dietary planning', color: 'bg-green-100 text-green-800' },
    { id: 'industrial-chemistry', name: 'Industrial Chemistry', icon: '🏭', description: 'Chemical processes in industry', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'industrial-mathematics', name: 'Industrial Mathematics', icon: '📊', description: 'Mathematical applications in industry', color: 'bg-blue-100 text-blue-800' },
    { id: 'industrial-physics', name: 'Industrial Physics', icon: '⚛', description: 'Physics applications in industry', color: 'bg-purple-100 text-purple-800' },
    { id: 'industrial-relations', name: 'Industrial Relations and Personnel Management', icon: '👥', description: 'Workplace relationships and HR', color: 'bg-teal-100 text-teal-800' },
    { id: 'insurance', name: 'Insurance', icon: '📑', description: 'Risk management and insurance', color: 'bg-green-100 text-green-800' },
    { id: 'international-relations', name: 'International Relations', icon: '🌐', description: 'Global politics and diplomacy', color: 'bg-blue-100 text-blue-800' },
    { id: 'islamic-studies', name: 'Islamic Studies', icon: '☪️', description: 'Study of Islam and Islamic culture', color: 'bg-green-100 text-green-800' },
    { id: 'law', name: 'Law', icon: '⚖️', description: 'Legal systems and jurisprudence', color: 'bg-gray-100 text-gray-800' },
    { id: 'library-information-science', name: 'Library and Information Science', icon: '📚', description: 'Information organization and management', color: 'bg-amber-100 text-amber-800' },
    { id: 'linguistics', name: 'Linguistics', icon: '🔤', description: 'Study of language and its structure', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'marketing', name: 'Marketing', icon: '📣', description: 'Product promotion and sales', color: 'bg-pink-100 text-pink-800' },
    { id: 'mass-communication', name: 'Mass Communication', icon: '📡', description: 'Media and communication studies', color: 'bg-blue-100 text-blue-800' },
    { id: 'mathematics', name: 'Mathematics', icon: '∫', description: 'Study of numbers and patterns', color: 'bg-purple-100 text-purple-800' },
    { id: 'mechanical-engineering', name: 'Mechanical Engineering', icon: '⚙️', description: 'Design of mechanical systems', color: 'bg-gray-100 text-gray-800' },
    { id: 'mechatronics-engineering', name: 'Mechatronics Engineering', icon: '🤖', description: 'Integration of mechanics and electronics', color: 'bg-blue-100 text-blue-800' },
    { id: 'medical-laboratory-science', name: 'Medical Laboratory Science', icon: '🧫', description: 'Clinical laboratory testing', color: 'bg-red-100 text-red-800' },
    { id: 'medicine-surgery', name: 'Medicine and Surgery', icon: '🩺', description: 'Medical diagnosis and treatment', color: 'bg-white-100 text-white-800 border' },
    { id: 'microbiology', name: 'Microbiology', icon: '🧫', description: 'Study of microorganisms', color: 'bg-green-100 text-green-800' },
    { id: 'music', name: 'Music', icon: '🎵', description: 'Music theory and performance', color: 'bg-pink-100 text-pink-800' },
    { id: 'nursing-science', name: 'Nursing Science', icon: '👩‍⚕️', description: 'Patient care and medical assistance', color: 'bg-red-100 text-red-800' },
    { id: 'nutrition-dietetics', name: 'Nutrition and Dietetics', icon: '🍽️', description: 'Food science and nutritional planning', color: 'bg-green-100 text-green-800' },
    { id: 'petroleum-engineering', name: 'Petroleum Engineering', icon: '🛢️', description: 'Oil and gas extraction', color: 'bg-gray-100 text-gray-800' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', description: 'Medication preparation and dispensing', color: 'bg-red-100 text-red-800' },
    { id: 'philosophy', name: 'Philosophy', icon: '🤔', description: 'Study of fundamental questions', color: 'bg-purple-100 text-purple-800' },
    { id: 'physical-health-education', name: 'Physical and Health Education', icon: '🏋️', description: 'Fitness and wellness education', color: 'bg-red-100 text-red-800' },
    { id: 'physics', name: 'Physics', icon: '⚛', description: 'Study of matter and energy', color: 'bg-blue-100 text-blue-800' },
    { id: 'physiology', name: 'Physiology', icon: '🫀', description: 'Study of body functions', color: 'bg-pink-100 text-pink-800' },
    { id: 'physiotherapy', name: 'Physiotherapy', icon: '💪', description: 'Physical rehabilitation', color: 'bg-green-100 text-green-800' },
    { id: 'political-science', name: 'Political Science', icon: '🏛️', description: 'Study of government and politics', color: 'bg-blue-100 text-blue-800' },
    { id: 'psychology', name: 'Psychology', icon: '🧠', description: 'Study of mind and behavior', color: 'bg-purple-100 text-purple-800' },
    { id: 'public-administration', name: 'Public Administration', icon: '🏛️', description: 'Government policy implementation', color: 'bg-gray-100 text-gray-800' },
    { id: 'public-health', name: 'Public Health', icon: '🏥', description: 'Community health and disease prevention', color: 'bg-green-100 text-green-800' },
    { id: 'quantity-surveying', name: 'Quantity Surveying', icon: '📏', description: 'Construction cost management', color: 'bg-blue-100 text-blue-800' },
    { id: 'radiography', name: 'Radiography', icon: '📷', description: 'Medical imaging techniques', color: 'bg-white-100 text-white-800 border' },
    { id: 'religious-studies', name: 'Religious Studies', icon: '☯️', description: 'Study of world religions', color: 'bg-purple-100 text-purple-800' },
    { id: 'sociology', name: 'Sociology', icon: '👥', description: 'Study of society and social behavior', color: 'bg-cyan-100 text-cyan-800' },
    { id: 'soil-science', name: 'Soil Science', icon: '🌱', description: 'Study of soil properties', color: 'bg-brown-100 text-brown-800' },
    { id: 'special-education', name: 'Special Education', icon: '🧩', description: 'Education for special needs students', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'statistics', name: 'Statistics', icon: '📈', description: 'Data collection and analysis', color: 'bg-blue-100 text-blue-800' },
    { id: 'surveying-geoinformatics', name: 'Surveying and Geoinformatics', icon: '🗺️', description: 'Land measurement and mapping', color: 'bg-teal-100 text-teal-800' },
    { id: 'teacher-education-science', name: 'Teacher Education Science', icon: '👨‍🏫', description: 'Training for science teachers', color: 'bg-purple-100 text-purple-800' },
    { id: 'theatre-arts', name: 'Theatre Arts', icon: '🎭', description: 'Dramatic arts and performance', color: 'bg-pink-100 text-pink-800' },
    { id: 'urban-regional-planning', name: 'Urban and Regional Planning', icon: '🏙️', description: 'City and regional development', color: 'bg-gray-100 text-gray-800' },
    { id: 'veterinary-medicine', name: 'Veterinary Medicine', icon: '🐕', description: 'Animal healthcare', color: 'bg-green-100 text-green-800' },
    { id: 'visual-arts', name: 'Visual Arts', icon: '🎨', description: 'Creation of visual artworks', color: 'bg-pink-100 text-pink-800' },
    { id: 'yoruba', name: 'Yoruba', icon: '🇳🇬', description: 'Yoruba language and culture', color: 'bg-green-100 text-green-800' },
    { id: 'zoology', name: 'Zoology', icon: '🐘', description: 'Study of animals', color: 'bg-brown-100 text-brown-800' },
], []);
  // Function to search YouTube for videos
  const searchYouTubeVideos = async (query: string, categoryId: string = 'all') => {
    if (!YOUTUBE_API_KEY) {
      setError('YouTube API key not configured. Please add your API key.');
      return [];
    }

    try {
      setLoading(true);
      setIsSearchingYouTube(true);
      
      // Build search query - use subject-specific query if available, otherwise use the general search
      let searchQuery = query;
      if (!searchQuery && categoryId !== 'all') {
        searchQuery = (subjectSearchMap as Record<string, string>)[categoryId] || categoryId;;
      }
      
      // Add "course" or "lecture" to improve educational content results
      const educationalQuery = `${searchQuery} course OR lecture OR tutorial OR education`;
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(educationalQuery)}&type=video&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos from YouTube');
      }
      
      const data = await response.json();
      
      // Get video details (statistics, contentDetails) for each video
      if (data.items && data.items.length > 0) {
        const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
        
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch video details from YouTube');
        }
        
        const detailsData = await detailsResponse.json();
        
        // Map the YouTube API response to our Video interface
        const videos: Video[] = detailsData.items.map((item: any) => {
          // Find the corresponding category
          let category = 'all';
          if (categoryId !== 'all') {
            category = categoryId;
          } else {
            // Try to find a matching category based on the title/description
            const matchedCategory = courseCategories.find(cat => 
              item.snippet.title.toLowerCase().includes(cat.name.toLowerCase()) ||
              item.snippet.description.toLowerCase().includes(cat.name.toLowerCase())
            );
            if (matchedCategory) {
              category = matchedCategory.id;
            }
          }
          
          // Format view count
          const views = parseInt(item.statistics.viewCount);
          const viewsFormatted = views > 1000 ? `${(views / 1000).toFixed(0)}K views` : `${views} views`;
          
          // Format duration (PT1H30M20S -> 1:30:20)
          const duration = item.contentDetails.duration;
          const durationFormatted = formatDuration(duration);
          
          return {
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: new Date(item.snippet.publishedAt).toISOString().split('T')[0],
            channelTitle: item.snippet.channelTitle,
            category: category,
            views: viewsFormatted,
            duration: durationFormatted,
            description: item.snippet.description
          };
        });
        
        return videos;
      }
      
      return [];
    } catch (err) {
      console.error('Error searching YouTube:', err);
      setError('Failed to search YouTube. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format YouTube duration (PT1H30M20S -> 1:30:20)
  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${parseInt(hours)}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    } else if (minutes) {
      return `${parseInt(minutes)}:${seconds.padStart(2, '0')}`;
    } else {
      return `0:${seconds.padStart(2, '0')}`;
    }
  };

  // Generate sample videos (fallback when not using YouTube search)
  const generateSampleVideos = useCallback(() => {
    const sampleVideos: Video[] = [];
    const courseTitles = [
      'Introduction to', 'Fundamentals of', 'Principles of', 'Applications of',
      'Theory of', 'Methods in', 'Contemporary', 'Advanced'
    ];

    const courseSuffixes = [
      'the Field', 'Major Concepts', 'Key Theories', 'Core Principles', 
      'Essential Methods', 'Modern Applications', 'Historical Development'
    ];

    const descriptions = [
      'Comprehensive course covering essential concepts and providing solid foundation.',
      'Learn from industry experts with real-world experience in this engaging course.',
      'Detailed exploration with practical examples and case studies.',
      'Designed for students at all levels, adapts to your learning pace and style.',
      'Interactive lessons and exercises help reinforce learning and ensure mastery.',
      'Explore cutting-edge research and developments in this rapidly evolving field.',
      'Gain hands-on experience with practical applications and real-world scenarios.'
    ];

    courseCategories.forEach((category, categoryIndex) => {
      // Create 1 video per category with relevant content
      const titleIndex = categoryIndex % courseTitles.length;
      const suffixIndex = categoryIndex % courseSuffixes.length;
      const descIndex = categoryIndex % descriptions.length;
      
    // Use a different video ID for each subject from the mapping
const videoId = subjectVideoMap[category.id as keyof typeof subjectVideoMap] || '8mAITcNt710';
      const title = `${courseTitles[titleIndex]} ${category.name}`;
      
      // Generate recent date (within last 6 months)
      const daysAgo = Math.floor(Math.random() * 180);
      const publishedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      
      sampleVideos.push({
        id: videoId,
        title: title,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        publishedAt: publishedDate.toISOString().split('T')[0],
        channelTitle: `${category.name} Department`,
        category: category.id,
        views: `${Math.floor(Math.random() * 50) + 10}K views`,
        duration: `${Math.floor(Math.random() * 1) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        description: descriptions[descIndex]
      });
    });

    return sampleVideos;
  }, [courseCategories, subjectVideoMap]);

  // Function to handle search
  const handleSearch = async () => {
    if (searchQuery.trim() === '' && selectedCategory === 'all') {
      // If no search query and all categories selected, show sample videos
      setIsSearchingYouTube(false);
      const sampleVideos = generateSampleVideos();
      setVideos(sampleVideos);
      return;
    }
    
    // Search YouTube for videos
    const youtubeVideos = await searchYouTubeVideos(searchQuery, selectedCategory);
    setVideos(youtubeVideos);
  };

  // Initial load with sample videos
  useEffect(() => {
    const sampleVideos = generateSampleVideos();
    setVideos(sampleVideos);
  }, [generateSampleVideos]);

  // Function to handle category selection
  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    
    if (categoryId === 'all') {
      const sampleVideos = generateSampleVideos();
      setVideos(sampleVideos);
      return;
    }
    
    // Search YouTube for videos in this category
    const youtubeVideos = await searchYouTubeVideos('', categoryId);
    setVideos(youtubeVideos);
  };

  // Function to handle video selection
  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  // Function to close video detail view
  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  // Filter videos by selected category
  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 12 dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white shadow-sm dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 dark:bg-transparent">
  <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
    University Course Catalog
  </h1>
  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
    <div className="relative w-full sm:w-auto">
      <input
        type="text"
        placeholder="Search courses..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <div className="absolute left-3 top-2.5 text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <button
      onClick={handleSearch}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
    >
      Search
    </button>
  </div>
</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:text-white hover:bg-gray-300'}`}
            >
              All Courses
            </button>
            {courseCategories.slice(0, 10).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-4 py-2 rounded-full flex items-center ${selectedCategory === category.id ? category.color : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              {courseCategories.length > 10 ? `+ ${courseCategories.length - 10} more categories` : ''}
            </button>
          </div>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {selectedCategory === 'all' ? 'All Courses' : courseCategories.find(c => c.id === selectedCategory)?.name}
                {isSearchingYouTube && searchQuery && ` - Results for "${searchQuery}"`}
              </h2>
              <span className="text-gray-500 dark:text-white">{filteredVideos.length} courses</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative">
                    <Image 
                      src={video.thumbnail} 
                      alt={video.title}
                      width={320}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{video.channelTitle}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{video.views}</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                <button 
                  onClick={handleCloseVideo}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-96 rounded"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">Channel</p>
                  <p className="font-medium">{selectedVideo.channelTitle}</p>
                </div>
                <div>
                  <p className="text-gray-600">Published</p>
                  <p className="font-medium">{selectedVideo.publishedAt}</p>
                </div>
                <div>
                  <p className="text-gray-600">Views</p>
                  <p className="font-medium">{selectedVideo.views}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1">Description</p>
                <p className="text-gray-800 whitespace-pre-line">{selectedVideo.description}</p>
              </div>
              
              <div className="flex justify-end">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityCoursesPage;