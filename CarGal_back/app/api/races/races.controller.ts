import { Request, Response } from "express";
import Bd from "../../bd/bd";


export default class RacesController {
    async findAll(req: Request, res: Response) {
        try {
            if (!!req.query.startDate) {
                const startDate = new Date(req.query.startDate.toString());
                if (!isNaN(startDate.getTime())) {
                    const minimunDate = startDate.toISOString().split('T')[0];
                    res.status(200).json(Bd.instance.storedData.filter(x => x.fecha.split('/')[0] >= minimunDate));
                } else {
                    res.status(400).json({
                        message: "Parámetro incorrecto"
                    });
                }
            } else {
                res.status(200).json(Bd.instance.storedData);
            }
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}
