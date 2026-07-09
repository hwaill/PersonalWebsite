export default function Loading() {
  return (
    <main className="pageContent">
      <div className="bookclubPage">
        <div className="bookclubHero">
          <div className="skel" style={{ height: '5.5rem', width: '5.5rem', marginBottom: '16px' }} />
          <div className="skel" style={{ height: '0.8rem', width: '35%', marginBottom: '12px' }} />
          <div className="skel" style={{ height: '3.4rem', width: '50%', marginBottom: '8px' }} />
          <div className="skel" style={{ height: '2rem', width: '65%' }} />
        </div>

        <section className="bookclubSection">
          <div className="sectionRow">
            <div className="skel" style={{ height: '2.2rem', width: '8rem' }} />
            <div className="skel" style={{ height: '1rem', width: '5rem' }} />
          </div>
          <div className="booksGrid">
            {[0, 1, 2, 3, 5, 6].map((i) => (
              <div key={i} className="bookCard">
                <div className="bookCover">
                  <div className="skel" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
                </div>
                <div className="bookInfo">
                  <div className="skel" style={{ height: '0.7rem', width: '40%', marginBottom: '4px' }} />
                  <div className="skel" style={{ height: '1.05rem', width: '80%', marginBottom: '4px' }} />
                  <div className="skel" style={{ height: '0.9rem', width: '55%' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bookclubSection">
          <div className="sectionRow">
            <div className="skel" style={{ height: '2.2rem', width: '8rem' }} />
            <div className="skel" style={{ height: '1rem', width: '6rem' }} />
          </div>
          <div className="membersGrid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="memberCard">
                <div className="skel skelCircle" style={{ width: '52px', height: '52px' }} />
                <div className="skel" style={{ height: '0.95rem', width: '70%' }} />
                <div className="skel" style={{ height: '0.78rem', width: '55%' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
