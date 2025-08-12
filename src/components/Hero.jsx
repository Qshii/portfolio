import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import './Hero.css'

// 3D Tech Stack Component
const TechNode = ({ position, color, name, icon }) => {
    const meshRef = useRef()
    const textRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <group position={position}>
            <Sphere
                ref={meshRef}
                args={[0.6, 32, 32]}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial 
                    color={color} 
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </Sphere>
            <Text
                ref={textRef}
                position={[0, -1.0, 0]}
                fontSize={0.35}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="black"
            >
                {name}
            </Text>
        </group>
    )
}

const Circular3DDiagram = () => {
    const groupRef = useRef()
    
    const techData = [
        { name: 'HTML5', color: '#e34f26', icon: '⚡' },
        { name: 'CSS3', color: '#1572b6', icon: '🎨' },
        { name: 'JavaScript', color: '#f7df1e', icon: '⚡' },
        { name: 'React', color: '#61dafb', icon: '⚛️' },
        { name: 'Node.js', color: '#339933', icon: '🚀' },
        { name: 'MongoDB', color: '#47a248', icon: '🍃' },
        { name: 'Express', color: '#000000', icon: '🚀' },
        { name: 'Git', color: '#f05032', icon: '📱' }
    ]

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005
        }
    })

    return (
        <group ref={groupRef}>
            {techData.map((tech, index) => {
                const angle = (index / techData.length) * Math.PI * 2
                const radius = 4
                const x = Math.cos(angle) * radius
                const z = Math.sin(angle) * radius
                const y = Math.sin(angle * 2) * 0.8

                return (
                    <TechNode
                        key={tech.name}
                        position={[x, y, z]}
                        color={tech.color}
                        name={tech.name}
                        icon={tech.icon}
                    />
                )
            })}
        </group>
    )
}

const Hero = () => {
    const handleNavClick = (e, targetId) => {
        e.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-left">
                    <div className="hero-content" data-aos="fade-up" data-aos-duration="1000">
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">Qaswar Hussain</span>
                        </h1>
                        <h2 className="hero-subtitle">MERN Stack Developer</h2>
                        <p className="hero-description">
                            Passionate about creating innovative web solutions with modern technologies. 
                            I build responsive, scalable applications that deliver exceptional user experiences.
                        </p>
                        <div className="hero-buttons">
                            <a 
                                href="#projects" 
                                className="btn btn-primary"
                                onClick={(e) => handleNavClick(e, 'projects')}
                            >
                                View My Work
                            </a>
                            <a 
                                href="#contact" 
                                className="btn btn-secondary"
                                onClick={(e) => handleNavClick(e, 'contact')}
                            >
                                Get In Touch
                            </a>
                        </div>
                        <div className="hero-scroll">
                            <div className="scroll-indicator">
                                <span>Scroll Down</span>
                                <i className="fas fa-arrow-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="circular-3d-container">
                        <Canvas camera={{ position: [0, 6, 18], fov: 75 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4facfe" />
                            <Circular3DDiagram />
                            <OrbitControls 
                                enableZoom={false}
                                enablePan={false}
                                autoRotate={true}
                                autoRotateSpeed={0.5}
                            />
                        </Canvas>
                    </div>
                </div>
            </div>
            <div className="hero-bg">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
