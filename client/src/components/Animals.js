import { useOutletContext } from 'react-router-dom'
import AnimalCard from './AnimalCard'

function Animals() {
    const { animalsList, setAnimalsList } = useOutletContext();

    return (
        <div className="animals-list">
            {animalsList.map((animal) => {
                const ownerNames = animal.owners.map((owner) => `${owner.first_name} ${owner.last_name}`);
                return (
                    <AnimalCard
                        key={animal.id}
                        id={animal.id}
                        vet={`${animal.vet.first_name} ${animal.vet.last_name}`}
                        name={animal.name}
                        dob={animal.DOB}
                        species={animal.species}
                        owners={ownerNames.join(', ')}
                        last_visit_date={animal.visits[0]?.date || 'N/A'}
                        last_visit_summary={animal.visits[0]?.summary || 'N/A'}
                        setAnimalsList={setAnimalsList}
                    />
                );
            })}
        </div>
    );
}

export default Animals;