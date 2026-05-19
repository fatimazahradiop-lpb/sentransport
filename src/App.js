import { useState } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer'; 

function App() {
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [compteurRecherches, setCompteurRecherches] = useState(0);
  const lignes = [ 
    { id: 1 , numero:"1", depart: "Parcelles Assainies",
    arrivee : " Plateau ", arrets : 14 ,
    listeArrets : [" Parcelles U14", " Parcelles U10",
      "Camberene", "Patte d'Oie", "Grand Dakar",
      "Colobane", "Ponty", "Plateau"] } ,
  { id : 2 , numero : "7", depart : " Guediawaye ",
    arrivee : " Place Obe", arrets : 18 ,
    listeArrets : [" Guediawaye ", " Pikine ", " Thiaroye ",
      "Keur Massar", "Grand Yoff", "Parcelles",
      "Liberte 6",  "Place Obe"] } ,
  { id : 3 , numero : "15", depart : " Pikine ",
    arrivee : " Medina ", arrets : 12 ,
    listeArrets : [" Pikine Centre ", " Thiaroye Gare ",
       "Hann",  "Colobane", "Fass", "Medina"] } ,
  { id: 4 , numero : "23", depart : " Ouakam ",
    arrivee: "Grand Dakar", arrets : 10 ,
    listeArrets: ["Ouakam Village", "Mermoz", "Fann",
       "Point E", "Liberte 5", "Grand Dakar"] } ,
  { id: 5 , numero: "8", depart: "Almadies",
    arrivee: "Colobane", arrets: 16 ,
    listeArrets: ["Almadies", "Ngor", "Yoff",
      "Ouest Foire", "Liberte 6", "Colobane"] } ,
  { id: 6 , numero: "12", depart: "Yoff",
    arrivee: "Sandaga", arrets: 11 ,
    listeArrets: ["Yoff Village", "Aeroport LSS",
      "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"] } ,
  ];

  // Filtrer les lignes selon le texte tape
   const lignesFiltrees = lignes.filter (l => 
      l.depart.toLowerCase().includes(recherche.toLowerCase()) || 
      l.arrivee.toLowerCase().includes(recherche.toLowerCase()) || 
      l.numero.includes(recherche) 
    );
  
    function handleClickLigne(ligne) {
      if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
        setLigneSelectionnee(null); 
      }
        else {
          setLigneSelectionnee(ligne);
        }
    }
    const gererChangementRecherche = (nouveauTexte) => {
    setRecherche(nouveauTexte); // On met à jour le texte pour le filtre
    setCompteurRecherches(prev => prev + 1); // On ajoute 1 au compteur
};

    return (
      <div className="App">
        <Header/>
        <main className='contenu'>
          {/* Affichage du compteur d'activité */}
          <p style={{ fontSize: '0.8rem', color: '#7f8c8d', textAlign: 'right' }}>
            Activité : {compteurRecherches} modification(s) de recherche
          </p>
            <div className="recherche-container">
                <Recherche valeur={recherche} onChange={gererChangementRecherche} />
                  {/* Bouton pour vider le champ si une recherche est en cours */}
                       {recherche !== "" && (
                        <button onClick={() => setRecherche("")} className="btn-effacer">
                             Effacer
                        </button>
  )}
      </div>
         {/* Si aucune ligne ne correspond à la recherche */}
{lignesFiltrees.length === 0 ? (
    <div className="message-aucun-resultat">
        <p> Aucune ligne trouvée pour "<strong>{recherche}</strong>"</p>
        <p>Essayez un autre numéro ou un autre quartier.</p>
    </div>
) : (
    /* Sinon, on affiche le compteur habituel */
    <p className="resultat-recherche">
        {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
    </p>
)} 
          {lignesFiltrees.map(ligne => ( 
            <LigneBus key={ligne.id} 
            numero={ligne.numero} 
            depart={ligne.depart} 
            arrivee={ligne.arrivee} 
            arrets={ligne.arrets} 
            estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id} onClick={() => handleClickLigne(ligne)}
            /> 
          ))}
          {ligneSelectionnee 
            && <DetailLigne ligne={ligneSelectionnee}  />}
          
        </main>
        <Footer/>
        </div>
    );
}

export default App;