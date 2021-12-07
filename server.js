require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:3000'],
    credentials: true
}


app.use(express.json())
app.use(cors(corsOptions))

const contactRoutes = require('./api/contact/contact.routes')
const onboardingRoutes = require('./api/onboarding/onboarding.routes')
const fileRoutes = require('./api/file/file.routes')



app.use('/api/contact', contactRoutes)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/file', fileRoutes)





const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('server is running on port',port);
})





