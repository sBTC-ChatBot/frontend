/**
 * Landing Page - Página de inicio
 */
import logoStack from '../assets/logo_stack.png';

const LandingPage = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-licorice via-jet to-jet-400 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto text-center">
        {/* Logo/Icono */}
        <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
          <img 
            src={logoStack}
            alt="sBTC ChatBot Logo" 
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-2xl shadow-giants-orange/40 border-4 border-giants-orange animate-pulse"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-seasalt mb-4 sm:mb-5 md:mb-6 tracking-tight">
          Clarity <span className="text-giants-orange">Chat</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-jet-900 mb-8 sm:mb-10 md:mb-12 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2">
          Tu asistente inteligente para interactuar con la blockchain de Stacks. 
          Gestiona tu wallet, realiza transferencias y consulta contratos con lenguaje natural.
        </p>

        {/* Características */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="bg-jet-400 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-jet-700 hover:border-giants-orange transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-giants-orange/20">
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">💬</div>
            <h3 className="text-seasalt font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Chat Inteligente</h3>
            <p className="text-jet-900 text-xs sm:text-sm md:text-base">
              Usa lenguaje natural para interactuar con tus contratos Clarity
            </p>
          </div>

          <div className="bg-jet-400 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-jet-700 hover:border-sandy-brown transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sandy-brown/20">
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">💰</div>
            <h3 className="text-seasalt font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Transferencias</h3>
            <p className="text-jet-900 text-xs sm:text-sm md:text-base">
              Envía STX de forma segura con confirmación en cada paso
            </p>
          </div>

          <div className="bg-jet-400 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-jet-700 hover:border-rust transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rust/20 sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">🔍</div>
            <h3 className="text-seasalt font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Consultas</h3>
            <p className="text-jet-900 text-xs sm:text-sm md:text-base">
              Revisa balances, historial y estado de transacciones al instante
            </p>
          </div>
        </div>

        {/* Botón principal */}
        <button
          onClick={onStartChat}
          className="bg-giants-orange hover:bg-rust text-seasalt font-bold text-base sm:text-lg md:text-xl lg:text-2xl px-8 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-giants-orange/60 w-full sm:w-auto"
        >
          Comenzar Chat 🚀
        </button>

        {/* Footer info */}
        <div className="mt-12 sm:mt-14 md:mt-16 text-jet-800 text-xs sm:text-sm md:text-base">
          <p>Powered by Stacks Blockchain • Clarity Smart Contracts</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
