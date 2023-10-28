import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullname!: string;

  @Column()
  gender!: string;

  @Column()
  phone!: string;

  @Column()
  age!: number;
}
