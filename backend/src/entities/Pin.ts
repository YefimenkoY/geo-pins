import {
	BaseEntity,
	ManyToOne,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm"

import User from "./User"
import Comment from "./Comment"

@Entity()
export default class Pin extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "text", nullable: true, unique: true })
	pinId: string

	@Column({ type: "text", nullable: true })
	text: string

	@Column({ type: "text", nullable: true })
	placeName: string

	@Column({ type: "text", nullable: true })
	placeType: string

	@Column({ type: "simple-array", nullable: true })
	center: number[]

	@ManyToOne(type => User, user => user.pins)
	author: User

	@OneToMany(type => Comment, comment => comment.pin)
	comments: Comment[]

	@CreateDateColumn()
	createdAt: string

	@UpdateDateColumn()
	updatedAt: string
}
