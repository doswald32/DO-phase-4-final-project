import { format } from 'date-fns'

function AnimalCard({ name, DOB, species}) {

    return (
        <div className="animal-card">
            <h1>Name: {name}</h1>
            <p>{species}</p>
            <span>{format(DOB, "MMMM do, yyyy")}</span>
        </div>
    )
}

export default AnimalCard;