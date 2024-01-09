import connectMongo from "@/config/ConnectDB/ConnectDB";
import { createMatch, updateMatch, getMatch } from "@/libs/services/match-service";

export default async function handler(req, res) {
  try {
    await connectMongo();
    switch (req.method) {
      case "POST":
        return await createMatch(req, res);
      case "PATCH":
        return await updateMatch(req, res);
      case "GET":
        return await getMatch(req, res);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}
