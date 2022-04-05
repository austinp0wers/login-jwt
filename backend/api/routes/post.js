const postRoutes = (app) => {
  app.get("/posts", async (req, res) => {
    try {
      const posts = await Posts.find({});
    } catch (error) {
      console.error(error);
    }
  });
};
