import Image from 'next/image'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Head Coach',
    bio: 'John has over 10 years of experience coaching at the highest level. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/john-doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Assistant Coach',
    bio: 'Jane is passionate about helping athletes reach their full potential. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/jane-smith.jpg',
  },
  {
    name: 'John Doe',
    role: 'Head Coach',
    bio: 'John has over 10 years of experience coaching at the highest level. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/john-doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Assistant Coach',
    bio: 'Jane is passionate about helping athletes reach their full potential. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/jane-smith.jpg',
  },
  {
    name: 'John Doe',
    role: 'Head Coach',
    bio: 'John has over 10 years of experience coaching at the highest level. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/john-doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'Assistant Coach',
    bio: 'Jane is passionate about helping athletes reach their full potential. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent faucibus sapien nec risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis nisi condimentum pellentesque. Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id maximus eu, blandit non velit. Duis bibendum quam enim, eget semper massa fermentum quis. Cras lorem ipsum, tincidunt et risus eget, vehicula porttitor nunc. Etiam egestas leo nec purus placerat semper. Vivamus eu mauris id velit consectetur viverra ac vel magna. Curabitur dui justo, elementum pellentesque velit id, vehicula egestas purus.',
    imageSrc: '/images/jane-smith.jpg',
  },
  // Add more team members here
]

const AboutPage = () => {
  return (
    <section className="">
      {' '}
      {/* LLanding Image */}
      <div className="w-full h-[450px] overflow-hidden">
        <img
          src={'/images/about.jpg'}
          width={100}
          height={50}
          className="object-cover w-full"
          alt=""
        />
      </div>
      <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
        {/* Overview Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-600 text-justify ">
            We are dedicated to fostering excellence and supporting the growth
            of athletes through expert coaching and personalized development
            programs. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Praesent faucibus sapien nec risus euismod pretium. Nam suscipit
            ullamcorper nunc at vehicula. Morbi ullamcorper tempor orci eget
            blandit. Nullam porta condimentum gravida. Cras accumsan lorem quis
            nisi condimentum pellentesque. Praesent augue arcu, consectetur vel
            hendrerit nec, pharetra eget nisi. Sed lorem metus, sodales id
            maximus eu, blandit non velit. Duis bibendum quam enim, eget semper
            massa fermentum quis.
          </p>
        </div>

        {/* Mission Statement Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 text-justify ">
            Our mission is to provide top-notch coaching and support to athletes
            of all levels, helping them achieve their personal and professional
            goals. We are committed to creating a positive and encouraging
            environment where every athlete can thrive. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Praesent faucibus sapien nec
            risus euismod pretium. Nam suscipit ullamcorper nunc at vehicula.
            Morbi ullamcorper tempor orci eget blandit. Nullam porta condimentum
            gravida. Cras accumsan lorem quis nisi condimentum pellentesque.
            Praesent augue arcu, consectetur vel hendrerit nec, pharetra eget
            nisi. Sed lorem metus, sodales id maximus eu, blandit non velit.
          </p>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Meet the dedicated coaches who guide and inspire our athletes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <Image
                  className="w-32 h-32 mx-auto rounded-full"
                  src={member.imageSrc}
                  alt={member.name}
                  width={128}
                  height={128}
                />
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="mt-4 text-gray-700">{member.bio.slice(0, 150)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Have questions or want to get in touch? Feel free to reach out to us
            through the following channels:
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Email:{' '}
            <a href="mailto:info@example.com" className="text-blue-500">
              info@example.com
            </a>
          </p>
          <p className="text-lg text-gray-700">
            Phone:{' '}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
