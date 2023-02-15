const navItems = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.nav-items-hamburger')
const navItemLeft = document.querySelector('.nav-items-left')
const navItemRight = document.querySelector('.nav-items-right')
const copyright = document.querySelector('.copyright-text')
const date = new Date();

copyright.textContent = `\u00A9 ${date.getFullYear()}`
window.onscroll = () => {
    if(window.pageYOffset > 100){
        navItems.classList.add('nav-active');
        mobileMenu.classList.add('nav-active');

    } else if(window.pageYOffset < 100)
    {
        navItems.classList.remove('nav-active');
        mobileMenu.classList.remove('nav-active');
    }
}


const hamToggle = () => {
    const openMenu = document.querySelector('.open');
    const closeMenu = document.querySelector('.close');
    const navItems = document.querySelector('.navbar');

    openMenu.addEventListener('click', () =>{
        closeMenu.style.opacity = '1';
        closeMenu.style.zIndex = '12';
        navItemLeft.style.display = 'flex'
        navItemRight.style.display = 'flex'

        openMenu.style.opacity = '0';
        openMenu.style.zIndex = '11';

        navItems.style.opacity = '1';
        navItems.style.position = 'fixed';
        navItems.style.background = 'rgba(0, 0, 0, 0.735)';
        navItems.style.height = '100%';

    });

    closeMenu.addEventListener('click', ()=> {
        closeMenu.style.opacity = '0';
        closeMenu.style.zIndex = '11';

        openMenu.style.opacity = '1';
        openMenu.style.zIndex = '12';

        navItems.style.opacity = '0';

    });
};


hamToggle();