function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://comfortmeubel.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

module.exports = corsMiddleware;