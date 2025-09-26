import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { JUser, JUpdateUser } from '../../joi/entities/users.joi';
import usersModels from '../../models/entities/users.models';

// Add a new User
export async function addUser(req: Request, res: Response) {
	try {
		const { error, value } = JUser.validate(req.body);
		if (error) {
			throw new Error('Validation error:' + error.message);
		}

		const hashedPassword = await bcrypt.hash(value.password, 10);
		const existingUser = await usersModels.findOne({ $or: [{ username: value.username}, { email: value.email }] });

		if (existingUser) {
			throw new Error('User already exists with this username or email');
		}

		const user = await usersModels.create({
			firstName: value.firstName,
			lastName: value.lastName,
			dni: value.dni,
			username: value.username,
			password: hashedPassword,
			email: value.email
		});

		const userResponse = user.toObject();
		// delete userResponse.password; // Remove password from response
		return res.status(201).json({ message: 'User created successfully', data: userResponse });
	} catch (err: unknown) {
		if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
	}
};

// Show all users
export async function getUsers(req: Request, res: Response) {
	try {
		const users = await usersModels.find().select('-password').lean();
    if(!users || users.length === 0) {
      throw new Error('No users found');
    }
		return res.status(200).json({ message: 'All Users retrieved successfully', data: users, count: users.length });
	} catch (err: unknown) {
		if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
	}
};

// Show user by ID
export async function getUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await usersModels.findById(userId).lean();

    if(!user) {
      throw new Error('User not found');
    }

    return res.status(200).json({ message: 'User retrieved successfully', data: user});
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Partial update of user data
export async function updateUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const { error, value } = JUpdateUser.validate(req.body);
    if(error) {
      throw new Error('Validation Error')
    }

    const user = await usersModels.findByIdAndUpdate(userId, value, { new: true });
    if(!user) {
      throw new Error('User not Found');
    }

    return res.status(200).json({ message: 'User updated successfully', data: user});
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Delete user By ID
export async function deleteUserById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await usersModels.findByIdAndDelete(userId);
    if(!user) {
      throw new Error('User not found');
    }

    return res.status(200).json({ message: 'User deleted successfully', data: user, timestamp: new Date().toISOString()});
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};
