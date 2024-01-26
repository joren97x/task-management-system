import { RefreshToken } from "../models/RefreshToken.js"

export const deleteRefreshToken = async (req, res) => {
    try {
        await RefreshToken.destroy({
            where: {
                userId: req.params.id
            }
        })
        res.status(204).send()
    }
    catch(error) {
        res.status(500).send({message: "Internal server error"})
        console.log(error)
    }
}