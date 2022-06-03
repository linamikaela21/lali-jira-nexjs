import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { EntryModel, IEntry } from "../../../models";

type HandlerData = { message: string } | { entries: IEntry[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerData>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "This endpoind does no exist" });
  }
}

const getEntries = async (res: NextApiResponse<HandlerData>) => {
  await db.connect();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  await db.disconnect();

  res.status(200).json(entries);
};

const postEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlerData>
) => {
  const { description = "" } = req.body;

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error: any) {
    await db.disconnect();
    return res
      .status(500)
      .json({ message: error.errors.status.message });
  }
};
