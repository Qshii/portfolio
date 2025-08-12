import './Projects.css'
import calculatorImg from '../assets/Calculator.png'
import weatherImg from '../assets/Weather App.png'
// import tutorMatchImg from '../assets/TutorMatch/home page.PNG'

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Calculator App",
            description: "A modern, responsive calculator built with HTML, CSS, and JavaScript featuring a sleek design and smooth animations.",
            image: calculatorImg,
            technologies: ["HTML", "CSS", "JavaScript"],
            liveLink: "https://calculater-tau-five.vercel.app/",
            githubLink: "https://github.com/Qshii/Calculator"
        },
        {
            id: 2,
            title: "Weather App",
            description: "Real-time weather application with location-based forecasts, beautiful UI, and responsive design for all devices.",
            image: weatherImg,
            technologies: ["React", "API", "CSS"],
            liveLink: "https://weather-app-nine-beta-33.vercel.app/",
            githubLink: "https://github.com/Qshii/Weather"
        }
        // {
        //     id: 3,
        //     title: "TutorMatch - Final Year Project",
        //     description: "A comprehensive tutoring platform connecting students with qualified tutors, featuring admin dashboard, user management, and scheduling system.",
        //     image: tutorMatchImg,
        //     technologies: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js"],
        //     liveLink: "#",
        //     githubLink: "#"
        // }
    ]

    return (
        <section id="projects" className="projects">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">My Projects</h2>
                    <p className="section-subtitle">Here are some of my recent works</p>
                </div>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            data-aos="zoom-in"
                            data-aos-delay={200 * (index + 1)}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <i className="fas fa-external-link-alt"></i>
                                        </a>
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            <i className="fab fa-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
