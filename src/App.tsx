import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import Generator from "@/pages/Generator";
import CourseWork from "@/pages/CourseWork";
import History from "@/pages/History";
import Profile from "@/pages/Profile";
import Documents from "@/pages/Documents";
import Help from "@/pages/Help";

type Page = "generator" | "course" | "history" | "profile" | "documents" | "help";

const navItems = [
  { id: "generator" as Page, label: "Генератор", icon: "Sparkles", color: "#00FF7F" },
  { id: "course" as Page, label: "Курсовые", icon: "BookOpen", color: "#9B5DE5" },
  { id: "history" as Page, label: "История", icon: "Clock", color: "#FFE600" },
  { id: "documents" as Page, label: "Документы", icon: "FolderOpen", color: "#00FF7F" },
  { id: "profile" as Page, label: "Профиль", icon: "User", color: "#FF006E" },
  { id: "help" as Page, label: "Справка", icon: "HelpCircle", color: "#9B5DE5" },
];

function AppShell() {
  const [activePage, setActivePage] = useState<Page>("generator");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentNav = navItems.find(n => n.id === activePage)!;

  const renderPage = () => {
    switch (activePage) {
      case "generator": return <Generator />;
      case "course": return <CourseWork />;
      case "history": return <History />;
      case "documents": return <Documents />;
      case "profile": return <Profile />;
      case "help": return <Help />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border flex-shrink-0 fixed left-0 top-0 bottom-0 z-30">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-green flex items-center justify-center flex-shrink-0">
              <Icon name="Brain" size={20} className="text-black" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-white leading-tight">НЕЙРО</p>
              <p className="font-body text-xs text-muted-foreground">ИИ-ассистент</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-white/5 border border-white/10"
                    : "hover:bg-muted border border-transparent"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ backgroundColor: isActive ? item.color + "20" : "transparent" }}
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    style={{ color: isActive ? item.color : "#666" }}
                  />
                </div>
                <span
                  className="font-display text-xs transition-colors duration-200"
                  style={{ color: isActive ? item.color : "#666" }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="bg-muted rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-slow" />
              <span className="font-display text-xs text-neon-green">ИИ онлайн</span>
            </div>
            <p className="font-body text-xs text-muted-foreground">Готов к работе</p>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-neon-green flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-black" />
          </div>
          <span className="font-display text-sm font-bold text-white">НЕЙРО</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xs" style={{ color: currentNav.color }}>
            {currentNav.label}
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-card/98 backdrop-blur-sm border-b border-border p-4 animate-fade-in">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 ${
                    isActive ? "bg-white/5 border border-white/10" : "bg-muted border border-transparent"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    style={{ color: isActive ? item.color : "#777" }}
                  />
                  <span
                    className="font-display text-[9px]"
                    style={{ color: isActive ? item.color : "#777" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:ml-64 lg:pt-0 pt-14 pb-20 lg:pb-0">
        {/* Decorative blobs */}
        <div
          className="fixed top-20 right-20 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00FF7F, transparent)' }}
        />
        <div
          className="fixed bottom-20 left-40 w-80 h-80 rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #9B5DE5, transparent)' }}
        />

        <div key={activePage} className="animate-scale-in">
          {renderPage()}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border px-2 py-2">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 flex-1"
              >
                <Icon
                  name={item.icon}
                  size={20}
                  style={{ color: isActive ? item.color : "#555" }}
                />
                <span
                  className="font-display text-[8px]"
                  style={{ color: isActive ? item.color : "#555" }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  );
}
