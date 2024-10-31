export default function apiResponse(res, status, message = null, data = null, error = null) {
    return res.status(status).json({
        status,
        message,
        data,
        error
    });
}