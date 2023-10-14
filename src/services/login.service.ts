import { compare } from "bcryptjs";
import AppError from "../errors/App.Error";
import { TypeLogin } from "../interfaces/login.interface";
import { TypeUser, TypeUserResult } from "../interfaces/users.interface";
import { defaultQuery } from "../utils/defaultQuery";
import { sign } from "jsonwebtoken";

export const loginService = async (
  data: TypeLogin
): Promise<{ token: string }> => {
  const queryResult: TypeUserResult = await defaultQuery(
    'SELECT * FROM "users" WHERE "email" = (%L);',
    [data.email]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Wrong email/password", 401);
  }
  const user: TypeUser = queryResult.rows[0];
  const passMatch = await compare(data.password, user.password);

  if (!passMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN!,
      subject: user.id.toString(),
    }
  );

  return { token };
};
