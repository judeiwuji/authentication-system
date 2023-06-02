export default interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  userId: string;
}
