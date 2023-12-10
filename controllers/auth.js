import { loginAuthService, registerAuthService } from "../services/auth.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    loginAuthService(email, password)
      .then(({ user, token }) => {
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.json({ user });
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerAuthService(username, email, password);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
