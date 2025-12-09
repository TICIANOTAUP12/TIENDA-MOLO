const API_BASE_URL = 'http://localhost:5000/api';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria_id: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  imagenes: Imagen[];
  variantes: Variante[];
  categorias?: Categoria;
}

export interface Imagen {
  id: string;
  producto_id: string;
  url_imagen: string;
  orden: number;
  created_at: string;
}

export interface Variante {
  id: string;
  producto_id: string;
  talla: string;
  color: string;
  stock: number;
  disponible: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  product_count: number;
}



export interface MetricasResumen {
  total_productos: number;
  visitas_hoy: number;
  productos_mas_vistos: Array<{
    producto_id: string;
    nombre: string;
    vistas: number;
  }>;
  conversion_whatsapp: number;
}

class ApiService {
  private async fetchWithError(url: string, options?: RequestInit) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Productos
  async getProductos(categoria?: string, talla?: string, color?: string): Promise<{ products: Producto[]; total: number }> {
    const params = new URLSearchParams();
    if (categoria) params.append('categoria', categoria);
    if (talla) params.append('talla', talla);
    if (color) params.append('color', color);
    
    const url = `${API_BASE_URL}/productos${params.toString() ? '?' + params.toString() : ''}`;
    return this.fetchWithError(url);
  }

  async getProducto(id: string): Promise<Producto> {
    return this.fetchWithError(`${API_BASE_URL}/productos/${id}`);
  }

  // Categorías
  async getCategorias(): Promise<{ categorias: Categoria[] }> {
    return this.fetchWithError(`${API_BASE_URL}/categorias`);
  }

  // WhatsApp
  async registrarWhatsappClick(productoId: string): Promise<void> {
    await this.fetchWithError(`${API_BASE_URL}/whatsapp/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ producto_id: productoId }),
    });
  }

  // Auth
  async login(username: string, password: string): Promise<{ access_token: string; user: any }> {
    return this.fetchWithError(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  }

  // Métricas (requiere auth)
  async getMetricasResumen(token: string): Promise<MetricasResumen> {
    return this.fetchWithError(`${API_BASE_URL}/metricas/resumen`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Productos admin (requiere auth)
  async createProducto(token: string, producto: Partial<Producto>): Promise<Producto> {
    return this.fetchWithError(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(producto),
    });
  }

  async updateProducto(token: string, id: string, producto: Partial<Producto>): Promise<Producto> {
    return this.fetchWithError(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(producto),
    });
  }

  async deleteProducto(token: string, id: string): Promise<void> {
    await this.fetchWithError(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Categorías admin (requiere auth)
  async createCategoria(token: string, categoria: Partial<Categoria>): Promise<Categoria> {
    return this.fetchWithError(`${API_BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoria),
    });
  }

  async updateCategoria(token: string, id: string, categoria: Partial<Categoria>): Promise<Categoria> {
    return this.fetchWithError(`${API_BASE_URL}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoria),
    });
  }

  async deleteCategoria(token: string, id: string): Promise<void> {
    await this.fetchWithError(`${API_BASE_URL}/categorias/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Upload de imágenes (requiere auth)
  async uploadImage(token: string, file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();

// Compatibilidad para componentes que esperan `api` con nombres en inglés
function mapProductToEnglish(p: any) {
  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion,
    price: p.precio,
    category_id: p.categoria_id,
    images: (p.imagenes || []).map((img: any) => img.url_imagen),
    variants: (p.variantes || []).map((v: any) => ({
      size: v.talla,
      color: v.color,
      stock: v.stock,
    })),
    views: p.vistas || 0,
    whatsapp_clicks: p.clicks_whatsapp || 0,
  };
}

export const api = {
  async getProducts() {
    const { products } = await apiService.getProductos();
    return (products || []).map(mapProductToEnglish);
  },
  async getCategories() {
    const { categorias } = await apiService.getCategorias();
    return (categorias || []).map((c: any) => ({
      id: c.id,
      name: c.nombre,
      description: c.descripcion,
      product_count: 0,
    }));
  },
  async getProduct(id: string) {
    const p = await apiService.getProducto(id);
    return mapProductToEnglish(p);
  },
  async getMetricsSummary(token: string) {
    const m = await apiService.getMetricasResumen(token);
    const totalViews = m.visitas_hoy || 0;
    const conversionRate = m.conversion_whatsapp || 0;
    const approxClicks = Math.round((conversionRate / 100) * totalViews);
    return {
      totalProducts: m.total_productos || 0,
      totalViews,
      totalWhatsAppClicks: approxClicks,
      conversionRate,
      topProducts: (m.productos_mas_vistos || []).map((x: any) => ({
        id: x.producto_id,
        name: x.nombre,
        views: x.vistas,
      })),
    };
  },
  async createProduct() {
    throw new Error('createProduct no disponible: usa apiService.createProducto con token');
  },
  async updateProduct() {
    throw new Error('updateProduct no disponible: usa apiService.updateProducto con token');
  },
  async deleteProduct() {
    throw new Error('deleteProduct no disponible: usa apiService.deleteProducto con token');
  },
  async createCategory(data: any) {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No autorizado: Token no encontrado');
    return apiService.createCategoria(token, {
      nombre: data.name,
      descripcion: data.description,
    });
  },
  async updateCategory(id: string, data: any) {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No autorizado: Token no encontrado');
    return apiService.updateCategoria(token, id, {
      nombre: data.name,
      descripcion: data.description,
    });
  },
  async deleteCategory(id: string) {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No autorizado: Token no encontrado');
    return apiService.deleteCategoria(token, id);
  },
  async trackProductView() {
    // sin implementación específica en frontend
  },
  async trackWhatsAppClick(productoId: string) {
    await apiService.registrarWhatsappClick(productoId);
  },
  async loginAdmin({ username, password }: { username: string; password: string; }) {
    const res = await apiService.login(username, password);
    return { token: res.access_token, admin: res.user };
  },
};
