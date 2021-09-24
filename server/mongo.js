import { MongoClient } from 'mongodb'

async function main(){
    const uri = "mongodb+srv://ryals:F3z4BwPq$@cluster0.qfk29.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDb(client);
    }
    catch{
        console.error(e)
    } finally{
        client.close()
    }
}

main().catch(console.error)

async function listDb(client){
    const dbs = await client.db().admin().listDatabases();

    dbs.databases().forEach(element => {
        console.log(element)
    });

}