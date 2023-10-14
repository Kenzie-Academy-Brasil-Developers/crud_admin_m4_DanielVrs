import { hash } from "bcryptjs";
import {
  TypeCreateUser,
  TypeReadAllCoursesByUser,
  TypeReadAllUsers,
  TypeUserResult,
  TypeUserReturn,
} from "../interfaces/users.interface";
import { UserReturnSchema, UsersReturnSchema } from "../schemas/users.schema";
import { defaultQuery } from "../utils/defaultQuery";

export const createNewUserService = async (
  data: TypeCreateUser
): Promise<TypeUserReturn> => {
  data.password = await hash(data.password, 10);

  const queryResult: TypeUserResult = await defaultQuery(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    [Object.keys(data), Object.values(data)]
  );
  return UserReturnSchema.parse(queryResult.rows[0]);
};

export const readAllUsersService = async (): Promise<TypeReadAllUsers> => {
  const queryResult: TypeUserResult = await defaultQuery(
    'SELECT * FROM "users"',
    []
  );

  return UsersReturnSchema.parse(queryResult.rows);
};

export const readAllCoursesByUserService = async (
  userId: string
): Promise<TypeReadAllCoursesByUser[]> => {
  const queryResult = await defaultQuery(
    `SELECT
      "uc"."courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse",
      "uc"."userId",
      "u"."name" "userName"
    FROM "userCourses" "uc"
     JOIN "users" "u"
      ON "uc"."userId" = "u"."id"
     JOIN "courses" "c"
      ON "uc"."courseId" = "c"."id"
    WHERE "uc"."userId" = (%L);
    `,
    [userId]
  );

  return queryResult.rows;
};
