const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const signUp = express.Router();
const signIn = express.Router();
app.use(express.json())

// id for students begin with 2 
const students =[]
    
//     [{
//     id: "2234548",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// },{
//     id: "2234568",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// },{
//     id: "2234578",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// }];

// id for doctors begin with 1 
const doctors = [];
    
//     [{
//     id: "1234548",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// },{
//     id: "1234568",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// },{
//     id: "1234578",
//     emai: "f.alfuqahaaa@gmail.com",
//     password:"hashpassword"
// }];

signUp.post('/', async (req, res) => {
    if (req.body.id.startsWith("2")) {

        const student = students.find((stud) => stud.id === req.body.id )
        if (!student) {
            const hashpassword = await bcrypt.hash(req.body.password, 10);
            students.push({
            id: req.body.id,
            emai: req.body.email,
            password: hashpassword,
        })
            
        } else {
            res.json("please enter valid id")
        }
       

        
    }
    if (req.body.id.startsWith("1")) {

        const doctor = doctors.find((doc) => doc.id === req.body.id )
        if (!doctor) {
            const hashpassword = await bcrypt.hash(req.body.password, 10);
            doctors.push({
            id: req.body.id,
            emai: req.body.email,
            password: hashpassword,
        })
            
        } else {
            res.json("please enter valid id")
        }
       

        
    }
    res.status(200).json();
});


signIn.post('/', async (req, res) => {

    if (req.body.id.startsWith("2")) {
        const student = students.find((stud) => stud.id === req.body.id )
        if (!student) {
            res.json("The id not found")
        } else {
            if (await bcrypt.compare(req.body.password, student.password)) {
                res.json("Sucess")
            } else {
                res.json("The password incorrect")
            }
        }

        
        
    }
    if (req.body.id.startsWith("1")) {
        const doctor = doctors.find((doc) => doc.id === req.body.id )
        if (!doctor) {
            res.json("The id not found")
        } else {
            if (await bcrypt.compare(req.body.password, doctor.password)) {
                res.json("Sucess")
            } else {
                res.json("The password incorrect")
            }
        }
   
    }
})


signUp.get('/', (req,res) => {
    res.json(doctors);
})




app.use('/signUp', signUp)
app.use('/signIn',signIn)
const port = 3000;
app.listen(port, () => {
    console.log("Hello")
});