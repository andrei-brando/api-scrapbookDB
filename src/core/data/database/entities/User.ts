import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Note } from './Note';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn()
  uid?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'updated_at' })
  updatedAt?: Date;

  @OneToMany(type => Note, note => note.user)
  notes?: Note[];

  constructor(
    email: string,
    password: string,
    uid?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super();
    this.uid = uid;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @BeforeInsert()
  private beforeInsert() {
    this.uid = uuidV4();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }
}
