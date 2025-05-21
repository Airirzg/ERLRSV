export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  password?: string;
  role: string;
  isActive?: boolean;
  teamMembers?: string[];
}

export interface UserProfile extends Omit<User, 'role' | 'password'> {
  updatedAt?: string;
}
