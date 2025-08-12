import './Skills.css'
import html5Logo from '../assets/tech-logos/html5.svg'
import css3Logo from '../assets/tech-logos/css3.svg'
import javascriptLogo from '../assets/tech-logos/javascript.svg'
import reactLogo from '../assets/tech-logos/react.svg'
import bootstrapLogo from '../assets/tech-logos/bootstrap.svg'
import nodejsLogo from '../assets/tech-logos/nodejs.svg'
import expressjsLogo from '../assets/tech-logos/expressjs.svg'
import mongodbLogo from '../assets/tech-logos/mongodb.svg'
import gitLogo from '../assets/tech-logos/git.svg'
import githubLogo from '../assets/tech-logos/github.svg'
import vscodeLogo from '../assets/tech-logos/vscode.svg'
import npmLogo from '../assets/tech-logos/npm.svg'

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: [
                { name: "HTML5", logo: html5Logo },
                { name: "CSS3", logo: css3Logo },
                { name: "JavaScript", logo: javascriptLogo },
                { name: "React", logo: reactLogo },
                { name: "Bootstrap", logo: bootstrapLogo }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node.js", logo: nodejsLogo },
                { name: "Express.js", logo: expressjsLogo },
                { name: "MongoDB", logo: mongodbLogo }
            ]
        },
        {
            title: "Tools & Others",
            skills: [
                { name: "Git", logo: gitLogo },
                { name: "GitHub", logo: githubLogo },
                { name: "VS Code", logo: vscodeLogo },
                { name: "NPM", logo: npmLogo }
            ]
        }
    ]

    return (
        <section id="skills" className="skills">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">My Skills</h2>
                    <p className="section-subtitle">Technologies and tools I work with</p>
                </div>
                <div className="skills-content">
                    <div className="skills-grid">
                        {skillCategories.map((category, index) => (
                            <div 
                                key={category.title}
                                className="skill-category" 
                                data-aos="slide-right" 
                                data-aos-delay={200 * (index + 1)}
                            >
                                <h3>{category.title}</h3>
                                <div className="skill-items">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="skill-item">
                                            <img src={skill.logo} alt={skill.name} />
                                            <span>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
