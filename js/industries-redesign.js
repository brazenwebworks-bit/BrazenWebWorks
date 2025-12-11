// Industries Page Redesign - Enhanced Interactions

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
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

    // Observe all business cards
    document.querySelectorAll('.business-card').forEach(card => {
        observer.observe(card);
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.industries-hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Track card interactions for analytics (placeholder)
    document.querySelectorAll('.business-card').forEach(card => {
        card.addEventListener('click', function () {
            const businessType = this.querySelector('h3').textContent;
            console.log(`User interested in: ${businessType}`);
            // Add your analytics tracking here
        });
    });
});
