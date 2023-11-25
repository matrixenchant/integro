import mongoose from 'mongoose';

const uri =
  'mongodb+srv://admin:nviZZe9jFbFNDUyP@crowdfunding-app.yxlevyp.mongodb.net/?retryWrites=true&w=majority';

const connect = () =>
  new Promise(async (res, rej) => {
    try {
      await mongoose.connect(uri);
      console.log('connected to MongoDB');
    } catch (e) {
      rej(e);
    } finally {
      res();
    }
  });

module.exports = { connect };
