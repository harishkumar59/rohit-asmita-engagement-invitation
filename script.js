// Ultra-lightweight parallax implementation to eliminate jitter
document.addEventListener('DOMContentLoaded', function() {
    const parallaxImage = document.getElementById('parallaxImage');
    
    // Use a flag to track if we're already updating to prevent excessive calculations
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    // Use a much gentler parallax factor
    const parallaxFactor = 0.15;
    
    // Apply initial transform
    parallaxImage.style.transform = `translateY(0)`;
    
    function updatePosition() {
        // Apply the transform with a very small factor to minimize jitter
        parallaxImage.style.transform = `translateY(${lastScrollY * parallaxFactor}px)`;
        ticking = false;
    }
    
    // Throttled scroll handler using requestAnimationFrame
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            // Use requestAnimationFrame to limit updates
            window.requestAnimationFrame(updatePosition);
            ticking = true;
        }
    }, { passive: true });
    
    // Make sure map area is fully clickable
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            window.open('https://www.google.com/maps/search/Ganesh+Vidya+Mandir+High+School+Dharavi+Mumbai+400017', '_blank');
        });
    }

    // ===== COUNTDOWN TIMER =====
    // Target: 14 November 2026, 6:00 PM IST (UTC+5:30)
    const engagementDate = new Date('2026-11-14T18:00:00+05:30');

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = engagementDate - now;

        if (diff <= 0) {
            // Event has started
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            document.querySelector('.countdown-heading').textContent = '🎉 The Big Day Is Here! 🎉';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Update with zero-padded values
        const newDays = String(days).padStart(2, '0');
        const newHours = String(hours).padStart(2, '0');
        const newMinutes = String(minutes).padStart(2, '0');
        const newSeconds = String(seconds).padStart(2, '0');

        // Add a subtle scale animation when numbers change
        if (secondsEl.textContent !== newSeconds) {
            secondsEl.style.transform = 'scale(1.15)';
            setTimeout(() => { secondsEl.style.transform = 'scale(1)'; }, 150);
        }

        daysEl.textContent = newDays;
        hoursEl.textContent = newHours;
        minutesEl.textContent = newMinutes;
        secondsEl.textContent = newSeconds;
    }

    // Run immediately, then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}); 