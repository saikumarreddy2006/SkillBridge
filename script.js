
// --------------------
// MOCK DATA
// --------------------
const INTERNSHIPS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechFlow Solutions",
    skills: ["React", "JavaScript", "Tailwind", "CSS"],
    description: "Build modern web interfaces for our SaaS platform.",
    minExperience: "Beginner",
    type: "Remote"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Insight Corp",
    skills: ["Python", "SQL", "Excel", "Data Visualization"],
    description: "Analyze marketing data and generate reports.",
    minExperience: "Intermediate",
    type: "Hybrid"
  },
  {
    id: 3,
    title: "AI/ML Research Intern",
    company: "Future AI",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning"],
    description: "Assist in training NLP models.",
    minExperience: "Intermediate",
    type: "Remote"
  },
  {
    id: 4,
    title: "Digital Marketing Intern",
    company: "Growth Hacking Ltd",
    skills: ["SEO", "Content Writing", "Google Analytics", "Social Media"],
    description: "Managing social media campaigns.",
    minExperience: "Beginner",
    type: "On-site"
  },
  {
    id: 5,
    title: "Backend Engineer Intern",
    company: "ServerBase",
    skills: ["Node.js", "Express", "MongoDB", "API Design"],
    description: "Building scalable APIs.",
    minExperience: "Intermediate",
    type: "Remote"
  }
];

const MENTOR_QA = {
  "resume": "Your resume should highlight projects over college name. Use bullet points for impact. Would you like me to scan your current resume?",
  "interview": "Common questions: 1. Tell me about a challenge you faced. 2. Explain a project you built. Structure your answers using the STAR method.",
  "skills": "Focus on T-shaped skills. Deep expertise in one area (e.g., React) and broad knowledge in others (e.g., UI/UX, Backend).",
  "default": "I can help you with resume tips, interview prep, or skill roadmaps. Try asking 'How do I improve my resume?'"
};

// --------------------
// AI SERVICES
// --------------------

// 1. Resume Parser
// 1. Resume Parser
const extractSkillsFromText = (text) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const allSkills = [
        "Python", "JavaScript", "React", "Node.js", "SQL", "Excel",
        "Data Analysis", "Machine Learning", "TensorFlow", "PyTorch",
        "CSS", "HTML", "Tailwind", "Git", "Java", "C++", "SEO", "Content Writing"
      ];

      // Normalize text: extract words and split by common separators
      const words = text.toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ") // Remove punctuation
        .split(/\s+/) // Split by whitespace
        .map(w => w.trim());

      // Check if any known skill exists in the normalized word list OR directly in the raw text
      const foundSkills = allSkills.filter(skill => {
        const lowerSkill = skill.toLowerCase();
        // Check for multi-word skills (e.g. "Data Analysis") in raw text
        if (text.toLowerCase().includes(lowerSkill)) return true;
        // Check for single word skills in the word list
        return words.includes(lowerSkill);
      });

      // Remove duplicates
      const uniqueSkills = [...new Set(foundSkills)];

      const experienceLevel = uniqueSkills.length > 4 ? "Intermediate" : "Beginner";

      resolve({
        skills: uniqueSkills,
        experienceLevel,
        rawText: text.substring(0, 50) + "..."
      });
    }, 1500);
  });
};

// 2. Matching Engine
const matchInternships = (userSkills) => {
  // Normalize user skills once
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase().trim());

  return INTERNSHIPS.map(internship => {
    const required = internship.skills;

    const matched = required.filter(req =>
      normalizedUserSkills.includes(req.toLowerCase().trim())
    );

    const score = Math.round((matched.length / required.length) * 100);
    const missing = required.filter(req =>
      !normalizedUserSkills.includes(req.toLowerCase().trim())
    );

    return {
      ...internship,
      matchScore: score,
      matchedSkills: matched,
      missingSkills: missing
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

// 3. Chatbot Logic
const getChatResponse = (query) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerQ = query.toLowerCase();
      if (lowerQ.includes("resume")) resolve(MENTOR_QA["resume"]);
      else if (lowerQ.includes("interview")) resolve(MENTOR_QA["interview"]);
      else if (lowerQ.includes("skill") || lowerQ.includes("learn")) resolve(MENTOR_QA["skills"]);
      else resolve(MENTOR_QA["default"]);
    }, 1000);
  });
};
