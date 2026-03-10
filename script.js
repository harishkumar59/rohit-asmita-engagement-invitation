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
            window.open('https://maps.app.goo.gl/mYGPW8bNRqucYPtt5', '_blank');
        });
    }
}); 