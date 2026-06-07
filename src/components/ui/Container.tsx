interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`max-w-360 mx-auto px-5 xs:px-10 ${className}`}>{children}</div>;
};

export default Container;
