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
      color: "from-orange-500 to-amber-500"
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            ¿Cómo{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Funciona?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cuatro pasos simples para comenzar a usar blockchain sin complicaciones
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`text-8xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20`}>
                    {step.number}
                  </span>
                  <div className="text-6xl">{step.icon}</div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900">
                  {step.title}
                </h3>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Visual Card */}
              <div className="flex-1 w-full max-w-md">
                <div className={`relative bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-200 hover:border-transparent transition-all duration-500 group`}>
                  {/* Gradient glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}></div>
                  
                  {/* Number badge */}
                  <div className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-bold text-xl">{step.number}</span>
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
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-700 font-medium">Simple, Rápido y Seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
