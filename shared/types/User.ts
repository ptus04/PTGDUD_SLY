type User = {
  _id: string;
  password: string;
  name: string;
  gender: boolean;
  email?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  dateOfBirth?: string;
};

export default User;
