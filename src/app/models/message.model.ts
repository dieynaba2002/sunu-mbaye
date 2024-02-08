export interface Message {
  id?: number;
  nom: string;
  email: string;
  telephone: string;
  message: string;
}

// Modèle pour représenter la réponse complète du backend
export interface MessageResponse {
  status: boolean;
  messages?: Message[];
}