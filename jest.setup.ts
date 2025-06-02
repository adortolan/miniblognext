import { Request, Response } from "node-fetch";

(global as any).Request = Request;
(global as any).Response = Response;

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}
