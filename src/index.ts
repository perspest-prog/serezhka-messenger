import Registration from "./pages/Registration";
import Authorisation from "./pages/Authorisation";
import Profile from "./pages/Profile";
import Router from "./core/Router";
import Store from "./core/Store";
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

const store = new Store({name: 5})

setInterval(() => {
  const length = 10;
  const randomString = Math.random().toString(36).substring(2, 2 + length);

  store.dispatch({type: 'string', payload: {name: randomString}})
}, 3000)