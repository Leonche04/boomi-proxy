export default async function handler(req, res) {
  const boomiUrl = "https://c01-deu.integrate-test.boomi.com/ws/simple/getLuccaLogin";
  const auth = Buffer.from(process.env.BOOMI_AUTH).toString('base64');

  if (req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const response = await fetch(boomiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body,
        redirect: "follow"
      });

      if (response.redirected) {
        res.writeHead(302, { Location: response.url });
        res.end();
      } else {
        const text = await response.text();
        res.status(response.status).send(text);
      }
    });
  } else {
    res.status(405).send("Méthode non autorisée");
  }
}
