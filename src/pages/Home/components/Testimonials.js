import fedi from "../../../assets/images/fedi.jpg"
import islem from "../../../assets/images/islem.jpg"
import seif from "../../../assets/images/seif.png"    
import naim from "../../../assets/images/naim.jpg"
export const Testimonials = () => {
  return (
    <section className='my-20'>
        <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Students About OffTimeMaster</h1>    
        <div className="grid mb-8 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-t-lg border-b border-gray-200 md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Très facile à intégrer</h3>
                    <p className="my-4 font-light">If you care for your time, I hands down would go with this."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-12 h-12 rounded-full" src={fedi} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Ben Mahfoudh Fedi</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Etudiant à l'ISIMM</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-tr-lg border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Une base solide pour tout projet</h3>
                    <p className="my-4 font-light">Super facile à utiliser ! J'adore pouvoir demander mes congés en quelques clics et suivre leur statut en temps réel."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-12 h-12 rounded-full" src={islem} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Baccar Islem</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Etudiant à l'ISIMM</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-bl-lg border-b border-gray-200 md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flux de travail époustouflant</h3>
                    <p className="my-4 font-light">Cette application a vraiment simplifié notre processus de demande de congés en éliminant le besoin de formulaires papier. C'est tellement pratique !"</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-12 h-12 rounded-full" src={seif} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Jguirim Seif</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Etudiant à l'ISIMM</div>
                    </div>
                </figcaption>    
            </figure>
            <figure className="flex flex-col justify-center items-center p-8 text-center bg-white rounded-b-lg border-gray-200 md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
                <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Collaboration efficace</h3>
                    <p className="my-4 font-light">J'apprécie la fonctionnalité de planification des congés qui permet de visualiser facilement les périodes de congé de toute l'équipe. Cela aide à coordonner les absences et à maintenir la productivité."</p>
                </blockquote>
                <figcaption className="flex justify-center items-center space-x-3">
                    <img className="w-12 h-12 rounded-full" src={naim} alt="user" />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                        <div>Ben Jedou Naim</div>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">Etudiant à l'ISIMM</div>
                    </div>
                </figcaption>    
            </figure>
        </div>
    </section>
  )
}
