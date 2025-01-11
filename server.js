const express = require('express')
const app = express()

const PORT = express.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})