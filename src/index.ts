import Registration from "./pages/Registration";
import Authorisation from "./pages/Authorisation";
import Profile from "./pages/Profile";
import Router from "./core/Router";
import "./styles.css";

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error();
  }

  const router = new Router(rootElement);

  router
    .use("/signup", Registration)
    .use("/auth", Authorisation)
    .use("/profile", Profile)
    .start();
});
