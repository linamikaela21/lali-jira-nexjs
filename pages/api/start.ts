import type { NextApiRequest, NextApiResponse } from "next";
import { db, initialEntriesData } from "../../database";
import { EntryModel } from "../../models";

type Data = {
  message: string;
};

export default async function initialHandler(
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Access denied" });
  }

  await db.connect();
  await EntryModel.deleteMany();
  await EntryModel.insertMany(initialEntriesData.entries);
  await db.disconnect();

  res.status(200).json({ message: "Process Success" });
}
