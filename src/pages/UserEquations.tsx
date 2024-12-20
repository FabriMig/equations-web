import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useApi } from "@/hooks/useApi"
import { fetchUserEquations } from "@/services/equations.service";
import ListEquationItem from "@/components/ListEquationItem";
import useUserStore from "@/store/user.store";
import { Link } from "react-router-dom";
import { routes } from "@/routes";

const fetchOptions = {
  autoFetch: true,
  params: {}
}

function UserEquations() {
  const { loading, error, data } = useApi(fetchUserEquations, fetchOptions);
  const { email } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("")

  const filteredEquations = data?.equations.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.equation.string.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!email) {
    return <div className="m-auto">
      <h2>Log in to store equations</h2>
      <Link to={routes.login.route} className="bg-white hover:bg-gray-300 text-black m-4 justify-center font-semibold transition-colors duration-200 flex rounded px-4 py-2 items-center">
        Login
      </Link>
    </div>
  }

  if (error) {
    return <div className="flex flex-col items-center space-y-4">
      <svg fill="#2463eb" width="99px" height="99px" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#2463eb" strokeWidth="0.00512"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m441.71 179.58h-83.434c9.8008-13.207 25.273-20.992 41.719-20.992 16.441 0 31.914 7.7852 41.715 20.992zm73.738 367.36v62.977c-0.023437 3.5273 0.32812 7.0469 1.0508 10.496h-273.32c-8.582-0.082031-16.785-3.5664-22.805-9.6836-6.0195-6.1172-9.3672-14.375-9.3125-22.957v-354.56c-0.054687-8.582 3.293-16.836 9.3125-22.957 6.0195-6.1172 14.223-9.6016 22.805-9.6836h313.62c8.5859 0.082031 16.785 3.5664 22.805 9.6836 6.0195 6.1211 9.3711 14.375 9.3125 22.957v116.61c-6.8945-1.5234-13.93-2.2969-20.992-2.3086-28.344-0.03125-55.199 12.684-73.145 34.625-17.945 21.941-25.074 50.789-19.422 78.562 5.6562 27.777 23.496 51.539 48.59 64.719-5.4531 5.8398-8.4883 13.527-8.5039 21.516zm-136.45-293.89c0.015626 5.7891 4.7031 10.477 10.496 10.496h146.94c5.7969 0 10.496-4.6992 10.496-10.496 0-5.7969-4.6992-10.496-10.496-10.496h-146.94c-5.793 0.015625-10.48 4.707-10.496 10.496zm0 31.488c0.015626 5.7891 4.7031 10.477 10.496 10.496h146.94c5.7969 0 10.496-4.6992 10.496-10.496s-4.6992-10.496-10.496-10.496h-146.94c-5.793 0.015625-10.48 4.707-10.496 10.496zm0 31.488c0.015626 5.7891 4.7031 10.477 10.496 10.496h146.94c5.7969 0 10.496-4.6992 10.496-10.496s-4.6992-10.496-10.496-10.496h-146.94c-5.793 0.015625-10.48 4.707-10.496 10.496zm0 41.984c0.015626 5.7891 4.7031 10.477 10.496 10.496h104.96c5.7969 0 10.496-4.6992 10.496-10.496s-4.6992-10.496-10.496-10.496h-104.96c-5.793 0.015625-10.48 4.707-10.496 10.496zm0 31.488c0.015626 5.7891 4.7031 10.477 10.496 10.496h83.969c5.793 0 10.492-4.6992 10.492-10.496s-4.6992-10.496-10.492-10.496h-83.969c-5.793 0.015626-10.48 4.7031-10.496 10.496zm0 31.488c0.015626 5.7891 4.7031 10.477 10.496 10.496h62.977c5.7969 0 10.496-4.6992 10.496-10.496 0-5.7969-4.6992-10.496-10.496-10.496h-62.977c-5.793 0.015625-10.48 4.7031-10.496 10.496zm-20.992 104.96c-0.019531-5.7891-4.707-10.477-10.496-10.496h-31.488v-31.488c-0.019531-5.7891-4.707-10.477-10.496-10.492h-41.984c-5.7891 0.015625-10.48 4.7031-10.496 10.492v83.969c0.015624 5.793 4.707 10.48 10.496 10.496h83.969c5.7891-0.015626 10.477-4.7031 10.496-10.496zm0-167.94v0.003906c-0.019531-5.7891-4.707-10.48-10.496-10.496h-83.969c-5.7891 0.015625-10.48 4.707-10.496 10.496v62.977c0.015624 5.7891 4.707 10.477 10.496 10.496h83.969c5.7891-0.019531 10.477-4.707 10.496-10.496zm0-104.96v0.003907c-0.019531-5.7891-4.707-10.48-10.496-10.496h-83.969c-5.7891 0.015625-10.48 4.707-10.496 10.496v62.977c0.015624 5.7891 4.707 10.477 10.496 10.496h83.969c5.7891-0.019532 10.477-4.707 10.496-10.496zm115.46 251.91c-0.019531-5.7891-4.707-10.477-10.496-10.496h-31.488v-31.484c-0.019531-5.793-4.707-10.48-10.496-10.496h-41.984c-5.7891 0.015625-10.48 4.7031-10.496 10.496v104.96c0.015625 5.793 4.707 10.48 10.496 10.496h83.969c5.7891-0.015626 10.477-4.7031 10.496-10.496zm-83.969 52.48h20.992v-83.965h-20.992zm-73.473 0h20.992v-20.992h-20.992zm115.46 0h20.992v-41.984h-20.992zm-157.44 0h20.992v-62.977h-20.992zm304.39-42.824-0.003906 21.832h10.496c5.7891 0.019532 10.48 4.707 10.496 10.496v62.977c0 11.25-6 21.645-15.742 27.27-9.7422 5.625-21.746 5.625-31.488 0-9.7422-5.625-15.746-16.02-15.746-27.27v-62.977c0.019532-5.7891 4.707-10.477 10.496-10.496h10.496v-21.832c-24.742-3.5703-45.969-19.477-56.348-42.219-10.375-22.746-8.4766-49.203 5.043-70.23 13.52-21.027 36.805-33.738 61.801-33.738 25 0 48.285 12.711 61.805 33.738 13.516 21.027 15.418 47.484 5.0391 70.23-10.375 22.742-31.605 38.648-56.348 42.219zm10.492-72.629c0 5.7969 4.6992 10.496 10.496 10.496s10.496-4.6992 10.496-10.496c0.003906-11.137-4.418-21.816-12.293-29.691s-18.555-12.297-29.691-12.293c-5.7969 0-10.496 4.6992-10.496 10.496s4.6992 10.496 10.496 10.496c5.5625 0.015624 10.895 2.2305 14.828 6.1641 3.9336 3.9336 6.1484 9.2656 6.1641 14.828z"></path> </g></svg>
      <h2>{error.message}</h2>
    </div>
  }

  return (
    <main className="flex-grow mb-auto container mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">Equations Library</h2>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search equations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 bg-gray-900 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        />
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="m-auto text-center mt-20">Loading...</div>

        ) : (
          filteredEquations.map((equation) => <ListEquationItem equation={equation} />)

        )}
      </div>
    </main>
  )
}

export default UserEquations