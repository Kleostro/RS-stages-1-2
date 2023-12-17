const initSlider = () => {
  const sliderLine = document.querySelector('.favorite__slider-line');
  const paginationLines = document.querySelectorAll('.slider-pagination-line');
  const paginationLinesActive = document.querySelectorAll('.favorite__slider-pagination-line--active');
  const nextBtn = document.querySelector('.slider-navigation-next');
  const prevBtn = document.querySelector('.slider-navigation-prev');
  const slides = document.querySelectorAll('.slider-slide');

  const sliderLineStyle = getComputedStyle(sliderLine);

  const slideIntervalDuration = 5000;
  const progressIntervalDuration = 500;
  const disableIntervalDuration = 1000;

  const zeroStep = 0;
  const initialStep = 10;
  const fullStep = 100;
  const quarterSlide = 4;
  const halfSlide = 2;

  let step = 0;

  let slideWidth;
  let slidesLineGap;
  let slideSize;

  slideWidth = slides[0].clientWidth;
  slidesLineGap = parseInt(sliderLineStyle.getPropertyValue('gap'), 10);
  slideSize = slideWidth + slidesLineGap;

  let displacement = 0;
  let currentSlide = 0;
  let startX = 0;
  let endX = 0;
  let lastWindowWidth;
  let slideIntervalID;
  let progressIntervalID;

  const progressBarAnimation = (activeSlide) => {
    if (step >= fullStep) {
      step = zeroStep;
      paginationLinesActive[activeSlide].style.width = '0%';
      nextSlide();
      startInterval();
    } else {
      step += initialStep;
      paginationLinesActive[activeSlide].style.width = `${step}%`;
    }
  };

  const prevSlide = () => {
    paginationLinesActive[currentSlide].style.width = '0%';
    step = initialStep;
    currentSlide -= 1;

    if (displacement === 0) {
      currentSlide = paginationLines.length - 1;
      displacement -= (paginationLines.length - 1) * slideSize;
    } else {
      displacement += slideSize;
    }

    sliderLine.style.transform = `translateX(${displacement}px)`;
    prevBtn.disabled = true;

    setTimeout(() => {
      prevBtn.disabled = false;
    }, disableIntervalDuration);
  };

  const nextSlide = () => {
    paginationLinesActive[currentSlide].style.width = '0%';
    step = initialStep;
    currentSlide += 1;

    if (displacement === -(paginationLines.length - 1) * slideSize) {
      currentSlide = 0;
      displacement = 0;
    } else {
      displacement -= slideSize;
    }

    sliderLine.style.transform = `translateX(${displacement}px)`;
    nextBtn.disabled = true;

    setTimeout(() => {
      nextBtn.disabled = false;
    }, disableIntervalDuration);
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWindowWidth) {
      displacement = 0;
      currentSlide = 0;
      slideWidth = slides[0].clientWidth;
      slidesLineGap = parseInt(sliderLineStyle.getPropertyValue('gap'), 10);
      slideSize = slideWidth + slidesLineGap;
      sliderLine.style.transform = 'translateX(0px)';
      paginationLinesActive.forEach((lineActive) => lineActive.style.width = '0%');
      step = initialStep;
      lastWindowWidth = window.innerWidth;
    }
  });

  const pauseInterval = () => {
    clearInterval(slideIntervalID);
    clearInterval(progressIntervalID);
  };

  const startInterval = () => {
    pauseInterval();

    progressIntervalID = setInterval(() => {
      progressBarAnimation(currentSlide);
    }, progressIntervalDuration);

    slideIntervalID = setInterval(() => {
      nextSlide();
    }, slideIntervalDuration);
  };

  nextBtn.addEventListener('click', () => {
    pauseInterval();
    startInterval();
    nextSlide();
  });

  prevBtn.addEventListener('click', () => {
    pauseInterval();
    startInterval();
    prevSlide();
  });

  const handleMouseOut = (slide) => {
    startX = slide.offsetX;
  };

  const handleMouseDown = (slide) => {
    endX = slide.offsetX;

    if (startX < endX && endX - startX > slideWidth / quarterSlide) {
      prevSlide();
    }

    if (startX > endX && startX - endX > slideWidth / quarterSlide) {
      nextSlide();
    }

    startInterval();
  };

  const handleTouchStart = (event) => {
    pauseInterval();
    startX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    endX = event.changedTouches[0].clientX;

    if (endX - startX > slideWidth / halfSlide) {
      prevSlide();
    }

    if (startX - endX > slideWidth / halfSlide) {
      nextSlide();
    }

    pauseInterval();
    startInterval();
  };

  slides.forEach((slide) => {
    slide.addEventListener('mouseover', pauseInterval, { passive: true });
    slide.addEventListener('mouseout', startInterval, { passive: true });
    slide.addEventListener('mousedown', (el) => handleMouseOut(el), { passive: true });
    slide.addEventListener('mouseup', (el) => handleMouseDown(el), { passive: true });
    slide.addEventListener('touchstart', handleTouchStart, { passive: true });
    slide.addEventListener('touchend', handleTouchEnd, { passive: true });
  });

  startInterval();
};

export default initSlider;
