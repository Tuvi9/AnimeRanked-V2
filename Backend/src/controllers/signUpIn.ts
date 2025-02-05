import { Request, Response } from "express"
import supabase from "../supabaseClient";

const createUser = async (req: Request, res: Response ) => {
    const { email, password } = req.body;
    console.log({ email, password})

    try {
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password
        })
        if (error) throw error;
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to sign up' });
    }
}

const loginUser = async (req: Request, res: Response ) => {
    const { email, password } = req.body;

    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })
        if (error) throw error;
        res.status(200).json({
            success: true,
            message: 'Login successful'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Failed to log in'
        });
    }
}

export default {
    createUser,
    loginUser
}