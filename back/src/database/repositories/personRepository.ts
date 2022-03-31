import { EntityRepository, Repository } from 'typeorm';
import { Person } from '../models/Person';

@EntityRepository(Person)
class PersonRepository extends Repository<Person> {}

export { PersonRepository };
