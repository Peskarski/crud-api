import { User } from './types';
import UserService from './service';

class UserController {
  users: User[];

  userService: UserService;

  constructor() {
    this.users = [];
    this.userService = new UserService(this.users);
  }

  async getAllUsers() {
    return this.userService.getAll();
  }

  async getUserById(id: string) {
    return this.userService.getById(id);
  }

  async createUser(user: User) {
    return this.userService.create(user);
  }

  async deleteUser(id: string) {
    return this.userService.delete(id);
  }

  async updateUser(id: string, user: User) {
    return this.userService.update(id, user);
  }
}

export default new UserController();
