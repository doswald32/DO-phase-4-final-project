import { format } from 'date-fns'

function AnimalCard({ name, DOB, species}) {

    return (
        <div className="animal-card">
            <p id="animal-card-name" className="animal-card-items">{name}</p>
            <p id="animal-card-species" className="animal-card-items">Species: {species}</p>
            <p id="animal-card-dob" className="animal-card-items">Date of Birth: {format(DOB, "MMMM do, yyyy")}</p>
            <p id="animal-card-owner" className="animal-card-items">Owner: </p>
            <p id="animal-card-visit" className="animal-card-items">Last Visit: </p>
            <button className="animal-card-button">Edit</button>
            <button className="animal-card-button">Delete</button>
        </div>
    )
}

export default AnimalCard;