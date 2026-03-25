export interface Restaurant {
    id: number;
    name: string;
    slug: string;
    category: string;
    rating: number;
    reviews: number;
    address: string;
    specialties: string[];
    image: string;
    time: string;
    logo: string;
    banner?: string;
    phone: string;
    welcome: string;
    categories: string[];
    menu: {
        [key: string]: Array<{
            name: string;
            rating: number;
            reviews: number;
            price: number;
            img: string;
        }> | undefined;
    };
    hours: string;
}
