const express = require("express");
const cors = require('cors');

const socket = require('socket.io');
const path = require('path');
 


const app = express();

app.use(cors());

///////////
app.use(express.static(path.join(__dirname,'build')));
// in the deployment

const port = process.env.PORT ||  2000;

const server = app.listen(port, () => {
    console.log("server is running on " + port);
})

const io = socket(server);

/////////in the deployment
app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname,'build','index.html'));
})

app.use((req,res,next)=>{
    res.redirect("/");

})

////////////////


let gameplayers = [];


io.on('connection', (socket) => {
    console.log("connenction made", socket.id);


    socket.on('room', (data) => {

        let roomplayers = gameplayers.filter((x)=>{
            return x.room==data.room;
        })
     
        if (roomplayers.length < 2) {
            gameplayers.push({ id: socket.id, ...data });
            socket.join(data.room);

            // to send message to all the users in a perticular room
            io.to(data.room).
            emit('somejoined', gameplayers);
        }else{
            //to send message to only one user which have requested something
            io.to(socket.id).
            emit('cantjoin',`Sorry ${data.name} ,this room : ${data.room} is already full`);
        }
        console.log(gameplayers);
    })

    socket.on('selectionchanged',({newplayers,room})=>{
        console.log(newplayers);
        io.to(room).emit('selectchnagedrec',newplayers);
    })

    socket.on('boardchange',({newboard, newturn,room })=>{
        io.to(room).emit('boardchangedrec',{newboard,newturn})

    })

    socket.on('resetboard',(data)=>{
        io.to(data).emit('resetboardrec',"");
    })

    socket.on('disconnect', () => {
        let newp = gameplayers.filter((x) => {
            return socket.id != x.id;
        })
        gameplayers = [...newp];
        console.log(gameplayers);
    })
})