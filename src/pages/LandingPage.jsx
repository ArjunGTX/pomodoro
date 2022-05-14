import { Button, Logo } from "../components";
import { useAuth } from "../context";
import { paths } from "../util/constant";

export const LandingPage = () => {
  const { auth } = useAuth();
  return (
    <div className="full-page bg-secondary fc-fs-fs txt-dark landing-page of-hidden">
      <div className="full-width full-height pos fc-fs-ct mt-xl p-xl">
        <Logo className="mb-xl" />
        <h3 className="my-xl txt-lg txt-center font-medium">
          Organize your{" "}
          <span className="txt-xl txt-primary font-bold">Tasks</span> more
          efficiently and <br />
          Measure the time spent on each of them
        </h3>
        <Button to={paths.TODO} className="mt-xl" size="md">
          Get Started
        </Button>
      </div>
    </div>
  );
};
