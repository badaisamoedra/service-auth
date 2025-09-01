import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auth extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: true })
	tenant_id: string;

	@Column({ nullable: true })
	user_id: string;

	@Column({ unique: true, nullable: true })
	token_id: string;

	@Column({ nullable: true })
	revoke_reason: string;

	@Column({ nullable: true })
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
