// pages/api/search.js

import Bike from '@/models/bikeModel.js';
import apiResponse from './common/api-response.js';
import { Op } from 'sequelize';

export default async function handler(req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'POST') {
            try {
                const body = req.body;
                
                const response = await Bike.findAll({
                    where: {
                        ...(body?.description && {
                            description: {
                                [Op.iLike]: `%${body.description}%`,
                            },
                        }),
                        ...(body?.type && {
                            type: {
                                [Op.iLike]: `%${body.type}%`,
                            },
                        }),
                    },
                });
                
                if (response.length < 1) return apiResponse(res, 204, null, null, "No record found!");

                return apiResponse(res, 200, "Data fetched successfully.", response);
            } catch (error) {
                console.error(error);
                return apiResponse(res, 500, "Something went wrong!", null, error);
            }
        }

        res.setHeader('Allow', ['POST']);
        return apiResponse(res, 405, null, null, `Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, "Internal Server Error.", null, error);
    }
}