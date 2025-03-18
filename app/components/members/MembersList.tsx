"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaUserCircle, FaStar, FaHistory, FaGraduationCap, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';
import { GiTwoHandedSword, GiMagicSwirl, GiHealing, GiArrowsShield } from 'react-icons/gi';
import membersData from '@/app/data/members';
import { Member } from '@/app/types/member';

// Types pour les données de membre
interface MemberClass {
  name: string;
  icon: JSX.Element;
  level: number;
  specialization?: string;
}

interface MemberData {
  id: string;
  name: string;
  avatar: string;
  race: string;
  level: number;
  mainClass: MemberClass;
  secondaryClass: MemberClass;
  rank: {
    title: string;
    color: string;
  };
  responsibilities: string[];
  lore: string;
  highlights: string[];
  joinDate: string;
  lastActive: string;
  participation: {
    raids: number;
    events: number;
    projects: number;
  };
}

export default function MembersList() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  
  const filteredMembers = filter 
    ? membersData.filter(member => member.rank.title === filter)
    : membersData;

  // Fonction pour afficher les détails d'un membre
  const toggleMemberDetails = (memberId: string) => {
    if (selectedMember === memberId) {
      setSelectedMember(null);
    } else {
      setSelectedMember(memberId);
    }
  };

  return (
    <section className="py-16 bg-black/90 relative overflow-hidden">
      {/* Effets d'arrière-plan */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-violet-500 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-red-500 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-violet-500 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <FilterButton 
            label="Tous" 
            active={filter === null} 
            onClick={() => setFilter(null)} 
          />
          <FilterButton 
            label="Maîtres de Guilde" 
            active={filter === "Maître de Guilde"} 
            onClick={() => setFilter("Maître de Guilde")} 
          />
          <FilterButton 
            label="Officiers" 
            active={filter === "Officier"} 
            onClick={() => setFilter("Officier")} 
          />
          <FilterButton 
            label="Vétérans" 
            active={filter === "Vétéran"} 
            onClick={() => setFilter("Vétéran")} 
          />
          <FilterButton 
            label="Membres" 
            active={filter === "Membre"} 
            onClick={() => setFilter("Membre")} 
          />
          <FilterButton 
            label="Recrues" 
            active={filter === "Recrue"} 
            onClick={() => setFilter("Recrue")} 
          />
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <React.Fragment key={member.id}>
              <MemberCard 
                member={member} 
                isSelected={selectedMember === member.id}
                onClick={() => toggleMemberDetails(member.id)}
              />
              
              {selectedMember === member.id && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-black/60 border border-violet-900/30 rounded-lg p-6 mt-2 mb-8">
                  <MemberDetails member={member} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Aucun membre ne correspond à ce filtre.</p>
          </div>
        )}
        
        {filteredMembers.length > 8 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-black border border-violet-800/30 text-gray-400 hover:bg-violet-900/20 hover:text-white transition-all">
                &lt;
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-blue-600 text-white">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-black border border-violet-800/30 text-gray-400 hover:bg-violet-900/20 hover:text-white transition-all">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-black border border-violet-800/30 text-gray-400 hover:bg-violet-900/20 hover:text-white transition-all">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-black border border-violet-800/30 text-gray-400 hover:bg-violet-900/20 hover:text-white transition-all">
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

function FilterButton({ label, active = false, onClick }: FilterButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
          : 'bg-black/50 border border-violet-500/30 text-gray-300 hover:bg-violet-500/10'
      }`}
    >
      {label}
    </button>
  );
}

interface MemberCardProps {
  member: MemberData;
  isSelected: boolean;
  onClick: () => void;
}

function MemberCard({ member, isSelected, onClick }: MemberCardProps) {
  return (
    <div 
      className={`bg-black/60 border ${isSelected ? 'border-violet-500' : 'border-violet-900/30'} rounded-lg overflow-hidden relative group cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]`}
      onClick={onClick}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${member.rank.color} opacity-0 group-hover:opacity-20 blur-md -z-10 transition-opacity duration-300`}></div>
      
      <div className="p-4">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-violet-500/50">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-red-600 opacity-30"></div>
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
              {member.name.charAt(0)}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white">{member.name}</h3>
            <p className="text-gray-400 text-sm">{member.race} · Niveau {member.level}</p>
            
            <div className={`mt-1 px-3 py-0.5 inline-block rounded-full bg-gradient-to-r ${member.rank.color} text-white text-xs font-semibold`}>
              {member.rank.title}
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                {member.mainClass.icon}
              </div>
              <div className="text-sm">
                <span className="text-white">{member.mainClass.name}</span>
                <span className="ml-1 text-violet-400 text-xs">Nv. {member.mainClass.level}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-2">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                {member.secondaryClass.icon}
              </div>
              <div className="text-sm">
                <span className="text-white">{member.secondaryClass.name}</span>
                <span className="ml-1 text-blue-400 text-xs">Nv. {member.secondaryClass.level}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-violet-400" />
            <span>{member.joinDate.includes("Fondateur") ? <span className="text-yellow-400">Fondateur</span> : "Depuis " + member.joinDate.split("-")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserCircle className="text-blue-400" />
            <span>{member.lastActive}</span>
          </div>
        </div>
      </div>
      
      <div className={`h-1 w-full bg-gradient-to-r ${member.rank.color}`}></div>
    </div>
  );
}

interface MemberDetailsProps {
  member: MemberData;
}

function MemberDetails({ member }: MemberDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Classe et spécialisations */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FaGraduationCap className="mr-2 text-blue-400" />
          Classes et Spécialisations
        </h4>
        
        <div className="space-y-4">
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                {member.mainClass.icon}
              </div>
              <div>
                <h5 className="font-semibold text-white">
                  {member.mainClass.name}
                  <span className="ml-2 text-violet-400">Nv. {member.mainClass.level}</span>
                </h5>
              </div>
            </div>
            
            {member.mainClass.specialization && (
              <div className="mt-2 text-sm text-gray-300">
                <span className="text-gray-400">Spécialisation:</span> {member.mainClass.specialization}
              </div>
            )}
          </div>
          
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                {member.secondaryClass.icon}
              </div>
              <div>
                <h5 className="font-semibold text-white">
                  {member.secondaryClass.name}
                  <span className="ml-2 text-blue-400">Nv. {member.secondaryClass.level}</span>
                </h5>
              </div>
            </div>
            
            {member.secondaryClass.specialization && (
              <div className="mt-2 text-sm text-gray-300">
                <span className="text-gray-400">Spécialisation:</span> {member.secondaryClass.specialization}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
            <FaShieldAlt className="mr-2 text-red-400" />
            Responsabilités
          </h4>
          <ul className="list-disc list-inside text-gray-300 ml-2 space-y-1">
            {member.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-2">
            <div className="text-xl font-bold text-violet-400">{member.participation.raids}</div>
            <div className="text-xs text-gray-400">Raids</div>
          </div>
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-2">
            <div className="text-xl font-bold text-blue-400">{member.participation.events}</div>
            <div className="text-xs text-gray-400">Événements</div>
          </div>
          <div className="bg-black/40 border border-violet-900/20 rounded-lg p-2">
            <div className="text-xl font-bold text-red-400">{member.participation.projects}</div>
            <div className="text-xs text-gray-400">Projets</div>
          </div>
        </div>
      </div>
      
      {/* Lore et histoire */}
      <div className="md:col-span-2">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <FaHistory className="mr-2 text-red-400" />
          Histoire et Lore
        </h4>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          {member.lore}
        </p>
        
        <h5 className="text-md font-semibold text-white mb-3 flex items-center">
          <FaStar className="mr-2 text-yellow-400" />
          Moments marquants
        </h5>
        
        <ul className="space-y-2">
          {member.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-300">{highlight}</p>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 flex justify-end">
          <Link 
            href={`/profile/${member.id}`}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-md text-sm hover:from-violet-700 hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            Profil complet
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 