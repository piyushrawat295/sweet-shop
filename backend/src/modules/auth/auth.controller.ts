import * as service from "./auth.service";
export const register = async (req: any, res: any) => {
  const user = await service.register(req.body.email, req.body.password);
  res.json(user);
};

export const login = async (req: any, res: any) => {
  const token = await service.login(req.body.email, req.body.password);
  res.json({ token });
};
