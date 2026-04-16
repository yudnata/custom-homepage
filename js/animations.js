function playSplashAnimation() {
  const currentGreeting = getGreeting();
  const splashText = document.getElementById('splash-text');

  splashText.innerHTML = `${currentGreeting} <span id="name-part">Nata!</span>`;

  const splashTl = gsap.timeline({
    onComplete: () => {
      document.documentElement.classList.remove('show-splash');
      document.getElementById('splash').style.display = 'none';
      startHomepage();
    },
  });

  splashTl
    .to('#splash-text', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
    .to({}, { duration: 0.4 })
    .to('#splash', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
}

document.fonts.ready.then(() => {
  const trigger = () => {
    if (document.documentElement.classList.contains('skip-splash')) {
      const splash = document.getElementById('splash');
      if (splash) splash.style.display = 'none';
      startHomepage(true);
    } else {
      playSplashAnimation();
    }
  };

  if (
    document.documentElement.classList.contains('skip-splash') ||
    document.documentElement.classList.contains('show-splash')
  ) {
    trigger();
  } else {
    window.addEventListener('splash-decided', trigger);
  }
});

function startHomepage(instant = false) {
  if (instant) {
    gsap.set('.clock-block, .search-wrapper, #bookmarks-grid, #dock-toggle, .bookmark-card', {
      opacity: 1,
      y: 0,
    });
    animateSearchRing();
    return;
  }

  const homepageTl = gsap.timeline();

  homepageTl
    .to(
      '.clock-block',
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        from: { y: -20 },
      },
      '-=0.2',
    )
    .from(
      '.clock-block',
      {
        y: -20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.6',
    )
    .to(
      '.search-wrapper',
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.3',
    )
    .add(animateSearchRing, '-=0.1')
    .to(
      '#bookmarks-grid',
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.1',
    )
    .to(
      '#dock-toggle',
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
      '<',
    )
    .to(
      '.bookmark-card',
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power3.out',
        from: { y: 16 },
      },
      '-=0.2',
    );
}

function animateSearchRing() {
  const ringPath = document.querySelector('.ring-path');
  const svg = ringPath.closest('svg');
  const totalLength = 1800;

  function playRing() {
    gsap.set(svg, { opacity: 1 });
    gsap.set(ringPath, { strokeDashoffset: totalLength });

    gsap.to(ringPath, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(svg, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
          onComplete: () => {
            gsap.delayedCall(4, playRing);
          },
        });
      },
    });
  }

  playRing();
}

const dockToggle = document.getElementById('dock-toggle');
const grid = document.getElementById('bookmarks-grid');

if (dockToggle && grid) {
  dockToggle.addEventListener('click', () => {
    grid.classList.toggle('dock-hidden');
    dockToggle.classList.toggle('dock-hidden');
  });
}
