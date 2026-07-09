export default function Loading() {
  const rows = [0, 1, 2];

  return (
    <main className="pageContent projectsPage">
      <div className="skel" style={{ height: '3rem', width: '11rem', marginBottom: '12px' }} />
      <div className="skel" style={{ height: '1.1rem', width: '65%' }} />

      <section className="projectsPageSection">
        <div className="skel" style={{ height: '1.6rem', width: '9rem', marginBottom: '8px' }} />
        <div>
          {rows.map((i) => (
            <div key={i} className={`projectContainer${i === rows.length - 1 ? ' last' : ''}`}>
              <div className="projectContainerNumber">
                <div className="skel" style={{ width: '1.5rem', height: '1.25rem' }} />
              </div>
              <div className="projectContainerText">
                <div className="skel" style={{ width: '35%', height: '0.85rem', marginBottom: '10px' }} />
                <div className="skel" style={{ width: '65%', height: '1.4rem', marginBottom: '10px' }} />
                <div className="skel" style={{ width: '85%', height: '1rem' }} />
              </div>
              <div className="projectContainerImage">
                <div className="skel" style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
