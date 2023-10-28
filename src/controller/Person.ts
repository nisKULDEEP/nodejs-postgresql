import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Person } from '../entity/Person';

const getPersons = async (req: Request, res: Response) => {
  try {
    const personRepository = AppDataSource.getRepository(Person);
    const persons = await personRepository.find();

    // Send the list of persons as a JSON response
    res.json(persons);
  } catch (error) {
    console.error('Error getting persons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPerson = async (req: Request, res: Response) => {
  try {
    const personRepository = AppDataSource.getRepository(Person);
    const { fullname, gender, phone, age } = req.body;

    const newPerson = new Person();
    newPerson.fullname = fullname;
    newPerson.gender = gender;
    newPerson.phone = phone;
    newPerson.age = age;

    await personRepository.save(newPerson);

    // Send a success response
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getPersons, createPerson };
