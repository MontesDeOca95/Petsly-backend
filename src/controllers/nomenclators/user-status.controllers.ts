import { Request, Response } from 'express';

import { JUserStatus, JUpdateUserStatus } from '../../joi/nomenclators/user-statuses.joi'; 
import userStatusesModels from '../../models/nomenclators/user-statuses.models';

// Add new User Status
export async function addUserStatus(req: Request, res: Response) {
    try {
      const { error, value } = JUserStatus.validate(req.body);
      if(error) {
        return res.status(422).json({ message: 'Validation error', details: error.details });
      }

      const userStatus = await userStatusesModels.create(value);
      return res.status(201).json({ message: 'User Status created successfully', data: userStatus });
    } catch (err: unknown) {
      if(err instanceof Error) {
        const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
        return res.status(500).json({ message: 'Internal server error', details: errorDetails });
      }
    }
};

// Show all user types
export async function getUserStatuses(req: Request, res: Response) {
  try { 
    const userStatuses = await userStatusesModels.find().lean();
    if(!userStatuses || userStatuses.length === 0) {
      return res.status(404).json({ message: 'User Status not found', data: userStatuses });
    }
    return res.status(200).json({ message: 'User Status retrieved successfully', data: userStatuses, count: userStatuses.length });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Show user type by ID
export async function getUserStatusById(req: Request, res: Response) {
  const { userStatusId } = req.params;

  try {
    const userStatus = await userStatusesModels.findById(userStatusId).lean();
    if(!userStatus) {
      return res.status(404).json({ message: 'User Status ID not found' })
    }
    return res.status(200).json({ message: 'User Status retrieved successfully', data: userStatus });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Partial update user Type by ID
export async function updateUserStatusById(req: Request, res: Response) {
  const { userStatusId } = req.params;

  try {
    const { error, value } = JUpdateUserStatus.validate(req.body);
    if(error) {
      return res.status(422).json({ message: 'Validation error', details: error.details})
    }
    const userStatus = await userStatusesModels.findByIdAndUpdate(userStatusId, value, { new: true });
    if(!userStatus) {
      return res.status(404).json({ message: 'User Status ID not found' });
    }
    return res.status(200).json({ message: 'User Status updated successfully', data: userStatus });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Delete user Type by ID
export async function deleteUserStatusById(req: Request, res: Response) {
  const { userStatusId } = req.params;

  try {
    const userStatus = await userStatusesModels.findByIdAndDelete(userStatusId);
    if(!userStatus) {
      return res.status(404).json({ message: 'User Status ID not found'})
    }
    return res.status(200).json({ message: 'User Status deleted successfully', data: userStatus, timestamp: new Date().toISOString });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
}