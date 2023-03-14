import Express from "express";
import { getMedias } from "../lib/fs-tools.js";
import multer from "multer";

const mediasRouter = Express.Router();

// POST Media
mediasRouter.post("/", async (req, res, next) => {
  try {
    const medias = await getMedias();

    const newMedia = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uniqid(),
    };

    medias.push(newMedia);

    await writeJSON(mediaJSONPath, medias);

    res.status(201).send({
      success: "true",
      message: "Media successfully created!",
      mediaId: newMedia.id,
    });
  } catch (error) {
    next(error);
  }
});

// GET Media (list)
mediasRouter.get("/", async (req, res, next) => {
  try {
    const medias = await getMedias();
    res.send(medias);
  } catch (error) {
    next(error);
  }
});

mediasRouter.get("/:id", async (req, res, next) => {
  try {
    const medias = await getMedias();

    const media = medias.find((m) => m.id === req.params.id);

    if (!media) {
      const error = new Error(`Media with ID ${req.params.id} not found`);
      error.status = 404;
      throw error;
    }

    res.send(media);
  } catch (error) {
    next(error);
  }
});

export default mediasRouter;
