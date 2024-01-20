import * as yup from "yup";

export interface RegisterFormData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface EditFormData {
  Id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface User {
  Id: string;
  UserName: string;
  LastName: string;
  Email: string;
}

export interface UserLogin {
  Email: string;
  Password: string;
}

export interface UpdateUser {
  Id: string;
  UserName: string;
  LastName: string;
  Email: string;
}

export interface LoginResponse {
  Token: string;
  User: User;
  Role: "Admin" | "User";
}

export interface UserRegister {
  UserName: string;
  LastName: string;
  Email: string;
  Password: string;
  Role: "Admin" | "User";
}

export interface Field {
  name: string;
  label: string;
  validation: yup.StringSchema<string>;
  type?: string;
  iconSrc?: string;
}

export interface UserToEdit {
  Id: string;
  name: string;
  lastname: string;
  email: string;
  [key: string]: string;
}

export interface FormProps {
  title: string;
  fields: Field[];
  renderKey: string;
  btnText: string;
  handleRegisterAction?: (values: RegisterFormData) => void;
  handleLoginAction?: (values: LoginFormData) => void;
  handleEditAction?: (values: EditFormData) => void;
  user?: UserToEdit | "";
}

export interface IconProps {
  $primary?: boolean;
  srcset?: string;
  src: string;
  alt: string;
  onClick?: () => void | undefined;
}

export interface ErrorResponse {
  Message: string;
  Error: [] | "";
  Errors: [] | "";
}

export interface AppearanceProps {
  $primary?: boolean;
  $hasColor?: string;
  $hasMargin?: string;
  $isSelected?: boolean;
  $isUnique?: boolean;
  $isUsed?: boolean;
  $isValid?: boolean | string;
  disabled?: boolean;
}

export interface Actions {
  [key: string]: () => React.ReactNode;
}
