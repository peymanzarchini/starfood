export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
