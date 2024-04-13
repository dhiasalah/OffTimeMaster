import { Accordian } from './Accordian';

export const Faq = () => {

    const faqs = [
        {
          "id": 1,
          "question": "Pourquoi devrais-je utiliser OffTimeMaster ?",
          "answer": "OffTimeMaster devrait être votre choix privilégié pour la gestion des congés et des absences en raison de ses fonctionnalités complètes et son interface conviviale. Que vous soyez un petit chef d'entreprise ou que vous gériez une grande équipe, OffTimeMaster simplifie l'ensemble du processus, vous faisant gagner du temps et des tracas. Avec OffTimeMaster, vous pouvez facilement suivre les congés des employés, approuver ou rejeter les demandes efficacement, et assurer une planification fluide sans les tracas des documents papier ou des feuilles de calcul. Son design intuitif le rend accessible aussi bien pour les employeurs que pour les employés, favorisant la transparence et la responsabilité au sein de votre organisation. De plus, OffTimeMaster offre des options de personnalisation pour s'adapter à vos besoins spécifiques, que ce soit pour définir différentes politiques de congé ou pour s'intégrer à d'autres outils RH. Dites adieu à la confusion et à la frustration de la gestion des congés - avec OffTimeMaster, vous êtes aux commandes et votre équipe peut se concentrer sur l'essentiel."

        },
        {
          "id": 2,
          "question": "Puis-je accéder à mon OffTimeMaster sur mobile ?",
          "answer": "Actuellement, notre équipe travaille activement sur le développement de la version mobile de l'application OffTimeMaster. Nous comprenons l'importance de l'accessibilité et de la mobilité pour nos utilisateurs, et nous sommes déterminés à fournir une expérience optimale sur les appareils mobiles. Restez à l'écoute pour les mises à jour concernant le lancement de la version mobile d'OffTimeMaster."
        },
        {
          "id": 3,
          "question": "est-elle gratuit?",
          "answer": "Nous sommes heureux d'annoncer que OffTimeMaster est entièrement gratuit pour les utilisateurs. Notre objectif est de fournir une solution de gestion des congés et des absences accessible à tous, sans frais cachés ni coûts supplémentaires. Vous pouvez profiter de toutes les fonctionnalités de l'application sans avoir à débourser le moindre centime. Que vous soyez une petite entreprise ou une grande organisation, OffTimeMaster est là pour simplifier votre processus de gestion des congés, sans grever votre budget. Profitez dès maintenant de notre application gratuite et optimisez la gestion de vos ressources humaines en toute simplicité."
        },
        {
          "id": 4,
          "question": "La qualité de sécurité ?",
          "answer": "La sécurité de nos utilisateurs est notre priorité absolue chez OffTimeMaster. Notre application est dotée de mesures de sécurité robustes pour protéger les données sensibles de nos utilisateurs. Nous utilisons des protocoles de cryptage avancés pour sécuriser toutes les informations personnelles et professionnelles stockées dans notre système. De plus, nous mettons régulièrement à jour nos systèmes et procédures pour nous conformer aux normes de sécurité les plus strictes. Vous pouvez avoir une totale tranquillité d'esprit en utilisant OffTimeMaster pour gérer vos congés et absences, sachant que vos données sont entre de bonnes mains. Nous nous engageons à maintenir un environnement sûr et sécurisé pour tous nos utilisateurs, garantissant ainsi la confidentialité et l'intégrité de leurs informations."
        }
    ];
    
  return (
    <section className="my-10 p-7 border rounded dark:border-slate-700 shadow-sm">        
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-3 underline underline-offset-8">Question in mind?</h1>    
            <div className="" id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                   {faqs.map((faq)=>(
                        <Accordian faq={faq} key={faq.id}/>
                   ))}
            </div>
      </section>
  )
}
