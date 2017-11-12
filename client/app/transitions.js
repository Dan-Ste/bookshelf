export default function () {
  // Add your transitions here, like:
  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   )

  this.transition(
    this.hasClass('fade'),
    this.toValue(true),
    this.use('fade', {
      duration: 100
    }),
    this.reverse('fade', {
      duration: 100
    })
  )

  // Books transitions
  this.transition(
    this.fromRoute('books.index'),
    this.toRoute('books.book'),
    this.use('toLeft'),
    this.reverse('toRight')
  )

  this.transition(
    this.toRoute('books.index'),
    this.fromRoute('books.new'),
    this.use('toRight'),
    this.reverse('toLeft')
  )

  this.transition(
    this.toRoute('books.book.index'),
    this.fromRoute('books.book.edit'),
    this.use('toRight'),
    this.reverse('toLeft')
  )

  // Authors transitions
  this.transition(
    this.toRoute('authors.index'),
    this.fromRoute('authors.author'),
    this.use('toRight'),
    this.reverse('toLeft')
  )

  this.transition(
    this.toRoute('authors.index'),
    this.fromRoute('authors.new'),
    this.use('toRight'),
    this.reverse('toLeft')
  )

  this.transition(
    this.toRoute('authors.author.index'),
    this.fromRoute('authors.author.edit'),
    this.use('toRight'),
    this.reverse('toLeft')
  )

  // Top level routes
  this.transition(
    this.toRoute('authors'),
    this.fromRoute('books'),
    this.use('fade', {
      duration: 70
    }),
    this.reverse('fade', {
      duration: 70
    })
  )

  this.transition(
    this.toRoute('authors'),
    this.fromRoute('bookshelf'),
    this.use('fade', {
      duration: 70
    }),
    this.reverse('fade', {
      duration: 70
    })
  )

  this.transition(
    this.toRoute('books'),
    this.fromRoute('bookshelf'),
    this.use('fade', {
      duration: 70
    }),
    this.reverse('toLeft', {
      duration: 70
    })
  )
}
