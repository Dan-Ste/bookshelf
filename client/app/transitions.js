export default function () {
  // Add your transitions here, like:
  //   this.transition(
  //     this.fromRoute('people.index'),
  //     this.toRoute('people.detail'),
  //     this.use('toLeft'),
  //     this.reverse('toRight')
  //   );

  this.transition(
    this.hasClass('fade'),
    this.toValue(true),
    this.use('fade', {
      duration: 100
    }),
    this.reverse('fade', {
      duration: 100
    })
  );
}
