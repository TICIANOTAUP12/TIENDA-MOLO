import heroImage from 'figma:asset/355c83d1523377190a777ec9e4deba81fc087abc.png';
import { Button } from './ui/button';

interface HeroProps {
  onNavigateToCatalog: () => void;
}

export const Hero = ({ onNavigateToCatalog }: HeroProps) => {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <h1 className="text-white mb-4">
            Descubre tu estilo único
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            Colección exclusiva de ropa artesanal con diseños que rompen el área tradicional
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90"
            onClick={onNavigateToCatalog}
          >
            Ver Catálogo
          </Button>
        </div>
      </div>
    </section>
  );
};