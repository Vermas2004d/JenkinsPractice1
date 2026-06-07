import express from 'express'

const app = express()

const port = 4000

app.get('/', (req , res) => {
    res.send(`How are you brother,my mind is not working!
        <br><br>
        <a href="/done" >Done</a>
        `)
});

app.get('/done', (req , res) => {
    res.send('Now i am done with everything');
});

app.listen(port , () => {
    console.log(`Server is running on the port ${port}`)
});

