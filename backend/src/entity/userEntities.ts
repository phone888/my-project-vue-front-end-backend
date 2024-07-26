import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;
}
