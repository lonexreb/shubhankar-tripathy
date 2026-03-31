import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center font-mono">
        <div className="text-terminal-red text-sm mb-2">
          $ cd {location.pathname}
        </div>
        <div className="text-foreground mb-6">
          bash: {location.pathname}: No such file or directory
        </div>
        <a
          href="/"
          className="btn-primary inline-block"
        >
          [return home]
        </a>
      </div>
    </div>
  );
};

export default NotFound;
