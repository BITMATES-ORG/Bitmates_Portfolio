import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

export interface JwtPayload {
  id: string;
  email: string;
}

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookies(payload: JwtPayload) {
  const cookieStore = await cookies();
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("access_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  cookieStore.set("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  const payload = verifyAccessToken(accessToken);
  if (payload) return payload;

  const refreshToken = cookieStore.get("refresh_token")?.value;
  if (!refreshToken) return null;

  const refreshPayload = verifyRefreshToken(refreshToken);
  if (!refreshPayload) return null;

  const user = await prisma.admin.findUnique({ where: { id: refreshPayload.id } });
  if (!user) return null;

  const newPayload = { id: user.id, email: user.email };
  await setAuthCookies(newPayload);
  return newPayload;
}

export const ALLOWED_ADMINS = ["napg.adekunle@gmail.com", "adelerekehinde01@gmail.com"];
