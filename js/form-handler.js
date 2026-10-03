/* ==================== FORM-HANDLER.JS - NETLIFY + SENDGRID ==================== */

/**
 * CNERG Mind Enquiry Form Handler
 *
 * This script handles form submission and sends emails via SendGrid.
 * The SendGrid API key is kept secure in Netlify environment variables.
 *
 * Setup Instructions:
 * 1. Push your website to GitHub
 * 2. Connect to Netlify (automatic deployment)
 * 3. Add SendGrid API key to Netlify environment: SENDGRID_API_KEY
 * 4. Create netlify/functions/send-email.js (see setup guide at bottom)
 * 5. Done! Form automatically sends to the serverless function
 */

// ==================== CONFIGURATION ====================
const API_ENDPOINT = '/.netlify/functions/send-email';

// ==================== ENHANCED FORM HANDLER ====================
class AdvancedEnquiryFormHandler {
    constructor() {
        this.form = document.getElementById('enquiry-form');
        this.submitBtn = this.form ? this.form.querySelector('button[type="submit"]') : null;

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.attachFieldValidation();
    }

    attachFieldValidation() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('change', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        let isValid = true;
        let errorMessage = '';

        // Check if empty (checkboxes must be ticked)
        if (field.type === 'checkbox') {
            if (!field.checked) {
                isValid = false;
                errorMessage = 'Please tick this box so we can contact you';
            }
        } else if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[0-9\+\-\s\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Update field styling
        if (isValid) {
            field.classList.remove('error');
            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) errorElement.remove();
        } else {
            field.classList.add('error');
            let errorElement = field.parentElement.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                field.parentElement.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        }

        return isValid;
    }

    validateAllFields() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        if (!this.validateAllFields()) {
            this.showMessage('Please fix the errors above', 'error');
            return;
        }

        // Gather form data
        const formData = this.gatherFormData();

        // Update button state
        this.submitBtn.textContent = 'Sending...';
        this.submitBtn.disabled = true;

        try {
            // Send to Netlify function
            await this.submitViaNetlify(formData);
        } catch (error) {
            console.error('Submission failed:', error);
            this.showMessage('Sorry, your enquiry could not be sent. Please try again, or email us at sales@cnergmind.com.', 'error');
            this.resetButton();
        }
    }

    gatherFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            projectType: document.getElementById('project-type').value,
            area: document.getElementById('area').value,
            timeline: document.getElementById('timeline').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString('en-IN')
        };
    }

    async submitViaNetlify(formData) {
        // Send to Netlify function which handles SendGrid
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            let detail = 'Failed to send email';
            try {
                const error = await response.json();
                detail = error.message || error.error || detail;
            } catch (_) { /* non-JSON error body */ }
            throw new Error(detail);
        }

        this.showMessage('Thank you! Your enquiry has been sent to our sales team. We will get back to you shortly.', 'success');
        this.form.reset();

        this.resetButton();
    }

    showMessage(message, type) {
        let messageDiv = this.form.querySelector('.form-message');

        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'form-message';
            this.form.insertBefore(messageDiv, this.submitBtn);
        }

        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }

    resetButton() {
        this.submitBtn.textContent = 'Submit Enquiry';
        this.submitBtn.disabled = false;
    }
}

// ==================== INITIALIZE FORM HANDLER ====================
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedEnquiryFormHandler();
});
