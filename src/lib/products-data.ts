export interface Product {
    id: number;
    name: string;
    category: 'Matériaux' | 'Outillage' | 'Électricité' | 'Finition';
    price: number;
    salePrice?: number; // Prix optionnel pour les articles en solde
    imageUrl: string;
    rating: number;
    isNew?: boolean;
}

export const productsData: Product[] = [
    {
        id: 1,
        name: "Ciment Haute Performance (Sac 50kg)",
        category: "Matériaux",
        price: 45000,
        imageUrl: "/img/store/image.png",
        rating: 5,
        isNew: true
    },
    {
        id: 2,
        name: "Perceuse-visseuse sans fil Pro",
        category: "Outillage",
        price: 360000,
        salePrice: 297000,
        imageUrl: "/img/store/perceuse.jpg",
        rating: 4
    },
    {
        id: 3,
        name: "Disjoncteur différentiel 16A",
        category: "Électricité",
        price: 75000,
        imageUrl: "/img/store/disjoncteur.webp",
        rating: 5
    },
    {
        id: 4,
        name: "Peinture Blanche Mat (Pot 10L)",
        category: "Finition",
        price: 135000,
        imageUrl: "/img/store/peinture.webp",
        rating: 4
    },
    {
        id: 5,
        name: "Jeu de Tournevis Isolés",
        category: "Outillage",
        price: 105000,
        imageUrl: "/img/store/tournevis.webp",
        rating: 5
    },
    {
        id: 6,
        name: "Briques de construction (Palette)",
        category: "Matériaux",
        price: 1050000,
        salePrice: 960000,
        imageUrl: "/img/store/brique.webp",
        rating: 5
    },
    {
        id: 7,
        name: "Rouleau de Câble Électrique 100m",
        category: "Électricité",
        price: 240000,
        imageUrl: "/img/store/cable.webp",
        rating: 4,
        isNew: true
    },
    {
        id: 8,
        name: "Carrelage Effet Marbre (m²)",
        category: "Finition",
        price: 66000,
        imageUrl: "/img/store/carreau.webp",
        rating: 5
    },
];
