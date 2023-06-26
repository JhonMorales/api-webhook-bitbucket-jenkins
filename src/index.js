const express = require('express');
const app = express();


app.set('port', process.env.PORT || 1433);
app.set('json spaces', 2)
app.use(express.json());

app.get('/', (req, res) => {
    res.json(
        {
            "Title": "Api is OK"
        }
    );
})

app.post('/webhook', (req, res) => {
    let data= JSON.parse(JSON.stringify(req.body))
    let branch = data.push.changes[0].new.name

    let url_jenkins_trigger = `http://X.X.X.X:8080/generic-webhook-trigger/invoke?token=${branch}`
    fetch(url_jenkins_trigger,{
        method: "POST",
        headers: {
            "Content_Type": "application/json;charset=utf-8" 
        },
    })

    res.json(
        {
            "branch": branch
        }
    );
})

app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});