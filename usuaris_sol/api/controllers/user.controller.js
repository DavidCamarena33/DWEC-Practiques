import { QGetAllUsers } from "../services/querys.service.js";

export const GetUsers = async (req, res, next) => {
    try {
        const results = await QGetAllUsers();

        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};