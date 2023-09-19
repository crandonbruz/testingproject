const db = require('../config/connection');
const { User, CheckList } = require('../models');
const userSeeds = require('./userSeeds.json');
const checkListSeeds = require('./checkListSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('CheckList', 'checkLists');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < checkListSeeds.length; i++) {
      const { _id, checkListAuthor } = await CheckList.create(checkListSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: checkListAuthor },
        {
          $addToSet: {
            checkLists: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
