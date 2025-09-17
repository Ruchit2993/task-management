import { User } from "../model/user-model.js";
import { createUser } from "./userUtil";

const create = async (req, res) => {
    const user = createUser({ firstName: "jay" });

    console.log(user)
}

export { create }

