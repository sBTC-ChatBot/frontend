import omarImg from '../../assets/integrantes/omar.jpg';
import jhamilImg from '../../assets/integrantes/jhamil.jpg';
import yamilImg from '../../assets/integrantes/yamil.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: "Omar",
      role: "Blockchain Developer",
      image: omarImg,
      gradient: "from-blue-500 to-cyan-500",
      description: "Especialista en Smart Contracts y arquitectura descentralizada"
    },
    {
      name: "Jhamil",
      role: "Full Stack Developer",
      image: jhamilImg,
      gradient: "from-purple-500 to-pink-500",
      description: "Experto en desarrollo frontend y experiencia de usuario"
    },
    {
      name: "Yamil",
      role: "AI & Backend Engineer",
      image: yamilImg,
      gradient: "from-orange-500 to-amber-500",
      description: "Ingeniero especializado en IA y sistemas backend robustos"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Conoce al{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Equipo
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desarrolladores apasionados construyendo el futuro del blockchain conversacional
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Image container */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient overlay on image */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social links (placeholder) */}
                  <div className="flex gap-4 mt-6">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 flex items-center justify-center group/social transition-all duration-300">
                      <svg className="w-5 h-5 text-gray-600 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 flex items-center justify-center group/social transition-all duration-300">
                      <svg className="w-5 h-5 text-gray-600 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 flex items-center justify-center group/social transition-all duration-300">
                      <svg className="w-5 h-5 text-gray-600 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}></div>
              </div>

              {/* Floating badge */}
              <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform duration-500`}>
                <span className="text-white text-2xl">✨</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
            <span className="text-gray-700">💼 Construyendo el futuro juntos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
