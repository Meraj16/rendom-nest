
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
})

export class Company {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;


  @Prop()
  designation: string;

  @Prop()
  business_name: string;

  @Prop()
  business_type: string;

  @Prop({
    default: false,
  })
  isPrimary: Boolean;

  @Prop({
    required: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  })
  email: string;

  // @Prop({
  //   required: true,
  // })
  // email: string;

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
  createdBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    index: true
  })
  user: Types.ObjectId;

}

export const CompanySchema = SchemaFactory.createForClass(Company);
