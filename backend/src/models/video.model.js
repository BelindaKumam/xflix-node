const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Values = require("../utils/values");


const contentRatings = Values.contentRatings;
const genres = Values.genres;

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    videoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    contentRating: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!contentRatings.includes(value)) {
                throw new Error("Invalid Content Rating");
            }
        },
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!genres.includes(value)) {
                throw new Error("Invalid genre");
            }
        }
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true,
    },
    previewImage: {
        type: String,
        trim: true,
        default: "https://i.ibb.co/nbYsmJB/Xflix.jpg"
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    votes: {
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        }
    },
});

// videoSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id;
//         delete returnedObject._v;
//     }
// })

// videoSchema.plugin(validator, { message: 'must be unique '})

const Video = mongoose.model("Video", videoSchema);

module.exports.Video = Video;
