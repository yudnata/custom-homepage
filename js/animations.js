function playSplashAnimation() {
  const words = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const currentGreeting = getGreeting().replace('Good ', '');
  const wordEl = document.getElementById('word-cycle');
  const wordMask = document.getElementById('word-mask');

  const getWordWidth = (text) => {
    const tempSpan = document.createElement('span');
    const style = window.getComputedStyle(wordEl);
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontFamily = style.fontFamily;
    tempSpan.style.fontSize = style.fontSize;
    tempSpan.style.fontWeight = style.fontWeight;
    tempSpan.style.letterSpacing = style.letterSpacing;
    tempSpan.textContent = text;
    document.body.appendChild(tempSpan);
    const width = tempSpan.getBoundingClientRect().width;
    document.body.removeChild(tempSpan);
    return width + 8;
  };

  const targetIndex = words.indexOf(currentGreeting);
  const startIndex = Math.max(0, targetIndex - 1);
  const sequence = words.slice(startIndex, targetIndex + 1);

  const EXIT_DUR = 0.15;
  const ENTER_DUR = 0.25;
  const RESIZE_DUR = 0.1;
  const HOLD_START = 0.4;
  const HOLD_END = 0.4;
  const FADE_OUT = 0.4;

  const splashTl = gsap.timeline({ onComplete: startHomepage });

  wordEl.textContent = sequence[0];
  gsap.set(wordEl, { opacity: 1, yPercent: 0 });
  gsap.set(wordMask, { width: getWordWidth(sequence[0]) });

  if (sequence.length === 1) {
    splashTl.to({}, { duration: HOLD_START + HOLD_END });
  } else {
    splashTl.to({}, { duration: HOLD_START });

    const currentWord = sequence[1];

    splashTl
      .to(wordEl, {
        opacity: 0,
        yPercent: -100,
        skewY: -12,
        duration: EXIT_DUR,
        ease: 'power4.in',
      })
      .set(wordEl, { yPercent: 100, skewY: 12 });

    splashTl.to(wordMask, {
      width: getWordWidth(currentWord),
      duration: RESIZE_DUR,
      ease: 'power2.out',
    });

    splashTl.to(wordEl, {
      opacity: 1,
      yPercent: 0,
      skewY: 0,
      duration: ENTER_DUR,
      ease: 'back.out(1.5)',
      onStart: () => {
        wordEl.textContent = currentWord;
      },
    });

    splashTl.to({}, { duration: HOLD_END });
  }

  splashTl
    .to('#splash-text, dotlottie-wc', {
      opacity: 0,
      y: -20,
      duration: FADE_OUT,
      ease: 'power3.inOut',
    })
    .set('#splash', { display: 'none' });

  splashTl.time(0.3);
}

document.fonts.ready.then(() => {
  playSplashAnimation();
});

function startHomepage() {
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
