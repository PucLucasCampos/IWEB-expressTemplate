import express from "express";
import { Request, Response, Router } from "express";
import { AccountsHandler } from "./accounts/accounts"; // Modulo que trata as contas de usuario
import { EventHandler } from "./events/events";

const port = 3000;
const server = express();
const routes = Router();

// definir as rotas.
// a rota tem um verbo/método http (GET, POST, PUT, DELETE)
routes.get("/", (req: Request, res: Response) => {
   res.statusCode = 403;
   res.send("Acesso não permitido.");
});

// vamos organizar as rotas em outro local
routes.put("/signUp", AccountsHandler.createAccountRoute);

routes.put("/login", AccountsHandler.loginAccount);

routes.get("/getAllAccounts", AccountsHandler.getAllAccounts);

// routes.put("/getEvent", EventHandler.creatEventRoute);

server.use(routes);

server.listen(port, () => {
   console.log(`Server is running on: ${port}`);
});
