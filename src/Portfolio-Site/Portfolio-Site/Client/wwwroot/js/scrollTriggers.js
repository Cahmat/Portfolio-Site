﻿
gsap.registerPlugin(ScrollTrigger);


function setUpNavTriggers() {
    const nav = document.querySelector('#primary-nav');
    const toggle = document.querySelector('#toggle-capsule');

    gsap.to(nav, {
        scrollTrigger: {
            trigger: '#home',
            start: '-1px top',
            end: () => {
                return 'bottom+=' + (nav.offsetHeight * -1) + ' top';
            },
            scrub: true,
            invalidateOnRefresh: true
        },
        ease: 'linear',
        top: 0
    });

    ScrollTrigger.create({
        trigger: '#home',
        start: '-1px top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onEnter: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onEnterBack: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.add('active');
            toggle.classList.add('active');

            nav.classList.add('locked');
            toggle.classList.add('locked');
        },
        onLeave: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        },
        onLeaveBack: () => {
            if (!window.matchMedia('(min-width: 1329px)').matches)
                return;

            nav.classList.remove('locked');
            toggle.classList.remove('locked');
        }
    });
}

function setUpSectionTriggers() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {

        // Navbar updates
        const id = section.getAttribute('id');
        const item = document.querySelector("nav ul li a[data-scroll-to='" + id + "']")

        if (item !== null) {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 25%',
                end: 'bottom 25%',
                toggleClass: { targets: item, className: 'active' }
            });
        }
    });
}

function setUpScrollableTriggers() {

    const scrollableList = document.querySelectorAll('.scrollable');

    scrollableList.forEach((scrollable) => {
        const height = scrollable.offsetHeight;

        let children = scrollable.childNodes;
        children.forEach((child) => {
            let scrollSpeed = 1;
            if (child.hasAttribute('data-scroll-speed')) {
                scrollSpeed = child.getAttribute('data-scroll-speed');
            }
            let scrollOffset = 0;
            if (child.hasAttribute('data-scroll-offset')) {
                scrollOffset = child.getAttribute('data-scroll-offset');
            }

            gsap.set(child, {
                translateY: (index, target, targets) => String(height * scrollOffset) + 'px',
            })

            gsap.fromTo(child, {
                translateY: (index, target, targets) => String(height * scrollOffset) + 'px',
            }, {
                scrollTrigger: {
                    trigger: scrollable,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                },
                translateY: (index, target, targets) => String((height * scrollOffset) + (height * scrollSpeed)) + 'px',
                ease: 'linear'
            }
            );



        //    gsap.to(child, {
        //        scrollTrigger: {
        //            trigger: scrollable,
        //            start: 'top top',
        //            end: 'bottom top',
        //            scrub: true,
        //            invalidateOnRefresh: true
        //        },
        //        translateY: (index, target, targets) => {
        //            let scrollSpeed = 1;
        //            if (target.hasAttribute('data-scroll-speed')) {
        //                scrollSpeed = target.getAttribute('data-scroll-speed');
        //            }

        //            return String(height * scrollSpeed) + 'px';
        //        },
        //        ease: 'linear'
        //    });
        });
    });
}

function setUpGlideTrigger(container, element, animationSpeed = 1, triggerStart = 'top bottom', triggerEnd = 'bottom top') {

    const glideTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: (container !== null) ? container : element,
            start: triggerStart,
            end: triggerEnd,
            scrub: true,
            toggleActions: 'play none reverse none',
            invalidateOnRefresh: true
        },
    });

    glideTimeline.from(element, {
            duration: 5,
            y: () => (100 * animationSpeed) + '%',
            opacity: 0,
            ease: 'linear'
    })
        .fromTo(element, {
            y: () => (10 * animationSpeed) + '%',
            opacity: 1,
        }, {
            y: 0,
            duration: 1,
            ease: 'linear'
        })
        .to(element, {
            duration: 1,
            y: () => (-20 * animationSpeed) + '%',
            opacity: 1,
            ease: 'linear'
        })
        .to(element, {
            duration: 5,
            y: () => (-100 * animationSpeed) + '%',
            opacity: 0,
            ease: 'linear'
        });
}

