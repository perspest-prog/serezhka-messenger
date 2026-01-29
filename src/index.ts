import Registration from "./pages/Registration";
import Authorisation from "./pages/Authorisation";
import Profile from "./pages/Profile";
import { AuthController, router } from "./core/settings"
import "./styles.css";


window.addEventListener("DOMContentLoaded", async () => {
  await AuthController.getUser()
  router
    .use("/signup", Registration)
    .use("/auth", Authorisation)
    .use("/profile", Profile)
    .start();
});