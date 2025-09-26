import { Request, Response } from 'express';

import { JUserType, JUpdateUserType } from '../../joi/nomenclators/user-types.joi'
import userTypesModels from '../../models/nomenclators/user-types.models';

// Add new User Type
export async function addUserType(req: Request, res: Response) {
    try {
      const { error, value } = JUserType.validate(req.body);
      if(error) {
        return res.status(422).json({ message: 'Validation error', details: error.details });
      }

      const userTypes = await userTypesModels.create(value);
      return res.status(201).json({ message: 'User Type created successfully', data: userTypes });
    } catch (err: unknown) {
      if(err instanceof Error) {
        const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
        return res.status(500).json({ message: 'Internal server error', details: errorDetails });
      }
    }
};

// Show all user types
export async function getUserTypes(req: Request, res: Response) {
  try { 
    const userTypes = await userTypesModels.find().lean();
    if(!userTypes || userTypes.length === 0) {
      return res.status(404).json({ message: 'User Types not found', data: userTypes });
    }
    return res.status(200).json({ message: 'User Types retrieved successfully', data: userTypes, count: userTypes.length });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Show user type by ID
export async function getUserTypeById(req: Request, res: Response) {
  const { userTypeId } = req.params;

  try {
    const userType = await userTypesModels.findById(userTypeId).lean();
    if(!userType) {
      return res.status(404).json({ message: 'User Type ID not found' })
    }
    return res.status(200).json({ message: 'User Type retrieved successfully', data: userType });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Partial update user Type by ID
export async function updateUserTypeById(req: Request, res: Response) {
  const { userTypeId} = req.params;

  try {
    const { error, value } = JUpdateUserType.validate(req.body);
    if(error) {
      return res.status(422).json({ message: 'Validation error', details: error.details})
    }
    const userType = await userTypesModels.findByIdAndUpdate(userTypeId, value, { new: true });
    if(!userType) {
      return res.status(404).json({ message: 'User Type ID not found' });
    }
    return res.status(200).json({ message: 'User type updated successfully', data: userType });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
};

// Delete user Type by ID
export async function deleteUserTypeById(req: Request, res: Response) {
  const { userTypeId } = req.params;

  try {
    const userType = await userTypesModels.findByIdAndDelete(userTypeId);
    if(!userType) {
      return res.status(404).json({ message: 'User Type ID not found'})
    }
    return res.status(200).json({ message: 'User Type deleted successfully', data: userType, timestamp: new Date().toISOString });
  } catch (err: unknown) {
    if(err instanceof Error) {
      const errorDetails = 'details' in err ? (err as { details: unknown}).details : err.message;
      return res.status(500).json({ message: 'Internal server error', details: errorDetails });
    }
  }
}