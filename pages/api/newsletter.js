import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Numa:maklaren@next-js-time-event.91kxs.mongodb.net/?retryWrites=true&w=majority&appName=Next-Js-Time-Event";
const client = new MongoClient(uri,
//      {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// }
);
async function  handler(req,res) {
    if (req.method === 'POST') {
       const userEmail = req.body.email;
        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message:"invalide Email Address."});
            return;
        }
     await client.connect();
        
            const db =client.db('events');
          await  db.collection('newsletter').insertOne({email:userEmail});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
            client.close();
        console.log(userEmail);
        res.status(201).json({message:"signed up!"});
    }
}
export default handler;