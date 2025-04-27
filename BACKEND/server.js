import express from 'express';
import bodyParser from 'body-parser';
import recommendationRoutes from './routes/recommendationRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
