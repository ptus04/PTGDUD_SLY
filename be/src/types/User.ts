import Role from "../enums/Role";

type User = {
  phone: string;
  password: string;
  name: string;
  gender: boolean;
  email?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  dateOfBirth?: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
};

export default User;
