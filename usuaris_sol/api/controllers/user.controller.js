import { QGetAllUsers } from "../services/querys.service";

export const GetUsers = async (req, res) => {
    try {
        const results = await QGetAllUsers();

        res.status(200).json(results);
    } catch (err) {
        errorHandler(err);
    }
};