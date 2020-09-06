import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import 'dotenv/config';
import addRequestId from './middlewares/requestId';
import addRequestTime from './middlewares/requestTime';
import requestLogger from './middlewares/requestLogger';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(addRequestId, addRequestTime, requestLogger);

// routes
app.use('/api/v1/spreadsheets', routes.spreadsheets);
app.use('/api/v1/previews', routes.previews);

const server = app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw err;
  }

  console.log('Started at http://localhost:%d\n', server.address().port);
});

export default app;
