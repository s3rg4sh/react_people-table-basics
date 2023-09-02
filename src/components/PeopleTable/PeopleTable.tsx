import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Personlink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const getPersonByName = (name: string) => {
    return people.find(pers => pers.name === name);
  };

  const getPersonParent = (name: string | null): JSX.Element => {
    return (name ? (
      <>
        {getPersonByName(name)
          ? (
            <Personlink
              person={getPersonByName(name) as Person}
            />
          )
          : (
            <>
              {name}
            </>
          )}
      </>
    )
      : (
        <>
          -
        </>
      ));
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Personlink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getPersonParent(person.motherName)}
            </td>
            <td>
              {getPersonParent(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
