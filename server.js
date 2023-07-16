const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const {MongoClient, ObjectId}=require('mongodb')
const url = "mongodb+srv://Arif2048:20484423@cluster0.4etohll.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const app = express()
const date=require(__dirname+"/date.js")









const dbName = 'tododb';

async function dbconnect() {
    // Use connect method to connect to the server
    let result=await client.connect();
    console.log('Connected successfully to server');
    const db = result.db(dbName);
    return db;
   
  
    return 'done.';
  }
dbconnect()
// dbconnect().then((resp)=>{
//     resp.find().toArray().then((data)=>{
//         console.warn(data)
//     })
// })
// const read=async ()=>{
//     const db=await dbconnect()
//     let data=await db.find().toArray()  
//     console.log(data)
// }
const read_work=async ()=>{
    const db=await dbconnect()
    const dc=db.collection("work")
    let res=await dc.find().toArray();
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    return res;
}
const read_todo=async ()=>{
    const db=await dbconnect()
    const dc=db.collection("todo")
    let res=await dc.find().toArray();
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    return res;
}

//read()
const insert_work=async ()=>{
    const db=await dbconnect()
    const dc=db.collection("work")
    let res=await dc.insertOne({work:item});
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    console.log(res)
}
const insert_todo=async ()=>{
    const db=await dbconnect()
    const dc=db.collection("todo")
    let res=await dc.insertOne({work:item});
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    console.log(res)
}
// insert()
// read()
const update=async ()=>{
    const db=await dbconnect();
    const res=await db.updateMany({name:"Arif"},{$set:{name:"tasmi",age:15}})
    console.log(res)
}
// update()

// const deletedata=async ()=>{
//     const db=await dbconnect()
//     let res=await db.deleteOne({_id:id_to_del})
//     console.log(res)
// }
const delete_data=async ()=>{
    let db=await dbconnect()
    let dc=db.collection("work")
    let res=await dc.deleteOne({"_id":new ObjectId(id_to_del)});
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    console.log(res)

    db=await dbconnect()
    dc=db.collection("todo")
    res=await dc.deleteOne({"_id":new ObjectId(id_to_del)});
    //let res=await db.insertMany([{name:"Arif",age:21,hobby:"Coding"},{name:"Harry",age:23,hobby:"Cod"}])
    console.log(res)
}

// deletedata()








 


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST","GET"],
    credentials: true
}
             ));
//const loc=(__dirname+'/public')
app.use(express.static('public'))
// let items = ['cook food', 'eat food']
// let worklist = []
let item,id_to_del;
app.get('/',async function (req, res) {
   var day=date.get_dayonly()
   var data=await read_todo()
    res.render('list', { listtitle: day, it: data })
    
    
})
app.get('/work',async function (req, res) {
    var data=await read_work()
    res.render('list', { listtitle: 'Work', it: data })
    
})
app.post('/', function (req, res) {
    item = req.body.newit;
    if (req.body.button === 'Work') {
        // worklist.push(item)
        insert_work()
        res.redirect('/work')
        
    }
    else {
        // items.push(item)
        insert_todo()
        res.redirect('/')
        
    }
    


})
app.post('/delete',async function(req,res){
    id_to_del=req.body.checkbox;
    console.log(id_to_del)
    await delete_data();
    res.redirect('/')
})
app.get('/about',function (req,res) {
    res.render('about')
  })
app.listen(3000, function () {
    console.log('Server started at port 3000')
})
