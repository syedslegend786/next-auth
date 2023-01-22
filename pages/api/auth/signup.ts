import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "lib/mongoose";
import userModal from "modals/user.modal";
interface IBody {
  name: string;
  email: string;
  password: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name, password } = req.body as IBody;
    await dbConnect();
    const user = await userModal.findOne({ email: email });
    if (user) {
      return res.status(500).json({ msg: "Email already exist." });
    }
    await userModal.create({
      email,
      name,
      password,
    });
    return res.status(200).json({ msg: "User created successfully!" });
  } catch (error: any) {
    return res.status(500).json({ msg: error.message });
  }
};

export default handler;
