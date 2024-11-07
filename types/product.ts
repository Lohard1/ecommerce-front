export interface ProductType {
    _id?: string;
    __v?: number; 
    title?: string;
    description?: string;
    price?: number; 
    images?: Array<string>;
    category?: string;
    properties?: Array<{name: string, values: string } > ;
}

export interface ProductCart extends ProductType{
    quantity: number;
}