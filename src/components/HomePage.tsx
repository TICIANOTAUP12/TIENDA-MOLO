import { Hero } from './Hero';
import { Features } from './Features';
import { Button } from './ui/button';

interface HomePageProps {
  onNavigateToCatalog: () => void;
}

export const HomePage = ({ onNavigateToCatalog }: HomePageProps) => {
  return (
    <div>
      <Hero onNavigateToCatalog={onNavigateToCatalog} />
      <Features />
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">¿Lista para encontrar tu estilo?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Explora nuestra colección completa y descubre piezas únicas que se adaptan a tu personalidad
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90"
            onClick={onNavigateToCatalog}
          >
            Ver Catálogo Completo
          </Button>
        </div>
      </section>
    </div>
  );
};
