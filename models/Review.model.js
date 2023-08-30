const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        related_to: {
            type: Schema.Types.ObjectId,
            ref: "Videogame"
        },
        rate: {
            type: Number,
            min: 0,
            max: 10,
            required: [true, "Rating is required."]

        },
        description: {
            type: String,
        },
        played_hours: {
            type: Number,
            default: 1
        }
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );
  
  const Review = model("Review", reviewSchema);
  
  module.exports = Review;