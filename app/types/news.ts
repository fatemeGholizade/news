export interface IArticle {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }
  
  export interface INewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: IArticle[];
  }
  