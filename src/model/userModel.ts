import mongoose, { Schema } from "mongoose";

export interface UserAttributes {
	fullname: string;
	username: string;
	email: string;
	password: string;
    movie?: string[]
}

const userSchema = new Schema<UserAttributes>(
	{
		fullname: {
			type: String,
		},
		username: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
        movie: [{
            type: Schema.Types.ObjectId,
            ref: 'Movie'
          }]
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				(ret.userId = ret._id),
					delete ret._id,
					delete ret.password,
					delete ret.__v;
			},
		},
	}
);

const User = mongoose.model<UserAttributes>("User", userSchema);

export default User;
