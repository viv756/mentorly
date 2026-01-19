import { Types } from "mongoose";

export const dummyProfiles = [
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Full-stack developer with a strong focus on the MERN stack (MongoDB, Express, React, Node.js). Passionate about building scalable and efficient web applications, crafting intuitive user interfaces, and solving complex problems through clean, maintainable code. Experienced in end-to-end development, from designing robust backends to creating responsive frontends that deliver seamless user experiences.",
    location: "New York, USA",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "10:00", to: "14:00" }],
      Wed: [],
      Thu: [{ from: "13:00", to: "16:00" }],
      Fri: [{ from: "09:00", to: "12:00" }],
      Sat: [],
      Sun: [],
    },

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
    bio: "Frontend engineer with a deep passion for React and creating intuitive, visually appealing user interfaces. Skilled in building responsive, high-performance web applications while focusing on seamless user experiences. Experienced in translating complex requirements into elegant, maintainable code and constantly exploring new technologies to enhance UI/UX design and frontend development workflows.",
    location: "London, UK",
    weeklyAvailability: {
      Mon: [{ from: "11:00", to: "15:00" }],
      Tue: [{ from: "09:00", to: "12:00" }],
      Wed: [{ from: "10:00", to: "13:00" }],
      Thu: [],
      Fri: [{ from: "14:00", to: "17:00" }],
      Sat: [],
      Sun: [],
    },

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
    bio: "Backend developer specializing in Node.js with a strong focus on building scalable, high-performance APIs and robust server-side applications. Experienced in designing efficient database schemas, implementing secure authentication, and optimizing backend workflows. Passionate about solving complex problems, ensuring reliability, and enabling seamless communication between frontend and backend systems.",
    location: "Berlin, Germany",
    weeklyAvailability: {
      Mon: [{ from: "08:00", to: "12:00" }],
      Tue: [],
      Wed: [{ from: "09:00", to: "11:00" }],
      Thu: [{ from: "10:00", to: "14:00" }],
      Fri: [{ from: "09:00", to: "12:00" }],
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
    bio: "Software engineer with hands-on experience in cloud services and DevOps practices. Skilled in designing, deploying, and managing scalable applications on cloud platforms, automating workflows, and implementing CI/CD pipelines for efficient development cycles. Passionate about optimizing system performance, ensuring reliability, and leveraging modern tools to bridge development and operations seamlessly.",
    location: "Toronto, Canada",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "13:00", to: "16:00" }],
      Wed: [{ from: "10:00", to: "14:00" }],
      Thu: [],
      Fri: [{ from: "09:00", to: "12:00" }],
      Sat: [],
      Sun: [],
    },

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
    bio: "Frontend developer and UX enthusiast passionate about crafting engaging, user-friendly web experiences. Skilled in building responsive, high-performance interfaces using modern frontend technologies, with a strong focus on usability, accessibility, and design aesthetics. Experienced in translating complex requirements into intuitive, visually appealing solutions that delight users and enhance overall digital experiences.",
    location: "Paris, France",
    weeklyAvailability: {
      Mon: [{ from: "10:00", to: "13:00" }],
      Tue: [{ from: "09:00", to: "12:00" }],
      Wed: [],
      Thu: [{ from: "14:00", to: "17:00" }],
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
    bio: "Mobile app developer specializing in React Native and Flutter, creating cross-platform applications that deliver seamless user experiences. Experienced in building responsive, high-performance apps, integrating APIs, and implementing intuitive UI/UX designs. Passionate about turning ideas into polished mobile solutions, optimizing performance, and leveraging modern tools to develop scalable and maintainable applications.",
    location: "Sydney, Australia",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "11:00" }],
      Tue: [{ from: "10:00", to: "13:00" }],
      Wed: [{ from: "14:00", to: "17:00" }],
      Thu: [],
      Fri: [{ from: "09:00", to: "12:00" }],
      Sat: [],
      Sun: [],
    },
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
    bio: "DevOps engineer with expertise in designing and managing CI/CD pipelines and deploying scalable applications on AWS. Skilled in automating infrastructure, monitoring system performance, and ensuring high availability and reliability of services. Passionate about bridging development and operations, optimizing workflows, and leveraging cloud and DevOps best practices to deliver efficient, robust, and maintainable systems.",
    location: "San Francisco, USA",
    weeklyAvailability: {
      Mon: [{ from: "08:00", to: "12:00" }],
      Tue: [{ from: "10:00", to: "14:00" }],
      Wed: [],
      Thu: [{ from: "13:00", to: "16:00" }],
      Fri: [{ from: "09:00", to: "12:00" }],
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
    bio: "AI enthusiast passionate about building machine learning models and integrating them into web applications to create intelligent, data-driven solutions. Experienced in developing predictive models, natural language processing tools, and recommendation systems, with a focus on optimizing performance and usability. Dedicated to leveraging AI to solve real-world problems and enhance user experiences through innovative technology.",
    location: "Berlin, Germany",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "11:00" }],
      Tue: [],
      Wed: [{ from: "10:00", to: "13:00" }],
      Thu: [{ from: "14:00", to: "17:00" }],
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
    weeklyAvailability: {
      Mon: [{ from: "10:00", to: "14:00" }],
      Tue: [{ from: "09:00", to: "12:00" }],
      Wed: [{ from: "11:00", to: "15:00" }],
      Thu: [],
      Fri: [{ from: "09:00", to: "12:00" }],
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
    bio: "Full-stack engineer specializing in Node.js and React, building robust, scalable web applications from end to end. Experienced in designing efficient backend APIs, integrating databases, and creating responsive, user-friendly frontends. Passionate about solving complex problems, optimizing performance, and delivering seamless digital experiences while continuously exploring modern technologies and best practices in full-stack development.",
    location: "Amsterdam, Netherlands",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "10:00", to: "13:00" }],
      Wed: [{ from: "14:00", to: "17:00" }],
      Thu: [],
      Fri: [{ from: "09:00", to: "12:00" }],
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
    bio: "Backend developer specializing in building robust APIs and scalable microservices architectures. Experienced in designing efficient, maintainable server-side solutions, integrating databases, and ensuring seamless communication between distributed systems. Passionate about solving complex problems, optimizing performance, and implementing best practices to deliver reliable, high-performance backend services for modern applications.",
    location: "Stockholm, Sweden",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "13:00", to: "16:00" }],
      Wed: [],
      Thu: [{ from: "10:00", to: "14:00" }],
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
    bio: "Cloud engineer specializing in AWS and Docker, focused on designing, deploying, and managing scalable cloud infrastructure. Experienced in containerization, automating deployments, and implementing CI/CD pipelines to ensure efficient and reliable application delivery. Passionate about optimizing cloud performance, enhancing system reliability, and leveraging modern DevOps practices to build robust, maintainable, and high-performing solutions.",
    location: "Singapore",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [],
      Wed: [{ from: "13:00", to: "16:00" }],
      Thu: [{ from: "10:00", to: "14:00" }],
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
    bio: "Mobile developer specializing in creating cross-platform applications that deliver seamless and engaging user experiences. Skilled in frameworks like React Native and Flutter, building responsive, high-performance apps, integrating APIs, and implementing intuitive UI/UX designs. Passionate about turning ideas into polished, scalable mobile solutions while optimizing performance and ensuring maintainability across platforms.",
    location: "Tokyo, Japan",
    weeklyAvailability: {
      Mon: [{ from: "10:00", to: "13:00" }],
      Tue: [{ from: "09:00", to: "12:00" }],
      Wed: [],
      Thu: [{ from: "14:00", to: "17:00" }],
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
    bio: "Full-stack engineer passionate about Node.js and TypeScript, building scalable, maintainable, and high-performance web applications. Experienced in designing efficient backend APIs, integrating databases, and creating responsive, user-friendly frontends. Dedicated to solving complex problems, optimizing application performance, and leveraging modern technologies to deliver seamless, end-to-end digital experiences.",
    location: "Dubai, UAE",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "10:00", to: "13:00" }],
      Wed: [{ from: "14:00", to: "17:00" }],
      Thu: [],
      Fri: [{ from: "09:00", to: "12:00" }],
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
    bio: "AI engineer focused on building intelligent web applications that leverage machine learning and data-driven insights. Experienced in developing predictive models, natural language processing tools, and recommendation systems, and integrating them seamlessly into web platforms. Passionate about solving complex problems, optimizing performance, and creating innovative solutions that enhance user experiences through AI.",
    location: "Seoul, South Korea",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [],
      Wed: [{ from: "13:00", to: "16:00" }],
      Thu: [{ from: "10:00", to: "14:00" }],
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
    bio: "Backend developer specializing in designing and building robust REST and GraphQL APIs. Experienced in creating scalable server-side applications, integrating databases, and ensuring seamless communication between services. Passionate about writing clean, maintainable code, optimizing performance, and delivering reliable backend solutions that power responsive and efficient web and mobile applications.",
    location: "Barcelona, Spain",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "13:00", to: "16:00" }],
      Wed: [],
      Thu: [{ from: "10:00", to: "14:00" }],
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
    bio: "Software engineer with extensive experience building web applications, passionate about designing scalable, high-performance solutions. Skilled in both frontend and backend development, with a focus on creating seamless user experiences. Dedicated mentor to junior developers, guiding them in best practices, clean code, and problem-solving, while fostering growth and collaboration within development teams.",
    location: "Lisbon, Portugal",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [{ from: "10:00", to: "13:00" }],
      Wed: [],
      Thu: [{ from: "14:00", to: "17:00" }],
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
    bio: "Frontend developer focused on React, Tailwind CSS, and crafting exceptional UI/UX experiences. Skilled in building responsive, high-performance web applications that are both visually appealing and user-friendly. Passionate about translating complex requirements into intuitive interfaces, optimizing usability, and continuously exploring modern frontend technologies to deliver seamless and engaging digital experiences.",
    location: "Rome, Italy",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [],
      Wed: [{ from: "13:00", to: "16:00" }],
      Thu: [{ from: "10:00", to: "14:00" }],
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
    bio: "Backend engineer specializing in Node.js, Express, and MongoDB, building scalable and high-performance server-side applications. Experienced in designing robust APIs, managing databases, and optimizing backend workflows for efficiency and reliability. Passionate about solving complex problems, implementing best practices, and delivering maintainable, secure, and seamless backend solutions for modern web applications.",
    location: "Vienna, Austria",
    weeklyAvailability: {
      Mon: [{ from: "10:00", to: "13:00" }],
      Tue: [{ from: "09:00", to: "12:00" }],
      Wed: [{ from: "14:00", to: "17:00" }],
      Thu: [],
      Fri: [{ from: "10:00", to: "14:00" }],
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
    bio: "Full-stack developer working with the MERN stack, experienced in building end-to-end web applications from concept to deployment. Skilled in creating scalable backends, responsive frontends, and integrating cloud deployments for reliable performance. Passionate about clean architecture, optimizing application efficiency, and leveraging modern cloud technologies to deliver secure, high-quality digital solutions.",
    location: "Berlin, Germany",
    weeklyAvailability: {
      Mon: [{ from: "09:00", to: "12:00" }],
      Tue: [],
      Wed: [{ from: "11:00", to: "15:00" }],
      Thu: [{ from: "10:00", to: "13:00" }],
      Fri: [{ from: "14:00", to: "17:00" }],
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
