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

app.get('/api/users/employee' , (req,res)=>{
  Name.findOne({key : "abc"} , function(err,result){
    Company.find({name : result.hashem} , function(err , data){
      if(data.length){
      User.find({key : data[0].key }, function(err , employees){
        res.send(employees);
      })}
    
    // res.send(data[0].key)
  })
  // res.send(result.hashem)
})
})


app.post('/api/users/giveOrder',(req,res)=>{
  User.updateOne(
    { name: req.body.nameOfEmloyee },
    { $push: { companyToDoList: req.body.taskForEmployee } },
    function (err, result) {
      if (err) console.log(err);
    }
  );
  Name.find({} , function(err , result){
    Company.updateOne(
      { name: result[0].name },
      { $push: { todos: {name : req.body.nameOfEmloyee , todo : req.body.taskForEmployee} } },
      function (err, result) {
        if (err) console.log(err);
      }
    );
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

app.get("/getall", function (req, res) {
  User.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});

app.post("/update", (req, res) => {
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
      }
    );
  });
});

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
