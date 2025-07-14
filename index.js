const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
// const users = require("./MOCK_DATA.json");
const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf-8"));

const filePath = "./MOCK_DATA.json";

// middleware-plugin to get data send by cient (in form format) in body
app.use(express.urlencoded({extended: false}));
// app.use(express.json()); // ✅ Must-have for JSON bodies (POST, PATCH, DELETE)


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
    const body = req.body;
    console.log("body", body);
    users.push({id: users.length+1 , ...body})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data) =>{
        return res.json({status:"success", id:
            users.length});
    })

});

// function getUsersFromFile() {
//     const data = fs.readFileSync(filePath, "utf-8");
//     return JSON.parse(data);
// }
app.patch("/api/users/:id", (req, res) => {
    
    // edit data of an existing user
    let usersToBEUpdates = users;
    const id = Number(req.params.id);
    const userIndex = usersToBEUpdates.find(user => user.id === id);
    const userIndexN = usersToBEUpdates.findIndex(user => user.id === id);

    const body = req.body;
    usersToBEUpdates[userIndexN] = {}
    usersToBEUpdates[userIndexN] = {...userIndex,...body}

     fs.writeFile("./MOCK_DATA.json" ,JSON.stringify(usersToBEUpdates), (err,data) =>{
        if (err) {
            console.error("File write error:", err);
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({status:"success", id:
            id});
     })

    // res.json({id: id, EXuserIndex: userIndex, UPDATEDuserInlist: users[userIndexN], body:body});

    // const users = getUsersFromFile();
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex(user => user.id === id);
    // console.log(userIndex);

    // if (userIndex === -1) {
    //     return res.status(404).json({ error: "User not found" });
    // }

    // const body = req.body;
    // console.log("body", body);
    // const existingUser = users[userIndex];
    // console.log(existingUser);

    // users[userIndex] = {
    //     ...existingUser, // Keep old fields
    //     ...body          // Overwrite only what's sent
    // };
    // const newUsers = users;
    // fs.writeFile(filePath ,JSON.stringify(newUsers), (err,data) =>{
    //     if (err) {
    //         console.error("File write error:", err);
    //         return res.status(500).json({ error: "Failed to update user" });
    //     }
    //     return res.json({status:"success", id:
    //         id});
    // })
});

app.delete("/api/users/:id", (req, res) => {
    // delete data of an existing user

    // res.json({users:users})
    const id = Number(req.params.id);
    let newUsers = users.filter(user => user.id !== id);

    
    if (newUsers.length === users.length) {
        return res.status(404).json({ error: "User not found" });
    }

    fs.writeFile(filePath ,JSON.stringify(newUsers), (err,data) =>{
        if (err) {
            console.error("File write error:", err);
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({status:"success", id:
            id, newusers: newUsers});
     })


});

// also for clear syntax we can define a route
// app.route("/api/users/:id")
//   .get((req,res)=>{})
//   .post((req,res)=>{})

app.listen(PORT, () => {
    console.log(`Server is listening to the port ${PORT}`);
});
