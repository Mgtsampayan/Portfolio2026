import { Check } from 'lucide-react'

import { pricingPlans } from '@/lib/data';

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-20 bg-secondary/10 dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:text-center">
                    <h2 className="text-base text-primary dark:text-primary font-semibold tracking-wide uppercase">Pricing</h2>
                    <p className="mt-2 text-3xl font-extrabold text-foreground dark:text-foreground sm:text-4xl lg:text-5xl">
                        Choose the right plan for your team
                    </p>
                    <p className="mt-4 text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto">
                        We offer flexible pricing options to suit teams of all sizes. All plans come with a 14-day free trial.
                    </p>
                </div>

                <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    {pricingPlans.map((plan) => (
                        <div key={plan.name} className="relative p-8 bg-card dark:bg-card border border-border dark:border-border rounded-2xl shadow-sm flex flex-col">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-foreground dark:text-foreground">{plan.name}</h3>
                                <p className="mt-4 flex items-baseline text-foreground dark:text-foreground">
                                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="ml-1 text-xl font-semibold">/month</span>}
                                </p>
                                <p className="mt-6 text-muted-foreground dark:text-muted-foreground">{plan.description}</p>

                                <ul role="list" className="mt-6 space-y-6">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex">
                                            <Check className="flex-shrink-0 w-6 h-6 text-primary dark:text-primary" aria-hidden="true" />
                                            <span className="ml-3 text-muted-foreground dark:text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="#contact"
                                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.name === 'Professional'
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90'
                                    : 'bg-secondary/20 text-primary hover:bg-secondary/30 dark:bg-secondary/10 dark:text-primary dark:hover:bg-secondary/20'
                                    }`}
                            >
                                {plan.name === 'Enterprise' ? 'Contact Me' : 'Start your trial'}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Pricing