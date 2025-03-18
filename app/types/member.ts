import { ReactElement } from 'react';

export interface MemberClass {
  name: string;
  icon: ReactElement;
  level: number;
  specialization?: string;
}

export interface MemberRank {
  title: string;
  color: string;
}

export interface MemberParticipation {
  raids: number;
  events: number;
  projects: number;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  race: string;
  level: number;
  mainClass: MemberClass;
  secondaryClass: MemberClass;
  rank: MemberRank;
  responsibilities: string[];
  lore: string;
  highlights: string[];
  joinDate: string;
  lastActive: string;
  participation: MemberParticipation;
} 