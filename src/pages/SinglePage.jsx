import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SinglePage.css";

import profileImg from "../img/professionalprofile.png";

// Icons
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiNetlify } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";

// Project Images
import project1Img from "../img/project1.png";
import project2Img from "../img/project2.png";
import project3Img from "../img/project3.png";
import project4Img from "../img/project4.png";
import project5Img from "../img/project5.png";

// EmailJS
import emailjs from "emailjs-com";

export default function SinglePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const firstMenuLinkRef = useRef(null);

  const EMAILJS_SERVICE_ID = "service_kishore";
  const EMAILJS_TEMPLATE_TO_ME = "template_to_kishore";
  const EMAILJS_TEMPLATE_REPLY_USER = "template_reply_user";
  const EMAILJS_PUBLIC_KEY = "M7356cdugTHrXsBek";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.remove("bg-dark", "text-light", "bg-light", "text-dark");
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.add("bg-light", "text-dark");
    }
  }, [darkMode]);

  // Sync body.menu-open with state and prevent background scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close on Escape and focus management
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      setTimeout(() => {
        try {
          firstMenuLinkRef.current?.focus();
        } catch (err) {}
      }, 50);
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const sections = ["Home", "About", "Skills", "Projects", "Contact"];

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");
    setStatusType("");

    if (!formRef.current) {
      setStatusMessage("Form is not available. Reload and try again.");
      setStatusType("error");
      setIsSending(false);
      return;
    }

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_TO_ME,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_REPLY_USER,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatusMessage("✅ Message sent successfully!");
      setStatusType("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatusMessage("❌ Failed to send. Please try again later.");
      setStatusType("error");
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setStatusMessage("");
        setStatusType("");
      }, 7000);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 App-root">
      {/* Desktop Sidebar */}
      <aside className="sidebar desktop-sidebar" aria-hidden={menuOpen ? "true" : "false"}>
        <img src={profileImg} alt="Kishore" className="logo-img" />
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section}>
              <ScrollLink
                to={section.toLowerCase()}
                smooth
                duration={500}
                spy
                className="nav-link"
                activeClass="active"
                onClick={() => setMenuOpen(false)}
              >
                {section}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <button
          className="resume-btn mt-3"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-inner">
          <div className="mobile-photo">
            <img src={profileImg} alt="Kishore" />
          </div>

          <div className="mobile-actions">
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((s) => !s)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            aria-hidden={menuOpen ? "false" : "true"}
          >
            <div className="menu-inner" role="menu" aria-label="Main menu">
              <ul>
                {sections.map((section, idx) => (
                  <li key={section}>
                    <ScrollLink
                      to={section.toLowerCase()}
                      smooth
                      duration={500}
                      spy
                      onClick={() => setMenuOpen(false)}
                      className="mobile-nav-link"
                      activeClass="active"
                      ref={idx === 0 ? firstMenuLinkRef : null}
                      tabIndex={0}
                    >
                      {section}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mobile-menu-cta" role="presentation">
              <button
                className="mode-toggle"
                onClick={() => {
                  setDarkMode((prev) => !prev);
                  setMenuOpen(false);
                }}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              <a
                href="/Kishore T resume.pdf"
                className="resume-btn download"
                download
                onClick={() => setMenuOpen(false)}
              >
                ⬇️ Download Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-container" aria-hidden={menuOpen ? "true" : "false"}>
        {/* HERO */}
        <section id="home" className="hero-section">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span>HEYY..! I'M </span>
            <span style={{ color: "#00ffc3", fontWeight: "bold" }}>
              <Typewriter
                words={["KISHORE", "FROM SALEM"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            MERN STACK DEVELOPER | PASSIONATE CODER
          </motion.p>

          <div className="resume-buttons">
            <a
              href="/Kishore T resume.pdf"
              className="resume-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View Resume
            </a>
            <a href="/Kishore T resume.pdf" className="resume-btn" download>
              ⬇️ Download Resume
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2>About Me</h2>
          <p>
            I am Kishore, a dedicated and Self-motivated Full-Stack Developer with a strong command of the MERN stack (MongoDB, Express.js, React.js, Node.js). I hold a Master of Computer Applications (MCA) degree from Dr. M.G.R. Educational and Research Institute, Chennai (2025) and a Bachelor’s degree in Computer Science from Jamal Mohamed College, Tiruchirappalli (2023).
          </p>
          <p>
            I’m deeply enthusiastic about building efficient, scalable, and user-friendly web applications that deliver smooth digital experiences. My journey through academic learning and hands-on training at KGiSL MicroCollege, Coimbatore has strengthened my expertise in both frontend and backend development, helping me understand how to turn creative ideas into real-world solutions.
          </p>
          <p>
            I have also completed certifications in MERN Stack Development from KGiSL MicroCollege and Database Management Systems (DBMS) from NPTEL, which have enriched my technical foundation and problem-solving abilities.
          </p>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2>Skills</h2>

          <h4>Frontend</h4>
          <div className="skills-grid">
            {[
              { name: "HTML5", icon: <FaHtml5 color="#E44D26" /> },
              { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
              { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" /> },
              { name: "React.js", icon: <FaReact color="#61DBFB" /> },
              { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> },
              { name: "Tailwind CSS", icon: <SiTailwindcss color="#38BDF8" /> },
            ].map((skill, i) => (
              <div className="skill-card" key={i}>
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          <h4>Backend</h4>
          <div className="skills-grid">
            {[
              { name: "Node.js", icon: <FaNodeJs color="#6cc24a" /> },
              { name: "Express.js", icon: <SiExpress color="#fff" /> },
              { name: "MongoDB", icon: <SiMongodb color="#4DB33D" /> },
            ].map((skill, i) => (
              <div className="skill-card" key={i}>
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>

          <h4>Tools & Other</h4>
          <div className="skills-grid">
            {[
              { name: "Git & GitHub", icon: <FaGithub color="#f5f5f5" /> },
              { name: "VS Code", icon: <VscVscode color="#007ACC" /> },
              { name: "Netlify", icon: <SiNetlify color="#00C7B7" /> },
              { name: "Email JS", icon: <MdEmail color="#D14836" /> },
            ].map((skill, i) => (
              <div className="skill-card" key={i}>
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 1.8 }}
          viewport={{ once: true }}
        >
          <h2>Projects</h2>
          <div className="projects-grid">
            {[
              {
                title: "Stone Paper Scissor Web Game",
                desc: "A fully responsive game with Computer & Friend modes, multi-round scoring, and a fun dare system built using React.",
                image: project5Img,
                link: "https://stonepaperscissorwebgamebykishore.netlify.app/",
              },
              {
                title: "Wildlife Photography Website with E-commerce Store",
                desc: "An interactive photo gallery connected to Instagram with month-wise filtering, animations, and responsive design. Includes an online store where users can purchase wildlife photo frames.",
                image: project1Img,
                link: "https://github.com/kishore1620/vijaypranavwildlifephotographywebsite",
              },
              {
                title: "Weather App",
                desc: "A sleek, responsive app fetching real-time weather data using a public API. Displays current conditions and 5-day forecasts with animated visuals.",
                image: project2Img,
                link: "https://weatherappbykishore.netlify.app/",
              },
              {
                title: "Gym Nation Workout Tracker",
                desc: "A fitness app to log workouts and calculate calories burned daily using Bootstrap and JavaScript.",
                image: project3Img,
                link: "https://github.com/kishore1620/gymnationcoimbatorewebsite",
              },
              {
                title: "React Portfolio",
                desc: "Personal animated portfolio using React and Framer Motion with dark theme and smooth scroll navigation.",
                image: project4Img,
                link: "https://kishoreportfoliowebsite.netlify.app/",
              },
            ].map((project, i) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                key={i}
              >
                <img src={project.image} alt={project.title} className="project-img" />
                <h5>{project.title}</h5>
                <p>{project.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <h2>Contact</h2>
          <center>
            <p>I’d love to hear from you. Feel free to reach out!</p>
          </center>

          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            {/* ✅ Contact Number added */}
            <input
              type="tel"
              name="contactNo"
              placeholder="Your Contact Number"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {statusMessage && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.25 }}
              className={`status-message ${
                statusType === "error" ? "error" : "success"
              }`}
              style={{
                textAlign: "center",
                marginTop: 12,
                fontWeight: 500,
                color: statusType === "error" ? "#ff1744" : "#00c853",
              }}
            >
              {statusMessage}
            </motion.p>
          )}

          <div className="social-links">
            <a
              href="https://github.com/kishore1620"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/kishore-t-066664306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a href="mailto:kishoreportfolio@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>

            <a
              href="https://app.netlify.com/teams/kishore1620/projects"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Netlify"
            >
              <SiNetlify />
            </a>
          </div>
        </motion.section>

        <footer>&copy; {new Date().getFullYear()} Kishore. All rights reserved.</footer>
      </main>
    </div>
  );
}
