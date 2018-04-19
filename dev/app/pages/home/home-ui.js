export const homeSkeleton = (data)=> {
  return `
    <section>
      <h1>${data.pageTitle}</h1>
      <form>
        <p>
          <label for="email">Email:</label> <input type="email" name="email" value="" placeholder="votreemail.ch"  /><br/>
          <label for="password">Password:</label> <input type="password" name="password" value=""  /><br/>
          <button>Login</button>
        </p>
      </form>
    </section>
  `;
}
