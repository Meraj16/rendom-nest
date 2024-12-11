

const authMessages = {
  SUCCESS: {
    USER_REGISTERED: 'User registered successfully',
    LOGIN_SUCCESS: 'Login successful',
    TOKEN_REFRESHED: 'Token refreshed successfully',
  },
  ERROR: {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    UNAUTHORIZED: 'Unauthorized',
    BAD_REQUEST: 'Bad Request',
    TOKEN_REFRESH_FAILED: 'Token refresh failed',
  },
  INFO: {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials provided',
  }
};

const userMessages = {
  SUCCESS: {
    USERS_RETRIEVED: 'Users retrieved successfully.',
    USER_RETRIEVED: 'User retrieved successfully.',
    USER_CREATED: 'User created successfully.',
    USER_UPDATED: 'User updated successfully.',
    USER_DELETED: 'User deleted successfully.',
  },
  ERROR: {
    ERROR_RETRIEVING_USERS: 'Error retrieving users.',
    ERROR_RETRIEVING_USER: 'Error retrieving user.',
    ERROR_CREATING_USER: 'Error creating user.',
    ERROR_UPDATING_USER: 'Error updating user.',
    ERROR_DELETING_USER: 'Error deleting user.',
  },
  INFO: {
    USER_NOT_FOUND: 'User not found.',
  },
};

export const Messages = {
  SUCCESS: {
    ...authMessages.SUCCESS,
    ...userMessages.SUCCESS
  },
  ERROR: {
    ...authMessages.ERROR,
    ...userMessages.ERROR,
  },
  INFO: {
    ...authMessages.INFO,
    ...userMessages.INFO
  }
};

