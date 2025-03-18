import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white border-t border-violet-600/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Psycho Allagan
            </h3>
            <p className="mb-4 text-gray-300">
              Une compagnie libre légendaire du monde d'Éorzéa, mêlant traditions héroïques et technologies Allaganes avancées.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon="discord" />
              <SocialIcon href="#" icon="twitter" />
              <SocialIcon href="#" icon="twitch" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Liens rapides</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Accueil</FooterLink>
              <FooterLink href="/members">Membres</FooterLink>
              <FooterLink href="/tutorials">Tutoriels</FooterLink>
              <FooterLink href="/nightclub">Nightclub</FooterLink>
              <FooterLink href="/galerie">Galerie</FooterLink>
              <FooterLink href="/recrutement">Recrutement</FooterLink>

            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-400">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Serveur: Moogle</li>
              <li>Discord: discord.gg/psychoallagan</li>
              <li>Email: contact@psychoallagan.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-violet-800/40 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 Psycho Allagan. Tous droits réservés.</p>
          <p className="mt-1">FINAL FANTASY XIV ©2010 - 2024 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-300 hover:text-blue-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: 'discord' | 'twitter' | 'twitch' }) {
  const iconMap = {
    discord: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
      </svg>
    ),
    twitch: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"></path>
      </svg>
    ),
  };

  return (
    <a 
      href={href} 
      className="h-8 w-8 flex items-center justify-center rounded-full bg-violet-800 hover:bg-blue-600 transition-colors"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {iconMap[icon]}
    </a>
  );
} 