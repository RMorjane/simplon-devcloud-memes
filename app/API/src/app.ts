import { connect, display_users, register_user, loginUser } from "./db"
import getMemes from "./Routes/hot_display"
import * as registerRouter from './Routes/register';
import * as express from "express"
import 'dotenv/config'
import * as bodyParser from "body-parser"
import * as  cors from "cors"
import jwt from "jsonwebtoken"
import { send } from "process";

const key_jwt = process.env.SECRET_TOKEN


const app = express();
const PORT = 4000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.use(cors())

app.post('/login', async (req, res) => {

  const username = req.body.credentials.username
  const password = req.body.credentials.password

  const result = await loginUser(username,password)

  function validateUser(result) {

    if (result === 0) {
      console.log("User doesn't exist")
      return 0
    }

    if (password === result.password) {
      /*  Login Success */
      console.log("Login Success")
      const token = jwt.sign({ id: result._id }, key_jwt);
      res.send(token)
      console.log(token)
      return 1 

    } else {
      console.log("Password not matching ")
      return 0
    }
  }
  validateUser(result)
});


const authentification = (req, res, next) => {
  try {
    const { token } = req.query
    var decoded = jwt.verify(token, key_jwt);
    console.log("ok");
    //res.send("token ok")
    next()

  } catch (err) {
    console.log(err);
    res.send("token fail")
  }
}
//route qui redirige vers le profil
app.get("/profil", authentification,(req, res) => {

  console.log("profil")
  res.send("profil")

})

//exemple de route
app.post("/privee", authentification,(req, res)=> {
  console.log("privee");
  res.send("privee")
  
})


app.get("/users", (req, res) => {
  res.send(display_users())
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/register", (req, res) => {

  const username = req.body.credentials.username
  const password = req.body.credentials.password

  register_user(username,password)
})


app.get("/memes", getMemes)

app.listen(PORT, () => {
  connect()
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
