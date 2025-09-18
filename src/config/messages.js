const messages = {
  SUCCESS: {
    USER_CREATED: "User created successfully!",
    LOGIN_SUCCESS: "Logged in successfully.",
    TASK_CREATED: "Task created successfully.",
    DB_CONN_SUCCESS: "Connection has been established successfully.",
    PASSWORD_CHANGED: "Password changed successfully.",
    PASSWORD_RESET: "Password reset successfully.",
    USER_REGISTERED: "User registered successfully. Please change password.",
    USER_RETRIEVED: "User(s) retrieved successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_DELETED: "User deleted successfully."
  },

  ERROR: {
    USER_NOT_FOUND: "User not found.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    SERVER_ERROR: "Server error",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
    VALIDATION_ERROR: "Invalid input provided.",
    DB_CONN_ERR: "Unable to connect to the database:",
    REQ_BODY_ERR: "Request body is missing or invalid",
    REQ_EM_PASS: "Email and password are required",
    INVALID_EM_PASS: "Invalid email or password",
    EMAIL_EXISTS: "Email already exists",
    NAME_EMAIL_PASS_REQUIRED: "Name, email, and password are required",
    PASSWORD_NOT_MATCH: "Passwords do not match",
    INVALID_OLD_PASS: "Invalid old password",
    NO_TOKEN: "No token provided",
    INVALID_TOKEN: "Invalid token",
    TOKEN_FORMAT: "Token format invalid",
    ADMIN_REQUIRED: "Admin access required",
    CONTACT_EXISTS: "Contact already exists"
  },

  INFO: {
    CHANGE_PASS: "Please change your password first",
    REQ_BODY: "Request body is missing or invalid",
    NEWPASS_CONFPASS: "New password and confirm password are required",
    REDIRECT_CHANGE_PASS: "Redirect to /auth/change-pass to reset password"
  }
};

export default messages;