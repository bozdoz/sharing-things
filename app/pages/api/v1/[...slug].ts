/**
 * This is a catch-all which is used for CRUD
 * for ALL models
 */

import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { Model } from "mongoose";
import dbConnect from "utils/dbConnect";
import user from "models/User";
import thing from "models/Thing";
import claim from "models/Claim";

const modelMap = {
  user,
  thing,
  claim,
};

const getSlug = (req: Req) => {
  const {
    query: { slug = [] },
  } = req;

  return slug;
};

const getModel = (req: Req): Model<any> => {
  // SLUGS:
  // /api/v1/user/create
  // /api/v1/user/123/view (one)
  // /api/v1/user/list (many)
  // /api/v1/user/123/update
  // /api/v1/user/123/delete
  const [modelName] = getSlug(req);

  const model = modelMap[modelName as keyof typeof modelMap];

  if (!model) {
    throw new Error(`No model found: ${modelName}`);
  }

  return model;
};

export default async function handler(req: Req, res: Res) {
  const slug = getSlug(req);
  const len = slug.length;

  let action = len === 1 ? "list" : (slug[len - 1] as keyof typeof actions);

  if (!(action in actions)) {
    action = "view";
  }

  await dbConnect();

  const actionFnc = actions[action];

  try {
    await actionFnc(req, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
}

// test with:
// curl -H "Content-Type: application/json" \
//   -X POST -d '{"name":"ben"}' \
//   http://localhost:3000/api/v1/user/create

const create = async (req: Req, res: Res) => {
  const model = getModel(req);
  const instance = await model.create(req.body);
  res.status(201).json({ success: true, data: instance });
};

const view = async (req: Req, res: Res) => {
  const [, id] = getSlug(req);
  const model = getModel(req);
  const instance = await model.findById(id);

  if (!instance) {
    throw new Error(`Cannot find instance by id: ${id}`);
  }

  res.status(200).json({ success: true, data: instance });
};

const list = async (req: Req, res: Res) => {
  const model = getModel(req);
  const instances = await model.find({});
  res.status(200).json({ success: true, data: instances });
};

const update = async (req: Req, res: Res) => {
  const [, id] = getSlug(req);
  const model = getModel(req);
  const instance = await model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    upsert: true,
  });
  res.status(200).json({ success: true, data: instance });
};

const deleteFn = async (req: Req, res: Res) => {
  const [, id] = getSlug(req);
  const model = getModel(req);
  const instance = await model.deleteOne({ _id: id });
  res.status(200).json({ success: true, data: instance });
};

const actions = {
  create,
  view,
  list,
  update,
  delete: deleteFn,
};
