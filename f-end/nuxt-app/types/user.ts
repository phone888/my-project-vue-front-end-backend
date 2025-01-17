export interface userType {
  id?: number;
  username: string;
  email: string;
}

export interface addType {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface passwordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
