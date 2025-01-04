import { useOutletContext } from "react-router-dom";
import AnimalCard from './AnimalCard'

function Animals() {

    const {animalsList, setAnimalsList} = useOutletContext();

    return (
        <div className="animals-list">{animalsList.map((animal) => {
            return <AnimalCard key={animal.id} name={animal.name} DOB={animal.DOB} species={animal.species} />
        })}</div>
    )
}

export default Animals;