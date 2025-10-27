const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    producto: [
      { name: "Características", href: "#features" },
      { name: "Cómo Funciona", href: "#how-it-works" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "Equipo", href: "#team" }
    ],
    recursos: [
      { name: "Documentación", href: "#" },
      { name: "API", href: "#" },
      { name: "GitHub", href: "https://github.com" },
      { name: "Whitepaper", href: "#" }
    ],
    comunidad: [
      { name: "Discord", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Telegram", href: "#" },
      { name: "Blog", href: "#" }
    ],
    legal: [
      { name: "Términos de Uso", href: "#" },
      { name: "Privacidad", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licencia", href: "#" }
    ]
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
      href: "#"
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      href: "#"
    },
    {
      name: "Discord",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      href: "#"
    },
    {
      name: "Telegram",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      ),
      href: "#"
    }
  ];

  return (
    <footer className="bg-transparent text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                sBTC ChatBot
              </span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              El futuro de las interacciones blockchain. Simple, seguro y descentralizado.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {currentYear} sBTC ChatBot. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
            <span>Powered by</span>
            <span className="font-semibold text-orange-500">Stacks Blockchain</span>
            <span>•</span>
            <span className="font-semibold text-purple-500">Clarity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
