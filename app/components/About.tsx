import Image from 'next/image';
import BackgroundParticles from './BackgroundParticles';



function About(): React.ReactElement { 
  return (
    <section
      id="about"
      className="py-16 bg-transparent"
    >
      <BackgroundParticles type="about" />
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
              I&apos;m a Computer Engineer and Python Developer with a passion for creating 
              innovative software solutions. As a graduate of Addis Ababa University, I 
               in web development and have experience in building AI-driven conversational agents.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default About;
