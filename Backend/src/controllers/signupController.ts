import { Request, Response } from "express"
import supabase from "../supabaseClient";

const createUser = async (req: Request, res: Response ) => {

    try {
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password,
            options: {
                data: { display_name: req.body.username }
            }
        })
        if (error) throw error;
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to sign up' });
    }
}

export default {
    createUser
}