import { Home } from "../pages/Home";
import { Auth } from "../pages/Auth";
import { Register } from "../pages/Register";
import { RegisterBroker } from "../pages/RegisterBroker";
import { Login } from "../pages/Login";
import { Profile } from "../pages/Profile";
import { Upgrade } from "../pages/Upgrade";

export default {
  protected: [
    { title: "Home", component: Home, options: {} },
    { title: "Profile", component: Profile, options: {} },
    { title: "Upgrade", component: Upgrade, options: {} },
  ],
  public: [
    { title: "Auth", component: Auth, options: {} },
    { title: "RegisterBroker", component: RegisterBroker, options: {} },
    { title: "Register", component: Register, options: {} },
    { title: "Login", component: Login, options: {} },
  ],
};
