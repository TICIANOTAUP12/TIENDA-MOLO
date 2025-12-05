export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalViews: number;
  totalWhatsAppClicks: number;
  lowStockProducts: number;
  conversionRate: number;
}

export interface ProductMetrics {
  name: string;
  views: number;
  whatsappClicks: number;
  conversionRate: number;
}

export interface TimeMetrics {
  date: string;
  views: number;
  clicks: number;
}
