export default function Loading() {
  return (
    <main className="pageContent bookDetailPage">
      <div className="bookDetailHero">
        <div className="skel" style={{ height: '5.5rem', width: '5.5rem', marginBottom: '16px' }} />
        <div className="skel" style={{ height: '0.8rem', width: '30%', marginBottom: '24px' }} />
        <div className="bookDetailHeroGrid">
          <div className="bookDetailCover">
            <div className="skel" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
          </div>
          <div className="bookDetailHeroInfo">
            <div className="skel" style={{ height: '0.7rem', width: '30%', marginBottom: '8px' }} />
            <div className="skel" style={{ height: '2.8rem', width: '70%', marginBottom: '8px' }} />
            <div className="skel" style={{ height: '1.5rem', width: '45%', marginBottom: '16px' }} />
            <div className="bookDetailMeta">
              {[0, 1, 2].map((i) => (
                <div key={i} className="metaItem">
                  <div className="skel" style={{ height: '0.7rem', width: '3.5rem', marginBottom: '4px' }} />
                  <div className="skel" style={{ height: '0.95rem', width: '3rem' }} />
                </div>
              ))}
            </div>
            <div className="skel" style={{ height: '3rem', width: '30%', marginTop: '12px' }} />
          </div>
        </div>
      </div>

      <section className="pageSection">
        <div className="skel" style={{ height: '1.8rem', width: '8rem', marginBottom: '20px' }} />
        <div className="scoreList">
          {[0, 1, 2].map((i) => (
            <div key={i} className="scoreWrapper">
              <div className="skel" style={{ height: '2.5rem', width: '100%' }} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
