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
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "in-process",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      status: "completed",
      createdAt: Date.now() - 100000,
    },
  ],
};
