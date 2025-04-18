export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
}
