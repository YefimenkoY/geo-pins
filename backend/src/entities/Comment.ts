import {
  BaseEntity,
  ManyToOne,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import User from "./User";
import Pin from "./Pin";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(
    type => Pin,
    pin => pin.comments
  )
  pin: Pin;

  @ManyToOne(
    type => User,
    user => user.comments
  )
  author: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
