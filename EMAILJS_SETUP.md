# EmailJS Setup Guide

To enable email functionality in your contact form, follow these steps:

## 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account

## 2. Add Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider

## 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Use these template variables in your email template:
  ```
  From: {{from_name}} ({{from_email}})
  Subject: {{subject}}
  
  Message:
  {{message}}
  ```

## 4. Get Your Credentials
- Service ID: Found in your "Email Services" section
- Template ID: Found in your "Email Templates" section  
- Public Key: Found in "Account" > "General" > "Public Key"

## 5. Update Configuration
- Open `src/config/emailjs.js`
- Replace the placeholder values with your actual credentials:
  ```javascript
  export const emailjsConfig = {
      serviceId: 'your_actual_service_id',
      templateId: 'your_actual_template_id', 
      publicKey: 'your_actual_public_key'
  }
  ```

## 6. Test the Contact Form
- Run your application
- Fill out the contact form
- Check if emails are being received at qaswarhussain135@gmail.com

## Free Tier Limits
- EmailJS free tier allows 200 emails per month
- For higher volumes, consider upgrading to a paid plan

## Troubleshooting
- Make sure your email service is properly configured
- Check the browser console for any error messages
- Verify that your template variables match the ones used in the code