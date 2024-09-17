const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./users.json');
const students = require('./students.js');

app.use(express.json());

// Routes

// For JSON
app.get('/users', (req,res)=>{
    const html = `
        <ul>
            ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

// List individual user
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user);
});

// Add user
app.post('/api/users',(req,res)=>{
    const user = {
        id : users.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender : req.body.gender,
        job_title : req.body.job_title
    }

    users.push(user);
    res.json(user);
});

// Update user
app.put('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const gender = req.body.gender;
    const job_title = req.body.job_title;

    let index = users.findIndex((user)=> user.id === id);

    if (index >= 0){
        let u = users[index];
        u.first_name = first_name;
        u.last_name = last_name;
        u.email = email;
        u.gender = gender;
        u.job_title = job_title;
        res.json(u);
    } else {
        res.status(404);
    }
    
})

// Delete user
app.delete('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    let index = users.findIndex((user)=> user.id === id);

    if(index>=0){
        let u = users[index];
        users.splice(index, 1);
        res.json(u);
    } else {
        res.status(404);
    }
})

// For List

// List all users
app.get('/api/students',(req,res)=>{
    return res.json(students);
})

// Add user

app.post('/api/students',(req,res)=>{
    const user = {
        id : students.length+1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender : req.body.gender,
        job_title : req.body.job_title
    }

    students.push(user)
    res.json(user)
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});