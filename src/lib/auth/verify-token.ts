import { jwtVerify, type JWTPayload } from "jose";
import { env } from "../env";


export interface AuthTokenPayload extends JWTPayload {
    email?: string;
    sub?: string;
    type?: string;
}

const secret = new TextEncoder().encode(env.jwtSecret);

export async function verifyAccessToken(
    token: string,
): Promise<AuthTokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);

        return payload as AuthTokenPayload;
    } catch {
        return null;
    }
}