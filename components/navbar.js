"use client";

import { Fragment, useState } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Container from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import cx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Navbar(props) {
  const leftmenu = [
    {
      label: "Home",
      href: "/",
    },
   {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const rightmenu = [
    {
      label: "Archive",
      href: "/archive",
    },
    {
      label: "More",
      children: [
       
          {
            label: "Github",
            href: "https://github.com/Manish-Tamang",
            external: true,
          },
        
         
       
      ],
    },
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                  {leftmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between md:w-auto">
                  <Link href="/" className="w-28 dark:hidden">
                    <span className="block text-center">Manish</span>
                  </Link>
                  <Link href="/" className="hidden w-28 dark:block">
                    <span className="block text-center">Manish</span>
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden "
                  >
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                  {rightmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          <span> {item.label}</span>
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenu
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                          mobile={true}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}
                        >
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

const DropdownMenu = ({ menu, items, mobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }
    const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Menu
      as="div"
      className={cx("relative text-left", mobile && "w-full")}
      onMouseLeave={handleClose}
      onMouseEnter={handleOpen}
    >
       <Menu.Button
          className={cx(
            "flex items-center gap-x-1 rounded-md px-4 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
            isOpen
              ? "text-blue-500 hover:text-blue-500"
              : " text-gray-600 dark:text-gray-400 ",
            mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
          )}
        >
        <span>{menu.label}</span>
        <ChevronDownIcon className="mt-0.5 h-4 w-4" />
        </Menu.Button>
      <Transition
        as={Fragment}
        enter="lg:transition lg:ease-out lg:duration-100"
        enterFrom="lg:transform lg:opacity-0 lg:scale-95"
        enterTo="lg:transform lg:opacity-100 lg:scale-100"
        leave="lg:transition lg:ease-in lg:duration-75"
        leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
        leaveTo="lg:transform lg:opacity-0 lg:scale-95"
      >
        <Menu.Items
          className={cx(
            "z-20 origin-top-left rounded-md  focus:outline-none lg:absolute lg:left-0  lg:w-56",
            !mobile && "bg-white shadow-lg  dark:bg-gray-800"
          )}
        >
          <div className={cx(!mobile && "py-3")}>
            {items.map((item, index) => (
              <Menu.Item as="div" key={`${item.label}${index}`}>
                {({ active }) => (
                  <Link
                    href={item?.href ? item.href : "#"}
                    className={cx(
                      "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                      active
                        ? "text-blue-500"
                        : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                    )}
                    target={item.external ? "_blank" : ""}
                    rel={item.external ? "noopener" : ""}
                  >
                    <span> {item.label}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};