import { mongoHelper } from './infrastructure/repositories/mongodb/helpers/mongo-helper';
import app from './main/config/express/app';
import { config } from 'dotenv';

config();

console.log('ready');

mongoHelper
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => [console.log(`Server is running on port ${port}`)]);
  })
  .catch((e) => console.log(e));
