const express = require('express');//includes express
const app = express(); //calls the express method
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//cross origin resource sharing
const cors = require('cors');//cross origin restriction to be waived
const bcrypt = require('bcryptjs');
const config = require('./config.json');

const Post = require('./models/posts.js');
const Student = require('./models/students.js');
const Employer = require('./models/employers.js');

const port = 3000;

app.use((req, res, next) => {
 console.log(`${req.method} request ${req.url}`);
  next();
})

app.use(bodyParser.json({limit: '10mb'}));//calling body parser method
app.use(bodyParser.urlencoded({extended: false, limit: '10mb'}));//using default

app.use(cors()); //calling cors method

 mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@need-a-hand.${config.MONGO_CLUSTER_NAME}.mongodb.net/need-a-hand?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB connected!'))
.catch(err => {
  alert(`DBConnectionError:${err.message}`)
});

//BRANCH:creating-post - post method to write or create a document in mongodb
// POST add new post
app.post('/addPost', (req, res) => {
  const post = new Post({
    _id : new mongoose.Types.ObjectId,
    jobTitle: req.body.jobTitle,
    posterName: req.body.posterName,
    username: req.body.username,
    jobDescription: req.body.jobDescription,
    comments: [],
    category: req.body.category
  });
  //save to the database and notify the user
  post.save().then(result => {
    res.send(result);
  }).catch(err => res.send(err));
})

// POST register employer
app.post('/registerEmployer', (req, res) => {
  // finds one employer
  Employer.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      res.send('Error: Username is already taken. Please try another name');
    } else {
      const hash = bcrypt.hashSync(req.body.password); //Password Encryption
      const employer = new Employer({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        workField: req.body.workField,
        companyName: req.body.companyName,
        extra: req.body.extra
      });
      employer.save()
      .then(result => {
        res.send(result)
      })
      .catch(err => res.send(err));
    }
  })
});

// POST register student
app.post('/registerStudent', (req, res) => {
  // finds one student
  Student.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      res.send('Error: Username is already taken. Please try another name');
    } else {
      const hash = bcrypt.hashSync(req.body.password); //Password Encryption
      const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        studyField: req.body.studyField,
        educator: req.body.educator,
        extra: req.body.extra
      });
      student.save()
      .then(result => {
        res.send(result)
      })
      .catch(err => res.send(err));
    }
  })
});

// login Employer
app.post('/loginEmployer', (req, res) => {
  Employer.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        res.send(userResult);
      } else {
        res.send('Not authorized');
      }//inner if
    } else {
       res.send('User not found. Please register');
    }//outer if
  });//findOne
});//post

// login Student
app.post('/loginStudent', (req, res) => {
  Student.findOne({username: req.body.username}, (err, userResult) => {
    if (userResult){
      if (bcrypt.compareSync(req.body.password, userResult.password)) {
        res.send(userResult);
      } else {
        res.send('Not authorized');
      }//inner if
    } else {
       res.send('User not found. Please register');
    }//outer if
  });//findOne
});//post
// BRANCH:creating-post ENDS ---------------------------------------------------

//BRANCH:reading-get - retrieve objects or documents from the database
// get all students
app.get('/allStudents', (req, res) => {
  Student.find().then(result => {
    res.send(result);
  })
})

// get all posts
app.get('/allPosts', (req, res) => {
  Post.find().then(result => {
    res.send(result);
  })
})

// get a specific employer
app.get('/getEmployer/:id', (req, res) => {
  const idParam = req.params.id;
  Employer.findOne({_id: idParam}, (err, userResult) => {
    if (userResult){
        res.send(userResult);
    } else {
       res.send('Error: Employer user not found');
    }
  })
})

// get a specific student
app.get('/getStudent/:id', (req, res) => {
  const idParam = req.params.id;
  Student.findOne({_id: idParam}, (err, userResult) => {
    if (userResult){
        res.send(userResult);
    } else {
       res.send('Error: Student user not found');
    }
  })
})
//BRANCH:reading-get ENDS ------------------------------------------------------

//BRANCH:updating-patch - patch is to update the details of the objects
// update post
app.patch('/updatePost/:id', (req, res) => {
  const idParam = req.params.id;
  Post.findById(idParam, (err, post) => {
    if (Post['user_id'] == req.body.userId) {
      const updatedPost = {
        jobTitle: req.body.jobTitle,
        posterName: req.body.posterName,
        username: req.body.username,
        jobDescription: req.body.jobDescription,
        category: req.body.category
      }
      Post.updateOne({_id: idParam}, updatedPost)
      .then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    } else {
      res.send('Error: Post not found')
    }//else
  })
})

// update employer profile
app.patch('/updateEmployer/:id', (req, res) => {
  const idParam = req.params.id;
  Employer.findById(idParam, (err, employer) => {
    if (Employer['user_id'] == req.body.userId) {
      const hash = bcrypt.hashSync(req.body.password);
      const updatedEmployer = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        workField: req.body.workField,
        companyName: req.body.companyName,
        extra: req.body.extra
      }
      Employer.updateOne({_id: idParam}, updatedEmployer)
      .then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    } else {
      res.send('Error: Employer profile not found')
    }//else
  })
})

// update student profile
app.patch('/updateStudent/:id', (req, res) => {
  const idParam = req.params.id;
  Student.findById(idParam, (err, student) => {
    if (Student['user_id'] == req.body.userId) {
      const hash = bcrypt.hashSync(req.body.password);
      const updatedStudent = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        pfpUrl: req.body.pfpUrl,
        studyField: req.body.studyField,
        educator: req.body.educator,
        extra: req.body.extra
      }
      Student.updateOne({_id: idParam}, updatedStudent)
      .then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    } else {
      res.send('Error: Student profile not found')
    }//else
  })
})


// update comments
app.patch('/postComment/:id', (req, res) => {
  console.log("tested post");
  const idParam = req.params.id;
  console.log(req.body.comment);
  Post.findById(idParam, (err, post) => {
    if (Post['user_id'] == req.body.userId) {
      const updatedPostComment = {
        $push: {
        comments: req.body.comment }
      }
      Post.updateOne({_id:idParam}, updatedPostComment)
      .then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    } else {
      res.send('error: product not found')
    }//else
  })
})

//BRANCH:updating-patch ENDS ---------------------------------------------------

//BRANCH:reading-get - get method to access data from Products.json
//routing to the endpoint
app.get('/allProducts', (req,res)=>{
  res.json(product);
})

app.get('/products/p=:id',(req,res)=>{
  const idParam = req.params.id;
  for (let i =0; i<product.length; i++){
    if (idParam.toString() === product[i].id.toString()){
      res.json(product[i]);
    }
  }
});
//BRANCH:reading-get ENDS

//BRANCH:deleting - to delete an object
// delete a post
app.delete('/deletePost/:id', (req, res) => {
  const idParam = req.params.id;
  Post.findOne({ _id: idParam }, (err, post) => {
    if(post && post['user_id'] == req.body.userId) {
      Post.deleteOne({_id:idParam}, err => {
        res.send('Post Deleted');
    });
    } else {
      res.send('Post not found');
    } //else
  }).catch(err => res.send(err));
});//delete
//BRANCH:deleting ENDS


//listening to port
app.listen(port,()=>console.log(`Need-A-Hand is listening on port ${port}`))
