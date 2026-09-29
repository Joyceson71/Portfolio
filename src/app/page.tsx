"use client";

import { DesktopEnvironment } from "@/components/os/DesktopEnvironment";
import { OSProvider, WindowData } from "@/components/os/DesktopContext";
import { User, Code2, Folder, Mail } from "lucide-react";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  const initialWindows: Record<string, WindowData> = {
    about: {
      id: "about",
      title: "About Me",
      icon: <User className="w-6 h-6 text-blue-400" />,
      content: <div className="p-4"><About /></div>,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      width: 800,
      height: 600,
      defaultX: 50,
      defaultY: 50
    },
    projects: {
      id: "projects",
      title: "Projects",
      icon: <Folder className="w-6 h-6 text-yellow-400" />,
      content: <div className="p-4"><Projects /></div>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      width: 900,
      height: 650,
      defaultX: 100,
      defaultY: 100
    },
    skills: {
      id: "skills",
      title: "Skills",
      icon: <Code2 className="w-6 h-6 text-green-400" />,
      content: <div className="p-4"><Skills /></div>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      width: 700,
      height: 550,
      defaultX: 150,
      defaultY: 80
    },
    contact: {
      id: "contact",
      title: "Contact",
      icon: <Mail className="w-6 h-6 text-red-400" />,
      content: <div className="p-4"><Contact /></div>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      width: 500,
      height: 600,
      defaultX: 200,
      defaultY: 150
    }
  };

  return (
    <OSProvider initialWindows={initialWindows}>
      <DesktopEnvironment />
    </OSProvider>
  );
}