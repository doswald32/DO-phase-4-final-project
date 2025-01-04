import { format } from 'date-fns'

function AnimalCard({ name, DOB, species}) {

    return (
        <div className="animal-card">
            <h1>{name}</h1>
            <p>Species: {species}</p>
            <span>Date of Birth: {format(DOB, "MMMM do, yyyy")}</span>
        </div>
    )
}

export default AnimalCard;