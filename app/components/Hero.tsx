'use client'

import Image from 'next/image'
import Link from 'next/link'

const Hero: React.FC = () => {
    return (
        <section className="relative bg-linear-to-b from-secondary/10 to-background dark:from-background dark:to-background overflow-hidden pt-20">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            {/* Staggered fade-in animation for heading */}
                            <h1 className="text-4xl tracking-tight font-extrabold text-foreground dark:text-foreground sm:text-5xl md:text-6xl animate-fade-in-up">
                                <span className="block xl:inline">Effective Management of</span>{' '}
                                <span className="block text-primary dark:text-primary xl:inline animate-fade-in-up animation-delay-200">
                                    Large Projects
                                </span>
                            </h1>

                            {/* Delayed fade-in for description */}
                            <p className="mt-3 text-base text-muted-foreground dark:text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-fade-in-up animation-delay-400">
                                Streamline your project management with GesSain. Our platform helps you manage scope, budget, resources, and timelines effectively.
                            </p>

                            {/* Animated buttons with hover effects */}
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start animate-fade-in-up animation-delay-600">
                                <div className="rounded-md shadow transform hover:scale-105 transition-transform duration-200">
                                    <Link
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 md:py-4 md:text-lg md:px-10 transition-all duration-200 ease-in-out hover:shadow-lg"
                                    >
                                        Get started
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3 transform hover:scale-105 transition-transform duration-200">
                                    <Link
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary/20 hover:bg-secondary/30 dark:text-primary dark:bg-secondary/10 dark:hover:bg-secondary/20 md:py-4 md:text-lg md:px-10 transition-all duration-200 ease-in-out hover:shadow-md"
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Parallax background image with subtle movement */}
            <div className="absolute inset-0 opacity-5 animate-float" aria-hidden="true">
                <Image
                    src="/images/freelancer.png"
                    alt="Sample project management illustration"
                    width={1920}
                    height={1080}
                    quality={85}
                    className="h-56 min-w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    priority
                />
            </div>

        </section>
    )
}

export default Hero