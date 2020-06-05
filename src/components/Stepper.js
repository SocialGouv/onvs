import React from "react"

export const Title1 = ({ children }) => (
  <h1 className="text-lg text-center font-evolventa">{children}</h1>
)

export const Title2 = ({ children, className }) => (
  <h1 className={`text-lg text-left font-evolventa ${className}`}>
    {children}
  </h1>
)

export const Stepper = () => (
  <section className="container flex flex-col flex-wrap py-1 mx-auto text-gray-700 body-font">
    <div className="flex flex-wrap w-full mb-8 uppercase">
      <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wider text-gray-900 bg-gray-100 border-b-2 border-gray-900 rounded-t sm:px-6 sm:w-auto sm:justify-start font-evolventa">
        01 Date et lieu
      </a>
      <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wider text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start hover:text-gray-900 font-evolventa">
        02 Faits
      </a>
      <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wider text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start hover:text-gray-900 font-evolventa">
        03 Motifs
      </a>
      <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wider text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start hover:text-gray-900 font-evolventa">
        {"04 Victimes & auteurs"}
      </a>
      <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wider text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start hover:text-gray-900 font-evolventa">
        05 Précisions
      </a>
    </div>
    {/* <img
        className="block object-cover object-center w-2/3 mx-auto mb-10 rounded xl:w-1/4 lg:w-1/3 md:w-1/2"
        alt="hero"
        src="https://dummyimage.com/720x600"
      />
      <div className="flex flex-col w-full text-center">
        <h1 className="mb-4 text-base text-xl font-medium text-gray-900">
          Master Cleanse Reliac Heirloom
        </h1>
        <p className="mx-auto text-base leading-relaxed lg:w-2/3">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
          gentrify, subway tile poke farm-to-table. Franzen you probably haven't
          heard of them man bun deep jianbing selfies heirloom prism food truck
          ugh squid celiac humblebrag.
        </p>
      </div>*/}
  </section>
)
