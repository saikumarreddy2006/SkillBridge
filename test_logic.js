
const INTERNSHIPS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    skills: ["React", "JavaScript", "Tailwind", "CSS"],
  }
];

const matchInternships = (userSkills) => {
  return INTERNSHIPS.map(internship => {
    const required = internship.skills;
    const matched = required.filter(req =>
      userSkills.some(us => us.toLowerCase() === req.toLowerCase())
    );

    const score = Math.round((matched.length / required.length) * 100);
    return { score, matched };
  });
};

const userSkills = ["React", "JavaScript"];
const matches = matchInternships(userSkills);
console.log(matches);
