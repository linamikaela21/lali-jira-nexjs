import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { EntryModel, IEntry } from "../../../../models";
import mongoose from "mongoose";

type HandlerData = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerData>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `The id = ${id} is no valid` });
  }

  switch (req.method) {
    case "GET":
      return getEntryById(req, res);

    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlerData>
) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entryById = await EntryModel.findById(id);

    if (!entryById) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: `Task with id ${id} doesn't exist` });
    }

    await db.disconnect();
    return res.status(200).json(entryById!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ message: error.errors.status.message });
  }
};

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<HandlerData>
) => {
  const { id } = req.query;

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: `Task with id ${id} doesn't exist` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const entryUpdated = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    await db.connect();
    return res.status(200).json(entryUpdated!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ message: error.errors.status.message });
  }
};
