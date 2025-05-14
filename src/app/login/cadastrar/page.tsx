export default function LoginCadastro() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl/9 font-bold tracking-tight ">
            Cadastre-se para postar
          </h2>
        </div>
        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-1">
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium">
                Nome
              </label>
              <div className="mt-0.5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email
              </label>
              <div className="mt-0.5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Password"
                  className="block text-sm/6 font-medium "
                >
                  Password
                </label>
              </div>
              <div className="mt-0.5">
                <input
                  type="password"
                  id="Password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 outline-gray-300 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6 "
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm/6 font-medium "
                >
                  Confirme a senha
                </label>
              </div>
              <div className="mt-0.5">
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  required
                  className="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base outline-1 outline-offset-1 outline-gray-300 text-white
                  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6 "
                />
              </div>
            </div>

            <input
              type="submit"
              value="Cadastrar"
              className="w-full cursor-pointer rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold
                shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            />
          </form>
        </div>
      </div>
    </>
  );
}
