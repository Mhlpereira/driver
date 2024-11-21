import express from 'express'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hellow!");
})

app.listen(8080, () => 'server running on port 8080')