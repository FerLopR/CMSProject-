const express = require('express'); // importando Express en nuestro archivo
const app = express(); //inicializando Express
app.use(express.json());
//Ruta principal 

const users = [
  { id: 1, name: 'Oliver Cruz'},
  { id: 2, name: 'Fernando López'},
  { id: 3, name: 'José José'},
];
app.get('/', (req, res) => {
    res.send(users);
}); 

//Para POST, se agregará un nuevo usuario
app.post('/',(req, res)=>{
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

//Iniciar servidor 
app.listen(3000, ()=>{
    console.log("Servidor corriendo en localhost:3000") 
});