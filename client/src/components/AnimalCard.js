function AnimalCard({ name, DOB, species}) {
    return (
        <div className="animal-card">
            <h1>{name}</h1>
            <p>{DOB}</p>
            <p>{species}</p>
        </div>
    )
}

export default AnimalCard;