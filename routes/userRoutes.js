import { Router } from "express";
import { getProfile , login , logout , register, isLoggedIn,forgotPassword,resetPassword,changePassword , updateUser/*, uploads*/ } from "../controller/userController.js";

const router = Router();

router.post('/register'/*,upload.single("avatar")*/,register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me' , isLoggedIn, getProfile);
router.post('/reset' , forgotPassword);
router.post('/reset/:resetToken' , resetPassword);
router.post('/change-password', isLoggedIn , changePassword);
router.put('/update' , isLoggedIn /*,upload.single("avatar")*/ , updateUser)
// router.post('/upload-avatar', isLoggedIn, )

export default router;