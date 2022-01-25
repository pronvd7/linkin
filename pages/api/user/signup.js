import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { createSecureToken } from "../../../lib/crypto";

import { createUser } from "../../../lib/dbfuncprisma";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
   
    let response = await createUser(req.body);
    if (!response.success) {
      res.status(401).json({ success: false, message: response.data });
      return;
    }

    let token = createSecureToken({ username: response.data.username });

    const cookie = serialize("linkin.auth", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 365,
    });

    res.setHeader("Set-Cookie", [cookie]);

    res.status(200).json({ success: req.body.password, token });
  
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}
