export const userSkeleton = (data)=> {
  return `
    <section>
      <div id="time"></div>
      <h1>${data.pageTitle} ${data.formData.email} !</h1>
    </section>
  `;
}
