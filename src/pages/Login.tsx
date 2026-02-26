import Container from "@/components/ui/Container";
import LoginHeader from "@/modules/auth/components/LoginHeader";
import LoginForm from "@/modules/auth/components/LoginForm";
import LoginFooter from "@/modules/auth/components/LoginFooter";

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
