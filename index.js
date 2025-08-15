// import hapi from "@hapi/hapi";


// const httpServer = hapi.server({
//     host: "localhost",
//     port: 9000,
// });

// httpServer.route({
//     method: "GET",
//     path: "/",
//     handler: (request, h) => {
//         return "hello,my name is amirhossein";
//     }
// });

// await httpServer.start();
// console.log(`Server running at: ${httpServer.info.uri}`);


import hapi from "@hapi/hapi";
import inert from "@hapi/inert";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const httpServer = hapi.server({
    host: "localhost",
    port: 9000,
});

await httpServer.register(inert);

httpServer.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
        return h.file(path.join(__dirname, "6", "chat.html"));
    }
});

httpServer.route({
    method: "GET",
    path: "/6/{param*}",
    handler: {
        directory: {
            path: path.join(__dirname, "6")
        }
    }
});

await httpServer.start();
console.log(`Server running at: ${httpServer.info.uri}`);

