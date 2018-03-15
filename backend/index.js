import express from 'express';
import bodyParser from "body-parser";
import path from "path";


let app = express();
app.use(bodyParser.json());

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(5000, () => console.log("running on localhost: 5000"));
