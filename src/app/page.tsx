"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import personalData from "../data/personal.json";
import projectsData from "../data/projects.json";
import skillsData from "../data/skills.json";
import servicesData from "../data/services.json";
import Image from "next/image";

function HoverPreview({ project }: { project: any }) {
  const slides: string[] = Array.isArray(project?.slides) ? project.slides : [];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    setSlideIndex(0);
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % (slides.length || 1));
    }, 1200);
    return () => clearInterval(id);
  }, [project, slides.length]);

  if (!project) return null as any;

  const currentSrc = slides.length > 0 ? slides[slideIndex] : project.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-[85vw] max-w-5xl h-[65vh] rounded-xl shadow-2xl border border-white/20 overflow-hidden"
        style={{ background: "rgba(10,10,20,0.9)" }}
      >
        <div className="absolute inset-0">
          <Image
            src={require(`../Assets/Projects/${currentSrc}`)}
            alt={`${project.title} preview`}
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onHoverChange,
}: {
  project: any;
  index: number;
  onHoverChange?: (p: any | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides: string[] = Array.isArray(project.slides) ? project.slides : [];

  useEffect(() => {
    if (!isHovered || slides.length === 0) {
      setSlideIndex(0);
      return;
    }

    const intervalId = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 1200);

    return () => clearInterval(intervalId);
  }, [isHovered, slides.length]);

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-effect rounded-lg overflow-hidden card-hover"
    >
      <div
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverChange && onHoverChange(project);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverChange && onHoverChange(null);
        }}
        className="h-48 relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
      >
        <div className="text-4xl font-bold gradient-text">
          <Image
            src={require(`../Assets/Projects/${project.image}`)}
            alt={project.title}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink size={16} />
            Live
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoverPreviewProject, setHoverPreviewProject] = useState<any | null>(
    null
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text"
            >
              {personalData.personal.name}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass-effect border-t border-white/20"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 px-4 rounded transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">
                {personalData.personal.name}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
              {personalData.personal.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {personalData.personal.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {personalData.personal.about}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-primary" />
                  <span>{personalData.personal.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-primary" />
                  <span>{personalData.personal.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-primary" />
                  <span>{personalData.personal.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-80 h-80 mx-auto overflow-hidden rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                  <div className="text-6xl font-bold gradient-text">
                    <Image src={require(`../Assets/${personalData.personal.image}`)} className="mt-28 scale-150 -ml-3" alt={personalData.personal.name} width={288} height={288} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                {service.highlights?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                    {service.highlights.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                {service.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="space-y-12">
            {Object.entries(skillsData.skills).map(
              ([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-semibold mb-6 capitalize text-center">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-effect p-6 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="skill-progress"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHoverChange={setHoverPreviewProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hover Preview Modal */}
      {hoverPreviewProject && <HoverPreview project={hoverPreviewProject} />}

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="space-y-8">
            {personalData.personal.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-primary">{exp.company}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always interested in new opportunities and exciting
                projects. Feel free to reach out if you'd like to work together
                or just want to say hello!
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalData.personal.email}`}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={20} className="text-primary" />
                  <span>{personalData.personal.email}</span>
                </a>
                <a
                  href={`tel:${personalData.personal.phone}`}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={20} className="text-primary" />
                  <span>{personalData.personal.phone}</span>
                </a>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin size={20} className="text-primary" />
                  <span>{personalData.personal.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="space-y-4">
                <a
                  href={personalData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={20} className="text-primary" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={20} className="text-primary" />
                  <span>LinkedIn</span>
                </a>
                {/* <a
                  href={personalData.personal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter size={20} className="text-primary" />
                  <span>Twitter</span>
                </a> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 {personalData.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
