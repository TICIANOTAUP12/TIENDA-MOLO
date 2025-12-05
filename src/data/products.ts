export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  // Vestidos
  {
    id: '1',
    name: 'Vestido Spring',
    price: 1000,
    images: [
      'https://images.unsplash.com/photo-1762341546612-67b07ee9020e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBkcmVzcyUyMG91dGRvb3J8ZW58MXx8fHwxNzYzNDkxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Vestido elegante perfecto para la primavera. Confeccionado con materiales de alta calidad que garantizan comodidad y estilo. Ideal para ocasiones especiales o uso casual.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Blanco']
  },
  {
    id: '2',
    name: 'Vestido Elegante',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1761164920960-2d776a18998c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBtb2RlbHxlbnwxfHx8fDE3NjM0NjUyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762341546612-67b07ee9020e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBkcmVzcyUyMG91dGRvb3J8ZW58MXx8fHwxNzYzNDkxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Diseño sofisticado que destaca tu elegancia natural. Perfecto para eventos formales y ocasiones especiales donde quieres lucir impecable.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro', 'Azul Marino']
  },
  {
    id: '3',
    name: 'Vestido Verano',
    price: 1100,
    images: [
      'https://images.unsplash.com/photo-1586024452802-86e0d084a4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBvdXRmaXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzQ5MTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1632178386020-40e5fcc73156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hvJTIwc3R5bGUlMjBkcmVzc3xlbnwxfHx8fDE3NjM0OTExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Vestido ligero y fresco ideal para los días de verano. Diseño que permite libertad de movimiento mientras te mantiene fresca y elegante.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Coral', 'Amarillo', 'Blanco']
  },
  {
    id: '4',
    name: 'Vestido Boho',
    price: 1300,
    images: [
      'https://images.unsplash.com/photo-1632178386020-40e5fcc73156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hvJTIwc3R5bGUlMjBkcmVzc3xlbnwxfHx8fDE3NjM0OTExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762341546612-67b07ee9020e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBkcmVzcyUyMG91dGRvb3J8ZW58MXx8fHwxNzYzNDkxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Estilo bohemio que refleja libertad y creatividad. Perfecto para quienes buscan un look único y artístico. Confección artesanal.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L'],
    colors: ['Estampado Floral', 'Natural']
  },
  {
    id: '5',
    name: 'Vestido Midi Floral',
    price: 1150,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Vestido midi con estampado floral romántico. Ideal para eventos al aire libre y ocasiones especiales durante el día.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Floral Rosa', 'Floral Azul']
  },

  // Ropa Deportiva
  {
    id: '6',
    name: 'Conjunto Deportivo Completo',
    price: 850,
    images: [
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Conjunto deportivo de alto rendimiento con tecnología de secado rápido. Perfecto para entrenamientos intensos y actividades deportivas.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul']
  },
  {
    id: '7',
    name: 'Top Deportivo Pro',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Top deportivo con soporte medio. Diseñado para máxima comodidad durante tus sesiones de entrenamiento.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Rosa']
  },
  {
    id: '8',
    name: 'Leggings Yoga Premium',
    price: 650,
    images: [
      'https://images.unsplash.com/photo-1596641211273-938aeaf926a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcGFudHMlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Leggings de alta compresión con cintura alta. Material elástico y transpirable para yoga y pilates.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Morado']
  },
  {
    id: '9',
    name: 'Conjunto Tracksuit',
    price: 1050,
    images: [
      'https://images.unsplash.com/photo-1760736534441-4d14bf11103e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBhdGhsZXRpY3xlbnwxfHx8fDE3NjM3NzAzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Conjunto deportivo completo estilo tracksuit. Ideal para calentamiento y uso casual deportivo.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Azul Marino', 'Verde']
  },
  {
    id: '10',
    name: 'Sports Bra Performance',
    price: 400,
    images: [
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Top deportivo de alto impacto con soporte reforzado. Perfecto para running y entrenamientos de alta intensidad.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Coral']
  },

  // Jeans y Pantalones
  {
    id: '11',
    name: 'Jeans Classic Blue',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Jeans clásicos de corte recto. Diseño atemporal que combina con todo tu guardarropa.',
    category: 'Pantalones',
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Azul Clásico', 'Azul Oscuro', 'Negro']
  },
  {
    id: '12',
    name: 'Jeans Skinny Black',
    price: 1000,
    images: [
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Jeans de corte ajustado que estiliza la figura. Confección premium con máxima elasticidad.',
    category: 'Pantalones',
    sizes: ['26', '28', '30', '32'],
    colors: ['Negro', 'Gris Oscuro']
  },
  {
    id: '13',
    name: 'Pantalón Cargo Urban',
    price: 880,
    images: [
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pantalón cargo con múltiples bolsillos. Estilo urbano y funcional para el día a día.',
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Verde Militar', 'Negro', 'Beige']
  },
  {
    id: '14',
    name: 'Pantalón Wide Leg',
    price: 1100,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pantalón de pierna ancha elegante y cómodo. Tendencia actual con toque sofisticado.',
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Beige', 'Blanco']
  },

  // Tops y Blusas
  {
    id: '15',
    name: 'Crop Top Básico',
    price: 380,
    images: [
      'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwdG9wJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM2ODU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Crop top versátil para combinar con cualquier outfit. Tejido suave y cómodo.',
    category: 'Tops',
    sizes: ['S', 'M', 'L'],
    colors: ['Blanco', 'Negro', 'Gris']
  },
  {
    id: '16',
    name: 'Blusa Elegante Seda',
    price: 920,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Blusa de seda con caída perfecta. Ideal para looks de oficina o eventos formales.',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Beige', 'Negro']
  },
  {
    id: '17',
    name: 'Top Tirantes Básico',
    price: 350,
    images: [
      'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwdG9wJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM2ODU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Top de tirantes básico para el día a día. Material suave y transpirable.',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Negro', 'Beige', 'Gris']
  },

  // Abrigos y Chaquetas
  {
    id: '18',
    name: 'Blazer Profesional',
    price: 1400,
    images: [
      'https://images.unsplash.com/photo-1615348411055-3492a2c76ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGF6ZXIlMjB3b21lbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Blazer estructurado perfecto para el ámbito profesional. Corte impecable y elegante.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Azul Marino', 'Beige']
  },
  {
    id: '19',
    name: 'Chaqueta Invierno',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzcxOTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1615348411055-3492a2c76ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGF6ZXIlMjB3b21lbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Chaqueta acolchada para el invierno. Cálida y estilosa con diseño moderno.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Camel', 'Verde']
  },
  {
    id: '20',
    name: 'Hoodie Streetwear',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyfGVufDF8fHx8MTc2Mzc1Mzc2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760736534441-4d14bf11103e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBhdGhsZXRpY3xlbnwxfHx8fDE3NjM3NzAzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Hoodie oversize con estilo urbano. Algodón premium súper cómodo.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Beige']
  },

  // Faldas
  {
    id: '21',
    name: 'Falda Midi Plisada',
    price: 820,
    images: [
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lydCUyMGZhc2hpb24lMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Falda midi con pliegues elegantes. Perfecta para looks formales y casuales.',
    category: 'Faldas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Beige', 'Rosa']
  },
  {
    id: '22',
    name: 'Mini Falda Denim',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lydCUyMGZhc2hpb24lMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Mini falda de mezclilla con diseño clásico. Ideal para looks casuales y juveniles.',
    category: 'Faldas',
    sizes: ['S', 'M', 'L'],
    colors: ['Azul Clásico', 'Negro']
  },

  // Shorts
  {
    id: '23',
    name: 'Shorts Verano',
    price: 550,
    images: [
      'https://images.unsplash.com/photo-1585145197502-8f36802f0a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydHMlMjBzdW1tZXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1586024452802-86e0d084a4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBvdXRmaXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzQ5MTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Shorts ligeros perfectos para el verano. Diseño cómodo y fresco.',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Beige', 'Azul']
  },
  {
    id: '24',
    name: 'Shorts Denim',
    price: 620,
    images: [
      'https://images.unsplash.com/photo-1585145197502-8f36802f0a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydHMlMjBzdW1tZXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Shorts de mezclilla clásicos. Un básico que no puede faltar en tu closet.',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul Clásico', 'Negro', 'Azul Oscuro']
  },

  // Sweaters
  {
    id: '25',
    name: 'Sweater Tejido',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM3NzAzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Sweater tejido artesanal con diseño acogedor. Perfecto para días fríos.',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Gris', 'Camel']
  },
  {
    id: '26',
    name: 'Cardigan Oversize',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM3NzAzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Cardigan oversize cómodo y elegante. Ideal para capas en looks casuales.',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Crema', 'Gris', 'Negro']
  },

  // Casual
  {
    id: '27',
    name: 'Outfit Casual',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1586024452802-86e0d084a4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBvdXRmaXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzQ5MTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Conjunto casual perfecto para el día a día. Combina comodidad y estilo en una sola pieza.',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris', 'Negro', 'Beige']
  },
  {
    id: '28',
    name: 'Conjunto Minimalista',
    price: 1150,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Diseño minimalista que destaca la elegancia en la simplicidad. Líneas limpias y cortes precisos.',
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Gris']
  },

  // Más Vestidos
  {
    id: '29',
    name: 'Vestido Cóctel Negro',
    price: 1450,
    images: [
      'https://images.unsplash.com/photo-1761164920960-2d776a18998c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBtb2RlbHxlbnwxfHx8fDE3NjM0NjUyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Vestido de cóctel sofisticado. Perfecto para eventos nocturnos elegantes.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro']
  },
  {
    id: '30',
    name: 'Vestido Floral Primavera',
    price: 1080,
    images: [
      'https://images.unsplash.com/photo-1632178386020-40e5fcc73156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hvJTIwc3R5bGUlMjBkcmVzc3xlbnwxfHx8fDE3NjM0OTExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762341546612-67b07ee9020e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBkcmVzcyUyMG91dGRvb3J8ZW58MXx8fHwxNzYzNDkxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Vestido floral alegre perfecto para la primavera. Diseño romántico y femenino.',
    category: 'Vestidos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Floral Multicolor']
  },

  // Más Deportiva
  {
    id: '31',
    name: 'Conjunto Running Pro',
    price: 980,
    images: [
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Conjunto técnico para running con reflectivos. Máximo rendimiento y seguridad.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Azul']
  },
  {
    id: '32',
    name: 'Short Deportivo',
    price: 420,
    images: [
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Short deportivo con tecnología anti-roce. Ideal para entrenamientos intensos.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul']
  },
  {
    id: '33',
    name: 'Leggings Estampados',
    price: 720,
    images: [
      'https://images.unsplash.com/photo-1596641211273-938aeaf926a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcGFudHMlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760509370911-b134eaa23d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Leggings con estampados vibrantes. Dale color a tus entrenamientos.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Estampado 1', 'Estampado 2', 'Estampado 3']
  },
  {
    id: '34',
    name: 'Sudadera Deportiva',
    price: 680,
    images: [
      'https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyfGVufDF8fHx8MTc2Mzc1Mzc2NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760736534441-4d14bf11103e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBhdGhsZXRpY3xlbnwxfHx8fDE3NjM3NzAzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Sudadera con capucha para después del entrenamiento. Cómoda y versátil.',
    category: 'Deportiva',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul Marino']
  },

  // Más Pantalones
  {
    id: '35',
    name: 'Pantalón Palazzo',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pantalón palazzo fluido y elegante. Comodidad máxima con estilo sofisticado.',
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Beige', 'Vino']
  },
  {
    id: '36',
    name: 'Jogger Urbano',
    price: 780,
    images: [
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pantalón jogger con estilo urbano casual. Perfecto para el día a día.',
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Verde Militar']
  },
  {
    id: '37',
    name: 'Pantalón Lino',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pantalón de lino fresco y ligero. Ideal para climas cálidos.',
    category: 'Pantalones',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Blanco', 'Azul']
  },

  // Más Tops
  {
    id: '38',
    name: 'Top Halter Elegante',
    price: 480,
    images: [
      'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwdG9wJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM2ODU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Top halter sofisticado para ocasiones especiales. Diseño que realza la figura.',
    category: 'Tops',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro', 'Blanco', 'Rojo']
  },
  {
    id: '39',
    name: 'Camiseta Básica',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1724405095085-06d4246a2af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzYzNDkxMDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Camiseta básica de algodón 100%. Un esencial que nunca pasa de moda.',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Negro', 'Gris', 'Azul Marino']
  },
  {
    id: '40',
    name: 'Blusa Transparencias',
    price: 820,
    images: [
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1724490056260-44bf1de2617e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9wJTIwdG9wJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM2ODU5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Blusa con detalles de transparencias. Elegante y moderna para eventos especiales.',
    category: 'Tops',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Nude']
  },

  // Más Abrigos
  {
    id: '41',
    name: 'Trench Coat Clásico',
    price: 1650,
    images: [
      'https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzcxOTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1615348411055-3492a2c76ca2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGF6ZXIlMjB3b21lbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Trench coat impermeable clásico. Elegancia atemporal para días lluviosos.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Negro']
  },
  {
    id: '42',
    name: 'Bomber Jacket',
    price: 1100,
    images: [
      'https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzcxOTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1711387718409-a05f62a3dc39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob29kaWUlMjBzdHJlZXR3ZWFyfGVufDF8fHx8MTc2Mzc1Mzc2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Bomber jacket estilo urbano. Diseño moderno con ribetes elásticos.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Verde Militar', 'Azul']
  },
  {
    id: '43',
    name: 'Chaqueta Jean',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2MzcxOTg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Chaqueta de mezclilla clásica. Un must-have que combina con todo.',
    category: 'Abrigos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul Clásico', 'Negro', 'Azul Oscuro']
  },

  // Más Faldas
  {
    id: '44',
    name: 'Falda Tubo',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lydCUyMGZhc2hpb24lMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Falda tubo profesional. Corte recto que estiliza la silueta.',
    category: 'Faldas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul Marino']
  },
  {
    id: '45',
    name: 'Falda Larga Boho',
    price: 880,
    images: [
      'https://images.unsplash.com/photo-1632178386020-40e5fcc73156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hvJTIwc3R5bGUlMjBkcmVzc3xlbnwxfHx8fDE3NjM0OTExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lydCUyMGZhc2hpb24lMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Falda larga con estilo bohemio. Fluida y cómoda con estampados únicos.',
    category: 'Faldas',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Estampado Floral', 'Estampado Geométrico']
  },

  // Más Shorts
  {
    id: '46',
    name: 'Bermudas Casual',
    price: 580,
    images: [
      'https://images.unsplash.com/photo-1585145197502-8f36802f0a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydHMlMjBzdW1tZXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609831190577-04538764f438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWFucyUyMGRlbmltJTIwd29tZW58ZW58MXx8fHwxNzYzNzcwMzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Bermudas casuales con largo midi. Perfectas para un look relajado.',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Negro', 'Verde']
  },
  {
    id: '47',
    name: 'Shorts Deportivos',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1658314755561-389d5660ee54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHN3ZWFyJTIwZml0bmVzc3xlbnwxfHx8fDE3NjM3NzAzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1585145197502-8f36802f0a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydHMlMjBzdW1tZXIlMjB3b21lbnxlbnwxfHx8fDE3NjM3NzAzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Shorts deportivos con cintura elástica. Ideales para entrenar con comodidad.',
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Azul']
  },

  // Más Sweaters
  {
    id: '48',
    name: 'Suéter Cuello Alto',
    price: 920,
    images: [
      'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM3NzAzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Suéter de cuello alto clásico. Cálido y elegante para el invierno.',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Gris', 'Camel', 'Crema']
  },
  {
    id: '49',
    name: 'Jersey Rayas',
    price: 780,
    images: [
      'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM3NzAzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Jersey con rayas estilo marinero. Clásico y versátil para cualquier ocasión.',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco/Negro', 'Blanco/Azul']
  },
  {
    id: '50',
    name: 'Pullover Lana',
    price: 1050,
    images: [
      'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VhdGVyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM3NzAzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWVufGVufDF8fHx8MTc2MzQ1NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    description: 'Pullover de lana merino premium. Suavidad y calidez excepcionales.',
    category: 'Sweaters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris', 'Azul', 'Vino']
  }
];
