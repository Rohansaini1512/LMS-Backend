import { Schema , model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type:'String',
        required:[true , 'Name is required'],
        minlength:[5 , 'Nmae must be atleast 5 character'],
        maxlength:[50 , 'Name should be less than 50 character'],
        lowercase: true,
        trim: true,
    },
    email:{
        type:'String',
        required:[true , 'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        // match: 
    },
    password: {
        type: 'String',
        required:[true , 'Password is required'],
        minlength:[8 , 'Password must be atleast 8 character'],
        select:false
    },
    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type: 'String'
        }
    },
    role:{
         type:'String',
         enum:['USER','ADMIN'],
         default:'User'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry:Date,
    subscription:{
        id: String,
        status: String
    }
},{
    timestamps:true
});

userSchema.pre('save' ,async  function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
});

userSchema.method = {
    generateJWTToken: function(){
        return jwt.sign(
            { id: this._id , email: this.email , subscription: this.subscription , role: this.role},
            process.env.JWT_SECRET,
            {
             expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bycrypt.compare(plainTextPassword , this.password)   
    },
    generatePasswordResetToken: async () =>{
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
        ;
        this.forgotPasswordExpiry = Date.now() + 15*60*1000;//15min from now
        return resetToken;

        

    }
}

const User = model('User' , userSchema);

export default User;