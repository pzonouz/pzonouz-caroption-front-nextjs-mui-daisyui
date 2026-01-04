"use client";

import { setUser } from "@/app/lib/features/auth";
import { useAppDispatch } from "@/app/lib/hooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  fetch("http://localhost/backend/auth/me")
    .then((res) => res.json())
    .then((res) => dispatch(setUser(res)))
    .catch((err) => console.log(err));
  return <div>{children}</div>;
};
export { AuthProvider };
