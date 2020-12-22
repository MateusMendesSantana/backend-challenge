import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn({ length: 120 })
  email: string;
  @Column({ length: 200 })
  password: string;
}
