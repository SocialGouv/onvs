import { Menu } from "@headlessui/react";
import {
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

import HospitalIcon from "@/components/svg/hospital-line";
import useUser from "@/hooks/useUser";
import fetcher from "@/utils/fetcher";

function MenuItem({ url, jsxIcon: Icon, title, disabled = false }) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link href={disabled ? "#" : url}>
      <a className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md group">
        {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
        <Icon className="w-6 h-6 mr-3 text-gray-500" />
        {title}
      </a>
    </Link>
  );
}

MenuItem.propTypes = {
  disabled: PropTypes.bool,
  jsxIcon: PropTypes.func,
  title: PropTypes.string,
  url: PropTypes.string,
};

function AvatarMenu() {
  const router = useRouter();
  const { mutateUser } = useUser();

  return (
    <Menu>
      <Menu.Button>
        <UserCircleIcon className="w-8 h-8 text-gray-500 rounded-full" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 w-48 py-0 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            // <Link href="/private/profil">
            <button
              className={`${
                active ? "bg-blue-500 text-white" : "text-gray-700"
              } group flex rounded-t-md items-center w-full px-4 py-2 text-sm`}
              onClick={async (event) => {
                event.preventDefault();
                router.push("/private/profil");
              }}
            >
              Profil
            </button>
            // </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {/* TODO: see why keyevent trigger active css classes, but not the router.push. */}
          {({ active }) => (
            <button
              className={`${
                active ? "bg-blue-500 text-white" : "text-gray-700"
              } group flex rounded-b-md items-center w-full px-4 py-2 text-sm`}
              onClick={async (event) => {
                event.preventDefault();

                mutateUser(
                  await fetcher("/api/auth/logout", { method: "POST" }),
                  false
                );
                router.push("/");
              }}
            >
              {"Déconnexion"}
            </button>
            // </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

function SideBar() {
  const { user } = useUser();

  const url = user?.isLoggedIn ? "/private" : "/";

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <Link href={url}>
            <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="ml-3 text-xl font-bold text-gray-900 font-evolventa">
                  ONVS
                </span>
              </div>
            </a>
          </Link>
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-2 space-y-1 bg-white">
              <MenuItem
                url="/"
                jsxIcon={ViewListIcon}
                title="Déclarations"
                disabled={true}
              />
              {user?.role === "Admin" && (
                <>
                  <hr />

                  <MenuItem
                    url="/private/users"
                    jsxIcon={UsersIcon}
                    title="Administration utilisateurs"
                  />
                  <MenuItem
                    url="/"
                    jsxIcon={HospitalIcon}
                    title="Administration ETS"
                    disabled={true}
                  />
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The layout for authentified user.
 *
 * @param {string} title
 * @param {children} content of the page
 */
function PrivateLayout({ title, children }) {
  const { user } = useUser({ redirectToIfError: "/" });

  // Check the user in order to make sure that the render from the server will not render anything.
  // Because the server can't presume if there is an authentified user or not, as this information is in the cookie on the client side.
  if (!user?.isLoggedIn) {
    return <span>Chargement...</span>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">&nbsp;</div>
            <div className="flex items-center ml-4 md:ml-6">
              <div className="relative ml-3">
                <AvatarMenu />
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto bg-white focus:outline-none">
          <div className="py-6">
            <div className="px-4 max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-center text-gray-900">
                {title}
              </h1>
            </div>
            <div className="px-4 mt-6 max-w-7xl sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default PrivateLayout;
