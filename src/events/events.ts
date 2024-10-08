import { Request, RequestHandler, Response } from "express";

export namespace EventHandler {
   /**
    * Tipo Event
    */
   export type Event = {
      name: string;
      data: string | number;
      horario: string | number;
      local: string;
   };

   let eventDatabase: Event[] = [];

   /**
    * Salva uma conta no banco de dados.
    * @param gt conta de usuário do tipo @type {Event}
    * @returns @type { number } o código da conta cadastrada como posição no array.
    */
   export function saveNewEvent(gt: Event): number {
      eventDatabase.push(gt);
      return eventDatabase.length;
   }

//    /**
//     * Função para tratar a rota HTTP /signUp.
//     * @param req Requisição http tratada pela classe @type { Request } do express
//     * @param res Resposta http a ser enviada para o cliente @type { Response }
//     */
//    export function creatEventRoute: RequestHandler = (req: Request, res:Response) => {
//       const eName = req.get("name")
//    }
}
