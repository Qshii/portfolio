import './About.css'
import profileImg from '../assets/Profile1.jpeg'
import resumePdf from '../assets/qaswar Hussain-Resume.pdf'

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know more about my background and expertise</p>
                </div>
                <div className="about-content">
                    <div className="about-image" data-aos="fade-right" data-aos-delay="200">
                        <img src={profileImg} alt="Qaswar Hussain" className="profile-img" />
                        <div className="image-border"></div>
                    </div>
                    <div className="about-text" data-aos="fade-left" data-aos-delay="400">
                        <h3>Hello! I'm Qaswar Hussain</h3>
                        <p>
                            I'm a passionate MERN Stack Developer with expertise in building modern, 
                            responsive web applications. With a strong foundation in MongoDB, Express.js, 
                            React, and Node.js, I create full-stack solutions that are both functional 
                            and visually appealing.
                        </p>
                        <p>
                            My journey in web development has led me to work on various projects, 
                            from simple calculators to complex educational platforms. I'm always 
                            eager to learn new technologies and take on challenging projects that 
                            push the boundaries of what's possible on the web.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <h4>15+</h4>
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat">
                                <h4>2+</h4>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat">
                                <h4>100%</h4>
                                <p>Client Satisfaction</p>
                            </div>
                        </div>
                        <a href={resumePdf} download className="btn btn-primary">
                            <i className="fas fa-download"></i> Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
