import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, NewspaperIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import type { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  userName: User['userName']
  isGuest: boolean
}

export default function NavMenu({userName, isGuest} : NavMenuProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.removeQueries({queryKey: ['user']})
    navigate('/auth/login')
  }
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center text-sm font-semibold leading-6 p-1 rounded">
        <Bars3Icon className='w-8 h-8 text-rose-500 ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-in duration-200"
        enterFrom="opacity-0 translate-x-1"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-1"
      >
        <Popover.Panel className="absolute mt-2 left-16 flex w-44 lg:w-[174px] -translate-x-full transition duration-200 lg:translate-x-full lg:-left-18 z-50">
          <div className="w-full rounded-xl bg-white p-4 text-sm font-semibold leading-6  shadow-lg">
            <p className='text-center mb-2'>Hola: <span className='italic '>{userName}</span></p>
            {!isGuest && (
              <div>
                <Link
                  to='/profile'
                  className='p-2 hover:text-rose-950 flex items-center gap-3'
                ><UserIcon className='w-5 h-5 text-rose-700' /> Mi Perfil</Link>
                <Link
                  to='/dashboardview'
                  className='p-2 hover:text-rose-950 flex items-center gap-3'
                ><NewspaperIcon className='w-5 h-5 text-rose-700' /> Mis Publicaciones</Link>
                </div>
            )}
            <button
              className='p-2 hover:text-rose-950 flex items-center gap-3'
              type='button'
              onClick={logout}
            >
             <ArrowLeftStartOnRectangleIcon className='w-5 h-5 text-rose-700' /> Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}