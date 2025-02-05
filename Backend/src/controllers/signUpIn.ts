import { Request, Response } from "express"
import supabase from "../supabaseClient";

const createUser = async (req: Request, res: Response ) => {
    const { username, email, password } = req.body;
    console.log({username, email, password})

    try {
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password
        })
        if (error) throw error;
        res.status(200).send(data);''
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to sign up' });
    }
}

export default {
    createUser,
}