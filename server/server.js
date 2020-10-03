const express = require("express");
const bodyParser = require("body-parser");
const User = require("../database/user.js");
const Company = require("../database/Company.js");
const Name = require("../database/name.js");
const Chat = require("../database/chatschema.js");
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const path = require("path");
const { update } = require("../database/name.js");

app.use(express.static("client/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users/getMessages", function (req, res) {
  Chat.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});

app.post("/api/users/sendMessage", (req, res) => {
  console.log(req.body.msg);
  var obj = { msg: req.body.msg };
  const newM = new Chat(obj);
  newM.save((err, result) => {
    res.send(result);
  });
});

app.post("/api/user/add", (req, res) => {
  console.log(req.body)
  Name.findOne({ key: "abc" }, function (err, data) {
    Company.updateOne({ name: data.hashem }, { $push: { employee: req.body.newE } },
      function (err, result) {
        if (err) console.log(err);
        res.send(req.body.newE)
      })
  })
})

app.post('/api/users/giveOrder',(req,res)=>{
  console.log(req.body)
  User.updateOne(
    { name: req.body.nameOfEmloyee },
    { $push: { companyToDoList: req.body.taskForEmployee } },
    function (err, result) {
      if (err) console.log(err);
      res.send("check")
    }
  )
  Name.findOne({key:"abc"} , function(err , result){
    Company.updateOne(
      { name: result.hashem },
      { $push: { todos: {name : req.body.nameOfEmloyee , todo : req.body.taskForEmployee} } },
      function (err, result) {
        if (err) console.log(err);
      }
    );
  })
})

app.get("/api/users/archive" , (req , res)=>{
  Name.findOne({key : "abc"} , function(err ,data){
    Company.findOne({name : data.hashem} , function(err , result){
      res.send(result.todos)
    })
  })
})

app.get('/api/users/getAll' , (req,res)=>{
  Name.find({} , function(err,result){
    User.find({name : result[0].hashem} , function(err,result){
      if(result[0].type){res.send(result[0].type)}
      else(
        Company.find({name : result[0].hashem} , function(err,result){
          if(result[0].type){res.send(result[0].type)}

        })
      )
    })
  })
})

// app.get("/getall", function (req, res) {
//   User.find({}, function (error, result) {
//     if (error) console.log("this is error ====>", error);
//     res.send(result);
//   });
// });

app.post("/api/user/update", (req, res) => {
  var newName = Object.keys(req.body)[0];
  Name.updateOne({ key: "abc" }, { $set: { hashem: newName } }, function (
    err,
    result
  ) {
    if (err) console.log(err);
  });
});


app.post("/api/users/pushTodo", (req, res) => {
  console.log(req.body.todo);
  Name.find({}, function (err, result) {
    // console.log('this is === > ', result[0].hashem)
    User.updateOne(
      { name: result[0].hashem },
      { $push: { myToDoList: req.body.todo } },
      function (err, result) {
        if (err) console.log(err);
        res.send(true)
      }
    );
  });
});
app.post('/api/getinfo', (req, res) => {
  User.findOne({ name: req.body.Speciffic }, function (err, result) {
    res.send({ myToDoList: result.myToDoList, companyToDoList: result.companyToDoList })
  })
})

app.get("/api/users/getCompany", (req, res) => {
  Name.find({ key: "abc" }, function (err, data) {
    User.findOne({ name: data[0].hashem }, function (err, result) {
      res.send(result.companyToDoList);
    });
  });
});

app.post("/api/user/changeKey" , (req , res)=>{
  Name.findOne({key : "abc"} , function(err,data){
    User.updateOne({name : data.hashem} , {$set : {key : req.body.newKey }} , function (
      err,
      result
    ) {
      if (err) console.log(err);
    })
  })
})
app.post("/api/user/fire" , (req,res)=>{

  Name.findOne({key : "abc"} , function(err , data){
    Company.findOne({name : data.hashem} , function(err , result){
      var arrayOfEmployees = result.employee 
      var rest = []
      for(var i = 0 ; i < arrayOfEmployees.length ; i++){
         if(arrayOfEmployees[i] !== req.body.newF ){
           rest.push(arrayOfEmployees[i])
         }
      }
      Company.updateOne({ name : data.hashem } , {$set : {employee : rest}} ,function (
        err,
        result
      ) {
        if (err) console.log(err);
      })
    })
  })
})

app.post("/api/delete",(req,res)=>{
  Name.find({key:"abc"},(err,result)=>{
    console.log(result)
    // focus with the result you are geting an array so you need to put result[0] i fix it for you 
    User.updateOne({name:result[0].hashem},{$set:{ myToDoList:[] } },function(err,data){
      console.log(data)
      err?console.log(err):res.send(data)
    } )
  })
})
app.get('/api/users/employee' , (req,res)=>{
  Name.findOne({key : "abc"} , function(err,result){
    Company.find({name : result.hashem} , function(err , data){
        res.send(data[0].employee)
  })
})
})

app.get("/api/users/getFriends", (req, res) => {
  Name.find({ key: "abc" }, function (err, data) {
    User.find({ name: data[0].hashem }, function (err, result) {
      User.find({ key: result[0].key }, function (err, ndata) {
        res.send(ndata);
      });
    });
  });
});

app.post("/api/users/sendTodo", (req, res) => {
  console.log(req.body);
  var iSend = "from " + req.body.myName + " : " + req.body.toSend;
  User.updateOne(
    { name: req.body.friend },
    { $push: { myToDoList: iSend } },
    function (err, result) {
      if (err) console.log(err);
    }
  );
});

app.get("/api/users/getuser", (req, res) => {
  Name.find({ key: "abc" }, function (err, data) {
    User.find({ name: data[0].hashem }, function (err, result) {
      res.send(result);
    });
  });
});

app.get("/api/users/getConnected" , (req , res)=>{
  Name.findOne({key : "abc"} , function(err , result){
    res.send(result.hashem)
  })
})

app.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    const company = await Company.findOne({ name })
    if (user) {
      const userCompare = await bcrypt.compare(password, user.password)
      if (userCompare) return res.status(200).send(user)
    }
    if (company) {
      const companyCompare = await bcrypt.compare(password, company.password)
      if (companyCompare) return res.status(200).send(company)
    }
    return res.status(404).send("NOT FOUND")
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.post("/signup/user", async (req, res) => {
  try {
    let {
      name,
      password,
      imageUrl,
      key,
    } = req.body
    password = await bcrypt.hash(password, 10)
    const newUser = new User({ name, password, imageUrl, key });
    await newUser.save()
    res.send(newUser)
  } catch (error) {
    res.status(404).send("UNAUTHORIZED")
  }
});

app.post("/signup/company", async (req, res) => {
  try {
    let {
      name,
      password,
      imageUrl,
      key,
    } = req.body
    password = await bcrypt.hash(password, 10)
    const newCompany = new Company({ name, password, imageUrl, key  });
    await newCompany.save()
    res.send(newCompany)
  } catch (error) {
    res.status(404).send("UNAUTHORIZED")
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
