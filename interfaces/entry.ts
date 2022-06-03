export interface Entry {
  _id: string;
  description: string;
  status: string;
  createdAt: number;
}

export type EntryStatus = 'pending' | 'in-process' | 'completed'