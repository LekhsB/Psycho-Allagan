import { Metadata } from 'next';
import MembersHero from '../components/members/MembersHero';
import MembersList from '../components/members/MembersList';

export const metadata: Metadata = {
  title: 'Membres | Psycho Allagan',
  description: 'Découvrez les membres de notre compagnie libre, leur histoire, leurs spécialisations et leur rôle au sein de Psycho Allagan.',
};

export default function MembersPage() {
  return (
    <>
      <MembersHero />
      <MembersList />
    </>
  );
} 