import { Role } from "~/enums/base";

export const whileList = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export const routeList: { path: string; permissions: string[] }[] = [
  { path: "/", permissions: [Role.ADMIN, Role.AUDIT, Role.USER] },
  { path: "/user", permissions: [Role.ADMIN, Role.AUDIT] },
  { path: "/category", permissions: [Role.ADMIN, Role.AUDIT] },
  { path: "/asset", permissions: [Role.ADMIN, Role.AUDIT, Role.USER] },
  {
    path: "/maintenance",
    permissions: [Role.ADMIN, Role.AUDIT],
  },
  {
    path: "/history",
    permissions: [Role.ADMIN, Role.AUDIT],
  },
  {
    path: "/help",
    permissions: [Role.ADMIN, Role.AUDIT, Role.USER],
  },
];
