const HeroCarousel = {
  template: `
    <section class="hero-slider position-relative">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true" data-bs-interval="5000" ref="heroCarousel">
        <div class="carousel-indicators">
          <button v-for="(slide, index) in slides" :key="index" 
                  type="button" 
                  data-bs-target="#heroCarousel" 
                  :data-bs-slide-to="index" 
                  class="dot-indicator" 
                  :class="{ 'active': index === 0 }" 
                  :aria-current="index === 0 ? 'true' : null" 
                  :aria-label="'Slide ' + (index + 1)">
          </button>
        </div>
        
        <div class="carousel-inner">
          <div v-for="(slide, index) in slides" :key="index" 
               class="carousel-item" 
               :class="{ 'active': index === 0 }"
               :style="{ background: slide.background, height: '491px' }">
            <div class="carousel-caption d-flex h-100 align-items-center">
              <div class="container text-start">
                <div class="row">
                  <div class="col-lg-6">
                    <h1 class="fw-bold mb-4" style="font-size: 60px;">{{ slide.title }}</h1>
                    <p class="lead mb-5">{{ slide.description }}</p>
                    <a :href="slide.buttonLink" class="dga-btn dga-btn--lg dga-btn--white" aria-label="انتقال إلى الرابط" role="button">
                      <span>{{ slide.buttonText }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  data() {
    return {
      slides: [
        {
          title: 'علامة تبويب عنوان الشريحة',
          description: 'علامة تبويب وصف الشريحة والمحتوى التوضيحي للمستخدمين',
          buttonText: 'علامة تبويب زر',
          buttonLink: '/placeholder',
          background: "linear-gradient(0deg, rgba(9, 42, 30, 0.80) 0%, rgba(9, 42, 30, 0.80) 100%), url('/images/placeholder.jpg') center/cover no-repeat"
        },
        {
          title: 'علامة تبويب عنوان الشريحة',
          description: 'علامة تبويب وصف الشريحة والمحتوى التوضيحي للمستخدمين',
          buttonText: 'علامة تبويب زر',
          buttonLink: '/placeholder',
          background: "linear-gradient(0deg, rgba(9, 42, 30, 0.80) 0%, rgba(9, 42, 30, 0.80) 100%), url('/images/placeholder.jpg') center/cover no-repeat"
        },
        {
          title: 'علامة تبويب عنوان الشريحة',
          description: 'علامة تبويب وصف الشريحة والمحتوى التوضيحي للمستخدمين',
          buttonText: 'علامة تبويب زر',
          buttonLink: '/placeholder',
          background: "linear-gradient(0deg, rgba(9, 42, 30, 0.80) 0%, rgba(9, 42, 30, 0.80) 100%), url('/images/placeholder.jpg') center/cover no-repeat"
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Initialize Bootstrap carousel
      if (typeof bootstrap !== 'undefined') {
        const heroCarousel = document.getElementById('heroCarousel');
        if (heroCarousel) {
          const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true,
            touch: true
          });

          // Variables for mouse and touch handling
          let isDragging = false;
          let startX = 0;
          let currentX = 0;
          let touchStartX = 0;
          let touchCurrentX = 0;
          let isTouching = false;
          let swipeThreshold = 50; // Minimum distance to trigger slide change

          // Function to pause auto-slide during interaction
          const pauseAutoSlide = () => {
            carousel.pause();
          };

          // Function to resume auto-slide
          const resumeAutoSlide = () => {
            setTimeout(() => {
              carousel.cycle();
            }, 1000); // Resume after 1 second
          };

          // Function to handle slide change
          const handleSlideChange = (direction) => {
            if (direction === 'next') {
              carousel.next();
            } else if (direction === 'prev') {
              carousel.prev();
            }
          };

          // Mouse Events - Simple drag
          heroCarousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            heroCarousel.style.cursor = 'grabbing';
            pauseAutoSlide();
            e.preventDefault(); // Prevent text selection
          });

          heroCarousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.clientX;
          });

          heroCarousel.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            currentX = e.clientX;
            heroCarousel.style.cursor = 'grab';
            
            const deltaX = currentX - startX;
            
            // Mouse drag direction
            if (Math.abs(deltaX) > swipeThreshold) {
              if (deltaX > 0) {
                // Dragged right → go to NEXT slide
                handleSlideChange('next');
              } else {
                // Dragged left → go to PREVIOUS slide
                handleSlideChange('prev');
              }
            }
            
            resumeAutoSlide();
          });

          heroCarousel.addEventListener('mouseleave', () => {
            if (isDragging) {
              isDragging = false;
              heroCarousel.style.cursor = 'grab';
              resumeAutoSlide();
            }
          });

          // Touch Events
          heroCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            isTouching = true;
            pauseAutoSlide();
          }, { passive: true });
          
          heroCarousel.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            touchCurrentX = e.changedTouches[0].clientX;
          }, { passive: true });
          
          heroCarousel.addEventListener('touchend', (e) => {
            if (!isTouching) return;
            
            isTouching = false;
            touchCurrentX = e.changedTouches[0].clientX;
            
            const deltaX = touchCurrentX - touchStartX;
            
            // Touch swipe direction
            if (Math.abs(deltaX) > swipeThreshold) {
              if (deltaX > 0) {
                // Swiped right → go to NEXT slide
                handleSlideChange('next');
              } else {
                // Swiped left → go to PREVIOUS slide
                handleSlideChange('prev');
              }
            }
            
            resumeAutoSlide();
          }, { passive: true });

          // Keyboard navigation
          heroCarousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              pauseAutoSlide();
              handleSlideChange('prev');
              resumeAutoSlide();
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              pauseAutoSlide();
              handleSlideChange('next');
              resumeAutoSlide();
            }
          });

          // Make carousel focusable for keyboard navigation
          heroCarousel.setAttribute('tabindex', '0');
          
          // Set grab cursor for mouse interaction
          heroCarousel.style.cursor = 'grab';
          heroCarousel.style.userSelect = 'none'; // Prevent text selection
        }
      }
    });
  }
}