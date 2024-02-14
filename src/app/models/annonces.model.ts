export interface Annonce {
  id?: number;
  titre: string;
  images: string;
  user_id: number;
  user_nom?: string;
  description?: string;
  is_published?: boolean;
}
