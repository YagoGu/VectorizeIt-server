const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required."]
    },
    profile_picture: {
      type: String,
      default: "https://res.cloudinary.com/dpfyow85s/image/upload/v1693389979/VectorizeIt/default-user.png"
    },
    games_played: {
      type: [Schema.Types.ObjectId],
      ref: "Videogame"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
