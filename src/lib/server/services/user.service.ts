import type { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";

export type UserService = {
    getUserById: (userId: string) => Promise<User | null>;
}

export const userService: UserService = {
    getUserById: async (userId: string) => {
        const user = await userRepository.findById(userId);
        return user;
    }
}