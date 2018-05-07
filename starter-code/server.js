
const express = require(‘express’)
const app = express()
const port = process.env.PORT || 3000

app.get(‘*’, (req, res) => { res.sendFile(‘index.html’, { root: ‘./ public’ }) })
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));