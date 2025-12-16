import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 p-4 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertTriangle size={48} />
      </div>
      <h1 className="text-6xl font-bold mb-2 text-white font-mono">404</h1>
      <p className="text-xl text-muted-foreground mb-8 font-mono">SYSTEM_ERROR: MODULE_NOT_FOUND</p>
      <Link href="/">
        <a className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
          RETURN TO HUB
        </a>
      </Link>
    </div>
  );
}
