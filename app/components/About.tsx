import Image from 'next/image';

function About(): React.ReactElement { 

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="flex flex-col md:flex-row items-center">
          <Image
            src="/images/profile.jpg"
            alt="Euael M. Eshete"
            className="w-auto h-auto rounded-full mb-6 md:mb-0 md:mr-8"
            width={192}
            height={192}
            priority
          />
          <p className="text-lg">
            Passionate Computer Engineer with a Bachelor&apos;s degree from Addis Ababa University,
            currently pursuing a Master&apos;s degree. With hands-on experience in developing AI-driven
            conversational agents and responsive websites, I thrive on turning complex challenges
            into innovative solutions. I&apos;ve collaborated on projects that range from integrating
            advanced machine learning models to optimizing user experiences on web platforms. I&apos;m a
            team player who values precision and organizational excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
