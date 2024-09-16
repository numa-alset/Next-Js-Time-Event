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

async function handler(req,res) {
    const eventId = req.query.eventId;
    
   await client.connect();
    if(req.method === "POST"){
        const {email,name,text}=req.body;
        if (!email || !email.includes('@') || name.trim()==='' || text.trim()==='') {
            res.status(422).json({ message: "invalide Input." });
            return;
        }
        const newComment = {
            
            email,
            name,
            text,
            eventId
        };
        
        

        const db = client.db('events');
       const result = await db.collection('comments').insertOne(newComment);
        console.log(result);
        
        newComment.id = result.insertedId;
        res.status(201).json({message:"added comment",comment:newComment});
        
    }

    if (req.method === "GET") {
        const db = client.db('events');
        const result = await db.collection('comments').find().sort({_id:-1}).toArray();
        res.status(200).json({comments:result});
    }
        client.close();
}
export default handler;