import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-300">
            <p>&copy; 2026 Technical Director Portfolio. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}