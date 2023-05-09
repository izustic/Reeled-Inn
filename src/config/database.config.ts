import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://izustic:12345@reeledinn.ila2lwt.mongodb.net/test'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
} as mongoose.ConnectOptions);

mongoose.connection.on('connected', () => {
  console.log('Connected to database successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to database: ${err}`);
});

export default mongoose.connection;
