
import { client } from "./database"

async function main() {

    
    // for(let object of userArray){
    //     let user = userParser.parse(object)
    // }

    let tableValue = await client.query(
        /*sql*/`
        insert into "user" (email, password, role, created_at, updated_at) values ('hi', 1234, 1, now(), now()),('bye', 1234, 2, now(),now()) 
        returning id`
    )
  console.log(tableValue);
  

    await client.end()
}

main().catch(e => console.error(e))