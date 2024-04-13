import React from 'react'
import { AboutCard } from '../components/Elements/AboutCard'
import isimm from "../assets/images/isimm.png";
import isitcom from "../assets/images/isitcom.jpeg";
import isaat from "../assets/images/issat.png";
import insat from "../assets/images/insat.jpeg";
import ensi from "../assets/images/ensi.jpg"
import { useTitle } from '../hooks/useTitle';
export const About = () => {
  const para1="L'Institut Supérieur d'Informatique et de Mathématiques de Monastir utilise avec succès notre application de gestion des congés depuis son déploiement. Grâce à cette plateforme conviviale, notre personnel peut demander et gérer efficacement leurs congés, ce qui contribue à une meilleure organisation et à une plus grande transparence dans la planification des ressources humaines."
  const para2="À l'École Nationale des Sciences de l'Informatique, notre application de gestion des congés est devenue un outil indispensable pour rationaliser nos processus administratifs. Les fonctionnalités intuitives de l'application permettent à notre équipe de gérer facilement les demandes de congés, d'accéder aux calendriers partagés et de suivre les soldes de congés avec précision."
  const para3="À l'Institut National des Sciences Appliquées et de Technologie, notre collaboration avec cette application de gestion des congés a considérablement simplifié la gestion de nos ressources humaines. Nos employés apprécient la facilité avec laquelle ils peuvent soumettre leurs demandes de congés et consulter leur solde de jours disponibles, tandis que notre équipe administrative bénéficie d'une visibilité accrue sur la planification des congés."
  const para4="Depuis que nous avons adopté cette application de gestion des congés à l'Institut Supérieur d'Informatique et des Technologies de Communication, nous avons constaté une amélioration significative de notre efficacité opérationnelle. Grâce à ses fonctionnalités personnalisables, nous pouvons adapter le processus de gestion des congés à nos besoins spécifiques, ce qui contribue à une gestion des ressources humaines plus agile et transparente."
  const para5="À l'Institut Supérieur des Sciences Appliquées et de Technologie de Sousse, notre expérience avec cette application de gestion des congés a été extrêmement positive. La facilité d'utilisation de l'interface et la disponibilité du support technique ont fait de cette plateforme un outil inestimable pour simplifier la gestion des congés de notre personnel, tout en garantissant une conformité rigoureuse avec nos politiques internes."
  useTitle("About")
  return (
    <main>
        <div>
            <h1 className="  dark:text-white text-4xl font-bold text-gray-700 text m-12 text-center">Qui utilise notre Application ?</h1>
        </div>
        <AboutCard image={isimm} nom="Institut Supérieur d'Informatique et de Mathématiques de Monastir" lien="http://www.isimm.rnu.tn/public/" para={para1}/>
        <AboutCard image={ensi} nom="École Nationale des Sciences de l'Informatique" lien="https://ensi.rnu.tn/" para={para2}/>
        <AboutCard image={insat} nom="Institut National des Sciences Appliquées et de Technologie" lien="https://insat.rnu.tn/"  para={para3}/>
        <AboutCard image={isitcom} nom="Institut Supérieur d'Informatique et des Technologies de Communication" lien="https://isitcom.rnu.tn/"  para={para4}/>
        <AboutCard image={isaat} nom="Institut Supérieur des Sciences Appliquées et de Technologie de Sousse" lien="https://issatso.rnu.tn/"  para={para5}/>

    </main>
  )
}
