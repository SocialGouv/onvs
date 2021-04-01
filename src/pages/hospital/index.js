import { Menu } from "@headlessui/react"
import {
  ClipboardIcon,
  UserCircleIcon,
  ViewListIcon,
} from "@heroicons/react/outline"
import { useRouter } from "next/router"
import React from "react"

import { PrimaryButtton, Title1 } from "@/components/lib"
import { firstStepUrl } from "@/utils/stepFlows"

function HospitalHomePage() {
  const router = useRouter()

  const [isMenuProfileOpen, setMenuProfileOpen] = React.useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="ml-3 text-xl font-bold text-gray-900 font-evolventa">
                ONVS
              </span>
            </div>
            <div className="flex flex-col flex-grow mt-5">
              <nav className="flex-1 px-2 space-y-1 bg-white">
                {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
                <a
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md group"
                >
                  {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
                  <ClipboardIcon className="w-6 h-6 mr-3 text-gray-500" />
                  Formulaire
                </a>

                <a
                  href="#"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group"
                >
                  {/* Heroicon name: outline/users */}
                  <ViewListIcon className="w-6 h-6 mr-3 text-gray-500" />
                  Liste (à venir)
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
            <span className="sr-only">Open sidebar</span>
            {/* Heroicon name: outline/menu-alt-2 */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1" />
            <div className="flex items-center ml-4 md:ml-6">
              {/* <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>

                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button> */}

              {/* Profile dropdown */}
              <div className="relative ml-3">
                {/*
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            */}
                {/* <Transition
                  show={isMenuProfileOpen}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  {(ref) => (
                    <>
                      <div
                        className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Your Profile
                        </a>

                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>

                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </div>
                    </>
                  )}
                </Transition> */}
                <Menu>
                  <Menu.Button>
                    {" "}
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setMenuProfileOpen(true)}
                    >
                      <UserCircleIcon className="w-8 h-8 text-gray-500 rounded-full" />
                    </button>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {({ active }) => (
                        <a
                          className={`${active && "bg-blue-500"}`}
                          href="/hospital"
                        >
                          Profil (à venir)
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item
                      disabled
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className="opacity-75">Autre menu (à venir)</span>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>{" "}
              </div>
            </div>
          </div>
        </div>

        <main
          className="relative flex-1 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-center text-gray-900">
                Déclaration des incidents de violence
              </h1>
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">
                <div className="p-8 text-center rounded-lg shadow h-96">
                  <Title1 className="mb-8 text-center">Formulaire</Title1>

                  <p>Remplissez le questionnaire directement. </p>

                  <p className="mb-8">Temps estimé : 4 minutes.</p>

                  <PrimaryButtton
                    onClick={() => router.push(firstStepUrl("ets"))}
                  >
                    Déclarer
                  </PrimaryButtton>
                </div>
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
    // </Layout>
  )
}

export default HospitalHomePage
