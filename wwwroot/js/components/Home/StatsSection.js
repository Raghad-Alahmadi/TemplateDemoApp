const StatsSection = {
  template: `
    <section>
      <div class="container-fluid px-0" :style="responsiveStyles">
        <div class="flex justify-between items-start">
          <h2 class="fw-bold mb-4" style="font-size: 30px;">إحصائيات المؤسسة</h2>
          <button id="btn-5w9nw0s40" type="button" class="dga-btn dga-btn--lg dga-btn--secondary-outline" aria-label="عرض التفاصيل" role="button" @click="navigateToAbout"><span>عرض التفاصيل</span></button>
        </div>
        <p style="color: #161616; margin-bottom: 32px;">نظرة شاملة على أداء المؤسسة والخدمات المقدمة للمستفيدين في مختلف القطاعات والمجالات.</p>
        
        <div class="row text-center">
          <div v-for="(stat, index) in stats" :key="index" class="col-md-4">
            <div class="d-flex flex-column align-items-center">
              <div class="dga-featured-icon dga-featured-icon--circle dga-featured-icon--xl dga-featured-icon--light-brand" style="width: 56px; height: 56px; background-color: #F3FCF6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i :class="stat.icon"></i>
              </div>
              <h3 class="display-6 text-primary mt-4" style="margin-bottom: 0; font-size: 48px; font-weight: 400;" :ref="'counter' + index">{{ stat.value }}</h3>
              <p class="mt-2" style="margin-bottom: 0; color: #1F2A37;">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  props: {
    stats: {
      type: Array,
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
    this.initCounterAnimations();
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
    navigateToAbout() {
      window.location.href = '/Home/About';
    },
    initCounterAnimations() {
      setTimeout(() => {
        this.stats.forEach((stat, index) => {
          const counterEl = this.$refs['counter' + index];
          if (counterEl && counterEl[0]) {
            const counter = counterEl[0];
            counter.textContent = "0" + (stat.value.includes('+') ? '+' : '');
            
            const target = stat.rawValue;
            if (!isNaN(target)) {
              const statsObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                  let count = 0;
                  const duration = 2000;
                  const stepCount = 100;
                  const interval = Math.max(10, Math.floor(duration / stepCount));
                  const increment = Math.max(1, Math.ceil(target / stepCount));
                  
                  const timer = setInterval(() => {
                    count += increment;
                    counter.textContent = count.toLocaleString() + (stat.value.includes('+') ? '+' : '');
                    
                    if (count >= target) {
                      clearInterval(timer);
                      counter.textContent = stat.value;
                    }
                  }, interval);
                  
                  statsObserver.unobserve(counter);
                }
              }, { 
                threshold: 0.1, 
                rootMargin: "0px 0px 100px 0px"
              });
              
              statsObserver.observe(counter);
            }
          }
        });
      }, 100);
    }
  }
}