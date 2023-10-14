import { z } from "zod";
import { courseSchema, createCourseSchema } from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type TypeCourse = z.infer<typeof courseSchema>;
export type TypeCreateCourse = z.infer<typeof createCourseSchema>;

export type TypeReadAllCourses = Array<TypeCourse>;

export type TypeReadAllCoursesResult = QueryResult<TypeReadAllCourses>;

export type TypeCourseResult = QueryResult<TypeCourse>;

export type TypeRegisterUserInCourse = {
  courseId: string | number;
  userId: string | number;
};

export type TypeAllUsersByCourseId = {
  userId: number;
  userName: string;
  couseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
};

export type TypeAllUsersByCourseIdResult = QueryResult<TypeAllUsersByCourseId>;
