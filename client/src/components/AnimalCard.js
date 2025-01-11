
function AnimalCard({ id, name, vet, DOB, species, owners, last_visit_date, last_visit_summary, onDelete}) {

    function handleDelete() {
        fetch(`http://127.0.0.1:5555/animals/${id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(`Failed to delete animal from http://127.0.0.1:5555/animals/${id}`)
            }
        })
        .then(() => onDelete(id))
        .catch((error) => {
            console.error('Error during deletion: ', error)
            alert('Failed to delete the animal. Please try again.')
        })
    }

    return (
        <div className="animal-card">
            <p id="animal-card-name" className="animal-card-items">{name}</p>
            <p id="animal-card-vet" className="animal-card-items">Assigned Veterinarian: {vet}</p>
            <p id="animal-card-species" className="animal-card-items">Species: {species}</p>
            <p id="animal-card-dob" className="animal-card-items">Date of Birth: {DOB}</p>
            <p id="animal-card-owner" className="animal-card-items">Owner(s): {owners}</p>
            <p id="animal-card-visit" className="animal-card-items">Last Visit: {last_visit_date}</p>
            <p id="animal-card-summary" className="animal-card-items">Visit Summary: {last_visit_summary}</p>
            <button className="animal-card-button">Edit</button>
            <button className="animal-card-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default AnimalCard;