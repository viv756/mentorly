import { Types } from "mongoose";

export const dummyProfiles = [
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Full-stack developer with a strong focus on the MERN stack (MongoDB, Express, React, Node.js). Passionate about building",
    location: "New York, USA",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 PM", to: "14:00 PM" }],
      Wed: [],
      Thu: [{ from: "13:00 AM", to: "16:00 AM" }],
      Fri: [{ from: "09:00 PM", to: "12:00 PM" }],
      Sat: [],
      Sun: [],
    },
aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    rating: { average: 4.5, count: 10 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user1" },
      { platform: "github", url: "https://github.com/user1" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Frontend engineer with a deep passion for React and creating intuitive, visually appealing user interfaces. Skilled in building responsive",
    location: "London, UK",
    weeklyAvailability: {
      Mon: [{ from: "11:00 AM", to: "15:00 AM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 AM" }],
      Wed: [{ from: "10:00 AM", to: "13:00 AM" }],
      Thu: [],
      Fri: [{ from: "14:00 AM", to: "17:00 AM" }],
      Sat: [],
      Sun: [],
    },
aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    rating: { average: 4.0, count: 5 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user2" },
      { platform: "twitter", url: "https://twitter.com/user2" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Backend developer specializing in Node.js with a strong focus on building scalable, high-performance APIs and robust server-side",
    location: "Berlin, Germany",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "08:00 AM", to: "12:00 AM" }],
      Tue: [],
      Wed: [{ from: "09:00 AM", to: "11:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },

    rating: { average: 4.2, count: 8 },
    socialLinks: [
      { platform: "github", url: "https://github.com/user3" },
      { platform: "linkedin", url: "https://linkedin.com/in/user3" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Software engineer with hands-on experience in cloud services and DevOps practices. Skilled in designing, deploying, and managing",
    location: "Toronto, Canada",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "13:00 AM", to: "16:00 AM" }],
      Wed: [{ from: "10:00 AM", to: "14:00 AM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },
aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    rating: { average: 4.8, count: 15 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user4" },
      { platform: "github", url: "https://github.com/user4" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Frontend developer and UX enthusiast passionate about crafting engaging, user-friendly web experiences. Skilled in building",
    location: "Paris, France",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "13:00 AM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 AM" }],
      Wed: [],
      Thu: [{ from: "14:00 AM", to: "17:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },

    rating: { average: 3.9, count: 7 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user5" },
      { platform: "twitter", url: "https://twitter.com/user5" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Mobile app developer specializing in React Native and Flutter, creating cross-platform applications that deliver seamless user",
    location: "Sydney, Australia",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "11:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "13:00 AM" }],
      Wed: [{ from: "14:00 AM", to: "17:00 AM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    rating: { average: 4.3, count: 9 },
    socialLinks: [
      { platform: "github", url: "https://github.com/user6" },
      { platform: "linkedin", url: "https://linkedin.com/in/user6" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "DevOps engineer with expertise in designing and managing CI/CD pipelines and deploying scalable applications on AWS. Skilled in",
    location: "San Francisco, USA",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "08:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "14:00 AM" }],
      Wed: [],
      Thu: [{ from: "13:00 AM", to: "16:00 AM" }],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },

    rating: { average: 4.6, count: 12 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user7" },
      { platform: "github", url: "https://github.com/user7" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://plus.unsplash.com/premium_photo-1670972316977-1eeaafa2fac8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "AI enthusiast passionate about building machine learning models and integrating them into web applications to create intelligent",
    location: "Berlin, Germany",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "11:00 AM" }],
      Tue: [],
      Wed: [{ from: "10:00 AM", to: "13:00 AM" }],
      Thu: [{ from: "14:00 AM", to: "17:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },

    rating: { average: 4.1, count: 6 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user8" },
      { platform: "github", url: "https://github.com/user8" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Software architect with extensive experience designing scalable, maintainable, and high-performance systems. Passionate about mentoring junior developers, guiding them through best practices, code quality, and architectural principles. Skilled in translating complex business requirements into efficient technical solutions while fostering a collaborative environment that encourages learning, growth, and innovation across teams.",
    location: "Toronto, Canada",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "14:00 AM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 AM" }],
      Wed: [{ from: "11:00 AM", to: "15:00 AM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.9, count: 20 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user9" },
      { platform: "twitter", url: "https://twitter.com/user9" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Full-stack engineer specializing in Node.js and React, building robust, scalable web applications from end to end. Experienced.",
    location: "Amsterdam, Netherlands",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "13:00 AM" }],
      Wed: [{ from: "14:00 AM", to: "17:00 AM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.2, count: 10 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user10" },
      { platform: "github", url: "https://github.com/user10" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Backend developer specializing in building robust APIs and scalable microservices architectures. Experienced in designing efficient",
    location: "Stockholm, Sweden",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "13:00 AM", to: "16:00 AM" }],
      Wed: [],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.0, count: 5 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user11" },
      { platform: "github", url: "https://github.com/user11" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Cloud engineer specializing in AWS and Docker, focused on designing, deploying, and managing scalable cloud infrastructure.",
    location: "Singapore",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [],
      Wed: [{ from: "13:00 AM", to: "16:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.5, count: 12 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user12" },
      { platform: "github", url: "https://github.com/user12" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Mobile developer specializing in creating cross-platform applications that deliver seamless and engaging user experiences.",
    location: "Tokyo, Japan",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "13:00 AM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 AM" }],
      Wed: [],
      Thu: [{ from: "14:00 AM", to: "17:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 3.8, count: 4 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user13" },
      { platform: "twitter", url: "https://twitter.com/user13" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://plus.unsplash.com/premium_photo-1675626487177-c3d2f8d9ccf7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Full-stack engineer passionate about Node.js and TypeScript, building scalable, maintainable, and high-performance web applications.",
    location: "Dubai, UAE",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "13:00 AM" }],
      Wed: [{ from: "14:00 AM", to: "17:00 AM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 AM" }],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.2, count: 8 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user14" },
      { platform: "github", url: "https://github.com/user14" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "AI engineer focused on building intelligent web applications that leverage machine learning and data-driven insights. Experienced in developing predictive",
    location: "Seoul, South Korea",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [],
      Wed: [{ from: "13:00 AM", to: "16:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.4, count: 9 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user15" },
      { platform: "github", url: "https://github.com/user15" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Backend developer specializing in designing and building robust REST and GraphQL APIs. ",
    location: "Barcelona, Spain",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "13:00 AM", to: "16:00 AM" }],
      Wed: [],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.1, count: 7 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user16" },
      { platform: "github", url: "https://github.com/user16" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Software engineer with extensive experience building web applications, passionate about designing scalable, high-performance solutions.",
    location: "Lisbon, Portugal",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "13:00 AM" }],
      Wed: [],
      Thu: [{ from: "14:00 AM", to: "17:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.3, count: 10 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user17" },
      { platform: "twitter", url: "https://twitter.com/user17" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Frontend developer focused on React, Tailwind CSS, and crafting exceptional UI/UX experiences.",
    location: "Rome, Italy",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [],
      Wed: [{ from: "13:00 AM", to: "16:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "14:00 AM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.0, count: 6 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user17" },
      { platform: "twitter", url: "https://twitter.com/user17" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1563237023-b1e970526dcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Backend engineer specializing in Node.js, Express, and MongoDB, building scalable and high-performance server-side applications.",
    location: "Vienna, Austria",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "13:00 AM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 AM" }],
      Wed: [{ from: "14:00 AM", to: "17:00 AM" }],
      Thu: [],
      Fri: [{ from: "10:00 AM", to: "14:00 AM" }],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.3, count: 8 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user18" },
      { platform: "github", url: "https://github.com/user18" },
    ],
  },
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    bio: "Full-stack developer working with the MERN stack, experienced in building end-to-end web applications from concept to deployment. ",
    location: "Berlin, Germany",
    aboutMe:`📱 Mobile App Developer specializing in React Native and Flutter, focused on building high-quality, cross-platform applications that deliver seamless, engaging, and consistent user experiences across Android and iOS. I have hands-on experience designing and developing responsive, high-performance mobile apps, from initial concept and architecture to deployment and maintenance.

⚙️ I enjoy integrating RESTful APIs, managing application state efficiently, and implementing clean, intuitive UI/UX designs that align with modern design standards. My work emphasizes performance optimization, smooth animations, accessibility, and scalability to ensure apps remain reliable as they grow.

🎨 With a strong eye for detail and usability, I collaborate closely with designers and stakeholders to transform ideas into polished mobile solutions. I continuously explore new tools, frameworks, and best practices to improve code quality and development workflows.

🚀 Passionate about problem-solving and innovation, I strive to build maintainable, future-ready mobile applications that provide real value to users while meeting business goals.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 AM" }],
      Tue: [],
      Wed: [{ from: "11:00 AM", to: "15:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "13:00 AM" }],
      Fri: [{ from: "14:00 AM", to: "17:00 AM" }],
      Sat: [],
      Sun: [],
    },
    rating: { average: 4.6, count: 12 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user19" },
      { platform: "twitter", url: "https://twitter.com/user19" },
    ],
  },
];
