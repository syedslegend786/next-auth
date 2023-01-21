import { getSession } from "next-auth/react";
export const requireAuthentication = async (ctx: any, cb: any) => {
  const sessions = await getSession(ctx);
  if (!sessions) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return cb(sessions);
};
