import Container from "@/components/ui/Container";
import RegisterHeader from "@/modules/auth/components/RegisterHeader";
import RegisterForm from "@/modules/auth/components/RegisterForm";
import RegisterFooter from "@/modules/auth/components/RegisterFooter";

const RegisterPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center py-16">
      <Container className="max-w-125">
        <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          <RegisterHeader />

          <RegisterForm />

          <RegisterFooter />
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
