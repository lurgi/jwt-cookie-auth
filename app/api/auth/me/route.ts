import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { value } = token;
  const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";
  try {
    const verified = verify(value, SECRET);
    // { username: 'admin', iat: 1703674160, exp: 1706266160 }

    const response = {
      user: "Super Top Secret User",
    };
    return NextResponse.json(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
