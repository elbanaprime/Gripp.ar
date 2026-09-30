// ==========================================================================
// GRIP — Catálogo de Productos y Configuración Centralizada
// ==========================================================================
// Para modificar precios, editá el valor de "price" en el producto deseado.
// Para modificar el número de WhatsApp o el límite de envío gratis, editá STORE_CONFIG.

const STORE_CONFIG = {
    brandName: "GRIP",
    whatsapp: "5493415998943",
    freeShippingThreshold: 80000 // $80.000 ARS: Envío Gratis a partir de este monto exacto
};

const PRODUCTS = [
    {
        id: "porsche-gt3-rs",
        name: "Remera Porsche GT3 RS",
        category: "remeras",
        price: 27000,
        originalPrice: 35000,
        badge: "POPULAR",
        images: [
            "assets/products/porsche/mockup-back.png",
            "assets/products/porsche/mockup-front.png",
            "assets/products/porsche/mockup-pair.png" 
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Remera corte boxy fit heavyweight inspirada en el legendario Porsche GT3 RS. Gráfica de alta definición en espalda con tipografía editorial motorsport e insignia técnica en pecho. Confeccionada en jersey pesado de 280 GSM.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos y caída estructurada",
            "Estampa DTF de alta definición con máxima resistencia al lavado",
            "Cuello ribb cerrado de 3 cm reforzado",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "corvette-c5",
        name: "Remera Corvette C5 Hustle",
        category: "remeras",
        price: 27000,
        originalPrice: 27000,
        badge: "NUEVO",
        images: [
            "assets/products/corvette/corvette atras.png",
            "assets/products/corvette/corvette adelante.png",
            "assets/products/corvette/mockup corvette.png",
        
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Remera boxy fit con gráfica street-racing del icónico Chevrolet Corvette C5. Combinación de caligrafía urbana 'Hustle' y detalles técnicos HKS en espalda. Estilo automotriz contemporáneo de alto impacto.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit relajado y moderno",
            "Estampa DTF automotriz de tacto suave y alta fidelidad",
            "Costuras reforzadas en hombros y cuello",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "bmw-m3-e30",
        name: "Remera BMW M3 E30",
        category: "remeras",
        price: 27000,
        originalPrice: 35000,
        badge: "DESTACADO",
        images: [
            "assets/products/e30/mockup-back.png",
            "assets/products/e30/mockup-front.png",
            "assets/products/e30/mockup-pair.png"
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Homenaje a la máxima leyenda de los turismos: BMW M3 E30 con livery M-Performance. Caligrafía japonesa en contraste rojo sobre tela blanca con caída impecable. Una pieza esencial de la cultura automotriz.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos",
            "Estampa trasera de gran escala y logo frontal M3",
            "Tratamiento anti-pilling y teñido reactivo",
            "Diseñado y confeccionado en Argentina"
        ]
    },
        {
        id: "Mercesde Benz CLK GTR",
        name: "Remera Mercedes-Benz CLK GTR",
        category: "remeras",
        price: 27000,
        originalPrice: 35000,
        badge: "DESTACADO",
        images: [
            "assets/products/mercedes/Copia de mercedes clk atras.png",
            "assets/products/mercedes/Copia de mercedes clk delante.png",
            "assets/products/mercedes/Copia de mockup clk.png"
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Homenaje a la máxima leyenda de los turismos: BMW M3 E30 con livery M-Performance. Caligrafía japonesa en contraste rojo sobre tela blanca con caída impecable. Una pieza esencial de la cultura automotriz.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit con hombros caídos",
            "Estampa trasera de gran escala y logo frontal M3",
            "Tratamiento anti-pilling y teñido reactivo",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "acura-nsx",
        name: "Remera Honda Acura NSX",
        category: "remeras",
        price: 27000,
        originalPrice: 27000,
        badge: "NUEVO",
        images: [
             "assets/products/nsx/mockup-back.png",
             "assets/products/nsx/mockup-front.png",
            "assets/products/nsx/mockup-pair.png"
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Inspirada en el superdeportivo japonés por excelencia puesto a punto por Ayrton Senna. Gráfica trasera en azul eléctrico con el NSX ensanchado, tipografía HRC y logo minimalista en pecho.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit holgado",
            "Estampa DTF de calidad premium sin rigidez",
            "Cuello cerrado de 3 cm en ribb al tono",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "colapinto-43",
        name: "Remera Franco Colapinto #43",
        category: "remeras",
        price: 27000,
        originalPrice: 27000,
        badge: "MÁS VENDIDO",
        images: [
            "assets/products/colapinto/col detras.png",
            "assets/products/colapinto/col delante.png",
            "assets/products/colapinto/mockup col.png",
            
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Edición especial F1 celebrando la llegada de Franco Colapinto a la máxima categoría. Estampa de gran formato en espalda con el monoplaza #43, sol de mayo y casco, complementada con su firma original serigrafiada al frente.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit oversize estructurado",
            "Firma frontal y gráfica de carrera trasera de alta durabilidad",
            "Lavado siliconado con acabado mate",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "ford-falcon",
        name: "Remera Ford Falcon Sprint",
        category: "remeras",
        price: 27000,
        originalPrice: 27000,
        badge: "CLÁSICO",
        images: [
            "assets/products/ford/falcon atras.png",
            "assets/products/ford/falcon adelante.png",
            "assets/products/ford/falcon mockupp.png"
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Tributo al mito del automovilismo argentino: el Ford Falcon Sprint naranja en su máxima expresión de calle y pista. Diseño con flamas tribales en pecho y gráfica retro-racing completa en espalda.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit clásico streetwear",
            "Estampa DTF de alta definición con degradados vivos",
            "Cuello ribb reforzado de 3 cm",
            "Diseñado y confeccionado en Argentina"
        ]
    },
    {
        id: "ayrton-senna",
        name: "Remera Ayrton Senna #12",
        category: "remeras",
        price: 27000,
        originalPrice: 27000,
        badge: "LEYENDA",
        images: [
            "assets/products/senna/senna atras.png",
            "assets/products/senna/senna adelante.png",
            "assets/products/senna/senna mockup.png"
        ],
        sizes: ["S", "M", "L", "XL"],
        description: "Homenaje al tricampeón del mundo Ayrton Senna. Detalle en pecho con placa SENNA en los colores icónicos y espalda con composición gráfica de podio, firma y el legendario número 12.",
        details: [
            "100% Algodón Peinado Heavyweight 280 GSM",
            "Corte Boxy Fit automotriz",
            "Estampa DTF de textura suave y gran detalle",
            "Prenda pre-lavada para evitar encogimiento",
            "Diseñado y confeccionado en Argentina"
        ]
    }
];

// Helper para dar formato a moneda en Pesos Argentinos (formato: $45.000)
function formatARS(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) amount = 0;
    return '$' + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
