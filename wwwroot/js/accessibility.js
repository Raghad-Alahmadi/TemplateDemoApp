/**
 * Accessibility Helper Functions
 * DGA Standard Accessibility Features
 */

(function() {
    'use strict';

    // Skip to content functionality
    function initSkipToContent() {
        const skipLink = document.querySelector('.skip-link');
        const mainContent = document.querySelector('#main-content');
        
        if (skipLink && mainContent) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                mainContent.focus();
                mainContent.scrollIntoView();
            });
        }
    }

    // Keyboard navigation for dropdowns
    function initKeyboardNavigation() {
        const dropdownToggles = document.querySelectorAll('[aria-haspopup="true"]');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
                
                if (e.key === 'Escape') {
                    const dropdown = toggle.nextElementSibling;
                    if (dropdown && dropdown.classList.contains('show')) {
                        toggle.click();
                        toggle.focus();
                    }
                }
            });
        });
    }

    // Focus management for modals
    function initModalFocusManagement() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('shown.bs.modal', function() {
                const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            });
        });
    }

    // Announce live region updates to screen readers
    function announceToScreenReader(message, priority = 'polite') {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', priority);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        
        document.body.appendChild(liveRegion);
        
        setTimeout(() => {
            liveRegion.textContent = message;
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(liveRegion);
        }, 1000);
    }

    // Initialize all accessibility features
    function init() {
        initSkipToContent();
        initKeyboardNavigation();
        initModalFocusManagement();
    }

    // Export functions for global use
    window.AccessibilityHelper = {
        announceToScreenReader: announceToScreenReader,
        init: init
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
