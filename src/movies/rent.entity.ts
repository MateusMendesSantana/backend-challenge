import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RentStatus } from './enums/rent-status.enum';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  movieId: number;
  @Column({ type: 'enum', enum: RentStatus, default: RentStatus.RENTED })
  status: RentStatus;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
