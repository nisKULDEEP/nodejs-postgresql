"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Person_1 = require("./entities/Person");
const PersonRepository_1 = require("./repositories/PersonRepository");
(async () => {
    const connection = await (0, typeorm_1.createConnection)({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "your_postgres_username",
        password: "your_postgres_password",
        database: "typeormdemo",
        entities: [Person_1.Person],
    });
    const personRepository = connection.getCustomRepository(PersonRepository_1.PersonRepository);
    const newPerson = new Person_1.Person();
    newPerson.fullname = "Jane Doe";
    newPerson.gender = "F";
    newPerson.phone = "5555555555";
    newPerson.age = 29;
    await personRepository.save(newPerson);
    const existingPerson = await personRepository.findByName("Jane Doe");
    if (!existingPerson) {
        throw Error("Unable to find Jane Doe.");
    }
    await personRepository.updateName(existingPerson.id, "Jane Johnson");
    await personRepository.remove(existingPerson);
    await connection.close();
})();
