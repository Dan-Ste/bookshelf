import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.title();
  },
  biography() {
    return faker.random.words();
  },
  imageUrl() {
    return faker.image.imageUrl();
  },
  yearOfPublishing() {
    return faker.date.past();
  }
});
