// app/lib/placeholder-data.js

const users = [
    {
      email: 'admin@admin.com',
      password: 'admin',
    },
  ];

const categories = [
    {
        id : 1,
        name : 'Fútbol',
        description: 'Conquista el campo',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1767013817/Category-Futbol_o1f2gx.jpg',
        cloudinary_public_id: 'Category-Futbol_o1f2gx'

    },
    {
        id : 2,
        name : 'Lifestyle',
        description: 'Estilo urbano',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1767013857/Category-Lifestyle_zlomfb.png',
        cloudinary_public_id: 'Category-Lifestyle_zlomfb'      
    },
    {
        id : 3,
        name : 'Básquet',
        description: 'Domina la cancha',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1767013906/Category-Basquet_sb8l6y.png',
        cloudinary_public_id: 'Category-Basquet_sb8l6y'        
    },
    {
        id : 4,
        name : 'Crossfit',
        description: 'Entrenamiento intenso',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1766718381/Category-Crossfit_mwtita.jpg',
        cloudinary_public_id: 'Category-Crossfit_mwtita'        
    }
]

const brands = [
    {
        id : 1,
        name : 'Jordan'
    },
    {
        id : 2,
        name : 'Nike'
    },
    {
        id : 3,
        name : 'Adidas'
    },
    {
        id : 4,
        name : 'New Balance'
    },
    {
        id : 5,
        name : 'Reebok'
    },
]

const products = [
    {
        name :'Jordan AJ 1 Retro High OG V3',
        description: 'Zapatillas Jordan 1 de cuero',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 2000,
        price : 1500,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1767013956/Jordan_AJ_1_Retro_High_OG_V3_pqiuhy.webp',
        cloudinary_public_id : 'Jordan_AJ_1_Retro_High_OG_V3_pqiuhy',
        features : [
            'Cuero premium',
            'Amortiguación Air-Sole',
            'Diseño icónico'
        ],
        instock: true
    },
    {
        name : 'Air Jordan 3 Medium Olive',
        description : 'Zapatillas Jordan 3 verde oliva',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        // SIN OFERTA: price es null
        originalPrice : 4000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1767014050/Jordan_AJ_3_Medium_Olive_qqqugd.webp',
        cloudinary_public_id : 'Jordan_AJ_3_Medium_Olive_qqqugd',
        features : [
            'Cuero premium',
            'Verde oliva distintivo',
            'Diseño icónico'
        ],
        instock: true       
    },
    {
        name : 'Jordan Air Jordan 1 Low SE Chicago',
        description : 'Gema para los sneakerheads',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 6000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718521/Jordan_AJ_1_Retro_High_OG_Jordan_Air_Jordan_1_Low_SE_y60bwr.webp',
        cloudinary_public_id : 'Jordan_AJ_1_Retro_High_OG_Jordan_Air_Jordan_1_Low_SE_y60bwr',
        features : [
            'Cuero premium',
            'Colores de los Chicago Bulls',
            'Diseño icónico'
        ],
        instock: true
    },
    {
        name : 'Air Jordan 4 Retro Cozy Girl',
        description : 'Zapatillas Jordan 4.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 4000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718572/Jordan_Air_Jordan_4_Retro_Cozy_Girl_ssx3il.webp',
        cloudinary_public_id : 'Jordan_Air_Jordan_4_Retro_Cozy_Girl_ssx3il',
        features : [
            'Cuero premium',
            'Colores suaves y acogedores',
            'Calce cómodo'
        ],
        instock: true    
    },
    {
        name : 'Jordan Air Jordan 11 Retro RA',
        description : 'Air Jordan 11 blancas, rojas y azules.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        // OFERTA: Precio real 10000, oferta 8500
        originalPrice : 10000,
        price : 8500,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/v1766084121/Jordan_Air_Jordan_11_Retro_RA_egocvw.webp',
        cloudinary_public_id : 'Jordan_Air_Jordan_11_Retro_RA_egocvw'
        ,
        features: [
            'Suela con tracción duradera',
            'Entresuela con buena amortiguación',
            'Diseño clásico y reconocible'
        ],
        instock: false
    },
    {
        name : 'Nike Phantom Luna II Elite FG',
        description : 'Botines nike para cancha 11 color negro',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        originalPrice : 15000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718621/Nike_Phantom_Luna_II_Elite_FG_ctbnqt.webp',
        cloudinary_public_id : 'Nike_Phantom_Luna_II_Elite_FG_ctbnqt'    
        ,
        features: [
            'Corte alto y ceñido (Flyknit)',
            'Placa con tracción para terreno firme',
            'Ajuste de precisión para velocidad'
        ],
        instock: true
    },
    {
        name : 'Nike Legend 10 Elite FG',
        description : 'Botines llamativos.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        // OFERTA: Precio real 15000, oferta 12000
        originalPrice : 15000,
        price : 12000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718674/Nike_Legend_10_Elite_FG_xu887x.webp',
        cloudinary_public_id : 'Nike_Legend_10_Elite_FG_xu887x'      
        ,
        features: [
            'Corte Flyknit para ajuste dinámico',
            'Placa FG para máxima aceleración',
            'Perfil de corte alto para soporte'
        ],
        instock: true
    },
    {
        name : 'Adidas Originals Handball Spezial',
        description : 'Zapatillas Adidas clásicas.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        originalPrice : 22000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718728/Adidas_Originals_Handball_Spezial_bjnvlr.webp',
        cloudinary_public_id : 'Adidas_Originals_Handball_Spezial_bjnvlr'      
        ,
        features: [
            'Gamuza premium.',
            'Perfil bajo',
            'Agarre y contacto precisos'
        ],
        instock: true
    },
    {
        name : 'Adidas Predator League FG',
        description : 'Botines de fútbol cancha 11.',
        brandname : brands[2].name,
        brandid : brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        originalPrice : 35000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718772/Adidas_Predator_League_FG_f6etqi.webp',
        cloudinary_public_id : 'Adidas_Predator_League_FG_f6etqi'     
        ,
        features: [
            'Corte ajustado para control',
            'Tracción optimizada para terreno firme',
            'Construcción ligera y adaptable'
        ],
        instock: true
    },
    {
        name : 'Adidas F50 League FG',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        originalPrice : 12000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1766718835/Adidas_F50_League_FG_ngwief.webp',
        cloudinary_public_id : 'Adidas_F50_League_FG_ngwief'   
        ,
        features: [
            'Exterior Fiberskin con Sprintgrid',
            'Suela Sprintplate 360 de impulso',
            'Lengüeta elástica de ajuste perfecto'
        ],
        instock: true
    },
    {
        name : 'Nike Sabrina 3 Flowers',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        originalPrice : 25000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765219644/Nike_Sabrina_3_Flowers_f19uns.webp',
        cloudinary_public_id : 'Nike_Sabrina_3_Flowers_f19uns'
        ,
        features: [
            'Amortiguación Cushlon 3.0 + Air Zoom',
            'Sujeción Dinámica Flywire',
            'Tracción multidireccional de alto agarre'
        ],
        instock: true
    },
    {
        name : 'Nike Lebron XXIII Lux',
        description : 'Las mejores zapatillas de basket',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        originalPrice : 30000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765219937/Nike_Lebron_XXIII_Lux_ot0g4g.webp',
        cloudinary_public_id : 'Nike_Lebron_XXIII_Lux_ot0g4g'
        ,
        features: [
            'Mediasuela drop-in ZoomX completa',
            'Placa de fibra de carbono estabilizadora',
            'Tracción diseñada para cancha indoor'
        ],
        instock: true
    },
    {
        name : 'Nike KD18 Aunt Pearl',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        originalPrice : 29500,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765220132/Nike_KD18_Aunt_Pearl_axxy4l.webp',
        cloudinary_public_id : 'Nike_KD18_Aunt_Pearl_axxy4l'
        ,
        features: [
            'Amortiguación Cushlon 3.0 + Air Zoom + Nike Air',
            'Jaula lateral para contención y estabilidad',
            'Upper de malla abierta ultraligero'
        ],
        instock: true
    },
    {
        name : 'New Balance 9060',
        description : 'Zapatillas para todos los días',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        originalPrice : 10000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765220323/New_Balance_9060_shydsy.webp',
        cloudinary_public_id : 'New_Balance_9060_shydsy'
        ,
        features: [
            'Comodidad para uso diario',
            'Amortiguación dual ABZORB y SBS',
            'Patrón de la suela inspirado en el diseño clásico del modelo 860 para mejor tracción.'
        ],
        instock: true
    },
    {
        name : 'Reebok Nano X5',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        // OFERTA: Gran descuento para probar
        originalPrice : 499999,
        price : 350000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765220447/Reebok_Nano_X5_evotgh.webp',
        cloudinary_public_id : 'Reebok_Nano_X5_evotgh'
        ,
        features: [
            'Estabilidad lateral para levantamientos',
            'Suela antideslizante multiuso',
            'Construcción duradera para entrenamientos intensos'
        ],
        instock: true
    },
    {
        name : 'Reebok Nano Court',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        originalPrice : 325000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765220619/Reebok_Nano_Court_yv3bcu.webp',
        cloudinary_public_id : 'Reebok_Nano_Court_yv3bcu'
        ,
        features: [
            'Amortiguación reactiva Floatride Energy',
            'Suela Griptonite de tracción multidireccional',
            'Tejido Flexweave con soporte zonal'
        ],
        instock: true
    },
    {
        name : 'Nike Metcon 10',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        originalPrice : 75999,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765221041/Nike_Metcon_10_ebggbs.webp',
        cloudinary_public_id : 'Nike_Metcon_10_ebggbs'
        ,
        features: [
            'Mediasuela ReactX',
            'Placa Hyperlift optimizada y ligera',
            'Refuerzo en puntera para durabilidad'
        ],
        instock: true
    },
    {
        name : 'Adidas Originals Adilette 22',
        description : 'Ojotas Adidas',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 25000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765221193/Adidas_Originals_Adilette_22_aohcer.webp',
        cloudinary_public_id : 'Adidas_Originals_Adilette_22_aohcer'
        ,
        features: [
            'Material EVA biológico con 25% caña de azúcar',
            'Diseño 3D inspirado en topografía marciana',
            'Estructura de una sola pieza para máximo confort'
        ],
        instock: true
    },
    {
        name : 'Nike Calm Slides',
        description : 'Slides Nike cómodas',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 25000,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765221308/Nike_Calm_Slides_wkoznw.webp',
        cloudinary_public_id : 'Nike_Calm_Slides_wkoznw'
        ,
        features: [
            'Plantilla texturizada para mayor agarre',
            'Suela antideslizante',
            'Diseño resistente al agua y de secado rápido'
        ],
        instock: true
    },
    {
        name : 'Adidas Iiinfinity Mule Adifom',
        description : 'Ojotas de Kanye West',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        originalPrice : 19999,
        price : null,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_pad,ar_3:4/v1765221665/Adidas_Iiinfinity_Mule_Adifom_ostl8y.webp',
        cloudinary_public_id : 'Adidas_Iiinfinity_Mule_Adifom_ostl8y'
        ,
        features: [
            'Espuma EVA ultra suave',
            'Perforaciones laterales de ventilación',
            'Confort para uso prolongado'
        ],
        instock: true
    },
];

module.exports = {
    users,
    categories,
    brands,
    products,
};