'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { portfolioFeatures } from '@/lib/data';


const Features: React.FC = () => {
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
                threshold: 0.1,
                rootMargin: '50px',
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="features" className="py-20 bg-background dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center transition-all duration-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-base text-primary dark:text-primary font-semibold tracking-wide uppercase">
                        Projects
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold text-foreground dark:text-foreground sm:text-4xl lg:text-5xl">
                        My Featured Work
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-muted-foreground dark:text-muted-foreground lg:mx-auto">
                        Explore my portfolio of successful projects and ongoing developments.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {portfolioFeatures.map((feature, index) => (
                            <div
                                key={feature.name}
                                className={`group relative transition-all duration-700 ${isVisible
                                    ? 'animate-fade-in-up opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                    }`}
                                style={{
                                    animationDelay: isVisible ? `${index * 150}ms` : '0ms'
                                }}
                            >
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-card dark:bg-card group-hover:opacity-90 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                    <Image
                                        src={feature.image}
                                        alt={feature.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay that appears on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                        <div className="text-primary-foreground text-sm font-medium px-4 py-2 bg-primary/90 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            View Project
                                        </div>
                                    </div>
                                </div>

                                <h3 className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground transition-colors duration-200">
                                    <Link href={feature.link} target="_blank" rel="noopener noreferrer">
                                        <span className="absolute inset-0" />
                                        {feature.name}
                                    </Link>
                                </h3>

                                <p className="text-base font-semibold text-foreground dark:text-white transition-colors duration-200 group-hover:text-primary dark:group-hover:text-primary">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;