import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ChatsModel } from '../../chats/entity/chats.entity';
import { MessagesModel } from '../../chats/messages/entity/messages.entity';

@Entity()
export class UsersModel extends BaseModel {
  @Column({
    length: 30,
    unique: true,
  })
  @IsString()
  @Length(4, 30)
  nickname: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(4, 30)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];

  @ManyToMany(() => ChatsModel, (chat) => chat.users)
  chats: ChatsModel[];

  @ManyToMany(() => ChatsModel, (chat) => chat.activeUsers)
  activeChats: ChatsModel[];

  @OneToMany(() => MessagesModel, (message) => message.author)
  messages: MessagesModel;
}
