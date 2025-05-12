import Link from "next/link";

const navigation = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Entrar",
    href: "/login",
    current: false,
  },
  {
    name: "Cadastrar",
    href: "/login/cadastrar",
    current: false,
  },
  {
    name: "Sobre",
    href: "/about",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  return (
    <div className="min-h-full">
      <nav className="bg-gray-800 border-2 rounded-t-2xl border-gray-800 border-b-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex text-left text-[1.2em]">
              Mini <span className="uppercase font-[800] ">Blog</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
