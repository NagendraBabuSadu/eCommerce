// Write boiler plate for express.json
import express from 'express';
import { User } from './types';
import { createUser } from './db';

const app = express();
app.use(express.json());

app.post("/user", async function (req: any, res: any) {

    const createPayload = req.body;
    const parsedPayload = User.safeParse(createPayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent wrong inputs"
        });
        return;
    } 
    //put it in mongoDb
    await createUser.create({
        email: createPayload.email,  
        password: createPayload.password 
    })

    res.status(200).json({
        msg: "User is created."
    })
})



app.get("/users",async function (req: any, res:any) {

    const users = createUser.find({
        
    })
  

    console.log("users", users)

    res.status(200).json({
        users: users
    })
})



app.listen(3000);
