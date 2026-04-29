import './TeamSection.css'

const TeamSection = () => {
  return (
    <section className="team-section section-secondary">
      <div className="container">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member-card">
            <img src="/assets/MA.jpg" alt="Marcelo Albarracin" className="team-member-avatar-img" />
            <h3 className="team-member-name">Marcelo Albarracin</h3>
            <p className="team-member-quote">
              “Turning Strategy into Results with Technology and Analytics”
            </p>
          </div>

          <div className="team-member-card">
            <img src="/assets/JF.png" alt="Jorge Ferrel" className="team-member-avatar-img" />
            <h3 className="team-member-name">Jorge Ferrel</h3>
            <p className="team-member-quote">
              “Driving Innovation and Efficiency Through Technology
              Solutions”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection