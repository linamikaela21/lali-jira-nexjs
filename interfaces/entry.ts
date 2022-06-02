export interface Entry {
  _id: string;
  description: string;
  status: string;
  createdAt: string;
}

export type EntryStatus = 'pending' | 'in-progress' | 'completed'