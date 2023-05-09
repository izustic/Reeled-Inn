import mongoose, {Document, Schema} from 'mongoose';

export interface MovieAttributes {
    title:string;
    description:string;
    image:string;
    price:string;
    userId:any
}

export interface MovieInstance extends MovieAttributes, Document {
    remove: () => Promise<Document>;
}

const movieSchema = new Schema<MovieInstance>({

    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        unique:true
    },
    price:{
        type:String,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
    }
},
{ timestamps: true })
    

const Movie = mongoose.model<MovieInstance>('Movie', movieSchema)

export default Movie