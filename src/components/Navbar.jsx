import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            setIsScrolled(scrollTop > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleNavClick = (e, targetId) => {
        e.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <span>QH</span>
                </div>
                <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
                    <li className="nav-item">
                        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>
                            About
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, 'projects')}>
                            Projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, 'skills')}>
                            Skills
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>
                            Contact
                        </a>
                    </li>
                </ul>
                <div 
                    className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
                    id="mobile-menu"
                    onClick={toggleMobileMenu}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
