import Review from "../model/Review.js";
export const Addreview = async (req, res, next) => {
  const review = new Review(req.body);
  try {
    const savedreview = await review.save();
    res.status(200).json(savedreview);
  } catch (err) {
    next(err);
  }
};

export const getreviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ movieid: req.params.movieid });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
};
