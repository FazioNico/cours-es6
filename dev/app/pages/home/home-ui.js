export const homeSkeleton = (data)=> {
  return `
    <section>
      <h1>${data.pageTitle}</h1>
      <button id="logGoogle">Login with Google</button>
    </section>
  `;
}
