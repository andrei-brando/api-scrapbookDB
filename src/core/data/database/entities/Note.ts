import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity({ name: 'notes' })
export class Note extends BaseEntity {
  @PrimaryColumn()
  uid?: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column({ name: 'created_at' })
  createdAt?: Date;

  @Column({ name: 'updated_at' })
  updatedAt?: Date;

  constructor(
    description: string,
    details: string,
    uid?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super();
    this.uid = uid;
    this.description = description;
    this.details = details;
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
