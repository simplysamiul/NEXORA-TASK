const express = require('express')
const app = express()
const port = 3000




// root route
app.get('/', (req, res) => {
  res.send('Server runnign successfully!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})