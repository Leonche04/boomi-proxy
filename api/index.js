export default async function handler(req, res) {
  const boomiUrl = "https://c01-deu.integrate-test.boomi.com/ws/simple/getLuccaLogin?user=leo.marchand@dalkiaelectrotechnics.fr";

  const auth = Buffer.from("boomitest@dalkiaelectrotechnics-MK4UKY.KWC3QR:47c6ab20-838c-49fa-b148-9238b36f85ef").toString('base64');

  const response = await fetch(boomiUrl, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`
    },
    redirect: 'follow'
  });

  // Redirige vers la réponse finale si 3xx, sinon affiche un message
  if (response.redirected) {
    res.writeHead(302, { Location: response.url });
    res.end();
  } else {
    const text = await response.text();
    res.status(response.status).send(text);
  }
}
