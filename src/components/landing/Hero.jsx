import { useState, useEffect } from "react";
import logoStack from '../../assets/logo_stack.png';

const Hero = ({ onStartChat }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* Animated background elements - subtle for stars background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
                <div
                    className={`transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        }`}
                >
                    {/* Logo/Icono */}
                    <div className="mb-6 sm:mb-8 md:mb-10 flex justify-center">
                      <img 
                        src={logoStack}
                        alt="sBTC ChatBot Logo" 
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-2xl shadow-giants-orange/40 border-4 border-giants-orange animate-pulse"
                      />
                    </div>

                    {/* Main Heading with Gradient */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight">
                        <span className="block text-kikk-white mb-1 sm:mb-2"><span className=" bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent animate-gradient-x">sBTC </span>ChatBot</span>
                        
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-seasalt max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4 sm:px-0">
                        Que pagar con Crypto sea tan fácil como enviar un mensaje de whatsapp.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
                        <button 
                            onClick={onStartChat}
                            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-giants-orange to-sandy-brown text-kikk-white rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-giants-orange/50 transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Comenzar Ahora
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sandy-brown to-giants-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-kikk-dark/50 backdrop-blur-sm text-kikk-white rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-giants-orange/30 hover:border-sandy-brown/50 w-full sm:w-auto">
                            Ver Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-4 sm:px-0">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent mb-1 sm:mb-2">
                                100%
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-seasalt">
                                Descentralizado
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent mb-1 sm:mb-2">
                                24/7
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-seasalt">
                                Disponible
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent mb-1 sm:mb-2">
                                Seguro
                            </div>
                            <div className="text-xs sm:text-sm lg:text-base text-seasalt">
                                En Blockchain
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-6 h-6 text-seasalt"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;
