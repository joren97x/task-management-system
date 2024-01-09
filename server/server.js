import express from 'express'
import router from './routes/index.js'
const app = express()
app.use(router)
app.listen(3000, () => {
    console.log("server's listening at port 3000 bruh")
})