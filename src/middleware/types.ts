export  interface Categorie{
    name: string;
    description: string;
    id:string;
}

export  interface dataRestaurant{
    address: string;
    description: string;
    name: string;
}

export interface Item{
    id:string;
    name: string;
    picture:string;
}

export interface Type{
    id:string;
    name:string;
    price: number;
}

export interface Table{
    id?:string;
    name:string;
    description:string;
    picture:string;
}
export interface Order{
    id:string;
    date:string;
    status:number;
    table:Table;
}