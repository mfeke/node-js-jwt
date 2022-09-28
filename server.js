const express = require("express")
const cors =require("cors")
const app = express()

var corsOptions ={
    origin:"http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}))

const db = require("./app/models")
const Role = db .role;
db.mongoose 
  .connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("Successfully connect to MongoDB")

    initial()
  })
  .catch(err=>{
    console.error("Connection error", err)
    process.exit()
  })

  function initial() {
    Role.estimatedDocumentCount((err,count) =>{
        if (!err && count ==0){
            new Role ({
                
            }).save(err =>{
                if(err){
                    console.log("error", err)
                }
                new Role({
                    name:"moderator"
                })
            })
            .save(err =>{
                if(err){
                    console.log("error", err)
                }

                console.log("added'user'to roles collection")

            })

            new Role({ 
                name:"admin"
            }).save(err=>{
                if(err){
                    console.log("error", err)
                }
                console.log("added''admin to roles collection ")
            })
          
        }
    })
  }

app.get("/" ,(req ,res) =>{
    res.json({message:"Welcome to thulane application"})
})

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})