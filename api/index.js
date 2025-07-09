export default async function handler(req, res) {
  const { useremail } = req.query;

  if (!useremail) {
    return res.status(400).send("Paramètre 'useremail' manquant");
  }

  const boomiUrl = `https://c01-deu.integrate-test.boomi.com/ws/simple/getLuccaLogin?user=${encodeURIComponent(useremail)}`;

  const auth = Buffer.from(
    "boomitest@dalkiaelectrotechnics-MK4UKY.KWC3QR:47c6ab20-838c-49fa-b148-9238b36f85ef"
  ).toString("base64");

  try {
    const response = await fetch(boomiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`
      },
      redirect: "follow"
    });

    if (response.redirected) {
      res.writeHead(302, { Location: response.url });
      res.end();
    } else {
      const text = await response.text();
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error("Erreur Boomi :", error);
    res.status(500).send("Erreur lors de l’appel Boomi");
  }
}
