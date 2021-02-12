const http = require("http");
const fs = require("fs");

const route = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write('<head> <meta charset="UTF-8"> <title>first page</title></head>');
    res.write(
      '<body><h1>first page</h1><form action="/" method="POST"><input type="text" name="test"></form><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedbody = Buffer.concat(body).toString();
      const message = parsedbody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = route;
