import {z} from 'zod';

const createUser = z.object({
    email: z.string(),
    password: z.string()
})
const updateUser = z.object({
    email: z.string(),
    password: z.string()
})



type createUser = z.infer<typeof createUser>
type updateUser = z.infer<typeof updateUser>


export { createUser, updateUser };