import Repository from "../repository/matchRepository";

export const createMatch = async (req, res) =>{
    try{
        const response = Repository.createMatch({data: req.body});
        return res.status(200).json(response)
    } catch(error){
        return res.status(500).json({error})
    }
}