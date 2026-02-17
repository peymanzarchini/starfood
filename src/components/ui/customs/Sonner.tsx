import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme as "light" | "dark" | "system"}
      richColors // This enables green for success and red for error
      position="top-center"
      closeButton
    />
  );
};

export default ToasterProvider;
