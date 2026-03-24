import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [secret, setSecret] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) {
      toast.error("Password tidak boleh kosong");
      return;
    }
    
    // Simpan password ke penyimpanan browser
    localStorage.setItem("neko-secret", secret);
    onLogin(); 
    toast.success("Mencoba masuk...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Neko Drive 🐱</CardTitle>
          <CardDescription>Masukkan API Secret untuk mengakses file.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Masukkan API Secret..."
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full">Buka Brankas</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
