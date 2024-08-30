'use strict';
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
    const slcoords = section1.getBoundingClientRect();
    section1.scrollIntoView({behavior:'smooth'});
})

// // page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//     el.addEventListener("click",function(e){
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({behavior:'smooth'})
//     })
// })

document.querySelector('.nav__links').addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
})


// tabs componet
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent  = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab');
    
    if(!clicked) return;
    // remove active class
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    
    // Activate the active class
    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
 })

// menu fade animation
const nav = document.querySelector('.nav');

  const handleHover = function(e,opacity){
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if(el !== link){
                el.style.opacity = this;
            }
        })
        logo.style.opacity = this; 
    }
  }

nav.addEventListener('mouseover',handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));


// // sticky navigation 
// const intialCoords = section1.getBoundingClientRect();
// // console.log(intialCoords);
// window.addEventListener('scroll',function(e){
//     if(this.window.scrollY > intialCoords.top){
//         nav.classList.add('sticky');
//     }else{
//         nav.classList.remove('sticky');
//     }
// })


// sticky navigation:InterSection Observer API
const header = document.querySelector('.header');

const stickNav = function(entries){
    const [entry] = entries;

    // entries.forEach(entry => console.log(entry));

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickNav,{
    root:null,
    threshould:0
});
headerObserver.observe(header);


// Reveal Section Animation
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer){
    // entries.forEach(entry => console.log(entry));
    const [entry] = entries;

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
    root:null,
    threshould:0
});

allSections.forEach(function(section){
    section.classList.add('section--hidden');
    sectionObserver.observe(section);
})


//Lazy Loading images
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function(entries,observer){
    // entries.forEach(entry => console.log(entry));
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load',function(){
        entry.target.classList.remove('lazy-img');
    })
}
const imgObserver = new IntersectionObserver(loadImg,{
    root:null,
    threshould:0
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right'); 
const btnLeft = document.querySelector('.slider__btn--left'); 

let curSlide = 0;
const maxSlide = slides.length;

slides.forEach((s,i) => {
    s.style.transform = `translateX(${100 * (i)}%)`;
});

function goToSlide(slide){
    slides.forEach((s,i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
}

btnRight.addEventListener('click', function(){
    if(curSlide === maxSlide-1) {
        curSlide = 0;
    }else{
        curSlide++;
    }
    goToSlide(curSlide);
});

btnLeft.addEventListener('click', function(){
    if(curSlide === 0) {
        curSlide = maxSlide - 1;
    }else{
        curSlide--;
    }
    goToSlide(curSlide);
});













// const obsCallBack = function(entries,observer){
//     entries.forEach(entry => console.log(entry));
// }
// const obsOptions = {
//     root:null,
//     threshould:0.1
// }
// const observer = new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);


// tabs.forEach((t) => {
//     t.addEventListener('click', function(){
//         console.log('tab');
//     })
// })


// const randomInt = (min,max) => Math.floor(Math.random() * (max-min + 1) + min);
// // console.log(randomInt(0,255));

// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//     this.style.backgroundColor = randomColor();

//     // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click',function(e){
//     this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click',function(e){
//     this.style.backgroundColor = randomColor();
// });


// const obsCallBack = function(entries,observer){
//     entries.forEach(entry => console.log(entry));
// }
// const obsOptions = {
//     root:null,
//     threshould:0.1
// }
// const observer = new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);