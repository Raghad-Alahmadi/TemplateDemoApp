document.addEventListener('DOMContentLoaded', function() {

  const app = Vue.createApp({
    components: {
      HeroCarousel,
      StatsSection,
      FeaturesSlider,
      SectorsGrid,
      NewsSection,
      ServiceCard
    },
    data() {
      return {
        lastUpdated: '28/05/2025 - 10:30 صباحًا',
        touchStartX: 0,
        touchEndX: 0,
        sectors: window.serverData?.sectors || [],
        stats: [
          { value: '25,000+', rawValue: 25000, icon: 'fas fa-users fa-2x text-primary', label: 'مستخدم نشط' },
          { value: '1,500+', rawValue: 1500, icon: 'fas fa-graduation-cap fa-2x text-primary', label: 'خدمة متاحة' },
          { value: '28+', rawValue: 28, icon: 'fas fa-university fa-2x text-primary', label: 'قسم وإدارة' }
        ],
        features: this.initializeServices(),
        sliderDots: this.initializeSliderDots(),
        news: [
          {
            title: 'إعلان هام عن حدث جديد',
            text: 'تم الإعلان عن حدث مهم جديد يهدف إلى تحقيق التطوير والتقدم في مختلف المجالات بمشاركة نخبة من الخبراء والمختصين.',
            image: 'https://placehold.co/600x400',
            link: '#'
          },
          {
            title: 'توقيع اتفاقية تعاون استراتيجية',
            text: 'تم توقيع اتفاقية تعاون مشترك مع إحدى المؤسسات الرائدة في مجال التطوير والابتكار لتبادل الخبرات والمعرفة.',
            image: 'https://placehold.co/600x400',
            link: '#'
          },
          {
            title: 'إطلاق برنامج دعم جديد',
            text: 'تم الإعلان عن إطلاق برنامج دعم جديد يهدف إلى تقديم المساعدة والدعم للمستفيدين في مختلف المجالات والتخصصات.',
            image: 'https://placehold.co/600x400',
            link: '#'
          }
        ]
      };
    },
    methods: {
      activateDot(index) {
        console.log(`Activating dot at index ${index}`);
        
        this.sliderDots.forEach((dot, i) => {
            dot.active = i === index;
        });
        
        this.$nextTick(() => {
            const featuresContainer = document.querySelector('.row.g-4');
            if (featuresContainer) {
            featuresContainer.classList.add('features-transition');
            setTimeout(() => {
                featuresContainer.classList.remove('features-transition');
            }, 300);
            }
            
            console.log(`Features updated for page ${index}`);
        });
      },
      
      handleShowBookingModal(service) {
        console.log('Booking modal requested for service:', service);
        // Add your booking modal logic here
        // For example: redirect to booking page or open modal
        window.location.href = `/Services/Book/${service.id}`;
      },
      
      initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card, .card').forEach(el => {
          observer.observe(el);
        });
      },
      
      initializeServices() {
        // Get services from server data, with fallback to default data
        const serverServices = window.serverData?.featuredServices || [];
        
        // If we have server data, use it
        if (serverServices.length > 0) {
          return serverServices.map((service, index) => ({
            ...service,
            page: Math.floor(index / 3) // Distribute across pages (3 services per page)
          }));
        }
        
        // Fallback to default data for demonstration
        const templateServices = [
          {
            id: 1,
            title: 'خدمة إدارية نموذجية',
            description: 'وصف مختصر للخدمة الإدارية التي يمكن للمستخدمين الاستفادة منها',
            price: 'مجاني',
            type: 'إدارية',
            tags: 'سريع, إلكتروني',
            page: 0
          },
          {
            id: 2,
            title: 'استشارة أكاديمية',
            description: 'خدمة استشارة أكاديمية للطلاب والباحثين في مختلف التخصصات',
            price: '100',
            type: 'أكاديمية',
            tags: 'استشارة, تعليم',
            page: 0
          },
          {
            id: 3,
            title: 'دعم تقني',
            description: 'خدمة الدعم التقني للأنظمة والتطبيقات الإلكترونية',
            price: 'مجاني',
            type: 'تقنية',
            tags: 'دعم, تقني, سريع',
            page: 0
          }
        ];
        
        return templateServices;
      },
      
      initializeSliderDots() {
        const services = window.serverData?.featuredServices || [];
        const numberOfPages = Math.ceil(services.length / 3); // 3 services per page
        const dots = [];
        
        for (let i = 0; i < numberOfPages; i++) {
          dots.push({ active: i === 0 }); // First dot is active
        }
        
        return dots.length > 0 ? dots : [{ active: true }]; // At least one dot
      }
    },
    mounted() {
      console.log("Vue app mounted successfully");
      console.log("Initial sectors data:", this.sectors);
      // Remove fetchSectors() call to use server data instead of hardcoded template data
      
      // Hide skeleton and show Vue content with smooth transition
      this.$nextTick(() => {
        const skeleton = document.getElementById('loading-skeleton');
        const vueContent = document.getElementById('vue-content');
        
        if (skeleton && vueContent) {
          // Fade out skeleton
          skeleton.style.transition = 'opacity 0.3s ease-out';
          skeleton.style.opacity = '0';
          
          setTimeout(() => {
            skeleton.style.display = 'none';
            vueContent.style.display = 'block';
            vueContent.style.opacity = '0';
            vueContent.style.transition = 'opacity 0.5s ease-in';
            
            // Force reflow and fade in Vue content
            requestAnimationFrame(() => {
              vueContent.style.opacity = '1';
            });
          }, 300);
        }
      });
      
      this.initIntersectionObserver();
      
      window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
          } else {
            navbar.classList.remove('navbar-scrolled');
          }
        }
      });
    }
  });

  app.mount('#app');

  setTimeout(() => {
    const servicesDropdown = document.querySelector('.nav-item.dropdown .dropdown-toggle');
    if (servicesDropdown) {
      console.log("Initializing services dropdown on home page");
      
      const bsDropdown = new bootstrap.Dropdown(servicesDropdown);
      
      servicesDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        bsDropdown.toggle();
      }, true); 
      
      const dropdownParent = servicesDropdown.closest('.dropdown');
      if (dropdownParent) {
        dropdownParent.addEventListener('mouseenter', function() {
          bsDropdown.show();
        });
        
        dropdownParent.addEventListener('mouseleave', function() {
          setTimeout(() => bsDropdown.hide(), 200);
        });
      }
    }
  }, 500); 
});