import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../config/emailjs'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [submittedData, setSubmittedData] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setStatus('')

        // Check if EmailJS is configured
        const isEmailJSConfigured = emailjsConfig.serviceId !== 'YOUR_SERVICE_ID' &&
            emailjsConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
            emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY'

        // Store form data before clearing
        const currentFormData = { ...formData }
        setSubmittedData(currentFormData)

        try {
            if (isEmailJSConfigured) {
                // Use EmailJS if configured
                const templateParams = {
                    from_name: currentFormData.name,
                    from_email: currentFormData.email,
                    subject: currentFormData.subject,
                    message: currentFormData.message,
                    to_email: 'qaswarhussain135@gmail.com'
                }

                await emailjs.send(
                    emailjsConfig.serviceId,
                    emailjsConfig.templateId,
                    templateParams,
                    emailjsConfig.publicKey
                )

                setStatus('success')
            } else {
                // Directly open Gmail with pre-filled message
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${encodeURIComponent(`Portfolio Contact: ${currentFormData.subject}`)}&body=${encodeURIComponent(`Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${currentFormData.name}
Email: ${currentFormData.email}
Subject: ${currentFormData.subject}

Message:
${currentFormData.message}

Best regards,
${currentFormData.name}`)}`

                window.open(gmailUrl, '_blank')
                setStatus('success')
            }

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            console.error('Email sending failed:', error)
            // Fallback: Open Gmail directly
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${encodeURIComponent(`Portfolio Contact: ${currentFormData.subject}`)}&body=${encodeURIComponent(`Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${currentFormData.name}
Email: ${currentFormData.email}
Subject: ${currentFormData.subject}

Message:
${currentFormData.message}

Best regards,
${currentFormData.name}`)}`

            window.open(gmailUrl, '_blank')
            setStatus('success')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Let's work together on your next project</p>
                </div>
                <div className="contact-content">
                    <div className="contact-info" data-aos="fade-right" data-aos-delay="200">
                        <h3>Let's Connect</h3>
                        <p>I'm always interested in hearing about new projects and opportunities.</p>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:qaswarhussain135@gmail.com" className="contact-link">
                                    qaswarhussain135@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <h4>Phone</h4>
                                <a href="tel:+923017767638" className="contact-link">
                                    +92 301 7767638
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Location</h4>
                                <p>Pakistan</p>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/qaswar-hussain" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://github.com/Qshii" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub - View my projects">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=Portfolio%20Inquiry" target="_blank" rel="noopener noreferrer" className="social-link" title="Send Email via Gmail">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                    <form
                        className="contact-form"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name">Your Name</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Your Email</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="subject">Subject</label>
                        </div>
                        <div className="form-group">
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <label htmlFor="message">Your Message</label>
                        </div>
                        {status === 'success' && (
                            <div className="status-message success">
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <p><strong>Gmail opened in new tab!</strong></p>
                                    <p>Please complete sending your message in the Gmail window that just opened.</p>
                                    <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#8892b0' }}>
                                        If Gmail didn't open, you can contact me directly at: <strong>qaswarhussain135@gmail.com</strong> or <strong>+92 301 7767638</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                        {status === 'mailto' && (
                            <div className="status-message success">
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <p><strong>Thank you for your message!</strong></p>
                                    <p style={{ marginBottom: '20px' }}>I'll get back to you soon at: <strong>{submittedData?.email}</strong></p>

                                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <a
                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${encodeURIComponent(`Portfolio Contact: ${submittedData?.subject}`)}&body=${encodeURIComponent(`Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${submittedData?.name}
Email: ${submittedData?.email}
Subject: ${submittedData?.subject}

Message:
${submittedData?.message}

Best regards,
${submittedData?.name}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{ marginRight: '10px', textDecoration: 'none' }}
                                        >
                                            <i className="fas fa-envelope"></i> Send via Gmail
                                        </a>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                const emailContent = `To: qaswarhussain135@gmail.com
Subject: Portfolio Contact: ${submittedData?.subject}

Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${submittedData?.name}
Email: ${submittedData?.email}
Subject: ${submittedData?.subject}

Message:
${submittedData?.message}

Best regards,
${submittedData?.name}`

                                                navigator.clipboard.writeText(emailContent).then(() => {
                                                    alert('Email content copied to clipboard!')
                                                })
                                            }}
                                        >
                                            <i className="fas fa-copy"></i> Copy Email
                                        </button>
                                    </div>

                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', fontSize: '0.9em' }}>
                                        <p style={{ margin: '0 0 10px 0' }}><strong>Your message summary:</strong></p>
                                        <div style={{ marginBottom: '8px' }}><strong>Name:</strong> {submittedData?.name}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Email:</strong> {submittedData?.email}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Subject:</strong> {submittedData?.subject}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Message:</strong></div>
                                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                            {submittedData?.message}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '15px', padding: '12px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '6px', border: '1px solid rgba(102, 126, 234, 0.3)', textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.9em', color: '#667eea' }}>
                                            <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                                            Direct contact: <strong>qaswarhussain135@gmail.com</strong> | <strong>+92 301 7767638</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {status === 'fallback' && (
                            <div className="status-message info">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <p><strong>Message received! I'll respond soon.</strong></p>
                                    <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                const subject = encodeURIComponent(`Portfolio Contact: ${submittedData?.subject}`)
                                                const body = encodeURIComponent(`Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${submittedData?.name}
Email: ${submittedData?.email}
Subject: ${submittedData?.subject}

Message:
${submittedData?.message}

Best regards,
${submittedData?.name}`)

                                                // Create a temporary link and click it
                                                const link = document.createElement('a')
                                                link.href = `mailto:qaswarhussain135@gmail.com?subject=${subject}&body=${body}`
                                                document.body.appendChild(link)
                                                link.click()
                                                document.body.removeChild(link)
                                            }}
                                            style={{ marginRight: '10px' }}
                                        >
                                            <i className="fas fa-envelope"></i> Open Email Client
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                const emailContent = `To: qaswarhussain135@gmail.com
Subject: Portfolio Contact: ${submittedData?.subject}

Hi Qaswar,

I'm reaching out through your portfolio website.

Name: ${submittedData?.name}
Email: ${submittedData?.email}
Subject: ${submittedData?.subject}

Message:
${submittedData?.message}

Best regards,
${submittedData?.name}`

                                                navigator.clipboard.writeText(emailContent).then(() => {
                                                    alert('Email content copied to clipboard!')
                                                })
                                            }}
                                        >
                                            <i className="fas fa-copy"></i> Copy Email
                                        </button>
                                    </div>
                                    <p style={{ marginBottom: '15px', textAlign: 'center' }}>Direct contact: <strong>qaswarhussain135@gmail.com</strong> | <strong>+92 301 7767638</strong></p>

                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', fontSize: '0.9em' }}>
                                        <p style={{ margin: '0 0 10px 0' }}><strong>Your message details:</strong></p>
                                        <div style={{ marginBottom: '8px' }}><strong>Name:</strong> {submittedData?.name}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Email:</strong> {submittedData?.email}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Subject:</strong> {submittedData?.subject}</div>
                                        <div style={{ marginBottom: '8px' }}><strong>Message:</strong></div>
                                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                            {submittedData?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="status-message error">
                                <i className="fas fa-exclamation-circle"></i>
                                Sorry, there was an error sending your message. Please try again.
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Sending...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane"></i> Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
