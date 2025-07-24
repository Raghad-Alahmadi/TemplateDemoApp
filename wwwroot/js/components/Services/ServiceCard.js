const ServiceCard = {
  template: `
    <div class="card h-100 border-0 shadow-sm position-relative" style="padding: 16px; border-radius: 16px; border: 1px solid #D2D6DB; background: white; display: flex; flex-direction: column; align-items: flex-start;" dir="rtl">
      <!-- Service Icon -->
      <div class="position-absolute" style="top: 12px; right: 12px;">
        <div class="rounded-circle d-flex align-items-center justify-content-center" style="width: 56px; height: 56px; background-color: #f2fcf6;">
          <i :class="['bi', getIconClass(service.type)]" style="font-size: 28px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: #1b8254;"></i>
        </div>
      </div>
      
      <!-- Service Content -->
      <div class="flex-grow-1 w-100">
        <h3 style="color: #1F2A37; font-size: 18px; font-weight: 700; line-height: 28px; margin-bottom: 8px; margin-top: 60px;">{{ service.title || service.name || 'خدمة' }}</h3>
        <p style="color: #1F2A37; font-size: 16px; font-weight: 400; line-height: 24px; padding: 0; margin-bottom: 12px;">{{ truncateText(service.description || 'وصف الخدمة', 80) }}</p>
        
        <!-- Service Price -->
        <div style="margin-bottom: 24px;">
          <span style="color: #1b8254; font-size: 18px; font-weight: 700; line-height: 24px;">{{ formatPrice(service.price) }}</span>
        </div>
        
        <!-- Service Type and Tags -->
        <div style="display: flex; gap: 8px; align-self: flex-start; padding: 0; margin-bottom: 24px; flex-wrap: wrap;">
          <!-- Service Type Badge -->
          <span style="color: #085D3A; text-align: center; font-size: 12px; font-weight: 500; line-height: 18px; border-radius: 4px; border: 1px solid #ABEFC6; background: #ECFDF3; padding: 0 8px; height: 24px; display: flex; justify-content: center; align-items: center;">
            {{ getServiceTypeName(service.type) }}
          </span>
          <!-- Tags -->
          <span v-for="tag in getServiceTags(service.tags)" :key="tag" 
                style="color: #1849A9; text-align: center; font-size: 12px; font-weight: 500; line-height: 18px; border-radius: 4px; border: 1px solid #B2DDFF; background: #EFF8FF; padding: 0 8px; height: 24px; display: flex; justify-content: center; align-items: center;">
            {{ tag }}
          </span>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div style="gap: 16px; display: flex; width: 100%;">
        <button 
          @click="showBookingModal"
          type="button"
          class="dga-btn dga-btn--lg dga-btn--primary"
          style="flex: 1; min-width: 120px; height: 44px; font-size: 14px; font-weight: 600; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
          aria-label="طلب الخدمة"
          role="button">
          <span>طلب الخدمة</span>
        </button>
        <button 
          @click="navigateToService"
          type="button" 
          class="dga-btn dga-btn--lg dga-btn--secondary-outline"
          style="flex: 1; min-width: 120px; height: 44px; font-size: 14px; font-weight: 600; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" 
          aria-label="التفاصيل" 
          role="button">
          <span>التفاصيل</span>
        </button>
      </div>
    </div>
  `,
  props: {
    service: {
      type: Object,
      required: true,
      default: () => ({
        title: 'خدمة نموذجية',
        name: 'خدمة نموذجية', 
        description: 'وصف الخدمة النموذجية',
        price: 0,
        type: 'عامة',
        tags: '',
        id: 1
      })
    }
  },
  methods: {
    showBookingModal() {
      this.$emit('show-booking-modal', this.service);
    },
    navigateToService() {
      // Navigation handler - configurable for different use cases
      const serviceId = this.service.id || 1;
      window.location.href = `/Services/Details/${serviceId}`;
    },
    formatPrice(price) {
      if (!price || price === 0) return 'مجاني';
      if (typeof price === 'string' && price.includes('ر.س')) return price;
      return `${price} ر.س`;
    },
    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },
    getServiceTags(tags) {
      if (!tags || tags.trim() === '') return [];
      if (typeof tags === 'string') {
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      }
      if (Array.isArray(tags)) {
        return tags.filter(tag => tag && tag.trim() !== '');
      }
      return [];
    },
    getServiceTypeName(type) {
      // Service type mapping for display
      if (!type) return 'عامة';
      return type;
    },
    getIconClass(type) {
      const iconClasses = {
        // Standard service types
        'عامة': 'bi-gear',
        'إدارية': 'bi-building',
        'أكاديمية': 'bi-mortarboard',
        'تقنية': 'bi-laptop',
        'مالية': 'bi-currency-dollar',
        'إلكترونية': 'bi-globe',
        'حضورية': 'bi-person-badge',
        'استشارة': 'bi-chat-dots',
        'تدريب': 'bi-journal-bookmark',
        'ورشة': 'bi-tools',
        'مؤتمر': 'bi-people',
        // International services
        'general': 'bi-gear',
        'admin': 'bi-building',
        'academic': 'bi-mortarboard',
        'technical': 'bi-laptop',
        'financial': 'bi-currency-dollar',
        'electronic': 'bi-globe'
      };
      return iconClasses[type] || iconClasses[type?.toLowerCase()] || 'bi-gear';
    }
  }
};

// Export ServiceCard component for global use
window.ServiceCard = ServiceCard;