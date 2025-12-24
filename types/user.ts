export type UserRole = "admin" | "staff"

export interface IUser {
  _id: string
  username: string
  email: string
  phone: string
  role: UserRole
  createdAt: string
}
