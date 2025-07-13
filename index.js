const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");

// render HTML on browser SSR
app.get("/users", (req, res) => {
    const html = `
    <ul>
       ${users.map((user) => {
       return `<li>${user.first_name}</li>`;
        }
    ).join("")}

   </u>`;
    res.send(html);
});

// REST Api
// how to send json file now frontend (react) is responsible to render it
// api for cross plateforms HYBRID SERVER
app.get("/api/users", (req, res) => {
    res.json(users);
});

//dynamic path parameters : means it is a variable in path
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find( user => user.id === id)
     res.json(user);
});


// by default browser sends get req only to test other we need postman or thunderclient not browser
app.post("/api/users", (req, res) => {
    // create a new user
    res.json({status:"pending"});
});

app.patch("/api/users/:id", (req, res) => {
    // edit data of an existing user
    res.json({status:"pending"});
});

app.delete("/api/users/:id", (req, res) => {
    // delete data of an existing user
    res.json({status:"pending"});
});

// also for clear syntax we can define a route
// app.route("/api/users/:id")
//   .get((req,res)=>{})
//   .post((req,res)=>{})

app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
});
