const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jay_portfolio';

app.use(cors());
app.use(express.json());

// In-memory / JSON fallback store for messages when MongoDB is offline
const fallbackDir = path.join(__dirname, 'data');
const fallbackFile = path.join(fallbackDir, 'messages.json');
if (!fs.existsSync(fallbackDir)) {
  fs.mkdirSync(fallbackDir, { recursive: true });
}
if (!fs.existsSync(fallbackFile)) {
  fs.writeFileSync(fallbackFile, JSON.stringify([]));
}

let isDbConnected = false;

// Mongoose Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

let Message;
try {
  Message = mongoose.model('Message', messageSchema);
} catch (e) {
  Message = mongoose.model('Message');
}

// Connect to MongoDB with fallback
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    isDbConnected = true;
    console.log('✅ Connected to MongoDB at', MONGO_URI);
  })
  .catch((err) => {
    isDbConnected = false;
    console.log('⚠️ MongoDB not connected, using persistent local fallback storage:', err.message);
  });

// Profile Data for Jay H. Kalathiya
const profileData = {
  name: "Jay H. Kalathiya",
  title: "Flutter Developer | Mobile Application Developer",
  location: "Surat, Gujarat, India",
  phone: "+91 9054181276",
  email: "jayhkalathiya2006@gmail.com",
  company: "NO FOUND AI Tech Solution & Visyom AI",
  experience: "1+ Years",
  status: "Founder @ NO FOUND AI Tech Solution | Available for AI & Flutter Roles",
  summary: "Founder of NO FOUND AI Tech Solution and professional Flutter Developer at Visyom AI, building intelligent AI-powered software solutions and production-grade mobile applications. Skilled in Flutter, Dart, Python, FastAPI, AI Agents & Chatbots, AI Automation, Web Technologies, and modern UI/UX implementation.",
  experiences: [
    {
      id: 1,
      role: "Founder & AI Technology Developer",
      company: "NO FOUND AI Tech Solution",
      companyUrl: "https://www.linkedin.com/company/no-found007",
      location: "Surat, Gujarat, India",
      period: "Present",
      type: "Founder / Entrepreneurship Experience",
      overview: "AI-based IT & software development company operating on a hybrid model (client services + own AI products).",
      description: [
        "Planning and developing AI-powered software solutions.",
        "Managing end-to-end software development projects.",
        "Building mobile and web applications.",
        "Exploring and integrating AI technologies.",
        "Developing business automation solutions.",
        "Planning and building proprietary AI-based SaaS products.",
        "Managing product development and technical strategy."
      ],
      tech: ["AI Solutions", "AI Agents", "Automation", "Flutter", "Web Apps", "CRM/ERP", "SaaS", "UI/UX"]
    },
    {
      id: 2,
      role: "Flutter Developer",
      company: "Visyom AI",
      companyUrl: "https://in.linkedin.com/company/visyom-ai",
      location: "Surat, Gujarat, India",
      period: "1 Year",
      type: "Professional Experience",
      description: [
        "Developing cross-platform mobile applications using Flutter and Dart.",
        "Implementing modern and responsive UI/UX designs.",
        "Converting Figma designs into functional Flutter interfaces.",
        "Integrating Firebase and third-party services.",
        "Testing applications and fixing bugs.",
        "Improving application performance and user experience.",
        "Using AI-powered development tools for efficient development.",
        "Working on real-world mobile and web application projects."
      ],
      tech: ["Flutter", "Dart", "Firebase", "UI/UX", "API Integration", "AI Tools"]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Master of Computer Applications (MCA)",
      institution: "Parul University",
      period: "2026 – 2028",
      status: "Currently Pursuing",
      isCurrent: true,
      description: "Advanced studies in computer applications, system architecture, advanced algorithms, and enterprise software engineering.",
      badge: "Currently Pursuing"
    },
    {
      id: 2,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Previous Qualification",
      period: "Completed",
      status: "Completed",
      isCurrent: false,
      description: "Solid foundational computer science and software development principles, including object-oriented programming, data structures, web technologies, and mobile applications.",
      badge: "Completed"
    }
  ],
  stats: [
    { value: "1+", label: "Year Experience at Visyom AI" },
    { value: "4+", label: "Real-World Mobile & Web Projects" },
    { value: "100%", label: "Responsive UI & Figma-to-Flutter" },
    { value: "Flutter", label: "Cross-Platform Mobile Application Specialist" }
  ],
  skillLayers: [
    {
      id: "programming",
      title: "Programming",
      tags: ["Dart", "Python", "HTML", "CSS"]
    },
    {
      id: "framework",
      title: "Framework",
      tags: ["Flutter"]
    },
    {
      id: "backend",
      title: "Backend & Database",
      tags: ["Python", "FastAPI"]
    },
    {
      id: "development",
      title: "Development",
      tags: ["Mobile Application Development", "Frontend Development", "API Integration"]
    },
    {
      id: "design",
      title: "Design",
      tags: ["UI/UX Design", "Responsive UI", "Figma-to-Flutter Implementation"]
    },
    {
      id: "tools",
      title: "Tools",
      tags: ["AI Development Tools", "Google AdMob"]
    },
    {
      id: "other",
      title: "Other",
      tags: ["Application Testing", "Debugging", "Google Play Store Deployment"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Sudoku Puzzle Game",
      subtitle: "Flutter Mobile Game",
      category: "Mobile Application",
      tech: ["Flutter", "Dart", "Google AdMob"],
      description: "A Flutter-based Sudoku puzzle game designed to provide an engaging and user-friendly gaming experience.",
      features: [
        "Flutter-based mobile game development.",
        "Sudoku puzzle gameplay.",
        "Game UI/UX design.",
        "Google AdMob integration.",
        "Game testing and bug fixing.",
        "Google Play Store deployment."
      ],
      link: "https://play.google.com/store/apps/details?id=com.pencil.puzzle.game&hl=en_IN",
      isPrivate: false,
      highlight: "Live on Google Play Store with AdMob integration & engaging puzzles"
    },
    {
      id: 2,
      title: "BuilderCRM",
      subtitle: "Multi-Panel Real Estate CRM",
      category: "Real Estate CRM",
      tech: ["Frontend Development", "UI/UX", "Web Technologies", "AI Tools"],
      description: "A multi-panel Real Estate CRM platform designed to manage builders, brokers, employees, customers, properties, and business operations.",
      features: [
        "Super Admin Panel.",
        "Builder Panel.",
        "Broker Panel.",
        "Employee Panel.",
        "Role & Permission Management.",
        "Customer Pipeline & Lead Management.",
        "Property & Inventory Management.",
        "Follow-up Management.",
        "Site Visit Management.",
        "Payment Management.",
        "Dashboard & Reports."
      ],
      isPrivate: true,
      highlight: "Comprehensive multi-tier real estate operations platform"
    },
    {
      id: 3,
      title: "Food Delivery Application",
      subtitle: "Multi-Platform Delivery Ecosystem",
      category: "Food Delivery Platform",
      tech: ["Flutter", "Web Development", "UI/UX"],
      description: "A multi-platform food delivery application connecting customers, restaurants, delivery partners, and administrators.",
      features: [
        "Super Admin Web Panel.",
        "Restaurant Web Panel.",
        "Customer Flutter Application.",
        "Delivery Partner Flutter Application.",
        "Restaurant Management.",
        "Order & Delivery Management.",
        "Live Order Tracking.",
        "Multi-panel Pipeline Integration."
      ],
      isPrivate: true,
      highlight: "Customer & delivery apps with web panels & live tracking"
    },
    {
      id: 4,
      title: "Umbrella App",
      subtitle: "Social Media Mobile Application",
      category: "Social Media Mobile Application",
      tech: ["Flutter", "Dart", "Figma", "UI/UX"],
      description: "A social media mobile application inspired by modern social networking platforms with interactive communication and content-sharing features.",
      features: [
        "Flutter Mobile App Development.",
        "Instagram-like UI/UX Implementation.",
        "Stories, Reels & Posts.",
        "Live Chat & Messaging.",
        "Voice & Video Calling.",
        "Profile Management.",
        "Dark Mode.",
        "Interactive UI.",
        "Figma-to-Flutter Design Implementation."
      ],
      isPrivate: true,
      highlight: "Instagram-style UI/UX with stories, reels & live messaging"
    }
  ]
};

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(profileData.projects.filter(p => p.category.toLowerCase() === category.toLowerCase()));
  }
  res.json(profileData.projects);
});

app.get('/api/skills', (req, res) => {
  res.json(profileData.skillLayers);
});

// Contact endpoint - Saves to MongoDB and JSON fallback
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are all required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address provided.' });
    }

    const newMsg = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date()
    };

    if (isDbConnected) {
      const doc = new Message(newMsg);
      await doc.save();
    } else {
      // Save to local fallback file
      try {
        const fileContent = fs.readFileSync(fallbackFile, 'utf8');
        const list = JSON.parse(fileContent || '[]');
        list.push({ ...newMsg, id: Date.now() });
        fs.writeFileSync(fallbackFile, JSON.stringify(list, null, 2));
      } catch (err) {
        console.error('Fallback save error:', err);
      }
    }

    console.log(`📩 New message received from ${name} (${email})`);
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Jay H. Kalathiya has received your message and will get back to you shortly.'
    });
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ error: 'Server error while saving message. Please try again.' });
  }
});

// View all messages (Admin API)
app.get('/api/messages', async (req, res) => {
  try {
    if (isDbConnected) {
      const msgs = await Message.find().sort({ createdAt: -1 });
      return res.json(msgs);
    }
    const fileContent = fs.readFileSync(fallbackFile, 'utf8');
    const list = JSON.parse(fileContent || '[]');
    res.json(list.reverse());
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve messages.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
});
