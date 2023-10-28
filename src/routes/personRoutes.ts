import { getPersons, createPerson } from '../controller/Person';

export const PersonRoutes = [
  {
    path: '/persons',
    method: 'get',
    action: getPersons
  },
  {
    path: '/persons',
    method: 'post',
    action: createPerson
  }
];
