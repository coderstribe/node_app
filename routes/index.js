var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose= require('mongoose')
var db = mongoose.connection;
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/employee';
var EmpSchema = Schema({
name: {
type: String,
required: true
},

age: {
  type: String,
  required: true
  },
designation:{
  type: String,
  required: true
}
});



router.get('/', function(req, res, next) {

  res.send(`<strong>Welcome </strong>This is Home Page<br><br>
  <a href="create.html">Create Employee Data</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="/find">Read Employee Data</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="update.html">Update Employee Data</a>&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="delete.html">Delete Employee Data</a>&nbsp;&nbsp;&nbsp;&nbsp;`
  );
});

var urlencoderParser = bodyParser.urlencoded({extended:false});
router.use(bodyParser.json());




// Create Employee Route
router.post('/add',urlencoderParser,function(req, res, next) {

  var Employee = mongoose.model('Employee', EmpSchema);
    db.on('error', function () {
    console.log('there was an error communicating with the database');
    });
    mongoose.connect(dbUrl, function (err) {
    if (err) {
    return console.log('there was a problem connecting to the database!' + err);
    }
    console.log('connected!');
    var employee = new Employee({
      name: req.body.name,
      age: req.body.age,
      designation:req.body.designation
      });
      employee.save(function (error, data) {
      if (error) {
      console.log(error);
      } else {
      console.dir(data);
      res.redirect('/');
      
      }
    
      });
  });
});


// Read Employee Route
router.get('/find', function(req, res, next) {
  var Employee = mongoose.model('Employee', EmpSchema);
    db.on('error', function () {
    console.log('there was an error communicating with the database');
    });
    mongoose.connect(dbUrl, function (err) {
    if (err) {
    return console.log('there was a problem connecting to the database!' + err);
    }
    console.log('connected!');
    Employee.find({},(function(error,data){
      if(error){
        console.log(error);
      }else{
        res.send(data);
      }
    }
    ))
});
});




// Update Employee Route
router.post('/update',function(req,res,next){
  var Employee = mongoose.model('Employee', EmpSchema);
  db.on('error',function(){
      console.log('There was an error');
  });
  mongoose.connect(dbUrl,function(err){
    if (err) throw err

    Employee.findOneAndUpdate({ name: req.body.name1 }, { name: req.body.name2 },function(err, data){
      
     if(err){
       console.log(err);
     }     
      else{
        // res.send("Updated Successfully");
        res.redirect('/')

      }
    });
  });
});




// Delete Employee Route
router.post('/delete', function(req, res, next) {
  var Employee = mongoose.model('Employee', EmpSchema);
  db.on('error', function () {
  console.log('there was an error communicating with the database');
  });
  mongoose.connect(dbUrl, function (err) {
  if (err) {
  return console.log('there was a problem connecting to the database!' + err);
  }
  console.log('connected!');
  Employee.deleteOne({ 'name': req.body.name }, function (err) {
    if (err) return handleError(err);
    else{
      res.redirect('/')
    }
    });
  });
});


  // res.render('index', { title: 'Express' });
module.exports = router;
