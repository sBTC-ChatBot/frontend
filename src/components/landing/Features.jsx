import { useState } from 'react';

const Features = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            icon: "💬",
            title: "Chat Inteligente",
            description: "Interactúa con contratos inteligentes usando lenguaje natural. No necesitas conocimientos técnicos.",
            gradient: "from-blue-500 to-cyan-500",
            shadow: "hover:shadow-blue-500/50"
        },
        {
            icon: "💰",
            title: "Gestión de Transacciones",
            description: "Envía, recibe y consulta tus transacciones en Stacks de forma simple y segura.",
            gradient: "from-green-500 to-emerald-500",
            shadow: "hover:shadow-green-500/50"
        },
        {
            icon: "🔍",
            title: "Historial Completo",
            description: "Visualiza todas tus interacciones y transacciones en un panel intuitivo y detallado.",
            gradient: "from-purple-500 to-pink-500",
            shadow: "hover:shadow-purple-500/50"
        },
        {
            icon: "🔐",
            title: "Seguridad Total",
            description: "Tus claves privadas permanecen contigo. Integración segura con wallets de Stacks.",
            gradient: "from-orange-500 to-red-500",
            shadow: "hover:shadow-orange-500/50"
        },
        {
            icon: "⚡",
            title: "Respuestas Instantáneas",
            description: "Procesamiento rápido de consultas y ejecución eficiente de contratos inteligentes.",
            gradient: "from-yellow-500 to-orange-500",
            shadow: "hover:shadow-yellow-500/50"
        },
        {
            icon: "🌐",
            title: "Totalmente Descentralizado",
            description: "Sin servidores centralizados. Todo funciona directamente en la blockchain de Stacks.",
            gradient: "from-indigo-500 to-blue-500",
            shadow: "hover:shadow-indigo-500/50"
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-gray-100 opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        ¿Por qué elegir{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                            Clarity ChatBot?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Combinamos la potencia de la blockchain con la simplicidad de una conversación
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white p-8 rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-gray-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.15),0_15px_30px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-6 hover:rotate-1 cursor-pointer transform-gpu`}
            >
              {/* 3D Shadow layers with depth */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 transform translate-y-2 translate-x-2 group-hover:translate-y-8 group-hover:translate-x-4 shadow-xl group-hover:shadow-2xl"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-0 group-hover:opacity-60 transition-all duration-700 -z-20 transform translate-y-4 translate-x-3 group-hover:translate-y-12 group-hover:translate-x-6 shadow-lg"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 opacity-0 group-hover:opacity-30 transition-all duration-1000 -z-30 transform translate-y-6 translate-x-4 group-hover:translate-y-16 group-hover:translate-x-8"></div>

              {/* Top highlight for 3D effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-t-2xl"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-300 opacity-0 group-hover:opacity-50 transition-all duration-700 -z-20 transform translate-y-2 translate-x-2 group-hover:translate-y-8 group-hover:translate-x-4"></div>                            {/* Icon */}
                            <div className={`text-6xl mb-6 transform transition-all duration-500 ${hoveredCard === index ? 'scale-125 rotate-12' : 'scale-100'} group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-2xl`}>
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed transform transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                {feature.description}
                            </p>

                            {/* Decorative dot */}
                            <div className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">¿Listo para comenzar?</p>
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                        Explorar Funcionalidades
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Features;
