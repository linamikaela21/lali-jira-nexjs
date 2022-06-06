interface EntryInitialData {
  entries: DataInitialEntry[];
}

interface DataInitialEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const initialEntriesData: EntryInitialData = {
  entries: [
    {
      description: "Description of pending task",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Description of in-process task",
      status: "in-process",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Description of completed task",
      status: "completed",
      createdAt: Date.now() - 100000,
    },
  ],
};
