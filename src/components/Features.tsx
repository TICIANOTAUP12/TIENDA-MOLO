import categoryImage from 'figma:asset/75df39aa159755935646167bec16c6d415390131.png';

export const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">¿Por qué elegirnos?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos especializamos en diseños únicos que celebran la individualidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img 
              src={categoryImage}
              alt="Categorías" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Diseños Artísticos</h3>
              <p className="text-gray-600">
                Cada pieza es cuidadosamente diseñada para romper con lo convencional 
                y ofrecer algo verdaderamente único.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Calidad Premium</h3>
              <p className="text-gray-600">
                Utilizamos materiales de la más alta calidad para garantizar 
                durabilidad y comodidad en cada prenda.
              </p>
            </div>
            <div>
              <h3 className="mb-2">Atención Personalizada</h3>
              <p className="text-gray-600">
                Te acompañamos en todo el proceso de compra, desde la selección 
                hasta la entrega en tu puerta.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg">
            <div className="text-4xl mb-2">🚚</div>
            <h3 className="mb-2">Envíos Rápidos</h3>
            <p className="text-gray-600 text-sm">
              Enviamos a todo el país con seguimiento en tiempo real
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg">
            <div className="text-4xl mb-2">💳</div>
            <h3 className="mb-2">Pagos Flexibles</h3>
            <p className="text-gray-600 text-sm">
              Aceptamos todas las formas de pago: tarjetas, efectivo, transferencias
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg">
            <div className="text-4xl mb-2">🔄</div>
            <h3 className="mb-2">Cambios Fáciles</h3>
            <p className="text-gray-600 text-sm">
              Política de cambios y devoluciones sin complicaciones
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
