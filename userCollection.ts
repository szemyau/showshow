import { client } from "./database";

export class UserCollection {
    private users: string[] = [];
  
    static async findUserByEmail(email:string) {

        let user=(await client.query(`select id from "user" where email = $1`,[email])).rows
        console.log({user});
        
      return user

    }
  }