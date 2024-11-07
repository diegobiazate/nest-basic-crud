import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('clients')
export class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @BeforeInsert()
  generateId() {
    this.id = `dev_${uuidV4()}`;
  }
}
