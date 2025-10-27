import omarImg from '../../assets/integrantes/omar.jpg';
import jhamilImg from '../../assets/integrantes/jhamil.jpg';
import yamilImg from '../../assets/integrantes/yamil.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: "Omar",
      role: "Developer Full-Stack Blockchain | AI Engineer",
      image: omarImg,
      gradient: "from-giants-orange to-sandy-brown",
      description: "Especialista en Smart Contracts y arquitectura descentralizada"
    },
    {
      name: "Jhamil",
      role: "Full Stack Developer | Backend Blockchain",
      image: jhamilImg,
      gradient: "from-kikk-dark to-giants-orange",
      description: "Experto en desarrollo frontend y experiencia de usuario"
    },
    {
      name: "Yamil",
      role: "Full Stack Developer | Blockchain Developer",
      image: yamilImg,
      gradient: "from-sandy-brown to-giants-orange",
      description: "Ingeniero especializado en IA y sistemas backend robustos"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-gray-900/40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-kikk-white mb-3 sm:mb-4 lg:mb-6">
            Conoce al{" "}
            <span className="bg-gradient-to-r from-giants-orange to-sandy-brown bg-clip-text text-transparent">
              Equipo
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-seasalt max-w-2xl mx-auto">
            Desarrolladores apasionados construyendo el futuro del blockchain conversacional
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-kikk-dark/20 backdrop-blur-lg rounded-2xl overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 w-full max-w-md mx-auto pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-10">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Circular Image */}
                <div className="absolute -top-14 sm:-top-16 lg:-top-18 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-kikk-dark/50 border-4 border-kikk-dark/20 shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay on image */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 sm:px-8 lg:px-10 relative">
                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-kikk-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-giants-orange group-hover:to-sandy-brown transition-all duration-300 text-center">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className={`text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4 sm:mb-5 lg:mb-6 text-center`}>
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-seasalt text-sm sm:text-base lg:text-lg leading-relaxed text-center max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-24 right-6 w-12 h-12 bg-gradient-to-br ${member.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              </div>


            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-kikk-dark/20 backdrop-blur-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg border-2 border-giants-orange/20">
            <span className="text-kikk-white">💼 Construyendo el futuro juntos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
