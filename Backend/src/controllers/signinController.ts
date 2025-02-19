import { Request, Response } from "express"
import supabase from "../utils/supabaseClient";

const loginUser = async (req: Request, res: Response ) => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: req.body.email,
            password: req.body.password
        })
        if (error) throw error;

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            username: userData.user.user_metadata.display_name,
            // Supabase session for user
            session: data.session,
            user: data.user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to log in'
        });
    }
}

export default {
    loginUser
}