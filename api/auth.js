const fetch = require('node-fetch');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://zombie367.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { code } = req.body;

    try {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: '1311872021365260358',
                client_secret: 'njBqyxL8stHB0rNpd651cBFtw6t39uP-',
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://zombie367.github.io/ticket-transcripts/callback.html'
            })
        });

        const data = await tokenResponse.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
}; 