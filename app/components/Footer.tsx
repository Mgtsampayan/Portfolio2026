import { Facebook, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background dark:bg-background py-8 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <a href="https://www.facebook.com/Mgtsampayan"
                        className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground focus:outline-none focus:ring focus:ring-primary dark:focus:ring-primary"
                        aria-label="Facebook">
                        <Facebook size={24} />
                    </a>
                    <a href="https://twitter.com"
                        className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground focus:outline-none focus:ring focus:ring-primary dark:focus:ring-primary"
                        aria-label="Twitter">
                        <Twitter size={24} />
                    </a>
                    <a href="https://github.com/Mgtsampayan"
                        className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground focus:outline-none focus:ring focus:ring-primary dark:focus:ring-primary"
                        aria-label="GitHub">
                        <Github size={24} />
                    </a>
                </div>
                <div>
                    <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
                        © {currentYear} GesSain, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;