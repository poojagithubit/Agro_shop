const express = require('express')
const app= express()
const mysql = require('mysql');
const cors = require ('cors');
app.use(cors());
app.use(express.json());
const multer = require('multer');
const Razorpay = require("razorpay");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
//const { default: Contact } = require('../client/src/components/Contact');

dotenv.config();

let userid="pooja@gmail.com"; //localStorage.getItem('user');
let today=new Date();
 dd=today.getDate();
 mm=today.getMonth()+1;
 yy=today.getFullYear();
let cdate=yy+"-"+mm+"-"+dd;
let ctime=today.toLocaleTimeString();


//database connection code
const dbcon = mysql.createConnection({
    host:"localhost",
    "user":"root",
    "password":"",
    "database":"agro_shop",
})
//end database connection code

dbcon.connect(function(err) {
    if (err) throw err;
    console.log("connected");
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

app.get("/",(req,res) => {
    res.send("Hello Welcome to BackEnd..!");
});





// Login Authentication code
app.post('/login',(req,res)=>{
logdata=req.body.logindata
username=logdata.username
password=logdata.password
dbcon.query("SELECT * from login where username =? AND password = ?",[username,password],
(err,result)=>{
    if(err){
        console.log(err); }
    else{
        res.send(result); }    
}  
);  
});





//user_reg insert code
app.post('/user_reg',(req,res)=>{

    user_regdata=req.body.user_regdata
    name=user_regdata.name
    city=user_regdata.city
    address=user_regdata.address
    pincode=user_regdata.pincode
    contact=user_regdata.contact
    email=user_regdata.email
    password=user_regdata.password
    utype="user"
    
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    dbcon.query("insert into user_reg(name,city,address,pincode,contact,email)values(?,?,?,?,?,?)",
    [name,city,address,pincode,contact,email],
    
    (err,result)=>{
        if(err){
            console.log(err); }
        else{
            dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            [email,password,utype])
            res.send(result); }    
    }  
    );  
    });

    //fetching the list of registration details
    app.get('/display_reg',(req,res) => {
        dbcon.query("select * from user_reg",(err,result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });






// Send Order

app.post(`/sendorder/:id`,(req,res) => {
    
    console.log("Order sent")
    qty=req.body.qty,
    id=req.body.id
    const q="select * from addproducts where id=?";
    dbcon.query(q,[id],(err,result)=>{
        if(err){
            console.log(err); }
        else{
            const price=result[0].price
            const total=price*qty
            const product_name=result[0].product_name

            dbcon.query("insert into  customerorder(userid,product_name,qty,price,total,order_date,order_time,payment_status,order_status,p_id)values(?,?,?,?,?,?,?,?,?,?)",
            [userid,product_name,qty,price,total,cdate,ctime,'pending','pending',id])
            console.log(result)
            res.send(result);
        }
    });
});





// get user order list by user id
app.get('/myorder/:uid',(req,res) => {
    const uid=req.params.uid;
    console.log(uid)
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customerorder as a join addproducts as b on a.userid=? and a.p_id=b.id";
    dbcon.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
             console.log(result)
            res.send(result);}
    });
});


// Order Confirm by user

app.post('/orderconfirm/:id',(req,res)=> {
    const id=req.params.id
    console.log("Hey"+id)
    let status='confirmed'
     dbcon.query("update customerorder set order_status='Confirmed' where id = ?",[id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });





// Do Payment through razorpay  
app.post('/paybill/:id',(req,res) => {
    console.log("Payment Inserted")
    const id=req.params.id
    price=req.body.price,
    payment_id=req.body.payment_id
    uid=req.body.uid
    const status='Paid'
    const q="update customerorder set payment_status=? where id=?";
    dbcon.query(q,[status,id],(err,result) => {
        if(err){
        console.log(err);}
        else{ 
            dbcon.query("insert into payment(userid,orderid,paid_amount,payment_date,transaction_no)values(?,?,?,?,?)",
            [id,uid,price,cdate,payment_id])
            //console.log(result[0].price)
            res.send(result);

        }
    });
});







 // Send an Email Notifications
 app.get('/sendmail/',async(req,res) => {
    let testAccount = await nodemailer.createTestAccount();
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "pp095193@gmail.com",
            pass: "gybvbiispruesvgy",
        },
    });

    let info = await transporter.sendMail({
        from: '"Pooja" <pp095193@gmail.com>', // sender address
        to: "meghashiragumpi2604@gmail.com", //list of receivers
        subject: "Hello Megha", //Subject line
        text: "Hello Dear Friend", //plain text body
        html: "<b> Hello Megha </b>", //html body
    });
    console.log("Message sent: %s", info.messageId);
    res.json(info);

    //res.send("Send an Email")
 });





// Forgot Password
app.post('/forgotpass',(req,res) => {
    const otp=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    username=req.body.email
    console.log(username)
    dbcon.query("SELECT * from login where username =?",[username],
    (err,result) => {
        if(err){
            console.log(err);}
        else{

            //let testAccount = nodemailer.createTestAccount();
            // connect with the smtp
            let transporter =  nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "pp095193@gmail.com",
                    pass: "gybvbiispruesvgy",
                },
            });
        
            let info = transporter.sendMail({
                from: '"Pooja" <pp095193@gmail.com>', // sender address
                to: username, //list of receivers
                subject: "Email  Otp Verification", //Subject line
                text: "Hello Dear Friend", //plain text body
                html: "<b> Otp is </b>" + [otp], //html body
            });
            
            console.log("Message sent: %s", info.messageId);
            dbcon.query("insert into otp(otp,status)values(?,?)",
            [otp,'active'])
        res.send(result); }    

    }
    );
});






// Otp Verification
app.post('/otp',(req,res) => {
    otp=req.body.otp
    console.log(otp)
    dbcon.query("SELECT * from otp where otp =?",[otp],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            
           res.send(result); }     
    }
    );
});






// Reset Password Code

app.post('/resetpass',(req,res) => {
    newpass=req.body.newpass
    confirmpass=req.body.confirmpass
    uid=req.body.uid

        dbcon.query("update login set password=? where username =?",[newpass,uid],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    ); 
   
});








//AddProducts insert code
//image storage config
let imgconfig = multer.diskStorage({
    destination:(req,image,callback) =>{
        callback(null,"../client/public/upload/");
        //callback(null,"./client/public/");
    },
    filename:(req,image,callback) =>{
        callback(null,`image-${Date.now()}.${image.originalname}`)
    }
})

// image filter
const isImage = (req,image,callback)=>{
    if(image.mimetype.startsWith("image")){
        callback(null,true) }
        else{
            callback(null,Error("only image is allowed")) }
}

let upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

//AddProducts insert code
app.post('/addproducts',upload.single("file"),(req,res)=>{
    console.log("Hey Agro Shop");
    //fdata=req.formValues
    category=req.body.category
    product_name=req.body.product_name
    uom=req.body.uom
    qty=req.body.qty
    price=req.body.price
    stock=req.body.stock
    //utype="user"
    const {filename}=req.file
    console.log(req.file)
    
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    //dbcon.query("insert into addproducts(category,product_name,uom,qty,price,image,stock)values(?,?,?,?,?,?,?)",

    const sql="insert into addproducts(category,product_name,uom,qty,price,image,stock)values(?,?,?,?,?,?,?)";
        dbcon.query(sql,[category,product_name,uom,qty,price,filename,stock],
    (err,result)=>{
        if(err){
            console.log(err); }
        else{
            //dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            //[email,password,utype])
            res.send(result); }    
    }  
    );  
    });

    //fetching the list of addproducts details
    app.get('/productview',(req,res) => {
        dbcon.query("select * from addproducts",(err,result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

// //fetching the list of agro products
//     app.get('/home',(req,res) => {
//         dbcon.query("select * from addproducts",(err,result) => {
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 res.send(result);
//             }
//         });
//     });

//Delete Records of addproducts
app.delete('/productview/delete/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcon.query("delete from addproducts where id = ?",id,(err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    });
});







//CustomerOrder insert code
app.post('/customerorder',(req,res)=>{
    console.log("Hey Agro Shop");

    customerorderdata=req.body.customerorderdata
    userid= customerorderdata.userid
    product_name= customerorderdata.product_name
    qty= customerorderdata.qty
    price= customerorderdata.price
    total= customerorderdata.total
    order_date= customerorderdata.order_date
    order_time= customerorderdata.order_time
    p_id=customerorderdata.p_id
    utype="user"
    
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    dbcon.query("insert into  customerorder(userid,product_name,qty,price,total,order_date,order_time,payment_status,order_status,p_id)values(?,?,?,?,?,?,?,?,?,?)",
    [userid,product_name,qty,price,total,order_date,order_time,payment_status,order_status,p_id],

    //const sql="insert into customerorder(userid,product_name,qty,price,total,order_date,order_time)values(?,?,?,?,?,?,?)";
    //dbcon.query(sql,[userid,product_name,qty,price,total,order_date,order_time],
    
    (err,result)=>{
        if(err){
            console.log(err); }
        else{
        
           // dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            //[email,password,utype])
            res.send(result); }    
        }  
    );  
});    

    //fetching the list of customerorders
    app.get('/display_customerorder',(req,res) => {
        dbcon.query("select * from customerorder",(err,result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

//Delete Records of customerorder
app.delete('/display_customerorder/delete/:id',(req,res) => {
    const id=req.params.id
    console.log("hey"+id);
    dbcon.query("delete from customerorder where id = ?",id,(err,result) => {
        if(err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    });
});


// Customer All Orders

// get user order list by user id
app.get('/allorders/',(req,res) => {
    const uid=req.params.id;
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customerorder as a join addproducts as b on a.p_id=b.id";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});




// Get Individual Customer Data
app.get('/viewcustomers/:userid',(req,res) => {
    const uid=req.params.userid;
    //console.log(uid)
    const q="select * from user_reg where email=?";
    dbcon.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});





// Delete Order By Admin
app.delete('/delorderbyadmin/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from customerorder where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });





 // send to delivery order 

 app.post('/sendtodelivery/:id',(req,res)=> {
    const id=req.params.id
    const status='progressing'
     console.log("hey"+id);

     dbcon.query("update customerorder set delivered_status=? where id=?",[status,id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });



 

 // view all old and new orders
 app.get('/customerordersall/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const q="select a.id,a.p_id,a.userid,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.product_name from customerorder as a join addproducts as b on a.p_id=b.id and payment_status=?";
    dbcon.query(q,status,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});





//Feedback insertion code
app.post('/feedback',(req,res)=>{

    feedbackdata=req.body.feedbackdata
    userid= feedbackdata.userid
    about_product= feedbackdata.about_product
    about_service= feedbackdata.about_service
    //utype="user"
    
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    dbcon.query("insert into  feedback(userid,about_product,about_service)values(?,?,?)",
    [userid,about_product,about_service],
    
    (err,result)=>{
        if(err){
            console.log(err); }
        else{
           // dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            //[email,password,utype])
            res.send(result); }    
    }  
    );  
    });





    // View Feedback Details

app.get('/viewfeedback/',(req,res) => {
    const q="select * from feedback";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});






// fetching Category List

app.get('/categorylist',(req,res) => {
    dbcon.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});





// Get Category Wise Products

app.get('/cat_wise_menu/:cat',(req,res) => {
    const cat=req.params.cat;
    const q="select * from addproducts where category=?";
    dbcon.query(q,cat,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});






// Add Category
app.post('/addcat',(req,res) => {
    cat=req.body.cat
    dbcon.query("insert into category(category)values(?)",
    [cat],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            res.send(result); 
        }     
    });  
});

// Fetching List of Category
app.get('/catview',(req,res) => {
    dbcon.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});





// Payment Report

app.get('/paymentview/',(req,res) => {
    const cat=req.params.cat;
    const q="select * from payment";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            // let tot=dbcon.query("select sum(paid_amount) from payment");
            // tot=tot[0]
            // console.log(tot)
            res.send(result);}
    });
});






// // Get Individual Customer  Payment View Data
// app.get('/paymentview/:userid',(req,res) => {
//     const uid=req.params.userid;
//     //console.log(uid)
//     const q="select * from payment where email=?";
//     dbcon.query(q,[uid],(err,result) => {
//         if(err){
//         console.log(err);}
//         else{
//             //console.log(result)
//             res.send(result);}
//     });
// });
    








   
          






