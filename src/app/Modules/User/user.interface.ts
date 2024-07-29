export type TUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
  coverPhoto?: string;
  education?: string;
  headline?: string;
  info?: {
    tag?: string;
    website?: string;
    country?: string;
    city?: string;
  };
  status: 'active' | 'blocked';
  role: 'user' | 'recruiter' | 'admin';
};
