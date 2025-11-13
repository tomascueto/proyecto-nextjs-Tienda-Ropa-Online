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
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/v1754159775/vapor-xvi-x-vini-jr-story-tab_0001_layer-14_n5oxay.jpg',
        cloudinary_public_id: 'vapor-xvi-x-vini-jr-story-tab_0001_layer-14_n5oxay'

    },
    {
        id : 2,
        name : 'Lifestyle',
        description: 'Estilo urbano',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/v1754161659/lifestyle_iks4jd.png',
        cloudinary_public_id: 'lifestyle_iks4jd'      
    },
    {
        id : 3,
        name : 'Básquet',
        description: 'Domina la cancha',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/v1754161325/Dise%C3%B1o_sin_t%C3%ADtulo_d3h0mb.png',
        cloudinary_public_id: 'Dise%C3%B1o_sin_t%C3%ADtulo_d3h0mb'        
    },
    {
        id : 4,
        name : 'Crossfit',
        description: 'Entrenamiento intenso',
        image: 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_fill,w_600,h_685/v1754160677/X9o2jTSbMJkxYCaySZWycD_ma7ciy.jpg',
        cloudinary_public_id: 'X9o2jTSbMJkxYCaySZWycD_ma7ciy'        
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
        name :'Air Jordan 3 Palomino',
        description: 'Zapatillas Jordan 3 de cuero',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 10,
        originalPrice : 2000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719263958/Jordan3Palomino_fhha2k.jpg',
        cloudinary_public_id : 'Jordan3Palomino_fhha2k',
        features : [
            'Cuero premium',
            'Amortiguación Air-Sole',
            'Diseño icónico'
        ],
        instock: true
    },
    {
        name : 'Air Jordan 4 Retro Black Cat',
        description : 'Zapatillas Jordan 4 full black',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233326/Jordan4BlackCat_fyrqid.jpg',
        cloudinary_public_id : 'Jordan4BlackCat_fyrqid',
        features : [
            'Cuero premium',
            'Black Cat',
            'Diseño icónico'
        ],
        instock: true       
    },
    {
        name : 'Air Jordan 1 Retro High OG Latte',
        description : 'Gema para los sneakerheads',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 6000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233387/tenis-air-jordan-1-retro-high-og-latte-Dw2wdP_qu1ipo.webp',
        cloudinary_public_id : 'tenis-air-jordan-1-retro-high-og-latte-Dw2wdP_qu1ipo',
        features : [
            'Cuero premium',
            'Colores neutros',
            'Diseño icónico'
        ],
        instock: true
    },
    {
        name : 'Air Jordan 4 Retro Oxidized Green',
        description : 'Zapatillas Jordan 4 con colores metálicos.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 4000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233444/tenis-air-jordan-4-retro-oxidized-green-PNtDJp_yjvd05.jpg',
        cloudinary_public_id : 'tenis-air-jordan-4-retro-oxidized-green-PNtDJp_yjvd05',
        features : [
            'Cuero premium',
            'Colores metálicos',
            'Diseño icónico'
        ],
        instock: true    
    },
    {
        name : 'Air Jordan Retro 11 Retro Low',
        description : 'Air Jordan 11 blancas y negras.',
        brandname :  brands[0].name,
        brandid :  brands[0].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 10000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233489/tenis-grandes-air-jordan-11-retro-low-black-varsity-royal-Fw0r7C_kk6xpw.webp',
        cloudinary_public_id : 'tenis-grandes-air-jordan-11-retro-low-black-varsity-royal-Fw0r7C_kk6xpw'
        ,
        features: [
            'Suela con tracción duradera',
            'Entresuela con buena amortiguación',
            'Diseño clásico y reconocible'
        ],
        instock: true
    },
    {
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines nike para cancha 11 color verde',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233722/calzado-de-f%C3%BAtbol-fg-de-corte-high-superfly-9-elite-mercurial-dream-speed-sb8gJK_tyhg3c.webp',
        cloudinary_public_id : 'calzado-de-f%C3%BAtbol-fg-de-corte-high-superfly-9-elite-mercurial-dream-speed-sb8gJK_tyhg3c'    
        ,
        features: [
            'Corte alto y ceñido (Flyknit)',
            'Placa con tracción para terreno firme (FG)',
            'Ajuste de precisión para velocidad'
        ],
        instock: true
    },
    {
        name : 'Botines Nike Mercurial Superfly 9 Elite',
        description : 'Botines llamativos.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 15000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233770/tacos-de-f%C3%BAtbol-de-corte-para-terreno-firme-de-corte-high-mercurial-superfly-9-elite-sb8gJK_acygo7.webp',
        cloudinary_public_id : 'tacos-de-f%C3%BAtbol-de-corte-para-terreno-firme-de-corte-high-mercurial-superfly-9-elite-sb8gJK_acygo7'      
        ,
        features: [
            'Corte Flyknit para ajuste dinámico',
            'Placa FG para máxima aceleración',
            'Perfil de corte alto para soporte'
        ],
        instock: true
    },
    {
        name : 'Botines Adidas Messi Freestyle',
        description : 'Botines de freestyle de Lionel Andrés Messi.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 22000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233932/zapatilla-adidas-f50-freestyle-24-messi-ftwr-whitegold-metblue-burst-1_eywcun.webp',
        cloudinary_public_id : 'zapatilla-adidas-f50-freestyle-24-messi-ftwr-whitegold-metblue-burst-1_eywcun'      
        ,
        features: [
            'Material sintético ligero',
            'Diseño pensado para control de balón',
            'Agarre y contacto precisos'
        ],
        instock: true
    },
    {
        name : 'Botines Adidas Nemezis 19.2',
        description : 'Botines de fútbol cancha 11.',
        brandname : brands[2].name,
        brandid : brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 35000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742233988/Botines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard_yvxrxp.avif',
        cloudinary_public_id : 'BBotines_Nemeziz_19.2_Terreno_Firme_Rosa_F34384_06_standard_yvxrxp'     
        ,
        features: [
            'Corte ajustado para control',
            'Tracción optimizada para terreno firme',
            'Construcción ligera y adaptable'
        ],
        instock: true
    },
    {
        name : 'Botines Adidas Copa 19.3',
        description : 'Botines de fútbol cancha 11.',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[0].id,
        categoryname : categories[0].name,
        price : 12000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234035/5da07bd7e3f87-1357-4_r7rkgb.jpg',
        cloudinary_public_id : '5da07bd7e3f87-1357-4_r7rkgb'   
        ,
        features: [
            'Pala de cuero premium para toque clásico',
            'Ajuste cómodo y conformado',
            'Suela con agarre equilibrado'
        ],
        instock: true
    },
    {
        name : 'Sabrina 2 Court Vision',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234085/sabrina-2-court-vision-basketball-shoes-NM2JwV_qcufa0.webp',
        cloudinary_public_id : 'sabrina-2-court-vision-basketball-shoes-NM2JwV_qcufa0'
        ,
        features: [
            'Suela con agarre multidireccional',
            'Amortiguación en talón para saltos',
            'Estilo retro inspirado en el baloncesto'
        ],
        instock: true
    },
    {
        name : 'Nike Lebron XXII',
        description : 'Las mejores zapatillas de basket',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 30000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234078/lebron-xxi-basketball-shoes-DjB9tK_br6yjo.webp',
        cloudinary_public_id : 'https://res.cloudinary.com/dch0yp6xx/image/upload/t_Card/v1719280235/lebron-xxi-basketball-shoes-DjB9tK_rhlm2n.webp'
        ,
        features: [
            'Amortiguación máxima para aterrizajes',
            'Soporte de tobillo avanzado',
            'Tracción diseñada para cancha indoor'
        ],
        instock: true
    },
    {
        name : 'Nike Kevin Durant 17 x Alchemist',
        description : 'Zapatillas de basket.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 29500,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1754102334/kd17-x-alchemist.webp',
        cloudinary_public_id : 'kd17-x-alchemist'
        ,
        features: [
            'Diseño ligero para movilidad',
            'Respuesta rápida en la entresuela',
            'Tracción multidireccional para cambios de ritmo'
        ],
        instock: true
    },
    {
        name : 'New Balance 574',
        description : 'Zapatillas para todos los días',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[2].id,
        categoryname : categories[2].name,
        price : 10000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234189/65818d029d6e2-6389105_cunpta.jpg',
        cloudinary_public_id : '65818d029d6e2-6389105_cunpta'
        ,
        features: [
            'Comodidad para uso diario',
            'Entresuela ENCAP para soporte',
            'Diseño clásico versátil'
        ],
        instock: true
    },
    {
        name : 'Reebok Nano X',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 499999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1754102283/reebokNanoX_qrp0vv.jpg',
        cloudinary_public_id : 'reebokNanoX_qrp0vv'
        ,
        features: [
            'Estabilidad lateral para levantamientos',
            'Suela antideslizante multiuso',
            'Construcción duradera para entrenamientos intensos'
        ],
        instock: true
    },
    {
        name : 'Reebok Nano X3 Gum Bottoms',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[4].name,
        brandid :  brands[4].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 325000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/a_-90/a_90/a_hflip/v1742234308/reebok-nano-x-training-shoes-black---true-grey_164544_orbuji.jpg',
        cloudinary_public_id : 'reebok-nano-x-training-shoes-black---true-grey_164544_orbuji'
        ,
        features: [
            'Suela gum para mejor agarre',
            'Refuerzo en zonas de alto desgaste',
            'Estabilidad y confort para WODs'
        ],
        instock: true
    },
    {
        name : 'Nike Metcon 9 AMP',
        description : 'Zapatillas para crossfit.',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[3].id,
        categoryname : categories[3].name,
        price : 75999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234518/DZ2616_001_A_PREM_ibvou3.jpg',
        cloudinary_public_id : 'DZ2616_001_A_PREM_ibvou3'
        ,
        features: [
            'Suela estable para levantamientos',
            'Amortiguación para sprints cortos',
            'Refuerzo en puntera para durabilidad'
        ],
        instock: true
    },
    {
        name : 'Adidas Adilette Slides',
        description : 'Ojotas Adidas',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234546/Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard_crtyya.avif',
        cloudinary_public_id : 'Ojotas_Adilette_Ayoon_Beige_GX7064_06_standard_crtyya'
        ,
        features: [
            'Plantilla acolchada para comodidad',
            'Fáciles de poner y quitar',
            'Secado rápido y uso casual'
        ],
        instock: true
    },
    {
        name : 'Nike More Uptempo Slides',
        description : 'Slides Nike cómodas',
        brandname :  brands[1].name,
        brandid :  brands[1].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 25000,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1742234585/air-more-uptempo-mens-slides-47mMCm_xmn7s7.webp',
        cloudinary_public_id : 'air-more-uptempo-mens-slides-47mMCm_xmn7s7'
        ,
        features: [
            'Correa acolchada para confort',
            'Suela antideslizante',
            'Estilo urbano y cómodo'
        ],
        instock: true
    },
    {
        name : 'Adidas Yeezy Slides',
        description : 'Ojotas caras de Kanye West',
        brandname :  brands[2].name,
        brandid :  brands[2].id,
        categoryid : categories[1].id,
        categoryname : categories[1].name,
        price : 19999,
        image : 'https://res.cloudinary.com/dch0yp6xx/image/upload/c_crop,w_3144,h_3144/v1754102457/adidas_yeezyslide.png',
        cloudinary_public_id : 'adidas_yeezyslide'
        ,
        features: [
            'Espuma EVA ultra suave',
            'Diseño minimalista y moderno',
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