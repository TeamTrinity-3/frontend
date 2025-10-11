import { NavLink, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Home, Search, UserRound, Settings } from 'lucide-react'
import moFitLogo from '@/assets/Images/MoFit-lg.svg'

const items = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'Search', to: '/search', icon: Search },
  { label: 'Mypage', to: '/mypage', icon: UserRound },
  { label: 'Settings', to: '/settings', icon: Settings },
]

type AppSidebarProps = { logoOnly?: boolean; className?: string }

export default function AppSidebar({ logoOnly = false, className }: AppSidebarProps) {
  const { pathname } = useLocation()
  const isActivePath = (to: string) => pathname === to

  return (
    <Sidebar collapsible='icon' className={className}>
      <SidebarHeader className='ml-4 mt-7 mb-3'>
        <img src={moFitLogo} alt='MoFit' className='h-10 w-auto' />
      </SidebarHeader>

      {!logoOnly && (
        <>
          <SidebarContent className='ml-5'>
            <SidebarGroup>
              <SidebarMenu className='space-y-3'>
                {items.map(({ label, to, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton asChild isActive={isActivePath(to)}>
                      <NavLink
                        to={to}
                        end
                        className={`inline-flex items-center gap-3 px-4 py-2 pr-15 text-sm
                        ${
                          isActivePath(to)
                            ? 'text-[#111111] bg-[#EFEFEF]'
                            : 'text-[#468FAF] hover:text-[#111111] hover:bg-[#EFEFEF]'
                        }`}
                      >
                        <Icon className='size-5' strokeWidth={1.5} />
                        <span className='w-15 truncate'>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </>
      )}
    </Sidebar>
  )
}
