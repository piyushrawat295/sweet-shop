export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message || "Server Error" });
};
