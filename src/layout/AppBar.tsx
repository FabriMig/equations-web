import { LogIn, BookOpen, Variable, LogOut, Menu } from "lucide-react"
import { Link } from 'react-router-dom';

import { routes } from "@/routes";
import useUserStore from "@/store/user.store";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useApi } from "@/hooks/useApi";
import { logout } from "@/services/user.service";

function AppBar() {
    const { logoutUser } = useUserStore();

    const { email } = useUserStore();
    const { fetch } = useApi(logout, {
        onSuccess: () => {
            logoutUser()
        }
    })

    return (
        <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between space-x-6">
                <div className="flex items-center space-x-6 w-full">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">EquationSolver</h1>
                    <nav className="md:flex hidden items-center justify-end space-x-4 w-full">
                        <Link to={routes.solveEquations.route} className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center px-4 py-2 rounded">
                            <Variable className="mr-2 h-4 w-4" />
                            Solver
                        </Link>
                        <Link to={routes.userEquations.route} className="text-gray-300 hover:text-white hover:bg-gray-800 flex items-center px-4 py-2 rounded">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Equations
                        </Link>
                    </nav>
                </div>
                {email !== "" ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="rounded-full p-0" aria-label="popoverBtn">
                                <Avatar className=" bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                                    <AvatarFallback className=" text-white">
                                        {email[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-gray-800 border-gray-700 p-4 px-6 rounded mt-2 -translate-x-5">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                                        <AvatarFallback className="text-white text-lg">
                                            {email[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">{email}</p>
                                        <p className="text-xs text-gray-400">{email}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" onClick={fetch} className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors duration-200">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Link to={routes.login.route} className="bg-white hover:bg-gray-300 text-black font-semibold transition-colors duration-200 flex rounded px-4 py-2 items-center">
                        <LogIn className="mr-2 h-5 w-4" />
                        Login
                    </Link>
                )}
                <Sheet >
                    <SheetTrigger>
                        <Menu className="md:hidden" />
                    </SheetTrigger>
                    <SheetContent side={"left"} className="w-[300px]">
                        <SheetHeader>
                            <SheetTitle>Navigation</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col items-center space-x-1 h-full justify-center">
                            <Link to={routes.solveEquations.route} className="w-full text-gray-300 hover:text-white hover:bg-gray-800 flex items-center px-4 py-2 rounded">
                                <Variable className="mr-2 h-4 w-4" />
                                Solver
                            </Link>
                            <Link to={routes.userEquations.route} className=" w-full text-gray-300 hover:text-white hover:bg-gray-800 flex items-center px-4 py-2 rounded">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Equations
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default AppBar