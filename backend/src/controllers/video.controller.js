const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const addVideo = catchAsync(async (req, res) => {
    const video = await videoService.addVideo(req.body);
    res.status(201).send(video);
});

const getVideos = catchAsync(async (req, res) => {
    const title = req.query.title ? req.query.title : "";
    const contentRating = req.query.contentRating ? req.query.contentRating : "All";
    const genres = req.query.genres ? req.query.genres : ["All"];
    console.log(req.genres)
    const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

    const videos = await videoService.getVideos(
       title,
       contentRating,
       genres,
       sortBy
    );
     console.log(videos);
    res.status(200).send({ videos: videos });
});

const getVideo = catchAsync(async (req, res) => {
    const video = await videoService.getVideo(req.params.videoId);
    res.status(200).send(video);
});

const changeViews = catchAsync(async (req, res) => {
    await videoService.changeViews(req.params.videoId);
    res.status(204).send();
});

const changeVotes = catchAsync(async (req, res) => {
    await videoService.changeVotes(req.params.videoId, req.body.vote, req.body.change);
    res.status(204).send();
});

module.exports = {
    addVideo,
    getVideos,
    getVideo,
    changeViews,
    changeVotes,
}