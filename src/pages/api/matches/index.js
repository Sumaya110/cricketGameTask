import connectMongo from "@/config/ConnectDB/ConnectDB";
import { createMatch } from "@/libs/services/match-service";


export default async function handler(req, res){
    try{
        await connectMongo()
        switch(req.method){
            case "POST":
                return await createMatch(req, res);
        }
    } catch(error){
        return res.status(500).json({error})
    }
}