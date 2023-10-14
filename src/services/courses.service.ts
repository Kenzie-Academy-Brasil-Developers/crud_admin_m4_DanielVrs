import {
  TypeAllUsersByCourseIdResult,
  TypeCourse,
  TypeCourseResult,
  TypeCreateCourse,
  TypeReadAllCourses,
  TypeReadAllCoursesResult,
  TypeRegisterUserInCourse,
} from "../interfaces/courses.interface";
import { defaultQuery } from "../utils/defaultQuery";

export const createNewCourseService = async (
  data: TypeCreateCourse
): Promise<TypeCourse> => {
  const queryResult: TypeCourseResult = await defaultQuery(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    [Object.keys(data), Object.values(data)]
  );

  return queryResult.rows[0];
};

export const readAllCoursesService = async (): Promise<
  TypeReadAllCourses[]
> => {
  const queryResult: TypeReadAllCoursesResult = await defaultQuery(
    'SELECT * FROM "courses"',
    []
  );

  return queryResult.rows;
};

export const registerUserInCourseService = async (
  data: TypeRegisterUserInCourse
): Promise<void> => {
  await defaultQuery(
    'INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;',
    [Object.keys(data), Object.values(data)]
  );
};

export const deleteRegisterUserInCourseService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  await defaultQuery(
    'UPDATE "userCourses" SET "active" = false WHERE "courseId" = (%L) AND "userId" = (%L) RETURNING *;',
    [courseId, userId]
  );
};

export const readAllUserCourseService = async (courseId: string) => {
  const queryResult: TypeAllUsersByCourseIdResult = await defaultQuery(
    `SELECT
      "uc"."userId",
      "u"."name" "userName",
      "uc"."courseId",
      "c"."name" "courseName",
      "c"."description" "courseDescription",
      "uc"."active" "userActiveInCourse"
    FROM "userCourses" "uc"
     JOIN "users" "u"
      ON "uc"."userId" = "u"."id"
     JOIN "courses" "c"
      ON "uc"."courseId" = "c"."id"
    WHERE "uc"."courseId" = (%L);
    `,
    [courseId]
  );

  return queryResult.rows;
};
