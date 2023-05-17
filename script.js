const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
// const encoder = bodyParser.urlencoded();
const app = express();
// app.use("/assets",express.static("assets"));
// const session = require('express-session');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'your_secret_key',
//   resave: true,
//   saveUninitialized: true
// }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xxx",
    database: "nodejs"
});

connection.connect(function(error){
    if(error) throw error;
    else console.log("connected to the database successfully")
});

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname + "/log.html"))
})

// app.post("/",encoder,function(req,res){
//     var username = req.body.email;
//     var password = req.body.password;
//     connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
//         if(results.length > 0){
//           req.session.username = username;
//           req.session.isLoggedIn = true;
//             res.redirect("/main");
//         }
//         else{
//             res.redirect("/");
//         }
//         res.end();
//     })
// })

app.post("/",function(req,res){
  const username = req.body.email;
  const password = req.body.password;
  connection.query("select employeeId from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
    if(error) throw error;  
    
    if(results.length === 0){
      res.send('Login failed miserbly');
    } else {
      const empId = results[0].employeeId;
      console.log("redirecting to main.html");
      res.redirect(`/main?empId=${empId}`);
    }
  })
})


app.get("/main",function(req,res){
  const userId = req.query.empId;
  console.log(userId);

  const myProj = "SELECT projectid, projectname, projectCompleted from projectCompleted where empid = ?";
  connection.query(myProj, [userId], (err,results) => {
    if(err) throw err;
     
    res.render('main',{projects : results, connection : connection, empId : userId});
  })
  
})

// app.use(express.static('public', { 
//   setHeaders: (res, path, stat) => {
//     if (path.endsWith('.css')) {
//       res.setHeader('Content-Type', 'text/css');
//     }
//   }
// }));
app.use(express.static("assets"));
app.use(express.static("public"));

app.post('/logout', (req, res) => {
  console.log("I am here");
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// app.listen(4900)
app.set("view engine","ejs");

// app.get("/main",(req,res)=>{
//   res.sendFile(path.join(__dirname,"main.html"))
// })

app.post("/projects", function(req, res) {
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const totalTime = req.body.totalTime;
  const projectName = req.body.projectName;
  const empId = req.body.empid;
  const query = "INSERT INTO projectTime (empid, projectname, intime, outtime, total) VALUES (?, ?, ?, ?, ?)";
  const values = [empId, projectName, startTime, endTime, totalTime];

  connection.query(query, values, function(error, results, fields) {
    if (error) throw error;

    res.redirect("/main");
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});