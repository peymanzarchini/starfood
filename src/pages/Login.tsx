import Container from "@/components/ui/customs/Container";
import LoginHeader from "@/features/auth/components/LoginHeader";
import LoginForm from "@/features/auth/components/LoginForm";
import LoginFooter from "@/features/auth/components/LoginFooter";

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Container className="max-w-112.5">
        <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
          <LoginHeader />

          <LoginForm />

          <LoginFooter />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
