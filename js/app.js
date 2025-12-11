// Brazen Web Works - Main JavaScript
// Modal, FAQ, and Form Handling

// Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('leadModal');
    const closeBtn = document.querySelector('.modal-close');
    const leadForm = document.getElementById('leadForm');
    const successMessage = document.getElementById('successMessage');

    // Show modal after 1 second delay
    setTimeout(() => {
        modal.classList.add('show');
    }, 1000);

    // Close modal when clicking X
    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    });

    // Close modal when clicking overlay
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }
    });

    // Handle form submission
    leadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: leadForm.name.value,
            email: leadForm.email.value,
            message: leadForm.message.value
        };

        console.log('Lead Form Submitted:', formData);

        // Hide form and show success message
        leadForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Close modal after 3 seconds
        setTimeout(() => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                // Reset form for next time
                leadForm.style.display = 'block';
                successMessage.style.display = 'none';
                leadForm.reset();
            }, 400);
        }, 3000);
    });

    // Floating tab to reopen modal
    const modalTab = document.getElementById('modalTab');
    if (modalTab) {
        modalTab.addEventListener('click', function () {
            modal.style.display = 'flex';
            // Small delay to ensure display is set before animation
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    }
});

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth Scroll for Toolbar Links
document.querySelectorAll('.toolbar-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button Handlers
document.querySelectorAll('.btn-cta, .btn-final-cta').forEach(button => {
    button.addEventListener('click', function () {
        // Scroll to contact or open modal
        window.location.href = 'contact.html';
    });
});

// Package Button Handlers
document.querySelectorAll('.btn-package').forEach(button => {
    button.addEventListener('click', function () {
        const packageName = this.closest('.package-card').querySelector('h3').textContent;
        alert(`Interested in the ${packageName} package? Let's discuss your needs!`);
        // In production, this would open a contact form or redirect
        window.location.href = 'contact.html';
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.package-card, .portfolio-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
