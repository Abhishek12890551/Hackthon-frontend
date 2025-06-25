import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";

const Sidebar = () => {
  const navigation = [
    { name: "Dashboard", href: "/app/dashboard", icon: HomeIcon },
    { name: "New Scan", href: "/app/new-scan", icon: MagnifyingGlassIcon },
    // { name: "Reports", href: "/app/reports", icon: DocumentTextIcon },
    // { name: "Patching", href: "/app/patching", icon: WrenchScrewdriverIcon },
    // {
    //   name: "AI Assistant",
    //   href: "/app/ai-assistant",
    //   icon: ChatBubbleLeftRightIcon,
    // },
    // { name: "Settings", href: "/app/settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 glass border-r border-purple-500/20">
      <div className="flex flex-col h-full">
        {" "}
        <div className="px-6 py-8">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 pb-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                        : "text-gray-300 hover:bg-purple-600/10 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Bottom section */}
        <div className="p-4 border-t border-purple-500/20">
          <div className="flex items-center space-x-3 px-4 py-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
