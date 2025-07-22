import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email."],
      unique: [true, "Email has already been used."],
      lowercase: true,
      validate: [
        (val) => validator.isEmail(val),
        "Please enter a valid email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      minlength: [8, "Password must have a minimum of 8 characters."],
    },
  },
  { timestamps: true }
);

// fire a function after doc saved to db
UserSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// fire a function before doc saves to db
// we use function(){} instead of arrow function to use "this" keyword.
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
