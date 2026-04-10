import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Talent Marketplace Platform</p>
        <h1 className={styles.title}>The monorepo is installed and ready for feature work.</h1>
        <p className={styles.description}>
          Laravel powers the API, Next.js drives the web experience, and the workspace is already
          wired for shared packages, Tailwind, and SCSS.
        </p>
        <div className={styles.actions}>
          <a href="http://localhost:3000" className={styles.primary}>
            Web App
          </a>
          <a href="http://localhost:8000/api/v1/health" className={styles.secondary}>
            API Health
          </a>
        </div>
      </section>
    </main>
  );
}
