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
import Comment from "./Comment";

@Entity()
export default class Pin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  lat: string;

  @Column({ type: "text" })
  lon: string;

  @Column({ type: "text", nullable: true })
  image: string;

  @ManyToOne(
    type => User,
    user => user.pins
  )
  author: User;

  @OneToMany(
    type => Comment,
    comment => comment.pin
  )
  comments: Comment[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
