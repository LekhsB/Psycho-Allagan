"use client";

import { FC, useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaQuoteLeft, FaQuoteRight, FaPaperPlane } from 'react-icons/fa';

interface Feedback {
  id: string;
  author: string;
  event: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

// Données de feedback
const FEEDBACK_DATA: Feedback[] = [
  {
    id: 'fb-001',
    author: "Raha'jin Tia",
    event: 'Neon Dreams',
    date: '25/04/2023',
    rating: 5,
    comment: "Une soirée incroyable avec une ambiance cyberpunk parfaitement exécutée. Les lumières, la musique de DJ Quantum et les cocktails thématiques étaient tous en parfaite harmonie. J'ai particulièrement apprécié les projections holographiques qui donnaient vraiment l'impression d'être dans un futur néon!",
    avatar: '/images/avatars/avatar1.jpg'
  },
  {
    id: 'fb-002',
    author: 'Krile Baldesion',
    event: 'Crystal Mirage',
    date: '02/05/2023',
    rating: 4.5,
    comment: "Crystal Mirage m'a transportée dans un monde de magie élémentaire! La décoration inspirée des cristaux était magnifique, créant une atmosphère à la fois mystique et élégante. La musique ambient de Crystal Resonance complétait parfaitement l'ambiance. Petite suggestion: plus d'interactions avec les éléments thématiques seraient un plus!",
    avatar: '/images/avatars/avatar2.jpg'
  },
  {
    id: 'fb-003',
    author: "Y'shtola Rhul",
    event: 'Void Whispers',
    date: '08/05/2023',
    rating: 5,
    comment: "Void Entity a créé une expérience sonore transcendante qui m'a littéralement fait oublier le temps et l'espace. La décoration sombre et mystérieuse, combinée à l'éclairage subtil et aux projections cosmiques, a parfaitement capturé l'essence du néant. Une soirée vraiment unique qui restera gravée dans ma mémoire.",
    avatar: '/images/avatars/avatar3.jpg'
  },
  {
    id: 'fb-004',
    author: 'Cid Garlond',
    event: 'Tech Rituals',
    date: '16/05/2023',
    rating: 4,
    comment: "En tant qu'ingénieur, j'ai été impressionné par l'attention aux détails dans les installations mécaniques et les projections Allagans. La fusion entre technologie ancestrale et musique électronique était parfaitement équilibrée. L'ambiance était excellente, mais l'espace était un peu trop bondé ce soir-là, ce qui rendait difficile d'apprécier pleinement les détails techniques.",
    avatar: '/images/avatars/avatar4.jpg'
  }
];

// Composant pour afficher les étoiles de notation
const RatingStars: FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  
  return <div className="flex">{stars}</div>;
};

const FeedbackSection: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [event, setEvent] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du formulaire (envoi au serveur, etc.)
    setIsSubmitted(true);
    
    // Réinitialiser le formulaire
    setTimeout(() => {
      setName('');
      setEmail('');
      setEvent('');
      setRating(5);
      setComment('');
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-stars-pattern opacity-5"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-pink-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Ce que disent </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nos Clients
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Découvrez les expériences de nos visiteurs et partagez votre propre avis sur votre soirée au Nébula Nightclub.
          </p>
        </div>
        
        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {FEEDBACK_DATA.map((feedback) => (
            <div 
              key={feedback.id}
              className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
            >
              <div className="flex items-start gap-4">
                {/* Avatar (placeholder) */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                  {feedback.author.charAt(0)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{feedback.author}</h3>
                      <p className="text-gray-400 text-sm">{feedback.event} • {feedback.date}</p>
                    </div>
                    <RatingStars rating={feedback.rating} />
                  </div>
                  
                  <div className="mt-4 relative">
                    <FaQuoteLeft className="absolute top-0 left-0 text-purple-500/20 text-xl" />
                    <p className="text-gray-300 pl-6 pr-6 italic">
                      {feedback.comment}
                    </p>
                    <FaQuoteRight className="absolute bottom-0 right-0 text-purple-500/20 text-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Formulaire de feedback */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Partagez votre expérience</h3>
            
            {isSubmitted ? (
              <div className="bg-green-900/30 border border-green-500/50 text-green-400 p-4 rounded-lg text-center">
                Merci pour votre avis! Votre témoignage a été envoyé avec succès.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Votre nom</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="event" className="block text-white mb-2">Événement</label>
                  <select
                    id="event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                    required
                  >
                    <option value="">Sélectionnez un événement</option>
                    <option value="Neon Dreams">Neon Dreams (23 Mai)</option>
                    <option value="Crystal Mirage">Crystal Mirage (30 Mai)</option>
                    <option value="Void Whispers">Void Whispers (7 Juin)</option>
                    <option value="Tech Rituals">Tech Rituals (14 Juin)</option>
                    <option value="Moogle Mania">Moogle Mania (21 Juin)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white mb-2">Votre note</label>
                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        {star <= rating ? (
                          <FaStar className="text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-yellow-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-white mb-2">Votre commentaire</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none min-h-[120px]"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Envoyer mon avis
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection; 