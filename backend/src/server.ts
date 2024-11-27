import express from 'express'
import router from './routes/route.drive';

const app = express();

app.use(express.json());

app.use('/ride', router);


app.listen(8080, () => {console.log('server running on port 8080')})