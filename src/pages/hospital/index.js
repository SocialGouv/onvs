import { Menu } from "@headlessui/react"
import {
  ClipboardIcon,
  MenuIcon,
  UserCircleIcon,
  ViewListIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"

import { PrimaryButtton, Title1 } from "@/components/lib"
import { firstStepUrl } from "@/components/wizard/stepFlows"

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
  )
}

MenuItem.propTypes = {
  disabled: PropTypes.bool,
  jsxIcon: PropTypes.func,
  title: PropTypes.string,
  url: PropTypes.string,
}

function ProfileMenu() {
  return (
    <Menu>
      <Menu.Button>
        <UserCircleIcon className="w-8 h-8 text-gray-500 rounded-full" />
      </Menu.Button>
      {/* <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item className="block px-4 py-2 text-sm text-gray-700 ">
          {({ active }) => (
            <a className={`${active && "bg-blue-500"}`} href="/hospital">
              Profil (à venir)
            </a>
          )}
        </Menu.Item>
        <Menu.Item className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          {({ active }) => (
            <a className={`${active && "bg-blue-500"} text-red-300`}>
              Autre profil (à venir)
            </a>
          )}
        </Menu.Item>
        <Menu.Item
          disabled
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span className="opacity-75">Autre menu (à venir)</span>
        </Menu.Item>
      </Menu.Items> */}
      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <Link href="/hospital">
              <a
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-700"
                } block px-4 py-2 text-sm`}
              >
                Profil (à venir)
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {/* TODO: see why keyevent trigger active css classes, but not the router.push. */}
          {({ active }) => (
            <Link href="/">
              <a
                className={`${
                  active ? "bg-blue-500 text-white" : "text-gray-700"
                } block px-4 py-2 text-sm`}
                href="/"
              >
                {"Retour à l'accueil"}
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="block px-4 py-2 text-sm text-gray-700 opacity-75">
            Invite a friend (coming soon!)
          </span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

function SideBar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <Link href="/">
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
              {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" */}
              <MenuItem
                url="/hospital"
                jsxIcon={ClipboardIcon}
                title="Formulaire"
              />

              <MenuItem
                url="/"
                jsxIcon={ViewListIcon}
                title="Liste (à venir)"
                disabled={true}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

function HospitalHomePage() {
  const router = useRouter()

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Static sidebar for desktop */}
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
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto bg-white focus:outline-none">
          <div className="py-6">
            <div className="px-4 max-w-7xl sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-center text-gray-900">
                Déclaration des incidents de violence
              </h1>
            </div>
            <div className="px-4 mt-6 max-w-7xl sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="w-8/12 p-8 py-4 mx-auto text-center rounded-lg shadow-lg min-h-64">
                <Title1 className="mb-8 text-center">Formulaire</Title1>

                <p>Remplissez le questionnaire directement. </p>

                <p className="mb-8">Temps estimé : 4 minutes.</p>

                <PrimaryButtton
                  onClick={() => router.push(firstStepUrl("ets"))}
                >
                  Déclarer
                </PrimaryButtton>
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HospitalHomePage
