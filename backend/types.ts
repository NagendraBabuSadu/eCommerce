import {z} from 'zod';

export const User = z.object({
    email: z.string(),
    password: z.string()
})

type User = z.infer<typeof User>

module.exports = {
    User : User
}
