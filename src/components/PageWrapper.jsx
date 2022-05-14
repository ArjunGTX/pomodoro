import clsx from "clsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context";
import { paths } from "../util/constant";

export const PageWrapper = ({
  children,
  className,
  requiresAuth,
}) => {
  const { auth } = useAuth();

  const shouldRedirect = requiresAuth
    ? auth?.isLoggedIn
      ? false
      : true
    : false;

  return shouldRedirect ? (
    <Navigate to={paths.LOGIN} replace />
  ) : (
    <div
      className={clsx(
        "full-page pos-rel fc-fs-fs bg-secondary of-hidden page-wrapper",
        className
      )}
    >
      <main className="pos-fix fc-fs-fs of-hidden">{children}</main>
    </div>
  );
};
