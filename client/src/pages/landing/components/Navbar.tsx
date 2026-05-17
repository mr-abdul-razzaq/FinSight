import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AUTH_ROUTES } from "@/routes/common/routePath";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Logo url="/" />
        <div className="flex items-center gap-4">
          <Link to={AUTH_ROUTES.SIGN_IN}>
            <Button variant="ghost" className="font-medium">Sign In</Button>
          </Link>
          <Link to={AUTH_ROUTES.SIGN_UP}>
            <Button className="font-medium rounded-full shadow-sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
