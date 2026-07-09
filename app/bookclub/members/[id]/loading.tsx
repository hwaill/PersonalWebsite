export default function Loading() {
  return (
    <main className="pageContent memberDetailPage">
      <div className="memberDetailHero">
        <div className="skel" style={{ height: '5.5rem', width: '5.5rem', marginBottom: '16px' }} />
        <div className="skel" style={{ height: '0.8rem', width: '30%', marginBottom: '24px' }} />
        <div className="memberHeroGrid">
          <div className="skel skelCircle" style={{ width: '80px', height: '80px', flexShrink: 0 }} />
          <div className="memberHeroInfo">
            <div className="skel" style={{ height: '3.4rem', width: '12rem', marginBottom: '4px' }} />
            <div className="skel" style={{ height: '1.6rem', width: '9rem', marginBottom: '12px' }} />
            <div className="memberStats">
              {[0, 1, 2].map((i) => (
                <div key={i} className="statItem">
                  <div className="skel" style={{ height: '2rem', width: '2.5rem', marginBottom: '4px' }} />
                  <div className="skel" style={{ height: '0.72rem', width: '4rem' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="pageSection">
        <div className="skel" style={{ height: '1.8rem', width: '11rem', marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="skel" style={{ height: '3.5rem', width: '100%' }} />
          ))}
        </div>
      </section>
    </main>
  );
}
