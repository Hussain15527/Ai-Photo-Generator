const sdk = require("api")("@prodia/v1.2#5qad1xlji42xgv");
sdk.auth("d0981754-d037-4a2b-a87f-e75ee3d09b43");

const getJobId = async (pr) => {
  return sdk.generate({
    model: "shoninsBeautiful_v10.safetensors [25d8c546]",
    prompt: `${pr}`,
    negative_prompt: "badly drawn",
    steps: 25,
    cfg_scale: 7,
    seed: -1,
    upscale: false,
  });
};

const getImage = async (jobId) => {
  const data = await sdk
    .getJob({ jobId: `${jobId}` })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.error(err));
  return data;
};
const middleWare = async (pr) => {
  let data = await getJobId(pr);
  let jobId = data.data.job;
  let image;

  // Continuously check the status until it is "succeeded"
  while (true) {
    image = await getImage(jobId);
    if (image.status === "succeeded") {
      break;
    } else if (image.status === "generating" || image.status === "queued") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
    } else {
      throw new Error("Unexpected status: " + image.status);
    }
  }

  return image;
};

module.exports = { middleWare };
