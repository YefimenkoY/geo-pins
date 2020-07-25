import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	Unique,
} from "typeorm"
import bcrypt from "bcryptjs"
import { IsEmail } from "class-validator"

import Pin from "./Pin"
import Comment from "./Comment"

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "varchar", unique: true, length: 20, nullable: false })
	login: string

	@Column({ type: "text", unique: true })
	@IsEmail()
	email: string

	@Column({ type: "text", nullable: true })
	password: string

	@Column({ type: "text", nullable: true })
	image: string

	@CreateDateColumn() createdAt: string

	@UpdateDateColumn() updatedAt: string

	@OneToMany(type => Pin, pin => pin.author)
	pins: Pin[]

	@OneToMany(type => Comment, comment => comment.author)
	comments: Comment[]

	public comparePasswords(password: string): boolean {
		return bcrypt.compareSync(password, this.password)
	}

	@BeforeInsert()
	@BeforeUpdate()
	private savePassword(): void {
		const salt = bcrypt.genSaltSync(10)
		this.password = bcrypt.hashSync(this.password, salt)
	}
}
