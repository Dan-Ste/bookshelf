export default function (server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  let author = server.create('author');

  server.createList('book', 10, {
    author
  });
}
