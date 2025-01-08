import { useOutletContext } from "react-router-dom";
import AnimalCard from './AnimalCard'

function Animals() {

    const {animalsList, setAnimalsList} = useOutletContext();

    return (
        <div className="animals-list">{animalsList.map((animal) => {
            return <AnimalCard 
            key={animal.id} 
            vet={`${animal.vet.first_name} ${animal.vet.last_name}`}
            name={animal.name} 
            DOB={animal.DOB} 
            species={animal.species} 
            owners={animal.owners} 
            visit_date={`${animal.visits[0].owner.first_name} ${animal.visits[0].owner.last_name}`} 
            visit_summary={animal.visit_summary}/>
        })}</div>
    )
}

export default Animals;