// ===================================
// ClipPilot Landing Page JavaScript
// ===================================


// FAQ Accordion

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const item = button.parentElement;

        document.querySelectorAll(".faq-item").forEach(faq => {
            if(faq !== item){
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");

    });

});


// Scroll Reveal Animation

const revealElements = document.querySelectorAll(
    ".feature-card, .dashboard, .mockup-window, .email-window, .section-heading"
);

revealElements.forEach(element => {
    element.classList.add("fade-in");
});


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold:0.15
    }
);


revealElements.forEach(element => {
    observer.observe(element);
});


// Smooth navigation fallback

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});