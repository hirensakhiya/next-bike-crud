// pages/api/search.js

import pool from '@/lib/db-config';
import apiResponse from './common/api-response.js';

export default async function handler(req, res) {
    const client = await pool.connect();

    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method === 'POST') {
            try {
                let queryKeys = [], queryValues = [];
                const body = req.body;

                if (body?.description) {
                    queryKeys.push(`description ILIKE $${queryValues.length + 1}`);
                    queryValues.push(`%${body.description}%`)
                }
                if (body?.type) {
                    queryKeys.push(`type ILIKE $${queryValues.length + 1}`);
                    queryValues.push(`%${body.type}%`)
                }

                const response = await client.query(`SELECT * FROM tblbikes ${queryKeys.length > 0 ? 'WHERE ' + queryKeys.join(' AND ') : ''}`, queryValues);
                if (response.rows.length < 1) return apiResponse(res, 204, null, null, "No record found!");

                return apiResponse(res, 200, "Data fetched successfully.", response.rows);
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
    } finally {
        client.release();
    }
}