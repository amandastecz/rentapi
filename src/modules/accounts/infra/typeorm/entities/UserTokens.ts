import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("users_tokens")
class UserTokens{

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user_id: string;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;
}

export { UserTokens };