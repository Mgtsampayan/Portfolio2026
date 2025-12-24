import { Mail, Phone, Users, BarChart, Settings, Puzzle } from "lucide-react";

export const portfolioFeatures = [
    {
        name: 'Accounting Website',
        description: 'A comprehensive accounting solution designed for businesses and individuals to effectively manage their finances and seamlessly handle transactions with partners worldwide',
        image: '/images/AccountingWebsite.png',
        link: 'https://accountings-websites.vercel.app/',
    },
    {
        name: 'Olivarez College Portal',
        description: 'An educational portal for Olivarez College students and staff, with upgraded UI and UX, optimized for mobile devices to achieve approximately 40% mobilization.',
        image: '/images/OlivarezCollegePortal.png',
        link: 'https://olivarezcollege.vercel.app/',
    },
    {
        name: 'Under Development Project to End to end',
        description: 'An innovative new project currently in development: a Chat LLM powered by Gemini. Stay tuned for updates!',
        image: '/images/gemini-2.5-flash.png',
        link: 'https://gemini-2-5-flash.vercel.app',
    },
    {
        name: 'Development is on Progress',
        description: 'Inventory Management Dashboard with AWS',
        image: '/images/Maintainance.png',
        link: '#',
    },
    {
        name: 'UNDER DEVELOPMENT DEADLINE FIRST QUARTER OF 2026',
        description: 'Design Ui For Dashboard For School Solutions System. Using NEXT.JS 15 with PostgreSQL, Docker.',
        image: '/images/ComingSoon.png',
        link: '#',
    },
    {
        name: 'Miascor Logistics 2025',
        description: 'Miascor Logistics is pioneering a cutting-edge multimodal logistics prototype designed to seamlessly integrate land, air, and sea transport solutions. This prototype supports end-to-end cargo movement, enhancing operational efficiency, visibility, and reliability across the entire supply chain.',
        image: '/images/miascor-logistics.png',
        link: 'https://miascor-prototype.vercel.app/',
    },
    {
        name: 'Saas For Video Conferencing Under Development',
        description: 'A state-of-the-art SaaS platform for video conferencing, offering seamless integration with various tools and a user-friendly interface.',
        image: '/images/SaasProject.png',
        link: 'https://gessain-saas.vercel.app/',
    }
];

export const aboutFeatures = [
    {
        name: 'Efficient Collaboration',
        description: 'Our platform facilitates seamless communication and collaboration among team members, ensuring everyone stays on the same page throughout the project lifecycle.',
        icon: Users
    },
    {
        name: 'Powerful Analytics',
        description: 'Gain valuable insights into your project\'s progress with our advanced analytics tools, helping you make data-driven decisions and optimize your workflow.',
        icon: BarChart
    },
    {
        name: 'Customizable Workflows',
        description: 'Tailor GesSain to fit your team\'s unique processes and methodologies, ensuring a perfect fit for your development style.',
        icon: Settings
    },
    {
        name: 'Seamless Integrations',
        description: 'Integrate GesSain with your favorite development tools and services, creating a unified ecosystem for your projects.',
        icon: Puzzle
    }
];

export const pricingPlans = [
    {
        name: 'Starter',
        price: 'Contact',
        description: 'Perfect for small teams and startups',
        features: [
            'Up to 5 team members',
            'Basic project management',
            '5GB storage',
            'Email support'
        ],
    },
    {
        name: 'Professional',
        price: '₱',
        description: 'Great for growing teams',
        features: [
            'Up to 20 team members',
            'Advanced project management',
            'Unlimited storage',
            'Priority email support',
            'API access'
        ],
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'For large-scale operations',
        features: [
            'Unlimited team members',
            'Custom features',
            'Dedicated account manager',
            '24/7 phone support',
            'On-premise deployment option'
        ],
    },
];

export const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        subtitle: "We'll respond within 24 hours",
        link: "mailto:gemuel20sampayan@gmail.com",
        display: "gemuel20sampayan@gmail.com",
    },
    {
        icon: Phone,
        title: "Call Us",
        subtitle: "Mon - Fri, 9am - 4pm",
        link: "tel:+639171234567",
        display: "+63 905 157 8028",
    },
];
