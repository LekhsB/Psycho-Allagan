import { Metadata } from "next";
import RecruitmentForm from "@/app/components/recruitment/RecruitmentForm";
import RecruitmentSteps from "@/app/components/recruitment/RecruitmentSteps";
import RecruitmentHero from "@/app/components/recruitment/RecruitmentHero";

export const metadata: Metadata = {
  title: "Recrutement | Psycho Allagan",
  description: "Rejoignez la compagnie libre Psycho Allagan sur Final Fantasy XIV. Découvrez notre processus de recrutement et soumettez votre candidature.",
};

export default function RecruitmentPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <RecruitmentHero />
      
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Notre processus
            </h2>
            
            <RecruitmentSteps />
            
            <div className="mt-10 p-6 bg-black/50 border border-violet-500/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Critères d'admission</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-violet-400 mr-2">▹</span>
                  <span>Avoir au moins un job niveau 90</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-400 mr-2">▹</span>
                  <span>Être actif régulièrement sur FFXIV</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-400 mr-2">▹</span>
                  <span>Bonne attitude et respect envers les autres membres</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-400 mr-2">▹</span>
                  <span>S'intégrer à notre communauté Discord</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-400 mr-2">▹</span>
                  <span>Être sur le Data Center Chaos (serveur Moogle de préférence)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 order-first lg:order-last">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Formulaire de candidature
          </h2>
          
          <div className="bg-black/50 border border-violet-500/30 rounded-lg p-6">
            <RecruitmentForm />
          </div>
          
          <div className="mt-8 p-6 bg-black/50 border border-violet-500/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Foire aux questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-violet-400 mb-2">Combien de temps dure le processus ?</h4>
                <p className="text-gray-300">Le processus de recrutement prend généralement entre 1 et 2 semaines, selon la disponibilité de nos officiers et la vôtre pour organiser l'entretien Discord.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-violet-400 mb-2">Quels sont les avantages d'être membre ?</h4>
                <p className="text-gray-300">En tant que membre, vous aurez accès à notre maison de FC, des événements exclusifs, des groupes de raid, de l'aide pour progresser dans le jeu, et une communauté active et bienveillante.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-violet-400 mb-2">Y a-t-il une période d'essai ?</h4>
                <p className="text-gray-300">Oui, les nouveaux membres reçoivent d'abord le grade de recrue pendant 2 semaines. Cette période permet à tout le monde de s'assurer que l'intégration se passe bien.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-violet-400 mb-2">Que se passe-t-il si ma candidature est refusée ?</h4>
                <p className="text-gray-300">Nous vous contacterons pour vous expliquer les raisons du refus. Dans certains cas, nous pouvons suggérer de réessayer après avoir acquis plus d'expérience ou résolu certains points spécifiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 