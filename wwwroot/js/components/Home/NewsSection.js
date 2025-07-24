const NewsSection = {
  template: `
    <section>
      <div class="container-fluid px-0" :style="responsiveStyles">
        <div class="flex justify-between items-start">
          <h2 class="fw-bold" style="margin-bottom: 43px; font-size: 30px !important;">آخر الأخبار</h2>
          <button type="button" class="dga-btn dga-btn--lg dga-btn--secondary-outline" aria-label="عرض جميع الأخبار" role="button"><span>عرض الكل</span></button>
        </div>
        <p style="color: #161616; margin-bottom: 32px;">تابع آخر الأخبار والمستجدات والفعاليات المهمة</p>

        <div class="row g-4">
          <div v-for="(newsItem, index) in news" :key="index" class="col-md-4">
            <div class="card h-100 border-0 shadow-sm position-relative" style="padding: 16px; border-radius: 16px; border: 1px solid #D2D6DB; background: white; display: flex; flex-direction: column;" dir="rtl">
              <img :src="newsItem.image" :alt="newsItem.title" style="height: auto; width: 100%; object-fit: cover; border-radius: 12px; margin-bottom: 16px;">
              
              <!-- News Content -->
              <div class="flex-grow-1">
                <h3 style="color: #1F2A37; font-size: 18px; font-weight: 700; line-height: 28px; margin-bottom: 8px;">{{ newsItem.title }}</h3>
                <p style="color: #1F2A37; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0; margin-bottom: 24px;">{{ newsItem.text }}</p>
              </div>
              
              <!-- Action Button -->
              <div>
                <a :href="newsItem.link" class="dga-btn dga-btn--lg dga-btn--primary">
                  اقرأ المزيد
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-muted text-end mt-4 small">آخر تحديث: {{ lastUpdated }}</p>
      </div>
    </section>
  `,
  props: {
    news: {
      type: Array,
      required: true
    },
    lastUpdated: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth
    };
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
    // Listen for window resize
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  }
};

// Export NewsSection component for global use
window.NewsSection = NewsSection;