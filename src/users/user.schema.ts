
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    }
  },
})

export class User {
  // password(pass: string, password: any) {
  //   throw new Error('Method not implemented.');
  // }
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({ required: true, default: '123456' })
  password: string;

  @Prop({
    required: true,
    enum: ['admin', 'team_member'],
    default: 'admin'
  })
  user_type: string;


  @Prop({
    required: true,
    enum: ['admin', 'team_member'],
    default: 'admin'
  })
  role: string;

  @Prop({
    required: true,
    enum: ['active', 'deleted'],
    default: 'active'
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    index: true
  })
  parent: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Company',
    index: true
  })
  parent_company: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'InviteTeamMember',
    index: true
  })
  team_member_id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    index: true
  })
  createdBy: Types.ObjectId;

  @Prop({ type: String })
  firebase_uid: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  primary_company: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
