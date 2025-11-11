import { parse } from "url";
import next from "next";
import { createServer } from "http";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV || "production"
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parseUrl = parse(req.url, true);
        handle(req, res, parseUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on your console in port : ${port}`)
    });
});
