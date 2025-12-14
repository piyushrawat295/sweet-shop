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

/* =========================
   ✅ PURCHASE SWEET (NEW)
   ========================= */
export const purchase = async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const updatedSweet = await s.purchaseSweet(id);
    res.json(updatedSweet);
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Purchase failed"
    });
  }
};
