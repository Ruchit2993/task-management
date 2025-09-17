import { User } from "../model/user-model.js";

async function createUser(userData) {
  try {
    const newUser = await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
    console.log('User created:', newUser.toJSON());
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export {createUser}     

// Example usage:
// createUser({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });