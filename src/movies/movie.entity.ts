import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { MovieStatus } from './enums/movie-status';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  title: string;
  @Column({ length: 100 })
  director: string;
  @Column({ type: 'enum', enum: MovieStatus, default: MovieStatus.AVAILABLE })
  status: MovieStatus;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
