const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center py-3 fixed bottom-0 w-full">
      <p>
        &copy; {currentYear} Mini<span className="font-bold">BLOG</span>. Todos
        os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
