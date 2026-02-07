export interface Book {
  id: number;
  title: string;
  author: string;
  category: 'Classics' | 'Contemporary' | 'Thrillers';
}

export interface ReadingProgress {
  readBookIds: number[];
}

export interface Stats {
  totalBooks: number;
  readCount: number;
  percentage: number;
}
