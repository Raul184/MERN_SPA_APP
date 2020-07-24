const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: path.join(__dirname ,'./config.env') });
const app = require('./app');
mongoose.connect(
  process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  }
)
.then(() => console.log(process.env.NODE_ENV));
const port = process.env.PORT || 3000;
const server = app.listen( port, () => {
    console.log(`App running on port ${process.env.PORT}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
