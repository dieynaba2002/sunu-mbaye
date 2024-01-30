export interface Produit {
    id?: number;
    nom_produit: string;
    images: string;
    quantite: number;
    prix: number;
    user_id: number;
    categorie_id: number;
    description?: string;
}
