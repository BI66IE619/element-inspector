const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
            },
            responseType: 'text'
        });
        
        // Remove headers that prevent framing
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching site: ${error.message}`);
    }
}
