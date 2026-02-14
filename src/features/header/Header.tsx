import Container from "@/components/ui/customs/Container";
import Logo from "@/components/ui/customs/Logo";
import ThemeToggle from "@/components/ui/customs/ThemeToggle";
import MenuList from "./components/MenuList";

const Header = () => {
  return (
    <header className="w-full py-5 shadow bg-bg-page dark:bg-dark-bg-page border-b border-gray-50 dark:border-gray-400">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-5">
            <Logo />
            <ThemeToggle />
          </div>
          <MenuList />
        </div>
      </Container>
    </header>
  );
};

export default Header;
