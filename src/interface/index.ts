const USER_ROLE = {
  USER: 'user',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

export type TUserRole = keyof typeof USER_ROLE;
