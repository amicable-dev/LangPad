import React from "react";
import { Home, Edit, Book, Heart, Settings } from "lucide-react";

const navItems = [
  { id: "home", labelCN: "首页", labelEN: "Home", icon: Home },
  { id: "draw", labelCN: "练习", labelEN: "Draw", icon: Edit },
  { id: "library", labelCN: "字库", labelEN: "Library", icon: Book },
  { id: "saved", labelCN: "收藏", labelEN: "Saved", icon: Heart },
  { id: "settings", labelCN: "设置", labelEN: "Settings", icon: Settings },
];

export default function Navigation({
  currentView,
  onViewChange,
}: {
  currentView: string;
  onViewChange: (view: any) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-300 shadow-lg flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`flex flex-col items-center text-xs px-3 py-1 transition-all
              ${active ? "text-green-600" : "text-gray-500 hover:text-green-500"}
              hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,255,120,0.6)]`}
          >
            <Icon
              className={`h-6 w-6 transition-all ${
                active ? "fill-green-500" : "hover:fill-green-500"
              }`}
            />
            <span className="leading-3 font-medium">{item.labelCN}</span>
            <span className="text-[0.65rem] opacity-80">{item.labelEN}</span>

            {active && (
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
