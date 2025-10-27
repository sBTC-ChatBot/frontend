const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Conecta tu Wallet",
      description: "Vincula tu wallet de Stacks (Leather, Xverse o Hiro) de forma segura. Tus claves permanecen privadas.",
      icon: "🔗",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Inicia una Conversación",
      description: "Pregunta lo que necesites en lenguaje natural. Nuestro chatbot interpreta tu intención.",
      icon: "💭",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Ejecuta Transacciones",
      description: "Envía STX, consulta balances, interactúa con contratos. Todo desde el chat.",
      icon: "⚡",
      color: "from-indigo-500 to-blue-500"
    },
    {
      number: "04",
      title: "Revisa tu Historial",
      description: "Accede a un historial completo de todas tus transacciones y conversaciones.",
      icon: "📊",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-kikk-white mb-3 sm:mb-4 lg:mb-6">
            ¿Cómo{" "}
            <span className="bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent">
              Funciona?
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-seasalt max-w-2xl mx-auto">
            Cuatro pasos simples para comenzar a usar blockchain sin complicaciones
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 sm:gap-8 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}>
                    {step.number}
                  </span>
                  <div className="text-4xl sm:text-5xl lg:text-6xl">{step.icon}</div>
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-kikk-white">
                  {step.title}
                </h3>
                
                <p className="text-sm sm:text-base lg:text-lg text-seasalt leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Visual Card */}
              <div className="flex-1 w-full max-w-md">
                <div className={`relative bg-kikk-dark/20 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border-2 border-giants-orange/20 hover:border-sandy-brown/50 transition-all duration-500 group`}>
                  {/* Gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}></div>
                  
                  {/* Number badge */}
                  <div className={`absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-bold text-sm sm:text-base lg:text-xl">{step.number}</span>
                  </div>

                  {/* Mock interface */}
                  <div className="space-y-4 relative z-10">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    <div className={`h-20 bg-gradient-to-r ${step.color} rounded-xl opacity-20`}></div>
                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-700 font-medium text-sm sm:text-base">Simple, Rápido y Seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
