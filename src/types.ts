import { Express } from "express";
import { UserDocument } from "./schemas/users.schema";

export type RequestWithUser = Express.Request & {
    user: UserDocument
}

export interface TokenPayload {
    sub: UserDocument['_id']
}

export type UserWithToken = UserDocument & {
    access_token: string
}