/**
 * mobile.js
 * Handles mobile navigation toggle and submenu visibility for responsive design.
 */

// Wait for the entire document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Get DOM Elements ---
    var mobileNavigation = document.getElementById('mobile-navigation');
    var navigation = document.getElementById('navigation');
    var mobileSubmenus = document.querySelectorAll('.mobile-submenu');

    if (!mobileNavigation || !navigation) {
        console.error("Required elements #mobile-navigation or #navigation not found.");
        return; // Exit if core elements are missing
    }

    // --- 2. Mobile Navigation Toggle Handler ---
    mobileNavigation.addEventListener('click', function() {
        // Toggles the display of the main navigation menu
        var displayStyle = navigation.style.display;
        navigation.style.display = (displayStyle === 'block' || displayStyle === '') ? 'none' : 'block';

        // When the main menu is closed, ensure all submenus are also closed
        if (navigation.style.display === 'none') {
            mobileSubmenus.forEach(function(submenuControl) {
                var submenu = submenuControl.nextElementSibling;
                // Check if the next sibling is an actual submenu (UL)
                if (submenu && submenu.tagName === 'UL') {
                    submenu.style.display = 'none';
                    // Optional: remove an 'expanded' class or indicator from the control if you had one
                }
            });
        }
    });

    // --- 3. Mobile Submenu Toggle Handler ---
    mobileSubmenus.forEach(function(submenuControl) {
        submenuControl.addEventListener('click', function(event) {
            // Stop propagation to prevent the parent <li> click event (if any)
            event.stopPropagation();
            
            // The submenu (UL) is the sibling immediately following the control (<span>)
            var submenu = submenuControl.nextElementSibling;
            
            // Safety check to ensure we found a UL element
            if (submenu && submenu.tagName === 'UL') {
                var displayStyle = submenu.style.display;
                submenu.style.display = (displayStyle === 'block' || displayStyle === '') ? 'none' : 'block';
                
                // Optional: Add/remove a class to change the mobile-submenu icon (e.g., plus to minus)
                // submenuControl.classList.toggle('expanded');
            }
        });
    });

});