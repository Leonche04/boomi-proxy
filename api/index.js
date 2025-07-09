export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Méthode non autorisée');
    }

    const { UserName, PasswordNbChar } = req.body;

    const boomitestUser = 'boomitest@dalkiaelectrotechnics-MK4UKY.KWC3QR';
    const boomitestPassword = '47c6ab20-838c-49fa-b148-9238b36f85ef';

    const authHeader = 'Basic ' + Buffer.from(`${boomitestUser}:${boomitestPassword}`).toString('base64');

    try {
        const response = await fetch('https://c01-deu.integrate-test.boomi.com/ws/simple/executeGetLuccaLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader
            },
            body: new URLSearchParams({
                UserName,
                PasswordNbChar
            }).toString()
        });

        const boomiResponse = await response.text();
        res.status(response.status).send(boomiResponse);
    } catch (error) {
        console.error('Erreur lors de l’appel Boomi:', error);
        res.status(500).json({ error: 'Erreur serveur Boomi' });
    }
}
