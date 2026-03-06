import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ThumbsUp, Edit2, Terminal, Code, Cpu, Globe,
  Database, Sparkles, ArrowDown, ExternalLink,
  Github, Linkedin, Twitter, X, Moon, Sun, MapPin, Briefcase, FileText
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_SKILLS = [
  { id: 1, name: 'React', icon: Globe, level: 95, color: 'from-cyan-400 to-blue-500', likes: 142 },
  { id: 2, name: 'SQL', icon: Database, level: 85, color: 'from-emerald-400 to-teal-500', likes: 76 },
  { id: 3, name: 'REST API', icon: Terminal, level: 88, color: 'from-green-400 to-emerald-600', likes: 98 },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Open-to-Work Platform',
    category: 'Backend Development',
    description: 'Developed backend services and REST APIs supporting application functionality. Implemented database operations and optimized query performance.',
    tech: ['React', 'SQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Billing Software System',
    category: 'Application Logic',
    description: 'Built backend-driven billing system using structured algorithms. Implemented database integration and validated data processing logic.',
    tech: ['React', 'SQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Corporate Web Application',
    category: 'System Architecture',
    description: 'Developed modular backend components using object-oriented design. Ensured reliable communication between application modules.',
    tech: ['React', 'SQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
  }
];

const TIMELINE = [
  { year: 'Feb 2025 - Nov 2025', role: 'Full Stack Python Trainee', company: 'Besant Technologies, Chennai', description: 'Developed backend modules and APIs supporting scalable application workflows. Implemented structured backend logic using Python following OOP. optimized application performance.' },
  { year: 'Jul 2025 - Aug 2025', role: 'Web Development Intern', company: 'Snestron Systems Pvt Ltd', description: 'Built application components and improved system functionality. Investigated bugs and improved system reliability through debugging.' },
  { year: '2024', role: 'Web Development Intern', company: 'Skillcraft Technologies (Remote)', description: 'Developed application modules and validated system workflows. Ensured application stability and reliable feature performance.' },
];

// --- UTILITY COMPONENTS ---

// Magnetic Button Effect
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation
const RevealText = ({ text, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {text}
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENTS ---

const LoadingScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="overflow-hidden">
        <motion.h1
          className="text-white text-5xl md:text-8xl font-black tracking-tighter"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          SANJEEV<span className="text-purple-500">.</span>
        </motion.h1>
      </div>
      <motion.div
        className="absolute bottom-10 left-10 text-white/50 text-sm font-mono"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
      >
        Loading System...
      </motion.div>
    </motion.div>
  );
};

const CustomCursor = ({ isHovering }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/50 pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isHovering, setIsHovering] = useState(false);

  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Fetch Data on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch(`${API_BASE_URL}/api/profile`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        const skillsRes = await fetch(`${API_BASE_URL}/api/skills`);
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();

          // Re-map icon strings back to actual Lucide component references based on our map
          const iconMap = {
            'Globe': Globe, 'Terminal': Terminal, 'Database': Database, 'Code': Code, 'Cpu': Cpu
          };

          const mappedSkills = skillsData.map(s => ({
            ...s,
            icon: iconMap[s.iconName] || Globe
          }));

          setSkills(mappedSkills);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Interactive Hover Setters for global links
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const handleEndorse = async (id) => {
    // Optimistic UI update
    setSkills(skills.map(skill => skill.id === id ? { ...skill, likes: skill.likes + 1 } : skill));

    try {
      await fetch(`${API_BASE_URL}/api/skills/${id}/endorse`, { method: 'POST' });
    } catch (error) {
      console.error("Error endorsing skill:", error);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setProfile(updatedProfile);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateAIBio = () => {
    setIsGeneratingBio(true);
    setTimeout(() => {
      const aiBios = [
        "A visionary technologist crafting next-generation digital ecosystems. Specializing in high-performance web architecture and intelligent AI integrations.",
        "Bridging the gap between human-centric design and machine learning. I engineer scalable solutions that redefine user engagement and digital utility.",
        "Creative engineer obsessed with pixel-perfect interfaces and robust backend systems. Turning complex problems into elegant, intuitive digital realities."
      ];
      setProfile({ ...profile, bio: aiBios[Math.floor(Math.random() * aiBios.length)] });
      setIsGeneratingBio(false);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'} font-sans selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-500`}>
      <AnimatePresence>
        {loading && <LoadingScreen setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor isHovering={isHovering} />

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform origin-left z-50"
            style={{ scaleX }}
          />

          {/* Navigation */}
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
            <div className={`px-6 py-3 rounded-full border backdrop-blur-md flex items-center gap-6 shadow-2xl transition-all duration-300
              ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              {['Home', 'Profile', 'Skills', 'Projects'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-purple-500 transition-colors">
                  {item}
                </a>
              ))}
              <div className={`w-px h-4 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
              <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </nav>

          {/* Hero Section */}
          <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[150px]"
              />
            </div>

            <div className="z-10 text-center px-4 max-w-5xl">
              <RevealText
                text={profile.name.toUpperCase()}
                className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-700"
              />
              <RevealText
                text={profile.role}
                delay={0.2}
                className={`text-xl md:text-3xl font-light mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Magnetic>
                  <a href="#projects" className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full overflow-hidden group
                    ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <span className="relative z-10 flex items-center gap-2">
                      View Work <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs tracking-widest uppercase opacity-50">Scroll</span>
              <div className={`w-px h-12 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
            </motion.div>
          </section>

          {/* Profile Section */}
          <section id="profile" className="py-32 px-6 relative">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl p-8 md:p-12 overflow-hidden border backdrop-blur-xl shadow-2xl
                  ${theme === 'dark' ? 'bg-white/5 border-white/10 shadow-black/50' : 'bg-black/5 border-black/10 shadow-xl'}`}
              >
                {/* Decorative Top Right Button */}
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-colors
                    ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
                >
                  <Edit2 size={18} />
                </button>

                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="relative w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-2 border-white/10"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">{profile.name}</h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 opacity-70 text-sm">
                      <span className="flex items-center gap-1"><Briefcase size={16} /> {profile.role}</span>
                      <span className="flex items-center gap-1"><MapPin size={16} /> {profile.location}</span>
                    </div>
                    <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-purple-500 transition-colors"><Github size={20} /></a></Magnetic>
                      <Magnetic><a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-blue-500 transition-colors"><Linkedin size={20} /></a></Magnetic>
                      <Magnetic>
                        <a
                          href="/resume.pdf"
                          target="_blank"
                          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all hover:scale-105 border border-white/20
                          ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
                        >
                          <FileText size={18} /> Resume
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Edit Profile Modal */}
          <AnimatePresence>
            {isEditModalOpen && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                  className={`w-full max-w-lg p-6 rounded-2xl border ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10 shadow-2xl'}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Edit Profile</h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="p-1 hover:bg-white/10 rounded-full"><X size={20} /></button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm opacity-60 mb-1">Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className={`w-full p-3 rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-black border-white/20 focus:border-purple-500' : 'bg-gray-50 border-black/20 focus:border-purple-500'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm opacity-60 mb-1">Role</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className={`w-full p-3 rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-black border-white/20 focus:border-purple-500' : 'bg-gray-50 border-black/20 focus:border-purple-500'}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm opacity-60 mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={profile.github}
                          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                          className={`w-full p-3 rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-black border-white/20 focus:border-purple-500' : 'bg-gray-50 border-black/20 focus:border-purple-500'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm opacity-60 mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                          className={`w-full p-3 rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-black border-white/20 focus:border-purple-500' : 'bg-gray-50 border-black/20 focus:border-purple-500'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm opacity-60">Bio</label>
                        <button
                          onClick={generateAIBio}
                          disabled={isGeneratingBio}
                          className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {isGeneratingBio ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={12} /></motion.div> : <Sparkles size={12} />}
                          AI Magic
                        </button>
                      </div>
                      <textarea
                        rows="4"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className={`w-full p-3 rounded-lg border outline-none transition-colors ${theme === 'dark' ? 'bg-black border-white/20 focus:border-purple-500' : 'bg-gray-50 border-black/20 focus:border-purple-500'}`}
                      />
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Section */}
          <section id="skills" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <RevealText text="Technical Arsenal" className="text-4xl md:text-6xl font-bold mb-4" />
                <p className="opacity-60 text-lg">Technologies I wield to build digital experiences.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`group relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2
                      ${theme === 'dark' ? 'bg-white/[0.02] border-white/10 hover:border-white/30' : 'bg-white border-black/10 hover:shadow-xl'}`}
                  >
                    {/* Hover Glow Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white`}>
                        <skill.icon size={24} />
                      </div>
                      <button
                        onClick={() => handleEndorse(skill.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all active:scale-95
                          ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'}`}
                      >
                        <ThumbsUp size={14} className="group-hover:text-purple-500 transition-colors" />
                        {skill.likes}
                      </button>
                    </div>

                    <h3 className="text-xl font-bold mb-4">{skill.name}</h3>

                    <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className={`py-32 px-6 ${theme === 'dark' ? 'bg-black/40' : 'bg-gray-100'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <RevealText text="Selected Works" className="text-4xl md:text-6xl font-bold mb-4" />
                  <p className="opacity-60 text-lg">A showcase of recent digital products and experiments.</p>
                </div>
                <Magnetic>
                  <button className={`px-6 py-3 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/20 hover:bg-white text-white hover:text-black' : 'border-black/20 hover:bg-black text-black hover:text-white'}`}>
                    View All Archives
                  </button>
                </Magnetic>
              </div>

              <div className="flex flex-col gap-12 md:gap-24">
                {PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group flex flex-col md:flex-row gap-8 items-center"
                  >
                    <div className={`w-full md:w-3/5 overflow-hidden rounded-3xl ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col gap-6">
                      <div className="text-sm font-mono text-purple-500">{project.category}</div>
                      <h3 className="text-3xl md:text-5xl font-bold">{project.title}</h3>
                      <p className="text-lg opacity-70 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(tech => (
                          <span key={tech} className={`px-4 py-2 rounded-full text-sm ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Magnetic>
                          <a href="#" className="inline-flex items-center gap-2 group/link pb-1 border-b border-transparent hover:border-current transition-colors">
                            Explore Case Study <ExternalLink size={16} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section id="timeline" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
              <RevealText text="Experience" className="text-4xl md:text-6xl font-bold mb-16 text-center" />

              <div className="relative">
                {/* Vertical Line */}
                <div className={`absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16
                      ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 -translate-x-1/2 outline outline-4 outline-[#050505] dark:outline-[#050505] z-10"></div>

                    <div className="w-full md:w-[45%] pl-12 md:pl-0 text-left md:text-right flex flex-col gap-2">
                      <div className={`text-sm font-mono ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{item.year}</div>
                      <h4 className="text-2xl font-bold">{item.role}</h4>
                      <h5 className="text-lg opacity-70">{item.company}</h5>
                    </div>

                    <div className={`w-full md:w-[45%] pl-12 md:pl-0 text-left ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'}`}>
                      <p className="opacity-60 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer / Contact */}
          <footer className={`relative overflow-hidden pt-32 pb-12 px-6 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-100'}`}>
            <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">
                LET'S TALK
              </h2>
              <p className="text-xl opacity-70 max-w-xl mx-auto mb-12">
                Open for new opportunities, freelance projects, or just a chat about the future of the web.
              </p>

              <Magnetic>
                <a href="mailto:sanjeev04084@gmail.com" className={`px-10 py-5 rounded-full text-xl font-bold transition-transform hover:scale-105
                  ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  sanjeev04084@gmail.com
                </a>
              </Magnetic>

              <div className={`w-full h-px mt-32 mb-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-sm">
                <div>© 2026 Sanjeev. All rights reserved.</div>
                <div className="flex gap-6">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-purple-500 transition-colors">LinkedIn</a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-purple-500 transition-colors">GitHub</a>
                  <a href="/resume.pdf" target="_blank" className="hover:text-purple-500 transition-colors">Resume</a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
