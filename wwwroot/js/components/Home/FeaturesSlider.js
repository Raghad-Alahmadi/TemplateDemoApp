const FeaturesSlider = {
  components: {
    ServiceCard
  },
  template: `
    <section style="padding-top: 40px;">
      <div class="container-fluid px-0" :style="responsiveStyles">
        <div class="flex justify-between items-start">
          <h2 class="fw-bold mb-4" style="font-size: 30px;">علامة تبويب عنوان القسم</h2>
          <button type="button" class="dga-btn dga-btn--lg dga-btn--secondary-outline" aria-label="علامة تبويب زر" role="button" @click="navigateToServices"><span>علامة تبويب زر</span></button>
        </div>
        <p style="color: #161616; margin-bottom: 32px;">علامة تبويب وصف القسم والمحتوى التوضيحي للمستخدمين.</p>

        <div class="position-relative">
          <div 
            id="featuresSlider" 
            class="row g-4 touch-slider" 
            @touchstart="handleTouchStart" 
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseLeave"
            ref="featuresSlider">
            <div v-for="(service, index) in getCurrentServices()" :key="index" class="col-md-6 col-lg-4">
              <service-card 
                :service="service" 
                @show-booking-modal="handleShowBookingModal">
              </service-card>
            </div>
          </div>
    
          <!-- Slider Navigation Dots -->
          <div class="d-flex justify-content-center mt-5 gap-2">
            <span 
              v-for="(dot, index) in sliderDots" 
              :key="index" 
              class="d-inline-block rounded-circle dot-indicator" 
              :class="{ 'active': dot.active }"
              @click="activateDot(index)"
              style="width: 16px; height: 16px; cursor: pointer; background-color: #ccc;">
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
  props: {
    services: {
      type: Array,
      required: true
    },
    sliderDots: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // Touch variables
      touchStartX: 0,
      touchEndX: 0,
      isTouching: false,
      
      // Mouse variables
      mouseStartX: 0,
      mouseEndX: 0,
      isDragging: false,
      
      // Common settings
      swipeThreshold: 50,
      
      // Responsive
      windowWidth: window.innerWidth
    }
  },
  computed: {
    responsiveStyles() {
      // For smaller screens, use mobile padding and no margin
      if (this.windowWidth < 768) {
        return {
          padding: '0 15px !important',
          margin: '0 !important'
        };
      }
      // For larger screens, use desktop padding and margin
      return {
        padding: '0 80px !important',
        margin: '24px 0 0 !important'
      };
    }
  },
  mounted() {
    // Set cursor and prevent text selection
    this.$nextTick(() => {
      if (this.$refs.featuresSlider) {
        this.$refs.featuresSlider.style.cursor = 'grab';
        this.$refs.featuresSlider.style.userSelect = 'none';
      }
    });
    
    // Listen for window resize
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    
    navigateToServices() {
      window.location.href = '/Services';
    },
    
    getCurrentServices() {
      const activeIndex = this.sliderDots.findIndex(dot => dot.active);
      return this.services.filter(service => service.page === activeIndex);
    },
    
    activateDot(index) {
      this.$emit('activate-dot', index);
    },

    handleShowBookingModal(service) {
      this.$emit('show-booking-modal', service);
    },

    // Touch Events
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX;
      this.isTouching = true;
    },

    handleTouchMove(event) {
      if (!this.isTouching) return;
      // Optional: Add visual feedback here
    },

    handleTouchEnd(event) {
      if (!this.isTouching) return;
      
      this.touchEndX = event.changedTouches[0].screenX;
      this.isTouching = false;
      this.handleSwipe('touch');
    },

    // Mouse Events
    handleMouseDown(event) {
      this.isDragging = true;
      this.mouseStartX = event.clientX;
      
      if (this.$refs.featuresSlider) {
        this.$refs.featuresSlider.style.cursor = 'grabbing';
      }
      
      event.preventDefault(); // Prevent text selection
    },

    handleMouseMove(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      // Optional: Add visual feedback here
    },

    handleMouseUp(event) {
      if (!this.isDragging) return;
      
      this.mouseEndX = event.clientX;
      this.isDragging = false;
      
      if (this.$refs.featuresSlider) {
        this.$refs.featuresSlider.style.cursor = 'grab';
      }
      
      this.handleSwipe('mouse');
    },

    handleMouseLeave() {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.$refs.featuresSlider) {
          this.$refs.featuresSlider.style.cursor = 'grab';
        }
      }
    },

    // Unified swipe handling
    handleSwipe(inputType) {
      let startX, endX;
      
      if (inputType === 'touch') {
        startX = this.touchStartX;
        endX = this.touchEndX;
      } else {
        startX = this.mouseStartX;
        endX = this.mouseEndX;
      }
      
      const deltaX = endX - startX;
      const currentIndex = this.sliderDots.findIndex(dot => dot.active);
      
      if (Math.abs(deltaX) > this.swipeThreshold) {
        if (deltaX > 0) {
          // Dragged/Swiped right → go to NEXT slide
          const nextIndex = (currentIndex + 1) % this.sliderDots.length;
          this.activateDot(nextIndex);
        } else {
          // Dragged/Swiped left → go to PREVIOUS slide
          const prevIndex = currentIndex === 0 ? 
              this.sliderDots.length - 1 : 
              currentIndex - 1;
          this.activateDot(prevIndex);
        }
      }
    }
  }
}