const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users,courses,loginUsers} =require('./data')
require('dotenv').config()
const app = express()
const signUp = express.Router();
const signIn = express.Router();
const courseRoute = express.Router();
app.use(express.json())
app.use('/signUp', signUp)
app.use('/signIn', signIn)
app.use('/courses',courseRoute)

// app.use(setUser)

const authenticToken = (req, res, next) => {
    const token = req.headers && req.headers["authorization"].split(" ").pop();
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decode.role==="admin") {
        next();
    } else {
        res.json("Your are not autharize to this action")
    }
}

const checkRole = (req, res, next) => {
    if (req.body.role === "admin") {
        res.json("you can't add admin user")
    } else {
        next();
    }
}



courseRoute.get('/allCourses', (req,res) => {
    res.json(courses)
});

courseRoute.get('/myCourses', (req, res) => {
    const doctorCourse = [];
    courses.forEach(element => {
        console.log(req.body.id);
        console.log(element.idOfInstructor)
        if (req.body.idOfInstructor === element.idOfInstructor) {
            doctorCourse.push(element)
        }
    });
    res.json(doctorCourse);
});

courseRoute.post('/Course', (req,res) => {
    courses.push(
        {
            name: req.body.name,
             id: req.body.id,
            idOfInstructor : req.body.idOfInstructor
        }
    )
    res.json("course created")
});

courseRoute.delete('/Course', (req,res) => {
    courses.forEach((element,index) => {
        if (req.body.id === element.id) {
            courses.splice(index, 1);
        }
    });
    res.json("Done!")
    
});


courseRoute.put('/Course', (req, res) => {
    console.log(req.body)
    courses.forEach((element,index) => {
        if (req.body.id === element.id) {
            courses[index]= req.body;
        }
    });
    res.json("Done!")
});


















// signUp.post('/', checkRole, async (req, res) => {
signUp.post('/', async (req, res) => {

        const user = users.find((stud) => stud.id === req.body.id )
        if (!user) {
            const hashpassword = await bcrypt.hash(req.body.password, 10);
            users.push({
                id: req.body.id,
                name:req.body.name,
                role: req.body.role,
                password: hashpassword,
            })
            const accessToken = jwt.sign({
                id: req.body.id,
                name:req.body.name,
                role: req.body.role,
                password: hashpassword,
            }, process.env.ACCESS_TOKEN_SECRET);  
            res.json({
                "accessToken" :accessToken
            })
        } else {
            res.json("please enter valid id")
        }
       
    } 
   
);


signIn.post('/', async (req, res) => {
    const user = users.find((stud) => stud.id === req.body.id)
    console.log(user)
        if (!user) {
            res.json("The id not found")
        } else {
            console.log(req.body.password)
            console.log(user.password)
            if (await bcrypt.compare(req.body.password , user.password)) {
                loginUsers.push(
                    {
                        id: req.body.id,
                        name:req.body.name,
                        role: req.body.role,
                        password: req.body.password,
                    }
                )
                res.json("Sucess")
            } else {
                res.json("The password incorrect")
            }
        }

})

// signUp.get('/',authenticToken , (req,res) => {
signUp.get('/',authenticToken , (req,res) => {
    res.json(users);
})

app.get('/loginUsers', authenticToken, (req,res) => {
    res.json(loginUsers)
})


const port = 3000;
app.listen(port, () => {
    console.log("Hello")
});