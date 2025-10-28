import React from "react";

export interface LoaderProps {
  fullScreen?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const MagicWandLoader: React.FC = () => {
  return (
    <div className="magic-loader-container">
      <img
        src={"../../../public/assets/loader.gif"}
        alt="Loading..."
        width={400}
      />
    </div>
  );
};

const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  loading = true,
  children,
}) => {
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
