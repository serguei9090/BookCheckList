export interface Book {
  id: number;
  title: string;
  author: string;
  category: 'Classics' | 'Contemporary' | 'Thrillers';
}

export interface ReadingProgress {
  readBookIds: number[];
  downloadedBookIds: number[];
}

export interface Stats {
  totalBooks: number;
  readCount: number;
  downloadedCount: number;
  readPercentage: number;
  downloadedPercentage: number;
}
