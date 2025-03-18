"use client";

import { FC, useState } from 'react';
import { FaRegCalendarAlt, FaRegClock, FaRegUser, FaRegStar, FaChevronRight, FaChevronLeft, FaCheck } from 'react-icons/fa';

interface ReservationFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  eventType: 'regular' | 'special' | 'custom';
  specialEvent?: string;
  tablePreference: 'standard' | 'vip' | 'booth';
  specialRequests: string;
}

const RESERVATION_TIMES = ['21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'];

const UPCOMING_EVENTS = [
  { value: 'neon-dreams-mai', label: 'Neon Dreams (23 Mai)', type: 'regular' },
  { value: 'crystal-mirage-mai', label: 'Crystal Mirage (30 Mai)', type: 'regular' },
  { value: 'void-whispers-juin', label: 'Void Whispers (7 Juin)', type: 'regular' },
  { value: 'tech-rituals-juin', label: 'Tech Rituals (14 Juin)', type: 'special' },
  { value: 'moogle-mania-juin', label: 'Moogle Mania (21 Juin)', type: 'special' },
  { value: 'custom', label: 'Autre date (personnalisée)', type: 'custom' }
];

const ReservationSystem: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    date: '',
    time: '22:00',
    guests: 2,
    eventType: 'regular',
    specialEvent: '',
    tablePreference: 'standard',
    specialRequests: ''
  });
  
  const [reservationComplete, setReservationComplete] = useState<boolean>(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationComplete(true);
  };
  
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <section id="reservation" className="py-20 bg-gradient-to-b from-black to-purple-950/20 relative overflow-hidden">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      
      {/* Orbes lumineux */}
      <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Réservez votre </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Expérience
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Assurez-vous d'avoir une place lors de nos soirées en effectuant une réservation à l'avance.
            Nous vous contacterons pour confirmer votre réservation dans les plus brefs délais.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Indicateur d'étapes */}
          {!reservationComplete && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center w-full max-w-sm">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex-1 relative">
                    <div 
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${step >= stepNumber 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : 'bg-gray-800 text-gray-400'}
                        ${stepNumber === 1 ? 'ml-0' : ''} ${stepNumber === 3 ? 'mr-0' : ''}
                      `}
                    >
                      {stepNumber}
                    </div>
                    
                    {stepNumber < 3 && (
                      <div className={`
                        absolute top-4 -right-1/2 h-0.5 w-full
                        ${step > stepNumber ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'}
                      `}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Contenu du formulaire ou confirmation */}
          {reservationComplete ? (
            <div className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-white text-2xl" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Réservation Envoyée!</h3>
              
              <p className="text-gray-300 mb-6">
                Merci pour votre réservation au Nébula Nightclub. Nous avons bien reçu votre demande et vous enverrons 
                une confirmation par email sous 24h. Vérifiez votre boîte de réception (et dossier spam si nécessaire).
              </p>
              
              <div className="bg-black/40 border border-purple-800/20 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Récapitulatif de votre réservation:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-400 text-sm">Nom:</p>
                    <p className="text-white">{formData.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Email:</p>
                    <p className="text-white">{formData.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Événement:</p>
                    <p className="text-white">
                      {formData.eventType === 'custom' 
                        ? `Date personnalisée: ${formData.date}` 
                        : UPCOMING_EVENTS.find(e => e.value === formData.specialEvent)?.label || 'Non spécifié'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Heure:</p>
                    <p className="text-white">{formData.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Nombre d'invités:</p>
                    <p className="text-white">{formData.guests} personnes</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Type de table:</p>
                    <p className="text-white">
                      {formData.tablePreference === 'standard' ? 'Standard' : 
                       formData.tablePreference === 'vip' ? 'VIP' : 'Booth privé'}
                    </p>
                  </div>
                </div>
                
                {formData.specialRequests && (
                  <div className="mt-4 text-left">
                    <p className="text-gray-400 text-sm">Demandes spéciales:</p>
                    <p className="text-white">{formData.specialRequests}</p>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  setReservationComplete(false);
                  setStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    date: '',
                    time: '22:00',
                    guests: 2,
                    eventType: 'regular',
                    specialEvent: '',
                    tablePreference: 'standard',
                    specialRequests: ''
                  });
                }}
                className="px-6 py-3 bg-black/60 border border-purple-500/50 rounded-lg text-white font-medium hover:bg-black/80 hover:border-purple-400 transition-all"
              >
                Nouvelle réservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-black/60 backdrop-blur-sm border border-purple-800/30 rounded-xl p-8">
              {/* Étape 1: Informations personnelles */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Vos informations</h3>
                  
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Nom complet</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaRegUser />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 pl-10 focus:border-pink-500 focus:outline-none"
                        placeholder="Votre nom et prénom"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                      placeholder="votre.email@exemple.com"
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Étape 2: Détails de la réservation */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Quand souhaitez-vous venir?</h3>
                  
                  <div>
                    <label htmlFor="eventType" className="block text-white mb-2">Type d'événement</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                    >
                      <option value="regular">Soirée régulière</option>
                      <option value="special">Événement spécial</option>
                      <option value="custom">Date personnalisée</option>
                    </select>
                  </div>
                  
                  {formData.eventType !== 'custom' && (
                    <div>
                      <label htmlFor="specialEvent" className="block text-white mb-2">Choisissez une soirée</label>
                      <select
                        id="specialEvent"
                        name="specialEvent"
                        value={formData.specialEvent}
                        onChange={handleChange}
                        className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                        required
                      >
                        <option value="">Sélectionnez une soirée</option>
                        {UPCOMING_EVENTS
                          .filter(event => 
                            formData.eventType === 'regular' 
                              ? event.type === 'regular' 
                              : event.type === 'special'
                          )
                          .map(event => (
                            <option key={event.value} value={event.value}>
                              {event.label}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )}
                  
                  {formData.eventType === 'custom' && (
                    <div>
                      <label htmlFor="date" className="block text-white mb-2">Date</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaRegCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 pl-10 focus:border-pink-500 focus:outline-none"
                          required={formData.eventType === 'custom'}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="time" className="block text-white mb-2">Heure d'arrivée</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaRegClock />
                      </span>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 pl-10 focus:border-pink-500 focus:outline-none"
                        required
                      >
                        {RESERVATION_TIMES.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-white mb-2">Nombre de personnes</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleNumberChange}
                      min="1"
                      max="20"
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Étape 3: Préférences */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">Préférences</h3>
                  
                  <div>
                    <label className="block text-white mb-4">Type de table</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-all
                          ${formData.tablePreference === 'standard' 
                            ? 'border-purple-500 bg-purple-900/20' 
                            : 'border-purple-800/30 bg-black/40 hover:border-purple-500/50'}
                        `}
                        onClick={() => setFormData(prev => ({ ...prev, tablePreference: 'standard' }))}
                      >
                        <h4 className="font-semibold text-white mb-2">Standard</h4>
                        <p className="text-gray-400 text-sm">Table standard dans l'espace commun.</p>
                      </div>
                      
                      <div 
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-all
                          ${formData.tablePreference === 'vip' 
                            ? 'border-purple-500 bg-purple-900/20' 
                            : 'border-purple-800/30 bg-black/40 hover:border-purple-500/50'}
                        `}
                        onClick={() => setFormData(prev => ({ ...prev, tablePreference: 'vip' }))}
                      >
                        <h4 className="font-semibold text-white mb-2">VIP</h4>
                        <p className="text-gray-400 text-sm">Zone surélevée avec vue sur la piste de danse.</p>
                      </div>
                      
                      <div 
                        className={`
                          border rounded-lg p-4 cursor-pointer transition-all
                          ${formData.tablePreference === 'booth' 
                            ? 'border-purple-500 bg-purple-900/20' 
                            : 'border-purple-800/30 bg-black/40 hover:border-purple-500/50'}
                        `}
                        onClick={() => setFormData(prev => ({ ...prev, tablePreference: 'booth' }))}
                      >
                        <h4 className="font-semibold text-white mb-2">Booth Privé</h4>
                        <p className="text-gray-400 text-sm">Espace isolé pour plus d'intimité (supplément).</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-white mb-2">Demandes spéciales</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Occasions spéciales, restrictions alimentaires, besoins d'accessibilité..."
                      className="w-full bg-black/60 text-white border border-purple-800/30 rounded-lg p-3 focus:border-pink-500 focus:outline-none min-h-[120px]"
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Navigation entre les étapes */}
              <div className="flex justify-between mt-10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-black/60 border border-purple-500/50 rounded-lg text-white flex items-center gap-1 hover:bg-black/80 transition-all"
                  >
                    <FaChevronLeft className="text-sm" />
                    Retour
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white flex items-center gap-1 hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Suivant
                    <FaChevronRight className="text-sm" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Réserver maintenant
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReservationSystem; 