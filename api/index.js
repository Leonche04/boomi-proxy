export default async function handler(req, res) {
  const boomiUrl = "https://c01-deu.integrate-test.boomi.com/ws/simple/getLuccaLogin?user=leo.marchand@dalkiaelectrotechnics.fr";

  const auth = Buffer.from(process.env.BOOMI_AUTH).toString('base64');

  const response = await fetch(boomiUrl, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`
    },
    redirect: 'follow'
  });

  if (response.redirected) {
    res.writeHead(302, { Location: response.url });
    res.end();
  } else {
    const text = await response.text();
    res.status(response.status).send(text);
  }
}
