import { useOutletContext } from "react-router-dom";
import AnimalCard from './AnimalCard'

function Animals() {

    const {animalsList, setAnimalsList} = useOutletContext();

    return (
        <div className="animals-list">{animalsList.map((animal) => {
            return <AnimalCard key={animal.id} name={animal.name} DOB={animal.DOB} species={animal.species} owners={animal.owners} visit_date={animal.visit_date} visit_summary={animal.visit_summary}/>
        })}</div>
    )
}

export default Animals;