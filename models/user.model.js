const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = 10;

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true // that make input required user cannot skip it
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true // cannot signup twice with same email
    },
    password: {
      type: String,
      required: true
      //   minlength: [6, "Khalas your password is too weak"]
    },
    qoutes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote' 
    }],
    books:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book' 
    }],
  
    isAdmin: {
      type: Boolean,
      default: false
    },
    isSuperUser: {
      type: Boolean,
      default: false
    },
    userType: {
      type: String,
      enum: ["admin", "regular", "superAdmin"], //only listed can be values
      default: "admin"
    }
  },
  { timestamps: true }
);


// at user signup before her data stored in
// db hashing the password by this fun we can write it in server but 
// here more oganized
userSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  }

  let hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;