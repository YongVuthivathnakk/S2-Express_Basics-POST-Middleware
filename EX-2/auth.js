const AUTH_TOKEN = 'xyz123';

const auth = (req, res, next) => {
    const { token } = req.query;

    if(!token || token !== AUTH_TOKEN) {
        return res.status(401).json({error: "Unauthorized: Invalid or missing token"});
    }
    next();
};

export default auth;