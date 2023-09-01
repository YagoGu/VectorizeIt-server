const { Schema, model } = require("mongoose");

const videogameSchema = new Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required."],
        unique: true,
      },
      corporation: {
        type: String,
      },
      description: {
        type: String,
      },
      videogame_picture: {
        type: String,
        default: "https://res.cloudinary.com/dpfyow85s/image/upload/v1693390929/VectorizeIt/videogame-default.png",
      },
      pegi: {
        type: String,
        required: [true, "Pegi is required."],
        enum: ['pegi3', 'pegi7', 'pegi12', 'pegi16', 'pegi18'],
      },
      contributed_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      reviews: {
        type: [Schema.Types.ObjectId],
        ref: "Review"
      }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Videogame = model("Videogame", videogameSchema);
  
  module.exports = Videogame;