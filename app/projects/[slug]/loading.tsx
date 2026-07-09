export default function Loading() {
  return (
    <main className="pageContent">
      <section className="projectHero">
        <div className="skel" style={{ height: '5.5rem', width: '5.5rem', marginBottom: '16px' }} />
        <div className="skel" style={{ height: '0.8rem', width: '30%', marginBottom: '10px' }} />
        <div className="skel" style={{ height: '3rem', width: '55%', marginBottom: '10px' }} />
        <div className="skel" style={{ height: '1.6rem', width: '40%', marginBottom: '20px' }} />
        <div className="projectMeta">
          {[0, 1, 2].map((i) => (
            <div key={i} className="metaItem">
              <div className="skel" style={{ height: '0.7rem', width: '3.5rem', marginBottom: '4px' }} />
              <div className="skel" style={{ height: '0.9rem', width: '4.5rem' }} />
            </div>
          ))}
        </div>
      </section>

      <section className="projectHighlights">
        <div className="skel" style={{ height: '0.75rem', width: '6rem', marginBottom: '16px' }} />
        <div className="highlightsGrid">
          {[0, 1, 2].map((i) => (
            <div key={i} className="highlightItem">
              <div className="skel" style={{ height: '1.1rem', width: '3rem', marginBottom: '6px' }} />
              <div className="skel" style={{ height: '1rem', width: '80%', marginBottom: '6px' }} />
              <div className="skel" style={{ height: '0.85rem', width: '95%' }} />
            </div>
          ))}
        </div>
      </section>

      <section className="projectSection">
        <div className="skel" style={{ height: '1.8rem', width: '10rem', marginBottom: '16px' }} />
        <div className="skel" style={{ height: '1rem', width: '100%', marginBottom: '10px' }} />
        <div className="skel" style={{ height: '1rem', width: '100%', marginBottom: '10px' }} />
        <div className="skel" style={{ height: '1rem', width: '75%' }} />
      </section>
    </main>
  );
}
