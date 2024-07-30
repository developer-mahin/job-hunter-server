export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};
