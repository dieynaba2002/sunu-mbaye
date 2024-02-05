export interface Annonce {
  id?: number;
  titre: string;
  images: string;
  user_id: number;
  description?: string;
  is_published?: boolean;
}
