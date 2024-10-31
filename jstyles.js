// jQuery ready function to ensure the DOM is fully loaded before executing code
// This function wraps all of the script's logic to ensure that it only runs 
// once the document is fully loaded and ready to be manipulated. This is important 
// because attempting to interact with DOM elements that have not yet been created 
// will lead to errors.
$(function () 
{
    // Cache jQuery selectors for performance
    // We save jQuery selectors (like `headerElem`, `logo`, `navMenu`, and `navToggle`) in variables. 
    // This way, we only look up each element once instead of searching the DOM multiple times. 
    // This makes the code run faster and easier to read
    let headerElem = $('header'); // Select the header element on the page
    let logo = $('#logo'); // Select the logo element by its ID
    let navMenu = $('#nav-menu'); // Select the navigation menu by its ID
    let navToggle = $('#nav-toggle'); // Select the navigation toggle button for mobile navigation

    // Initialize the properties slider using Slick
    $('#properties-slider').slick({
        slidesToShow: 4, // Number of slides to display at one time in the slider
        slidesToScroll: 1, // Number of slides to scroll when navigating
        prevArrow: '<a href="#" class="slick-arrow slick-prev">previous</a>', // Custom HTML for the previous arrow
        nextArrow: '<a href="#" class="slick-arrow slick-next">next</a>', // Custom HTML for the next arrow
        responsive: [ // Responsive settings to adjust the slider based on screen size
            {
                breakpoint: 1100, // If the screen width is less than 1100 pixels
                settings: {
                    slidesToShow: 3, // Show 3 slides instead of 4
                    slidesToScroll: 1, // Still scroll 1 slide at a time
                    infinite: true, // Enable infinite looping of slides
                }
            },
            {
                breakpoint: 767, // If the screen width is less than 767 pixels
                settings: {
                    slidesToShow: 2, // Show 2 slides
                    slidesToScroll: 1, // Scroll 1 slide at a time
                    infinite: true, // Enable infinite looping of slides
                }
            },
            {
                breakpoint: 530, // If the screen width is less than 530 pixels
                settings: {
                    slidesToShow: 1, // Show only 1 slide
                    slidesToScroll: 1, // Scroll 1 slide at a time
                    infinite: true, // Enable infinite looping of slides
                }
            }
        ]
    });

    // Initialize the testimonials slider using Slick
    $('#testimonials-slider').slick({
        infinite: true, // Enable infinite scrolling for the testimonials
        slidesToShow: 1, // Show 1 testimonial at a time
        slidesToScroll: 1, // Scroll 1 testimonial at a time
        prevArrow: '<a href="#" class="slick-arrow slick-prev"><</a>', // Custom previous arrow
        nextArrow: '<a href="#" class="slick-arrow slick-next">></a>' // Custom next arrow
    });

    // Event handler for the navigation toggle button
    navToggle.on('click', () => {
        navMenu.css('right', '0'); // Slide the navigation menu into view by setting its CSS 'right' property to 0
    });

    // Event handler for the close button in the navigation menu
    $('#close-flyout').on('click', () => {
        navMenu.css('right', '-100%'); // Slide the navigation menu out of view by setting its CSS 'right' property to -100%
    });

    // Event handler for clicks on the document
    $(document).on('click', (e) => {
        let target = $(e.target); // Get the element that was clicked
        // Check if the click was outside the nav toggle button and nav menu
        if (!(target.closest('#nav-toggle').length > 0 || target.closest('#nav-menu').length > 0)) {
           navMenu.css('right', '-100%'); // If clicked outside, close the menu by sliding it out of view
        }
    });

    // Event handler for scroll events
    $(document).scroll(() => {
        let scrollTop = $(document).scrollTop(); // Get the current vertical scroll position of the document

        // If the page is scrolled down from the top
        if (scrollTop > 0) 
        {
            navMenu.addClass('is-sticky'); // Add the 'is-sticky' class to the navigation menu for styling when sticky
            logo.css('color', '#000'); // Change the logo color to black
            headerElem.css('background', '#fff'); // Change the header's background color to white
            navToggle.css('border-color', '#000'); // Change the navigation toggle button's border color to black
            navToggle.find('.strip').css('background-color', '#000'); // Change the strip color inside the toggle button to black
        } 
        else // If the user has scrolled back to the top of the page
        {
            navMenu.removeClass('is-sticky'); // Remove the 'is-sticky' class from the navigation menu
            logo.css('color', '#fff'); // Change the logo color back to white
            headerElem.css('background', 'transparent'); // Set the header's background back to transparent
            navToggle.css('border-color', '#fff'); // Change the navigation toggle button's border color back to white
            navToggle.find('.strip').css('background-color', '#fff'); // Change the strip color inside the toggle button back to white
        }

        // Adjust the header's padding and shadow based on scroll position
        headerElem.css(scrollTop >= 200 ? 
            {'padding': '0.5rem', 'box-shadow': '0 -4px 10px 1px #999'} : // If scrolled down 200px or more, change padding and add shadow
            {'padding': '1rem 0', 'box-shadow': 'none'} // If less than 200px, reset padding and remove shadow
        );
    });

    // Trigger the scroll event to set initial states
    // At the end of the script, we call `$(document).trigger('scroll')` to run the 
    // scroll event immediately. This applies the initial styles and behaviors for 
    // the navigation menu and header based on the scroll position. It ensures that 
    // everything looks right from the start, even if the user hasn't scrolled yet, 
    // making for a smoother experience.
    $(document).trigger('scroll');
});
