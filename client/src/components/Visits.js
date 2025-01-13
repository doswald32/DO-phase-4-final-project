import { useOutletContext } from 'react-router-dom'
import VisitCard from './VisitCard'

function Visits() {
    const { visits, setVisits } = useOutletContext();

    return (
        <div className="visits-list">
            {visits.map((visit) => {
                return (
                    <VisitCard
                        key={visit.id}
                        id={visit.id}
                        pet={visit.pet}
                        vet={visit.vet}
                        date={visit.date}
                        summary={visit.summary}
                        setVisits={setVisits}
                    />
                );
            })}
        </div>
    );
}

export default Visits;