import Image from 'next/image';

function About(): React.ReactElement { 
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Me</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="relative w-56 h-56 mx-auto">
              <Image
                src="/images/profile.jpg"
                alt="Euael M. Eshete"
                className="rounded-full object-cover"
                layout="fill"
                priority
              />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Passionate Computer Engineer with a Bachelor&apos;s degree from Addis Ababa University,
              currently pursuing a Master&apos;s degree. With hands-on experience in developing AI-driven
              conversational agents and responsive websites, I thrive on turning complex challenges
              into innovative solutions. I’ve collaborated on projects that range from integrating
              advanced machine learning models to optimizing user experiences on web platforms. I&apos;m a
              team player who values precision and organizational excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
