/**
 * Layout.js - Main layout functionality
 * Handles navigation, and layout-specific interactions
 */

// Global layout namespace to avoid conflicts
window.TaibahLayout = window.TaibahLayout || {};

(function() {
    'use strict';

    // Constants
    const CONSTANTS = {
        SERVICES_MENU_ID: 'services-menu',
        MOBILE_NAV_MENU_ID: 'mobileNavMenu'
    };

    /**
     * Initialize layout functionality
     */
    function initializeLayout() {
        initializeNavigation();
    }

    /**
     * Initialize navigation functionality
     */
    function initializeNavigation() {
        initializeDropdowns();
        initializeMobileNavigation();
    }

    /**
     * Initialize dropdown menus
     */
    function initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector(`#${CONSTANTS.SERVICES_MENU_ID}`);
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!trigger || !menu) return;
            
            let hoverTimeout;
            let isOpen = false;
            
            // Prevent click functionality
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                return false;
            });
            
            // Mouse enter
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                
                if (!isOpen) {
                    updateDropdownPosition(dropdown, menu);
                    menu.classList.add('show');
                    trigger.setAttribute('aria-expanded', 'true');
                    isOpen = true;
                }
            });
            
            // Mouse leave
            dropdown.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    if (isOpen) {
                        menu.classList.remove('show');
                        trigger.setAttribute('aria-expanded', 'false');
                        isOpen = false;
                    }
                }, 100);
            });
            
            // Keyboard navigation
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = '/Services';
                }
            });
            
            // Update position on scroll and resize
            if (menu.classList.contains('header__sub-menu')) {
                const updatePosition = () => {
                    if (isOpen) {
                        updateDropdownPosition(dropdown, menu);
                    }
                };
                
                window.addEventListener('scroll', updatePosition);
                window.addEventListener('resize', updatePosition);
            }
        });
    }

    /**
     * Update dropdown position for full-width menus
     */
    function updateDropdownPosition(dropdown, menu) {
        if (!menu.classList.contains('header__sub-menu')) return;
        
        const headerRect = dropdown.closest('header').getBoundingClientRect();
        
        // Set position properties
        const styles = {
            'position': 'fixed',
            'top': `${headerRect.bottom}px`,
            'left': '0',
            'right': '0',
            'width': '100vw',
            'max-width': '100vw',
            'min-width': '100vw',
            'transform': 'none',
            'margin': '0',
            'border-radius': '0',
            'box-sizing': 'border-box'
        };
        
        Object.entries(styles).forEach(([property, value]) => {
            menu.style.setProperty(property, value, 'important');
        });
    }

    /**
     * Initialize mobile navigation
     */
    function initializeMobileNavigation() {
        const mobileDropdownToggles = document.querySelectorAll('.mobile-nav__toggle');
        
        mobileDropdownToggles.forEach(toggle => {
            const arrow = toggle.querySelector('.mobile-nav__arrow');
            const targetId = toggle.getAttribute('data-bs-target');
            const targetMenu = document.querySelector(targetId);
            
            if (!arrow || !targetMenu) return;
            
            targetMenu.addEventListener('show.bs.collapse', () => {
                arrow.style.transform = 'rotate(180deg)';
                toggle.setAttribute('aria-expanded', 'true');
            });
            
            targetMenu.addEventListener('hide.bs.collapse', () => {
                arrow.style.transform = 'rotate(0deg)';
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Expose public methods
    TaibahLayout.initializeNavigation = initializeNavigation;

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLayout);
    } else {
        initializeLayout();
    }

})();
