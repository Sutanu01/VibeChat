import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

//Can be used to create dummy users for testing purposes
// This function creates a specified number of users with random data using the Faker library
const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "fakeuserpassword",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);
    process.exit(1);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { createUser };