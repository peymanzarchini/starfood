import { Link } from "react-router-dom";

const RegisterFooter = () => {
  return (
    <p className="text-center mt-8 text-sm text-text-muted font-medium">
      Already have an account?{" "}
      <Link to="/login" className="text-primary font-black hover:underline ml-1">
        Login
      </Link>
    </p>
  );
};

export default RegisterFooter;
