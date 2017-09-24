import {
  Factory,
  faker
} from 'ember-cli-mirage';

export default Factory.extend({
  title() {
    return faker.name.title();
  },
  description() {
    return faker.random.words();
  },
  imageUrl() {
    return faker.image.abstract();
  },
  pubYear() {
    return faker.date.past();
  }
});
