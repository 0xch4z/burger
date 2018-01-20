import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Burger {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  burgerName: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;
  
  @Column()
  isDevoured: boolean;

  @BeforeInsert()
  static log() {
    console.log('Adding new burger =>');
  }

}
