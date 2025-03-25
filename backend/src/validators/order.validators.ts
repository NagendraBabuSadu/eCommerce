import { z } from "zod";

const createOrder = z.object({
  products: z.array(
    z.object({
      productName: z.string(),
      quantity: z.number(),
    })
  ),
  userId: z.string(),
  totalPrice: z.number(),
  paymentStatus: z.string(),
});
type createOrder = z.infer<typeof createOrder>;

export { createOrder };
