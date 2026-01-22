import { Types } from "mongoose";

export const dummyProfiles = [
  {
    userId: new Types.ObjectId(),
    avatar:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    bio: "Full-stack developer specializing in MERN stack. Building scalable web apps with React, Node.js, and MongoDB.",
    location: "New York, USA",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 AM", to: "02:00 PM" }],
      Wed: [],
      Thu: [{ from: "01:00 PM", to: "04:00 PM" }],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `With over 7 years of experience in full-stack development, I specialize in the MERN stack (MongoDB, Express, React, Node.js) to build enterprise-grade web applications. My expertise includes designing scalable architectures, implementing secure RESTful APIs, and creating responsive user interfaces. I've led development teams for fintech startups in NYC, delivering solutions that handle millions of daily transactions.

I'm passionate about clean code principles, test-driven development, and DevOps practices. My recent projects include a real-time trading platform with WebSocket integration and a healthcare management system with HIPAA compliance. I actively contribute to open-source projects and mentor junior developers through coding bootcamps.

My approach combines technical excellence with business acumen, ensuring solutions are not only technically sound but also deliver tangible business value. I stay current with emerging technologies like GraphQL, serverless architecture, and microservices patterns. When not coding, I speak at tech conferences and write technical articles on modern web development practices.`,
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
    bio: "Frontend engineer crafting intuitive React interfaces. Focus on performance, accessibility, and pixel-perfect implementation.",
    location: "London, UK",
    weeklyAvailability: {
      Mon: [{ from: "11:00 AM", to: "03:00 PM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 PM" }],
      Wed: [{ from: "10:00 AM", to: "01:00 PM" }],
      Thu: [],
      Fri: [{ from: "02:00 PM", to: "05:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `As a Frontend Engineer with 6 years of experience in London's fintech sector, I specialize in building performant React applications with TypeScript. My expertise includes creating component libraries, implementing state management with Redux Toolkit, and optimizing web vitals for Core Web Vitals compliance. I've worked on trading platforms used by major financial institutions.

I'm passionate about accessibility (WCAG 2.1) and have implemented inclusive design patterns across multiple projects. My recent work includes a design system used by 50+ developers and a real-time analytics dashboard processing millions of data points. I advocate for testing strategies using Jest, React Testing Library, and Cypress.

Beyond technical skills, I bridge the gap between design and development through close collaboration with UX teams. I've implemented complex animations with Framer Motion, built micro-frontend architectures, and mentored junior developers in modern frontend practices. I regularly contribute to React open-source projects and speak at London tech meetups.`,
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
    bio: "Backend developer specializing in Node.js microservices. Building scalable APIs with performance optimization.",
    location: "Berlin, Germany",
    aboutMe: `Based in Berlin's vibrant tech scene, I'm a Backend Developer with 8 years of experience building high-performance Node.js systems. My expertise spans microservices architecture, real-time data processing, and scalable API design. I've architected backend systems for SaaS platforms serving over 2 million users, with focus on low-latency responses and 99.9% uptime.

My technical stack includes Express.js, NestJS, PostgreSQL, Redis, Docker, and Kubernetes. I specialize in performance optimization, having reduced API response times by 70% through caching strategies and query optimization. I've implemented WebSocket servers for real-time applications and designed event-driven architectures using Kafka.

Security is paramount in my work - I've implemented OAuth 2.0, JWT, and rate limiting across multiple projects. I'm experienced in CI/CD pipelines with GitHub Actions and GitLab CI. I contribute to the Node.js community through technical workshops and maintain several open-source packages. My German-language tech blog focuses on backend best practices.`,
    weeklyAvailability: {
      Mon: [{ from: "08:00 AM", to: "12:00 PM" }],
      Tue: [],
      Wed: [{ from: "09:00 AM", to: "11:00 AM" }],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
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
    bio: "Cloud engineer with AWS expertise. Designing scalable infrastructure, CI/CD pipelines, and DevOps solutions.",
    location: "Toronto, Canada",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "01:00 PM", to: "04:00 PM" }],
      Wed: [{ from: "10:00 AM", to: "02:00 PM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `As a Cloud Engineer in Toronto's growing tech ecosystem, I bring 6 years of expertise in AWS cloud infrastructure and DevOps practices. I've designed and implemented scalable architectures for e-commerce platforms handling Black Friday traffic spikes and healthcare systems requiring HIPAA compliance. My certifications include AWS Solutions Architect Professional and Kubernetes Administrator.

My work involves infrastructure as code using Terraform and CloudFormation, container orchestration with EKS, and implementing GitOps workflows. I've reduced cloud costs by 40% through rightsizing, spot instances, and reserved capacity planning. I'm skilled in setting up monitoring with CloudWatch, Prometheus, and Grafana for comprehensive observability.

I lead DevOps transformations, introducing automated testing, security scanning, and blue-green deployments. My experience includes multi-region disaster recovery planning and implementing zero-trust security models. I mentor teams in cloud best practices and contribute to Canadian tech communities through workshops on cloud-native development.`,
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
    bio: "UX-focused frontend developer. Crafting engaging interfaces with React, Figma collaboration, and user-centered design.",
    location: "Paris, France",
    aboutMe: `Working at the intersection of design and development in Paris, I'm a UX-focused Frontend Developer with 5 years of experience creating beautiful, functional interfaces. My background includes a degree in Human-Computer Interaction, which informs my approach to building accessible, intuitive web applications. I've worked with luxury brands and cultural institutions to elevate their digital presence.

My technical expertise includes React with TypeScript, Storybook for component documentation, and CSS-in-JS solutions like Styled Components. I collaborate closely with designers using Figma, implementing complex animations with GSAP and Three.js. I've built design systems that maintain brand consistency across multiple products while improving development efficiency by 60%.

I'm passionate about performance optimization, having implemented code splitting, image optimization, and progressive web app features. My French-language UX blog focuses on bridging the gap between design and development. I regularly participate in Paris Design Week and mentor women entering tech through local coding initiatives.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "01:00 PM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 PM" }],
      Wed: [],
      Thu: [{ from: "02:00 PM", to: "05:00 PM" }],
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
    bio: "Mobile developer specializing in React Native. Building cross-platform apps with native performance and smooth UX.",
    location: "Sydney, Australia",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "11:00 AM" }],
      Tue: [{ from: "10:00 AM", to: "01:00 PM" }],
      Wed: [{ from: "02:00 PM", to: "05:00 PM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `As a Mobile Developer in Sydney's startup ecosystem, I specialize in React Native for building high-performance cross-platform applications. With 5 years of experience, I've delivered apps for Australian fintech companies, healthcare providers, and retail businesses, reaching over 500,000 users. My expertise includes bridging native modules, optimizing app performance, and implementing push notification systems.

I'm proficient in TypeScript, React Navigation, and state management with Context API and MobX. I've reduced app size by 40% through code splitting and asset optimization, and improved startup times by implementing Hermes engine. My work includes integrating with native SDKs for payment processing, biometric authentication, and location services.

I stay current with mobile trends through Apple's WWDC and Google I/O, implementing new iOS and Android features promptly. I contribute to React Native open-source projects and organize Sydney Mobile Developers meetup. My focus is on building apps that provide native-like experience while maintaining code reusability across platforms.`,
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
    bio: "DevOps engineer building CI/CD pipelines on AWS. Focus on infrastructure automation and scalable deployment strategies.",
    location: "San Francisco, USA",
    aboutMe: `In the heart of Silicon Valley, I work as a DevOps Engineer with 7 years of experience building robust CI/CD pipelines and cloud infrastructure. I've implemented deployment automation for unicorn startups, reducing deployment time from hours to minutes. My expertise includes AWS, Kubernetes, Docker, and infrastructure as code with Terraform and Pulumi.

I've designed multi-account AWS organizations with automated security compliance checks, implemented GitOps workflows with ArgoCD, and built observability stacks with Loki, Tempo, and Mimir. My cost optimization strategies have saved companies over $200K annually through rightsizing and reserved instance planning.

Security is integral to my approach - I've implemented DevSecOps practices with automated vulnerability scanning, secret management with HashiCorp Vault, and compliance as code. I hold AWS DevOps Engineer Professional certification and contribute to CNCF projects. I speak at Bay Area tech conferences and mentor engineers transitioning to DevOps roles.`,
    weeklyAvailability: {
      Mon: [{ from: "08:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 AM", to: "02:00 PM" }],
      Wed: [],
      Thu: [{ from: "01:00 PM", to: "04:00 PM" }],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
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
    bio: "AI engineer integrating ML models into web apps. Specializing in TensorFlow.js and intelligent application design.",
    location: "Berlin, Germany",
    aboutMe: `As an AI Engineer in Berlin's innovative tech landscape, I bridge machine learning and web development to create intelligent applications. With a Master's in Computer Science and 4 years of experience, I specialize in TensorFlow.js, ONNX runtime, and deploying ML models to the browser and edge devices. My work includes recommendation systems, computer vision applications, and natural language processing tools.

I've implemented real-time object detection for retail analytics, sentiment analysis for customer feedback platforms, and personalized content delivery systems. My expertise includes model optimization for web deployment, reducing model size by 80% through quantization and pruning while maintaining accuracy. I work with Python for model development and JavaScript for integration.

I'm passionate about ethical AI and implement fairness checks and bias mitigation in my projects. I contribute to open-source ML projects and organize Berlin AI Meetup. My German-language technical writing focuses on making machine learning accessible to web developers through practical tutorials and case studies.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "11:00 AM" }],
      Tue: [],
      Wed: [{ from: "10:00 AM", to: "01:00 PM" }],
      Thu: [{ from: "02:00 PM", to: "05:00 PM" }],
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
    bio: "Software architect designing scalable systems. Mentoring teams on best practices and architectural patterns.",
    location: "Toronto, Canada",
    aboutMe: `With 12 years of experience in software architecture across banking, e-commerce, and SaaS sectors in Toronto, I design systems that scale to millions of users. My expertise includes microservices architecture, event-driven systems, and domain-driven design. I've led architectural transformations for legacy systems, modernizing monoliths into scalable distributed systems while maintaining business continuity.

I hold patents for distributed caching algorithms and have published technical papers on scalability patterns. My work includes designing APIs used by Fortune 500 companies and implementing real-time data processing pipelines. I'm proficient in cloud-native design, having architected systems on AWS, Azure, and GCP with multi-region deployment strategies.

Mentorship is central to my approach - I've mentored over 50 developers, conducted architecture reviews, and established engineering excellence programs. I speak at international conferences like QCon and maintain a popular architecture blog. My focus is on creating maintainable, evolvable systems that support business growth for years to come.`,
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "02:00 PM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 PM" }],
      Wed: [{ from: "11:00 AM", to: "03:00 PM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
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
    bio: "Full-stack engineer with Node.js and React expertise. Building end-to-end solutions with focus on scalability.",
    location: "Amsterdam, Netherlands",
    aboutMe: `In Amsterdam's innovative tech hub, I work as a Full-Stack Engineer specializing in Node.js and React with 6 years of experience. I've built B2B SaaS platforms serving European clients, e-commerce solutions with real-time inventory management, and internal tools that improved operational efficiency by 40%. My approach combines technical excellence with understanding business requirements.

My technical stack includes TypeScript across frontend and backend, PostgreSQL with query optimization, Redis for caching, and Docker for containerization. I've implemented real-time features with Socket.io, payment integrations with Stripe and Adyen, and search functionality with Elasticsearch. I'm experienced in both monolithic and microservices architectures.

I contribute to the Dutch tech community through workshops on full-stack development and maintain open-source tools for internationalization and form handling. My focus is on building applications that are not only functional but also maintainable and scalable, with comprehensive testing and documentation practices.`,
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 AM", to: "01:00 PM" }],
      Wed: [{ from: "02:00 PM", to: "05:00 PM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
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
    bio: "Backend developer building microservices and REST APIs. Focus on performance, security, and maintainable code.",
    location: "Stockholm, Sweden",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "01:00 PM", to: "04:00 PM" }],
      Wed: [],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `Based in Stockholm's tech-forward environment, I'm a Backend Developer with 5 years of experience specializing in microservices architecture and high-performance APIs. I've built systems for Swedish fintech companies requiring PCI DSS compliance, gaming platforms with low-latency requirements, and IoT platforms processing millions of device events daily. My work emphasizes scalability and reliability.

My technical expertise includes Go and Node.js for backend development, gRPC for service communication, PostgreSQL with partitioning strategies, and message queues with RabbitMQ and NATS. I've implemented distributed tracing with Jaeger, metrics collection with Prometheus, and automated recovery systems. I'm experienced in both SQL and NoSQL databases, choosing the right tool for each use case.

I'm active in Sweden's developer community through conference talks on backend patterns and contribute to open-source database drivers. My focus is on building systems that are not only performant but also observable and easy to operate, with comprehensive logging and monitoring from day one.`,
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
    bio: "Cloud engineer with AWS and Docker expertise. Building scalable infrastructure with infrastructure as code.",
    location: "Singapore",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [],
      Wed: [{ from: "01:00 PM", to: "04:00 PM" }],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `In Singapore's dynamic tech landscape, I work as a Cloud Engineer with 5 years of experience specializing in AWS and container technologies. I've architected multi-region deployments for APAC markets, implemented disaster recovery solutions for financial services, and optimized cloud spending for rapidly growing startups. My certifications include AWS Solutions Architect and Kubernetes Security Specialist.

My work involves infrastructure as code using Terraform and CDK, container orchestration with ECS and EKS, and implementing service meshes with Istio. I've built CI/CD pipelines that deploy to multiple environments automatically, with comprehensive testing and security scanning at each stage. I'm experienced in hybrid cloud setups and migrating legacy systems to cloud-native architectures.

I'm passionate about cloud security, having implemented zero-trust networks, encrypted data at rest and in transit, and automated compliance checks. I contribute to Singapore's tech community through AWS User Group meetings and workshops on cloud best practices. My focus is on building resilient, cost-effective cloud infrastructure that supports business growth across Southeast Asia.`,
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
    bio: "Mobile developer creating cross-platform apps with React Native. Focus on performance and native user experience.",
    location: "Tokyo, Japan",
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "01:00 PM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 PM" }],
      Wed: [],
      Thu: [{ from: "02:00 PM", to: "05:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `Working in Tokyo's innovative mobile ecosystem, I specialize in React Native development with 4 years of experience building apps for Japanese and international markets. I've developed applications for major retail chains, transportation services, and media companies, with focus on performance optimization and platform-specific UX patterns. My apps have been featured in Japan's App Store and Google Play.

My expertise includes bridging native modules for Japanese payment systems (LINE Pay, PayPay), implementing offline-first functionality, and optimizing for Japan's unique mobile landscape including feature phones and low-bandwidth scenarios. I'm proficient in TypeScript, React Navigation v6, and state management with Recoil. I've implemented deep linking, push notifications, and in-app purchase systems.

I stay current with mobile trends through Japan's developer conferences and contribute to localization libraries for Japanese language support. My focus is on creating apps that respect cultural nuances while providing world-class user experience. I mentor developers through Tokyo React Native Meetup and maintain Japanese-language documentation for React Native libraries.`,
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
    bio: "Full-stack engineer passionate about TypeScript. Building maintainable applications with modern tools and practices.",
    location: "Dubai, UAE",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 AM", to: "01:00 PM" }],
      Wed: [{ from: "02:00 PM", to: "05:00 PM" }],
      Thu: [],
      Fri: [{ from: "09:00 AM", to: "12:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `In Dubai's rapidly growing tech scene, I work as a Full-Stack Engineer specializing in TypeScript across the entire stack. With 5 years of experience, I've built enterprise applications for Middle Eastern clients in finance, real estate, and tourism sectors. My work includes multilingual platforms supporting Arabic and RTL layouts, payment integrations with regional providers, and compliance with UAE regulations.

My technical stack includes React with TypeScript, Node.js with NestJS, PostgreSQL with advanced indexing strategies, and Redis for caching. I've implemented real-time bidding platforms, property management systems with virtual tours, and travel booking engines with complex pricing logic. I'm experienced in both server-rendered and client-side rendered applications.

I contribute to Dubai's developer community through TypeScript workshops and maintain open-source tools for Arabic text processing. My focus is on building applications that are type-safe, well-tested, and maintainable over time. I speak at Middle East tech conferences about TypeScript adoption and full-stack development best practices in the region.`,
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
    bio: "AI engineer building intelligent web applications with machine learning. Focus on predictive models and data insights.",
    location: "Seoul, South Korea",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [],
      Wed: [{ from: "01:00 PM", to: "04:00 PM" }],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `Based in Seoul's tech-forward environment, I'm an AI Engineer with 4 years of experience integrating machine learning into web applications. I specialize in computer vision for e-commerce, natural language processing for Korean text, and recommendation systems for content platforms. My work includes developing models that understand Korea's unique market patterns and consumer behavior.

My technical expertise includes PyTorch for model development, TensorFlow.js for browser deployment, FastAPI for serving models, and React for building interactive interfaces. I've built image recognition systems for fashion retailers, sentiment analysis tools for social media monitoring, and personalized learning platforms for education technology. I'm experienced in both supervised and unsupervised learning techniques.

I'm active in Korea's AI community through research papers and conference presentations. I contribute to open-source Korean NLP libraries and maintain a technical blog about AI implementation challenges. My focus is on building ethical AI systems that respect privacy and provide transparent explanations for their predictions, particularly important in Korea's regulatory environment.`,
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
    bio: "Backend developer specializing in GraphQL and REST APIs. Building efficient, well-documented interfaces for clients.",
    location: "Barcelona, Spain",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "01:00 PM", to: "04:00 PM" }],
      Wed: [],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `In Barcelona's vibrant tech community, I work as a Backend Developer with 5 years of experience specializing in API design and implementation. I've built GraphQL and REST APIs for European startups and enterprises, with focus on performance, security, and excellent documentation. My work includes e-commerce APIs handling peak holiday traffic, real-time collaboration tools, and data aggregation platforms.

My technical stack includes Node.js with TypeScript, Apollo Server for GraphQL, PostgreSQL with advanced query optimization, and Redis for caching. I've implemented rate limiting, authentication with OAuth 2.0 and JWT, and comprehensive API versioning strategies. I'm experienced in both RESTful design principles and GraphQL schema design with federation for microservices.

I contribute to Spain's developer community through API design workshops and maintain open-source tools for API documentation. My focus is on building APIs that are intuitive for developers to use, with clear error messages, comprehensive testing, and performance monitoring. I speak at Barcelona tech events about API best practices and backend development trends in Southern Europe.`,
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
    bio: "Software engineer building scalable web applications. Focus on performance optimization and maintainable architecture.",
    location: "Lisbon, Portugal",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [{ from: "10:00 AM", to: "01:00 PM" }],
      Wed: [],
      Thu: [{ from: "02:00 PM", to: "05:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `Based in Lisbon's growing tech hub, I'm a Software Engineer with 6 years of experience building scalable web applications for European and global clients. My expertise spans full-stack development with focus on performance optimization, particularly for markets with varying network conditions. I've worked on e-learning platforms serving thousands of concurrent users, marketplace applications, and data visualization tools.

My technical stack includes React with performance optimization techniques, Node.js with cluster mode for CPU-intensive tasks, PostgreSQL with read replicas, and CDN integration for global content delivery. I've implemented lazy loading, code splitting, and progressive web app features to improve user experience. I'm experienced in both traditional deployment and serverless architectures.

I'm active in Portugal's tech community through Lisbon JavaScript meetings and contribute to open-source projects focused on web performance. My Portuguese-language technical blog focuses on optimization techniques and scalability patterns. My focus is on building applications that provide excellent user experience regardless of device or network conditions, with particular attention to mobile performance.`,
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
    bio: "Frontend developer with React and Tailwind CSS expertise. Creating beautiful, responsive interfaces with modern tools.",
    location: "Rome, Italy",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [],
      Wed: [{ from: "01:00 PM", to: "04:00 PM" }],
      Thu: [{ from: "10:00 AM", to: "02:00 PM" }],
      Fri: [],
      Sat: [],
      Sun: [],
    },
    aboutMe: `In Rome's creative tech environment, I work as a Frontend Developer with 4 years of experience specializing in React and modern CSS frameworks. I've built interfaces for Italian luxury brands, cultural institutions, and tourism platforms, with focus on visual excellence and user experience. My work combines technical implementation with design sensibility to create memorable digital experiences.

My technical expertise includes React with TypeScript, Tailwind CSS for rapid styling, Framer Motion for animations, and Storybook for component documentation. I've implemented responsive designs that work across devices, accessibility features for inclusive experiences, and performance optimizations for fast loading. I'm experienced in design system implementation and maintaining visual consistency across large applications.

I contribute to Italy's frontend community through workshops on modern CSS and React patterns, and maintain Italian-language tutorials on frontend development. My focus is on building interfaces that are not only beautiful but also functional, accessible, and performant. I collaborate closely with designers to bridge the gap between design vision and technical implementation in the Italian market context.`,
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
    bio: "Backend engineer building scalable Node.js applications. Focus on database optimization and performance tuning.",
    location: "Vienna, Austria",
    weeklyAvailability: {
      Mon: [{ from: "10:00 AM", to: "01:00 PM" }],
      Tue: [{ from: "09:00 AM", to: "12:00 PM" }],
      Wed: [{ from: "02:00 PM", to: "05:00 PM" }],
      Thu: [],
      Fri: [{ from: "10:00 AM", to: "02:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `Based in Vienna's stable tech environment, I work as a Backend Engineer with 5 years of experience specializing in Node.js and database optimization. I've built systems for Central European financial institutions, logistics platforms, and SaaS products serving German-speaking markets. My work emphasizes reliability, data integrity, and performance under load.

My technical expertise includes Node.js with TypeScript, Express and Fastify frameworks, PostgreSQL with advanced indexing and partitioning, and MongoDB for document storage. I've implemented complex business logic, real-time data processing, and ETL pipelines. I'm experienced in database query optimization, having reduced query times by over 90% through proper indexing and query restructuring.

I'm active in Austria's developer community through Vienna Node.js Meetup and contribute to open-source database tools. My German-language technical writing focuses on backend performance and database best practices. My focus is on building systems that handle data with precision and efficiency, with comprehensive monitoring and alerting for production environments. I prioritize clean architecture and maintainable code in long-lived enterprise applications.`,
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
    bio: "Full-stack MERN developer building end-to-end solutions. Experience from concept to deployment and maintenance.",
    location: "Berlin, Germany",
    weeklyAvailability: {
      Mon: [{ from: "09:00 AM", to: "12:00 PM" }],
      Tue: [],
      Wed: [{ from: "11:00 AM", to: "03:00 PM" }],
      Thu: [{ from: "10:00 AM", to: "01:00 PM" }],
      Fri: [{ from: "02:00 PM", to: "05:00 PM" }],
      Sat: [],
      Sun: [],
    },
    aboutMe: `In Berlin's diverse tech ecosystem, I work as a Full-Stack Developer with 5 years of experience specializing in the MERN stack. I've built complete solutions for German startups and scale-ups, from initial concept through deployment and ongoing maintenance. My projects include B2B platforms, internal tools that automate business processes, and customer-facing applications with complex user journeys.

My technical stack includes React with modern hooks patterns, Node.js with Express, MongoDB with aggregation pipelines, and Docker for containerization. I've implemented authentication systems, payment processing, real-time notifications, and complex form handling. I'm experienced in both rapid prototyping for MVPs and building scalable architectures for growth.

I contribute to Berlin's tech community through MERN stack workshops and maintain German-language learning resources. My focus is on building applications that solve real business problems while maintaining technical excellence. I balance frontend user experience with backend reliability, ensuring applications are both usable and robust. I regularly participate in Berlin's tech events to stay current with evolving best practices in the European market.`,
    rating: { average: 4.6, count: 12 },
    socialLinks: [
      { platform: "linkedin", url: "https://linkedin.com/in/user19" },
      { platform: "twitter", url: "https://twitter.com/user19" },
    ],
  },
];