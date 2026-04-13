import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <section className={styles.hero}>
        <header className={styles.topbar}>
          <p className={styles.brand}>JOBPORTAL</p>
          <a href="/login" className={styles.loginButton}>
            Log In
          </a>
        </header>

        <div className={styles.content}>
          <p className={styles.kicker}>Hire quickly. Work confidently.</p>
          <h1 className={styles.title}>Find proven talent for your next mission-critical project.</h1>
          <p className={styles.description}>
            JobPortal connects companies with verified specialists across engineering, design, and
            operations. Post once, review matched candidates, and onboard in days.
          </p>

          <div className={styles.actions}>
            <a href="/jobs" className={styles.primary}>
              Browse Talent
            </a>
            <a href="/post-job" className={styles.secondary}>
              Post a Job
            </a>
          </div>
        </div>

        <aside className={styles.panel}>
          <p className={styles.panelLabel}>This Month</p>
          <ul className={styles.metrics}>
            <li>
              <span className={styles.metricValue}>2,400+</span>
              <span className={styles.metricLabel}>Verified candidates</span>
            </li>
            <li>
              <span className={styles.metricValue}>48h</span>
              <span className={styles.metricLabel}>Average shortlist time</span>
            </li>
            <li>
              <span className={styles.metricValue}>91%</span>
              <span className={styles.metricLabel}>Successful first matches</span>
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
