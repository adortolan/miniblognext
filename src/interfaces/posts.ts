export interface Posts {
  id: string;
  titulo: string;
  conteudo: string;
  image: string;
  userId: string;
  tagsArray: string[];
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
