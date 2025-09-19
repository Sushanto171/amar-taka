export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IForgetPassword {
  otp: string;
  phone: string;
  password: string;
}
