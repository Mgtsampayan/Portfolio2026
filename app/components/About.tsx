'use client';

import { useEffect, useRef, useState } from 'react';

import { aboutFeatures } from '@/lib/data';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '50px',
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Local features array removed in favor of imported data


    return (
        <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`lg:text-center transition-all duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-base text-primary dark:text-primary font-semibold tracking-wide uppercase">About Us</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Why Developers Choose GesSain
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        GesSain is designed to streamline project management for developers and teams of all sizes.
                    </p>
                </div>

                <div className="mt-20">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {aboutFeatures.map((feature, index) => (
                            <div
                                key={feature.name}
                                className={`relative group transition-all duration-700 ${isVisible
                                    ? 'animate-fade-in-up opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                    }`}
                                style={{
                                    animationDelay: isVisible ? `${(index + 2) * 200}ms` : '0ms'
                                }}
                            >
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary dark:bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-foreground dark:text-foreground transition-colors duration-200 group-hover:text-primary dark:group-hover:text-primary">
                                        {feature.name}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300 transition-all duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                    {feature.description}
                                </dd>

                                {/* Subtle background highlight on hover */}
                                <div className="absolute -inset-4 bg-secondary/20 dark:bg-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </section>
    )
}

export default About