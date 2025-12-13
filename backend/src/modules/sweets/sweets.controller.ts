import * as s from "./sweets.service";
export const create = async (req: any, res: any) =>
  res.json(await s.createSweet(req.body));

export const list = async (_: any, res: any) =>
  res.json(await s.getAll());

export const search = async (req: any, res: any) =>
  res.json(await s.search(req.query));

export const update = async (req: any, res: any) =>
  res.json(await s.updateSweet(+req.params.id, req.body));

export const remove = async (req: any, res: any) =>
  res.json(await s.deleteSweet(+req.params.id));
