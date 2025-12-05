import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { ProductManagement } from './ProductManagement';
import { CategoryManagement } from './CategoryManagement';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Package, Tag, BarChart3, LogOut } from 'lucide-react';

export function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminData');
    
    if (token && admin) {
      setIsAuthenticated(true);
      setAdminData(JSON.parse(admin));
    }
  }, []);

  const handleLogin = (token: string, admin: any) => {
    setIsAuthenticated(true);
    setAdminData(admin);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
    setAdminData(null);
  };

  const handleNavigation = (view: 'dashboard' | 'products' | 'categories') => {
    setCurrentView(view);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-lg">Admin Panel</span>
              </div>
              
              <NavigationMenu className="flex space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => handleNavigation('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                      currentView === 'dashboard' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 inline mr-2" />
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => handleNavigation('products')}
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                      currentView === 'products' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Package className="h-4 w-4 inline mr-2" />
                    Productos
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => handleNavigation('categories')}
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                      currentView === 'categories' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Tag className="h-4 w-4 inline mr-2" />
                    Categorías
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenu>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {adminData?.username}
              </span>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <AdminDashboard onLogout={handleLogout} />}
        {currentView === 'products' && <ProductManagement />}
        {currentView === 'categories' && <CategoryManagement />}
      </main>
    </div>
  );
}