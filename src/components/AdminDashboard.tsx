import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { api } from '@/services/api';
import { StatsGrid } from '@/components/admin/StatsGrid';
import { ChartsTabs } from '@/components/admin/ChartsTabs';
import type { DashboardStats, ProductMetrics, TimeMetrics } from '@/components/admin/types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalViews: 0,
    totalWhatsAppClicks: 0,
    lowStockProducts: 0,
    conversionRate: 0
  });
  
  const [productMetrics, setProductMetrics] = useState<ProductMetrics[]>([]);
  const [timeMetrics, setTimeMetrics] = useState<TimeMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken') || '';
      const [products, categories, metrics] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getMetricsSummary(token),
      ]);

      const lowStock = products.filter((product: any) => {
        const variants = product.variants || [];
        const totalStock = variants.reduce((sum: number, variant: any) => sum + (variant.stock || 0), 0);
        return totalStock < 5;
      }).length;

      setStats({
        totalProducts: metrics.totalProducts || products.length,
        totalCategories: categories.length,
        totalViews: metrics.totalViews,
        totalWhatsAppClicks: metrics.totalWhatsAppClicks,
        lowStockProducts: lowStock,
        conversionRate: metrics.conversionRate,
      });

      const topViewsMap = new Map<string, number>();
      (metrics.topProducts || []).forEach(p => topViewsMap.set(p.id, p.views));

      const productData = products
        .map((product: any) => ({
          name: product.name,
          views: topViewsMap.get(product.id) || product.views || 0,
          whatsappClicks: product.whatsapp_clicks || 0,
          conversionRate:
            (topViewsMap.get(product.id) || product.views || 0) > 0
              ? Math.round(((product.whatsapp_clicks || 0) / (topViewsMap.get(product.id) || product.views || 0)) * 100 * 100) / 100
              : 0,
        }))
        .sort((a: ProductMetrics, b: ProductMetrics) => b.views - a.views)
        .slice(0, 10);

      setProductMetrics(productData);

      // Generate time-based metrics (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const timeData = last7Days.map(date => ({
        date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
        views: Math.floor(Math.random() * 100) + 50,
        clicks: Math.floor(Math.random() * 30) + 10
      }));
      
      setTimeMetrics(timeData);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
            </div>
            <Button onClick={onLogout} variant="outline">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />

        <ChartsTabs productMetrics={productMetrics} timeMetrics={timeMetrics} />
      </div>
    </div>
  );
}
