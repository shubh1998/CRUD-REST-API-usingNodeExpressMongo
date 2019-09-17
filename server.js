const express=require('express');
const app=express();
const bodyParser=require('body-parser');


app.listen(3000,()=>{
  console.log("Server started....");
});


//to set CSRF Token
 app.use(bodyParser.urlencoded({
     extended: true
   }));


//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

const Login=require('./model/login');
const Employee=require('./model/employee');
const URL="mongodb://localhost:27017/RESTDB";
//const URL="mongodb+srv://nitin:12345@cluster0-r61ra.mongodb.net/test?retryWrites=true&w=majority";
const mongoose=require('mongoose');
mongoose.connect(URL,{ useNewUrlParser: true });



// app.get('/newlogin',(request,response)=>{
//      console.log(request.body);
//     var login=new Login({
//         userid:'admin',
//       password:'12345'
//           });

// login.save(function (err, result) {
//       if (err)
//       response.json({msg:'Data Not Inserted',description:err})
//       else
//       response.json({msg:'Data Inserted'})
//     });
// });

app.post('/newemp',(request,response)=>{
     console.log(request.body);
    var newEmp=new Employee({
        eid:request.body.eid,
        ename:request.body.ename,
        salary:request.body.salary
      });

newEmp.save(function (err, result) {
      if (err)
      response.json({msg:'Data Not Inserted',description:err})
      else
      response.json({msg:'Data Inserted'})
    });
});


app.put('/updateemp',(request,response)=>{
     console.log(request.body);
Employee.updateOne({eid:request.body.eid},{
  ename:request.body.ename,
  salary:request.body.salary},function (err, result) {
      if (err)
      response.json({msg:'Data Not Updateed',description:err})
      else
      response.json({msg:'Data Updated'})
    });
});

app.patch('/updateempsalarybyeid',(request,response)=>{
     console.log(request.body);
Employee.updateOne({eid:request.body.eid},{
    salary:request.body.salary},function (err, result) {
      if (err)
      response.json({msg:'Data Not Updateed',description:err})
      else
      response.json({msg:'Data Updated'})
    });
});




app.get('/viewallemp',(request,response)=>{
Employee.find(function (err, result) {
      if (err)
      response.json({description:err})
      else
      response.json({data:result})
    });
});

app.get('/viewempbyeid',(request,response)=>{
Employee.findOne({eid:request.query.eid},function (err, result) {
      if (err)
      response.json({description:err})
      else
      response.json({data:result})
    });
});


app.get('/checklogin',(request,response)=>{
Login.findOne({userid:request.query.uid,password:request.query.pwd},function (err, result) {
      if (err)
      response.json({description:err})
      else if(result==null)
      response.json({msg:'Login Fail'})
      else
      response.json({msg:'Login Success'})
  });
});

app.get('/delemp',(request,response)=>{
Employee.deleteOne({eid:request.query.eid},function (err, result) {
  console.log(result);
      if (err)
      response.json({description:err})
      else
      response.json({desc:result})
  });
});
