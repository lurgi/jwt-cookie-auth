import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE } from "@/constants";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username !== "admin" || password !== "admin") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";
  if (!SECRET) {
    return NextResponse.json(
      {
        message: "No Secret Code",
      },
      { status: 503 }
    );
  }

  const TOKEN = sign({ username }, SECRET, { expiresIn: MAX_AGE });
  const SEREIALRIZE = serialize(COOKIE_NAME, TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authentication",
  };

  return NextResponse.json(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": SEREIALRIZE },
  });
}
