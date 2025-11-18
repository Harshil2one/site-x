import type { ReactNode } from "react";

export interface LoaderProps {
  fullScreen?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

const MagicWandLoader = () => {
  return (
    <div className="magic-loader-container">
      <img
        src={"/assets/loader.gif"}
        alt="Loading..."
        width={300}
      />
    </div>
  );
};

const Loader = ({
  fullScreen = false,
  loading = true,
  children,
}: LoaderProps) => {
  if (!loading) return <>{children}</>;

  if (fullScreen) {
    return (
      <div className="loader-fullscreen-bg">
        <MagicWandLoader />
      </div>
    );
  }

  return (
    <div className="loader-overlay-wrapper">
      {children && <div className="loader-children">{children}</div>}
      <div className="loader-overlay-bg" />
      <div className="loader-overlay-center">
        <MagicWandLoader />
      </div>
    </div>
  );
};

export default Loader;
