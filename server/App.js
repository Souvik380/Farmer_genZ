const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const cors=require('cors')
const BuyerModel=require('./models/BuyerModel')
const FarmerModel=require('./models/FarmerModel')
const MakeRequestCropModel=require('./models/MakeRequestCropsModel')
const jwt=require('jsonwebtoken')
const JWT_KEY='hjfhehffi83928303909fjf'

const app=express()

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

 app.use(cors());

const port=3001
// const db_link='mongodb+srv://admin:9123001303@cluster0.zvdsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const db_link2='mongodb+srv://souvik-kaushik:9123001303@cluster0.fdsew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(db_link2)
.then((db)=>{
    console.log('db connected !!')
})
.catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.send("Welcome to Farmer's website")
})

app.post("/buyer_signup",async(req,res)=>{
    try{
        const user=await BuyerModel.create(req.body)

        if(user){
           res.json({status:"ok"})
        }else{
            res.json("some error")
        }

    }catch(err){
        res.json("error")
    }
})


app.post("/buyer_login",async(req,res)=>{
    console.log("EXEC")
    try{
        let data=req.body
        let user=await BuyerModel.findOne({email:data.email})

        if(user){
            if(user.password==data.password){
                let uid=user['_id']
                let token=jwt.sign({payload:uid},JWT_KEY)
                res.json({status:'ok',user:token,id:uid})
            }else{
                res.json("Wrong Password")
            }
        }else{
            res.json("Wrong Credentials !!")
        }
    }catch(err){
        res.json(err)
    }
})

app.post("/buyer_details",async(req,res)=>{
    console.log(req.body)
    try{
        const userId=req.body.id
        // console.log(userId)
        const user=await BuyerModel.findById(userId)
        // res.json({status:"alright"})   
        res.json(user)     
    }catch(err){
        res.json(err)
    }
})

// ---------------------------------------------------------


app.post("/farmer_signup",async(req,res)=>{
    try{
        const user=await FarmerModel.create(req.body)

        if(user){
           res.json({status:"ok"})
        }else{
            res.json("some error")
        }

    }catch(err){
        res.json("error")
    }
})


app.post("/farmer_login",async(req,res)=>{
    console.log("EXEC")
    try{
        let data=req.body
        let user=await FarmerModel.findOne({email:data.email})

        if(user){
            if(user.password==data.password){
                let uid=user['_id']
                let token=jwt.sign({payload:uid},JWT_KEY)
                res.json({status:'ok',user:token,id:uid})
            }else{
                res.json("Wrong Password")
            }
        }else{
            res.json("Wrong Credentials !!")
        }
    }catch(err){
        res.json(err)
    }
})

app.post("/farmer_details",async(req,res)=>{
    console.log(req.body)
    try{
        const userId=req.body.id
        // console.log(userId)
        const user=await FarmerModel.findById(userId)
        // res.json({status:"alright"})   
        res.json(user)     
    }catch(err){
        res.json(err)
    }
})

app.post('/make_request_crops',async(req,res)=>{
    try{
        const crops=await MakeRequestCropModel.create(req.body)

        if(crops){
           res.json({status:"ok"})
        }else{
            res.json("some error")
        }
    }catch(err){
        res.json(err)
    }
})

app.post('/active_listings',async(req,res)=>{
    console.log("these are ",req.body.farmer_id)
    console.log("subhomoy")
    try{
        const data=await MakeRequestCropModel.find({
            farmer_id:req.body.farmer_id
        })

        if(data){
            res.json(data)
        }else{
            res.json("error")
        }
    }catch(err){
        res.json(err)
    }
})

app.post('/farmer_ids',async(req,res)=>{
    try{
        const data=await FarmerModel

    }catch(err){
        res.json(err)
    }
})


app.get('/merge_lists',async(req,res)=>{
    try{
        const farmers=await FarmerModel.find()
        const crops=await MakeRequestCropModel.find()

        let lists=[]
        
        for(let i=0;i<farmers.length;i++){
            
            let modified_farmer=farmers[i]._id.toString()
            for(let j=0;j<crops.length;j++){

                if(modified_farmer===crops[j].farmer_id){
                    let obj={}

                    obj['name']=farmers[i].name
                    obj['email']=farmers[i].email
                    obj['phone']=farmers[i].phone
                    obj['address']=farmers[i].address
                    obj['state']=farmers[i].state
                    obj['district']=farmers[i].district
                    obj['town']=farmers[i].town
                    obj['pincode']=farmers[i].pincode
                    obj['cropName']=crops[j].cropName
                    obj['season']=crops[j].season
                    obj['sowDate']=crops[j].sowDate
                    obj['harvestDate']=crops[j].harvestDate
                    obj['area']=crops[j].area
                    obj['production']=crops[j].production

                    // console.log("-->",obj)
                    lists.push(obj)
                }
            }
        }
        console.log("LISTS-->",lists)
        res.json(lists)
    }catch(err){
        res.json(err)
    }
})


app.listen(port,()=>{
    console.log("listening...")
})

