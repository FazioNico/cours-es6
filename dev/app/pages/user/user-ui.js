export const userSkeleton = (data)=> {
  return `
    <section>
      <div id="time"></div>
      <h1>${data.pageTitle} ${data.user.email} !</h1>
      <button id="logout">logout</button>
    </section>
  `;
}
