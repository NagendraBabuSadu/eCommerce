import {z} from 'zod';

const createUser = z.object({
    email: z.string(),
    password: z.string(), 
    role: z.enum(["user", "admin"]).optional()
})
const updateUser = z.object({
    email: z.string(),
    password: z.string(),
    role: z.string()
})



type createUser = z.infer<typeof createUser>
type updateUser = z.infer<typeof updateUser>


export { createUser, updateUser };