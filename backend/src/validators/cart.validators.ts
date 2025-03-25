import { z } from "zod";

const createCart = z.object({
   products: z.union([
     z.array(
       z.object({
         productName: z.string(),
         quantity: z.number(),
        })
      ),
      z.object({
        productName: z.string(),
        quantity: z.number(),
     })
   ])
 });
type createCart = z.infer<typeof createCart>;

export { createCart };
