export type Theme = 'green' | 'blue' | 'light' | undefined | 'dark';

export interface Word {
  word: string;
  id: string;
  status: string;
  display: boolean;
};
