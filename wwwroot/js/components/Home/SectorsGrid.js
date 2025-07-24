const SectorsGrid = {
  template: `
    <section class="sectors-section">
      <div class="container-fluid px-0" :style="responsiveStyles">
        <h2 class="sectors-title" style="font-size: 30px !important;">الأقسام والإدارات</h2>
        <p class="sectors-description">تعرف على الأقسام والإدارات المختلفة في المؤسسة والخدمات التي تقدمها لخدمة المستفيدين.</p>

        <div v-if="sectors && sectors.length > 0" class="position-relative">
          <!-- Simple Grid Container -->
          <div class="sectors-grid-container" 
               tabindex="0"
               role="region"
               aria-label="أقسام المؤسسة"
               aria-live="polite"
               @touchstart="onTouchStart"
               @touchmove="onTouchMove"
               @touchend="onTouchEnd">
            
            <!-- Grid Layout -->
            <div class="sectors-grid" 
                 :style="gridStyle">
              <div v-for="(sector, index) in visibleSectors" 
                   :key="sector.id || index" 
                   class="sector-card-wrapper">
                <div class="sector-card position-relative" 
                     dir="rtl"
                     @mouseenter="onCardHover($event)"
                     @mouseleave="onCardLeave($event)"
                     style="padding: 16px; border-radius: 16px; border: 1px solid #D2D6DB; background: white; display: flex; flex-direction: column; align-items: flex-start;">
                  <!-- Sector Icon (positioned like service card) -->
                  <div class="position-absolute" style="top: 12px; right: 12px;">
                    <div class="rounded-circle d-flex align-items-center justify-content-center" 
                         style="width: 56px; height: 56px; background-color: #f2fcf6; border-radius: 50%;">
                      <i class="bi bi-building" 
                         style="font-size: 28px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #1b8254;"></i>
                    </div>
                  </div>
                  
                  <!-- Sector Content -->
                  <div class="flex-grow-1 w-100">
                    <h3 class="sector-name" style="color: #1F2A37; font-size: 18px; font-weight: 700; line-height: 28px; margin-bottom: 8px; margin-top: 60px;">{{ sector.name }}</h3>
                    <p class="sector-count" style="color: #1F2A37; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0; margin-bottom: 12px;">{{ sector.serviceCount || 0 }} خدمة</p>
                  </div>
                  
                  <a :href="'/Services?sector=' + sector.id" class="stretched-link"></a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation Controls -->
          <div class="sectors-navigation">
            <!-- Navigation Buttons Group -->
            <div class="nav-buttons-group">
              <button 
                v-if="showNavigation"
                @click="prev"
                class="carousel-nav-btn carousel-nav-prev"
                :disabled="!canGoPrev"
                aria-label="الانتقال إلى الأقسام السابقة"
                title="السابق">
                <i class="bi bi-chevron-right"></i>
              </button>
              
              <button 
                v-if="showNavigation"
                @click="next"
                class="carousel-nav-btn carousel-nav-next"
                :disabled="!canGoNext"
                aria-label="الانتقال إلى القطاعات التالية"
                title="التالي">
                <i class="bi bi-chevron-left"></i>
              </button>
            </div>
            
            <!-- Carousel Indicators -->
            <div v-if="showNavigation && totalPages > 1" 
                 class="carousel-indicators">
              <button v-for="page in totalPages" 
                      :key="page"
                      @click="goToPage(page - 1)"
                      class="carousel-indicator"
                      :class="{ active: currentPage === page - 1 }"
                      :aria-label="'الانتقال إلى الصفحة ' + page">
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  props: {
    sectors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 0,
      itemsPerPage: 4, // Items to show per page
      // Touch gesture support
      touchStartX: 0,
      touchEndX: 0,
      touchThreshold: 50,
      isDragging: false,
      // Add reactive window width tracking
      windowWidth: window.innerWidth
    };
  },
  mounted() {
    this.updateItemsPerPage();
    window.addEventListener('resize', this.handleResize);
    // Add keyboard navigation
    this.$el.addEventListener('keydown', this.onKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.$el) {
      this.$el.removeEventListener('keydown', this.onKeyDown);
    }
  },
  computed: {
    visibleSectors() {
      // If we have fewer sectors than items per page, show all
      if (!this.sectors || this.sectors.length <= this.itemsPerPage) {
        return this.sectors || [];
      }
      
      // Otherwise, show only the current page
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sectors.slice(startIndex, endIndex);
    },
    showNavigation() {
      console.log('Sectors length:', this.sectors?.length, 'Items per page:', this.itemsPerPage);
      return this.sectors && this.sectors.length > this.itemsPerPage;
    },
    totalPages() {
      if (!this.sectors || this.sectors.length <= this.itemsPerPage) {
        return 1;
      }
      return Math.ceil(this.sectors.length / this.itemsPerPage);
    },
    canGoNext() {
      return this.currentPage < this.totalPages - 1;
    },
    canGoPrev() {
      return this.currentPage > 0;
    },
    gridStyle() {
      // Use CSS Grid for responsive layout
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.itemsPerPage}, 1fr)`,
        gap: '16px',
        width: '100%',
        transition: 'opacity 0.3s ease'
      };
    },
    responsiveStyles() {
      // Desktop: padding 0 80px, margin 24px 0 0
      // Mobile: padding 0 15px, margin 0
      const isMobile = this.windowWidth <= 768;
      return {
        padding: isMobile ? '0 15px !important' : '0 80px !important',
        margin: isMobile ? '0 !important' : '24px 0 0 !important'
      };
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.updateItemsPerPage();
    },
    updateItemsPerPage() {
      const width = window.innerWidth;
      
      if (width < 576) {
        this.itemsPerPage = 1; // Mobile: 1 item
      } else if (width < 768) {
        this.itemsPerPage = 2; // Small tablet: 2 items
      } else if (width < 992) {
        this.itemsPerPage = 2; // Tablet: 2 items
      } else if (width < 1200) {
        this.itemsPerPage = 3; // Small desktop: 3 items
      } else {
        this.itemsPerPage = 4; // Large desktop: 4 items
      }
      
      // Ensure current page is within bounds after resize
      this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
      if (this.currentPage < 0) this.currentPage = 0;
    },
    next() {
      if (this.canGoNext) {
        this.currentPage++;
      }
    },
    prev() {
      if (this.canGoPrev) {
        this.currentPage--;
      }
    },
    goToPage(pageIndex) {
      if (pageIndex >= 0 && pageIndex < this.totalPages) {
        this.currentPage = pageIndex;
      }
    },
    onCardHover(event) {
      const card = event.currentTarget;
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    },
    onCardLeave(event) {
      const card = event.currentTarget;
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    },
    // Touch gesture methods for mobile support
    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
      this.isDragging = false;
    },
    onTouchMove(event) {
      // Prevent default scrolling behavior during touch move
      if (Math.abs(event.touches[0].clientX - this.touchStartX) > 10) {
        event.preventDefault();
        this.isDragging = true;
      }
    },
    onTouchEnd(event) {
      if (!this.isDragging) return;
      
      this.touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = this.touchStartX - this.touchEndX;
      
      // Handle swipe gestures
      if (Math.abs(swipeDistance) > this.touchThreshold) {
        if (swipeDistance > 0 && this.canGoNext) {
          // Swiped left (for RTL, this means next)
          this.next();
        } else if (swipeDistance < 0 && this.canGoPrev) {
          // Swiped right (for RTL, this means previous)
          this.prev();
        }
      }
      
      // Reset touch values
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.isDragging = false;
    },
    // Keyboard navigation for accessibility
    onKeyDown(event) {
      // Only handle arrow keys when carousel is focused
      if (event.target.closest('.sectors-grid-container')) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            // In RTL, left arrow goes to next
            this.next();
            break;
          case 'ArrowRight':
            event.preventDefault();
            // In RTL, right arrow goes to previous
            this.prev();
            break;
          case 'Home':
            event.preventDefault();
            this.currentPage = 0;
            break;
          case 'End':
            event.preventDefault();
            this.currentPage = this.totalPages - 1;
            break;
        }
      }
    }
  }
}