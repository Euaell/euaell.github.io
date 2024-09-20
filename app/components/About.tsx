import Image from 'next/image';
import BackgroundParticles from './BackgroundParticles';
import ProfilePictureAnimation from './ProfileImageAnimation';
import React from 'react';


function About(): React.ReactElement {
  return (
    <section
      id="about"
      className="py-16 bg-transparent relative overflow-hidden"
    >
      <BackgroundParticles type="about" />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 relative">
            <div className="relative w-56 h-56 mx-auto">
              {/* Profile Picture */}
              <Image
                src="/images/profile.jpg"
                alt="Euael M. Eshete"
                className="rounded-full object-cover"
                layout="fill"
                priority
              />
              {/* Animation Overlay */}
              <ProfilePictureAnimation />
            </div>
          </div>
          <div className="md:w-2/3 md:pl-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              I&apos;m a <strong>Computer Engineer</strong> and <strong>Python Developer</strong> 
              with a Bachelor's degree from <strong>Addis Ababa University</strong>, currently 
              pursuing a Master&apos;s degree. With hands-on experience in developing AI-driven 
              conversational agents and responsive websites, I thrive on turning complex challenges 
              into innovative solutions. I&apos;ve collaborated on projects that range from integrating 
              advanced machine learning models to optimizing user experiences on web platforms. 
              I&apos;m a team player who values precision and organizational excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default About;
