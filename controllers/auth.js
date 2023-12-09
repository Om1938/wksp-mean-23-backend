import { loginAuthService } from "../services/auth.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    loginAuthService(email, password)
    .then(({user,token}) => {
        res.cookie('token', token, {
            httpOnly: true,            
        })
        res.json({ user });

    }).catch(next);
        
    } catch (error) {
        next(error);
    }
    }
