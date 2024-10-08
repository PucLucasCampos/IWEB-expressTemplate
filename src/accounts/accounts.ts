import { Request, RequestHandler, Response } from "express";

/*
    Nampespace que contém tudo sobre "contas de usuários"
    namespace -> é um contêiner ou ambiente abstrato criado para conter um agrupamento lógico de identificadores ou símbolos exclusivos. 
                 Um identificador definido em um namespace está associado apenas a esse namespace.
*/
export namespace AccountsHandler {
   /**
    * Tipo UserAccount
    */
   export type UserAccount = {
      name: string;
      email: string;
      password: string;
      birthdate: string;
   };

   // Array que representa uma coleção de contas.
   // tabela do oracle
   let accountsDatabase: UserAccount[] = [];

   /**
    * Salva uma conta no banco de dados.
    * @param ua conta de usuário do tipo @type {UserAccount}
    * @returns @type { number } o código da conta cadastrada como posição no array.
    */
   export function saveNewAccount(ua: UserAccount): number {
      accountsDatabase.push(ua);
      return accountsDatabase.length;
   }


   /**
    * Verifica se a conta existe no banco de dados.
    * @param email e @param password do tipo suário do tipo @type {string}
    * @returns @type { boolean } se existe ou nao o valor no banco
    */
   // export -> a função pode ser acessada diretamente de fora do namespace
   export function accountExists(email: string, password: string): boolean {
      let exist: boolean = false;
      accountsDatabase.find((a) => {
         if (a.email === email && a.password === password) {
            exist = true;
            // return; // Retorna o primeiro valor encontrado
         }
      });
      return exist;
   }

   /**
    * Função para tratar a rota HTTP /signUp.
    * @param req Requisição http tratada pela classe @type { Request } do express
    * @param res Resposta http a ser enviada para o cliente @type { Response }
    */
   export const createAccountRoute: RequestHandler = (req: Request, res: Response) => {
      // Passo 1 - Receber os parametros para criar a conta
      const pName = req.get("name");
      console.log(pName);
      const pEmail = req.get("email");
      console.log(pEmail);
      const pPassword = req.get("password");
      console.log(pPassword);
      const pBirthdate = req.get("birthdate");
      console.log(pBirthdate);

      if (pName && pEmail && pPassword && pBirthdate) {
         if (accountExists(pEmail, pPassword)) {
            res.send("Email ja existe!");
         } else {
            // prosseguir com o cadastro...
            const newAccount: AccountsHandler.UserAccount = {
               name: pName,
               email: pEmail,
               password: pPassword,
               birthdate: pBirthdate,
            };
            const ID = AccountsHandler.saveNewAccount(newAccount);
            res.statusCode = 200;
            res.send(`Nova conta adicionada. Código: ${ID}`);
         }
      } else {
         res.statusCode = 400;
         res.send("Parâmetros inválidos ou faltantes.");
      }
   };

   /**
    * Função para tratar a rota HTTP /login.
    * @param req Requisição http tratada pela classe @type { Request } do express
    * @param res Resposta http a ser enviada para o cliente @type { Response }
    */
   export const loginAccount: RequestHandler = (req: Request, res: Response) => {
      const pEmail = req.get("email");
      const pPassword = req.get("password");

      if (pEmail && pPassword) {
         if (accountExists(pEmail, pPassword)) {
            res.statusCode = 200;
            res.send("Sucesso!");
         } else {
            res.statusCode = 404;
            res.send("Usuario e ou Senha inválidos");
         }
      } else {
         res.statusCode = 400;
         res.send("Parâmetros inválidos ou faltantes.");
      }
   };

   /**
    * Função para tratar a rota HTTP /getAllAccounts.
    * @param req Requisição http tratada pela classe @type { Request } do express
    * @param res Resposta http a ser enviada para o cliente @type { Response }
    */
   export const getAllAccounts: RequestHandler = (req: Request, res: Response) => {
      res.statusCode = 200;
      res.send(accountsDatabase);
   };
}
/*
Ex1: criar uma função que verifique se já existe uma conta com aquele email no banco FEITO

Ex2: na rota de criação de contas singUp existe um probelma, resolva. DUVIDA ?

Ex3: criar uma rota chamada login, que receba os parametros email e senha e que verifique se existe no banco de dados contas se existe 
uma conta com aquele email e senha informados. Caso exista devolver código 200 http e o texto "sucesso". Caso contrário http 404 e o 
texto usuario e ou senha inválidos. FEITO

Ex4: criar uma rota chamada getAllAccounts que retorne uma lista de constas cadastradas (todas). FEITO

*/
