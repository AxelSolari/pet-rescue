import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  { name: 'Mi Cuenta', href: '/profile', icon: UserIcon },
  { name: 'Cambiar Password', href: '/profile/password', icon: FingerPrintIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const location = useLocation()
  const navigate = useNavigate()
  const current = tabs.find(tab => tab.href === location.pathname) || tabs[0]

  return (
    <div className="mb-10">
      {/* Mobile: Dropdown */}
      <div className="sm:hidden">
        <Listbox value={current} onChange={(tab) => navigate(tab.href)}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default bg-white py-2 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-purple-800 text-sm border border-gray-300">
                <span className="block truncate text-lg font-semibold text-indigo-700">{current.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {tabs.map((tab) => (
                    <Listbox.Option
                      key={tab.href}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                        }`
                      }
                      value={tab}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {tab.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>

      {/* Desktop: Horizontal Tabs */}
      <div className="hidden sm:block px-4" >
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? 'border-purple-800 text-purple-800'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href ? 'text-purple-800' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
