"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown, Loader, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link"
import { Fragment } from "react";

const Header = () => {
    const { setTheme } = useTheme()
    const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

    return (
        <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]">
            <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between">
                <div className="flex items-center flex-1 gap-9">
                    <div>
                        <Link
                            className="font-black text-[20px] text-primary"
                            href="/dashboard"
                        >
                            CVbuild.ai
                        </Link>
                    </div>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-2">
                            <span className="font-normal text-black/50 dark:text-primary-foreground">
                                Hi,
                            </span>
                            <h5 className="font-bold text-black dark:text-primary-foreground">
                                {user?.given_name} {user?.family_name}
                            </h5>
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center gap-9">
                    {isLoading || error ? (
                        <Loader
                            className="animate-spin !size-6 text-black dark:text-white"
                        />
                    ) : (
                        <Fragment>
                            {isAuthenticated && user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger role="button">
                                        <div className="flex items-center gap-1">
                                            <Avatar
                                                role="button"
                                                className="!cursor-pointer"
                                            >
                                                <AvatarImage src={user?.picture || ""} />
                                                <AvatarFallback className="!cursor-pointer">
                                                    {user?.given_name?.[0]}
                                                    {user?.family_name?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <ChevronDown size="17px" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="my-3">
                                        <DropdownMenuItem
                                            asChild
                                            className="!text-red-500 font-medium !cursor-pointer"
                                        >
                                            <LogoutLink>Log out</LogoutLink>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : null}
                        </Fragment>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Header