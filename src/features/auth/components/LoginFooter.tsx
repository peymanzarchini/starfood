import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <div className="text-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
      <p className="text-sm text-text-muted font-medium">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-black hover:underline ml-1">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginFooter;
