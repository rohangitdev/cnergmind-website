/* ==================== CONSTANTS.JS - CONFIGURATION ==================== */

/**
 * CNERG Mind Website Configuration
 * Update these values to customize the website
 */

// ==================== CONTACT INFORMATION ====================
const CONTACT_INFO = {
    email: 'sales@cnergmind.com',
    phone1: '+91 99266 87806', // Aditya/Sales
    phone2: '+91 99871 62152', // Sahil
    primaryPhone: '+91 99266 87806',
    address: '31, Om Chambers, TPS Road, Veer Savarkar Garden, Borivali (W)',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400092',
    country: 'India',
    gst: '27AAQCC0111D1Z8',
    cin: 'U24319MH2026PTC473274'
};

// ==================== SOCIAL MEDIA LINKS ====================
const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/cnergmind',
    linkedin: 'https://linkedin.com/company/cnergmind',
    instagram: 'https://instagram.com/cnergmind',
    twitter: 'https://twitter.com/cnergmind',
    youtube: 'https://youtube.com/cnergmind'
};

// ==================== COMPANY INFORMATION ====================
const COMPANY_INFO = {
    name: 'CNERGMIND STEEL STRUCTURE PVT. LTD.',
    tagline: 'Enduring Strength, Creating Landmarks',
    founded: '2000',
    yearsInBusiness: 26,
    description: 'Leading manufacturer of Pre-Engineered Buildings (PEB) and Steel Structures in India with manufacturing facilities across multiple regions',
    vision: 'To be India\'s leading and most trusted provider of Pre-Engineered Building (PEB) and steel structure solutions',
    mission: 'Deliver quality PEB and steel structure solutions on time with innovative engineering and customer-centric approach',
    coreValues: 'Integrity, Innovation, Quality, Reliability, Customer Focus'
};

// ==================== SERVICES ====================
const SERVICES = [
    {
        id: 'peb',
        title: 'Pre-Engineered Buildings (PEB)',
        icon: '🏗️',
        shortDesc: 'Advanced PEB solutions for rapid construction',
        features: ['Customizable designs', 'Quick installation', 'Cost-effective']
    },
    {
        id: 'steel',
        title: 'Steel Structures',
        icon: '⚙️',
        shortDesc: 'Engineered steel for industrial applications',
        features: ['High load capacity', 'Durable & reliable', 'Custom designs']
    },
    {
        id: 'roofing',
        title: 'Roofing & Cladding',
        icon: '🛡️',
        shortDesc: 'Premium weatherproofing solutions',
        features: ['Weather protection', 'Thermal insulation', 'Aesthetic options']
    }
];

// ==================== EXPERTISE AREAS ====================
const EXPERTISE_AREAS = [
    { icon: '🏭', name: 'Pre-Engineered Industrial Buildings' },
    { icon: '📦', name: 'Warehouses & Logistics Facilities' },
    { icon: '🏢', name: 'Factory & Manufacturing Buildings' },
    { icon: '🏗️', name: 'Commercial Buildings' },
    { icon: '🔧', name: 'Workshops & Service Centers' },
    { icon: '🌾', name: 'Agricultural & Storage Structures' },
    { icon: '🏪', name: 'Showrooms & Institutional Buildings' },
    { icon: '✈️', name: 'Aircraft Hangars' },
    { icon: '🏢', name: 'Multi-Storey Steel Structures' },
    { icon: '⚙️', name: 'Customized Structural Steel Solutions' },
    { icon: '🚚', name: 'Logistics Infrastructure' },
    { icon: '🎯', name: 'Industrial Projects' }
];

// ==================== TESTIMONIALS ====================
const TESTIMONIALS = [
    {
        id: 1,
        text: 'CNERGMIND delivered our warehouse project on time and within budget. Their professionalism and quality are unmatched. Highly recommended!',
        author: 'Rajesh Kumar',
        company: 'Warehouse Logistics',
        rating: 5
    },
    {
        id: 2,
        text: 'Working with CNERGMIND was a smooth experience. Their team provided excellent technical support throughout the project.',
        author: 'Priya Sharma',
        company: 'Manufacturing Solutions',
        rating: 5
    },
    {
        id: 3,
        text: 'The PEB solution from CNERGMIND saved us significant time and cost. Their engineering expertise is exceptional.',
        author: 'Arun Patel',
        company: 'Industrial Developer',
        rating: 5
    },
    {
        id: 4,
        text: 'Quality structures with great after-sales service. CNERGMIND understands the importance of durability and reliability.',
        author: 'Suresh Singh',
        company: 'Construction Firm',
        rating: 4
    }
];

// ==================== TEAM MEMBERS ====================
const TEAM_MEMBERS = [
    {
        id: 1,
        name: 'Amit Sharma',
        title: 'Director & Founder',
        avatar: '👨‍💼',
        bio: '25+ years in steel structures and PEB manufacturing. Visionary leader guiding company growth and innovation.'
    },
    {
        id: 2,
        name: 'Vikram Verma',
        title: 'Chief Technical Officer',
        avatar: '👨‍🔧',
        bio: 'Expert in structural engineering and design. Oversees all technical aspects and quality standards.'
    },
    {
        id: 3,
        name: 'Ravi Patel',
        title: 'Operations Manager',
        avatar: '👨‍💻',
        bio: '20+ years in manufacturing management. Ensures efficient production and timely delivery of projects.'
    }
];

// ==================== BENEFITS/WHY CHOOSE US ====================
const BENEFITS = [
    {
        number: 1,
        title: '25+ Years Experience',
        description: 'Decades of proven expertise in steel structures and PEB manufacturing'
    },
    {
        number: 2,
        title: 'Quality Assurance',
        description: 'ISO certified processes ensuring highest standards in every project'
    },
    {
        number: 3,
        title: 'Timely Delivery',
        description: 'Efficient manufacturing and logistics for on-time project completion'
    },
    {
        number: 4,
        title: 'Custom Solutions',
        description: 'Tailored designs meeting specific project requirements and budgets'
    },
    {
        number: 5,
        title: 'Expert Team',
        description: 'Experienced engineers and project managers dedicated to your success'
    },
    {
        number: 6,
        title: 'After-Sales Support',
        description: 'Comprehensive support and maintenance throughout project lifecycle'
    }
];

// ==================== FACILITY STATISTICS ====================
const FACILITY_STATS = {
    area: '50,000+ Sq. Ft.',
    capacity: '500 Tons/Month',
    workforce: '50+ Skilled Workers',
    certification: 'ISO 9001:2015 Certified'
};

// ==================== PLANT LOCATIONS ====================
const LOCATIONS = [
    {
        id: 1,
        name: 'Indore',
        type: 'Dedicated Manufacturing Plant',
        state: 'Madhya Pradesh',
        region: 'Central India',
        description: 'Primary manufacturing facility with complete production and design center',
        featured: true,
        isHeadquarters: false
    },
    {
        id: 2,
        name: 'Vadodara',
        type: 'Extended Manufacturing Facility',
        state: 'Gujarat',
        region: 'Western India',
        description: 'Extended manufacturing capacity for regional coverage',
        featured: true,
        isHeadquarters: false
    },
    {
        id: 3,
        name: 'Taloja',
        type: 'Extended Manufacturing Facility',
        state: 'Maharashtra',
        region: 'Western India',
        description: 'Manufacturing and logistics hub for western region',
        featured: true,
        isHeadquarters: false
    },
    {
        id: 4,
        name: 'Pune',
        type: 'Extended Manufacturing Facility',
        state: 'Maharashtra',
        region: 'Western India',
        description: 'Production facility serving southern markets',
        featured: true,
        isHeadquarters: false
    },
    {
        id: 5,
        name: 'Hyderabad',
        type: 'Extended Manufacturing Facility',
        state: 'Telangana',
        region: 'Southern India',
        description: 'Southern region manufacturing and support center',
        featured: true,
        isHeadquarters: false
    },
    {
        id: 6,
        name: 'Corporate Office - Mumbai',
        type: 'Head Office',
        state: 'Maharashtra',
        region: 'Western India',
        description: 'Corporate headquarters at 31, Om Chambers, Borivali (W), Mumbai - 400092',
        featured: true,
        isHeadquarters: true
    }
];

// ==================== HERO CAROUSEL SLIDES ====================
const HERO_SLIDES = [
    {
        id: 1,
        title: 'Steel at the Core',
        subtitle: 'Strength in the Details',
        gradient: 'linear-gradient(135deg, #1A3A6B 0%, #2E5A9E 100%)'
    },
    {
        id: 2,
        title: 'Pre-Engineered Excellence',
        subtitle: 'Building Tomorrow\'s Structures Today',
        gradient: 'linear-gradient(135deg, #FF8C00 0%, #E07B00 100%)'
    },
    {
        id: 3,
        title: 'Quality That Lasts',
        subtitle: 'Engineered for Performance',
        gradient: 'linear-gradient(135deg, #1A3A6B 0%, #FF8C00 100%)'
    }
];

// ==================== GALLERY PROJECTS ====================
const GALLERY_PROJECTS = [
    { id: 1, title: 'Gharda Chemicals Ltd', category: 'Chemical Manufacturing', caption: 'Industrial PEB Structure - Project Value: ₹1.9 Cr' },
    { id: 2, title: 'Warehouse Complex', category: 'Logistics', caption: 'Large-scale warehouse facility' },
    { id: 3, title: 'Manufacturing Unit', category: 'Industrial', caption: 'Heavy-duty manufacturing facility' },
    { id: 4, title: 'Commercial Complex', category: 'Commercial', caption: 'Multi-purpose commercial building' },
    { id: 5, title: 'Logistics Hub', category: 'Logistics', caption: 'High-capacity logistics center' },
    { id: 6, title: 'Storage Building', category: 'Agricultural', caption: 'Agricultural storage facility' }
];

// ==================== PEB COMPONENTS ====================
const PEB_COMPONENTS = [
    { title: 'Primary Frame', description: 'Main structural system consisting of columns and beams designed for maximum strength and minimal weight.' },
    { title: 'Secondary Members', description: 'Purlins and girts providing additional support and load distribution across the structure.' },
    { title: 'Roof System', description: 'Professional roofing with insulation and weatherproofing for year-round protection.' },
    { title: 'Wall Cladding', description: 'Aesthetic and functional wall panels providing thermal insulation and visual appeal.' },
    { title: 'Doors & Windows', description: 'Commercial-grade openings with proper sealing and structural integration.' },
    { title: 'Fasteners & Hardware', description: 'Premium quality bolts, rivets, and connectors ensuring structural integrity.' }
];

// ==================== PRODUCTS/SERVICES CATEGORIES ====================
const PRODUCTS = [
    { title: 'Single Span Buildings', description: 'Ideal for warehouses and manufacturing units. Single clear span designs without interior columns for maximum usable space.' },
    { title: 'Multi-Span Structures', description: 'Complex layouts for large facilities. Multiple spans with optimal load distribution for industrial applications.' },
    { title: 'High-Rise Frameworks', description: 'Advanced designs for tall structures. Engineered for wind load resistance and vertical applications.' },
    { title: 'Customized Components', description: 'Specialized steel components manufactured to exact specifications. From beams to connections, we deliver precision.' },
    { title: 'Installation Services', description: 'Professional installation teams ensuring proper assembly and quality control on-site at your location.' }
];

// ==================== DESIGN SYSTEM COLORS ====================
const COLORS = {
    primary: {
        navy: '#1A3A6B',
        orange: '#FF8C00',
        white: '#FFFFFF'
    },
    secondary: {
        lightGray: '#F5F5F5',
        darkGray: '#333333',
        mediumGray: '#666666',
        border: '#E0E0E0'
    },
    semantic: {
        success: '#27AE60',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB'
    }
};

// ==================== EXPORT FOR USE IN OTHER SCRIPTS ====================
// These can be accessed as: COMPANY_INFO.name, SERVICES[0].title, etc.
