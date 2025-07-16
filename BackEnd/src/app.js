const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: 'https://ai-code-review-omega.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Google-Gemini-Key']
}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/ai',aiRoutes)

module.exports = app
