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
            owners={`${animal.visits[0].owner.first_name} ${animal.visits[0].owner.last_name}`}
            last_visit_date={animal.visits[0].date} 
            last_visit_summary={animal.visits[0].summary}/>
        })}</div>
    )
}

export default Animals;