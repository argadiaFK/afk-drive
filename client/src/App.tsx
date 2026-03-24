import { StackList } from "@/components/FileList";
import { AppLayout } from "@/components/layout/AppLayout";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import { TransferWidget } from "@/components/TransferWidget";
import { Toaster } from "@/components/ui/sonner";
import { UploadWidget } from "@/components/UploadWidget";
import { TransferProvider } from "@/context/TransferContext";
import { useEffect, useState } from "react";
// 1. Import komponen Login yang baru dibuat
import { Login } from "@/components/Login";

function App() {
  // 2. Tambahkan state ini untuk mengecek apakah sudah ada password di memori
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("neko-secret"));

  const [isUploadWidgetOpen, setIsUploadWidgetOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"active" | "trash">("active");
  const [theme, setTheme] = useState(() => localStorage.getItem("neko-theme") || "system");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("neko-theme", theme);
  }, [theme]);

  const handleViewChange = (view: "active" | "trash") => {
    setCurrentView(view);
  };

  // 3. Tampilkan halaman Login jika belum ada password
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={() => setIsAuthenticated(true)} />
        <Toaster theme={theme as "dark" | "light" | "system"} />
      </>
    );
  }

  // Jika sudah ada password, tampilkan aplikasi aslinya
  return (
    <TransferProvider>
      <AppLayout
        currentView={currentView}
        setCurrentView={handleViewChange}
        setIsUploadWidgetOpen={setIsUploadWidgetOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        setTheme={setTheme}
      >
        <StackList status={currentView === "trash" ? "trashed" : "active"} />
      </AppLayout>

      <TransferWidget />
      <UploadWidget open={isUploadWidgetOpen} onOpenChange={setIsUploadWidgetOpen} />
      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} theme={theme} setTheme={setTheme} />
      <Toaster theme={theme as "dark" | "light" | "system"} />
    </TransferProvider>
  );
}

export default App;
