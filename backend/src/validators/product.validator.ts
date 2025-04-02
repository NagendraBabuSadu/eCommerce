import {z} from 'zod';

const createProduct = z.object({
    productName: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string()
});

type createProduct = z.infer<typeof createProduct>

export { createProduct };
