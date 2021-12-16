require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)




const corsOptions = {
    origin: '*',
    credentials: true
}

const onboardingRoutes = require('./api/onboarding/onboarding.routes')
const utilRoutes = require('./api/utils/utils.routes')

app.use(express.json())
app.use(cors(corsOptions))




app.use('/api/onboarding', onboardingRoutes)
app.use('/api/utils', utilRoutes)





const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('server is running on port',port);
})




