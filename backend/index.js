import express from "express";

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage";

// The 'mime' npm package helps us set the correct file type on our File objects
import mime from "mime";
// The 'fs' builtin module on Node.js provides access to the file system
import fs from "fs";
// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { randomUUID } from "crypto";
dotenv.config();
// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = process.env.IPFS_KEY;

const app = express();
const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
const apiKey = process.env.STABILITY_API_KEY;
const imageMap = new Map();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Ok");
});

app.get("/generate", async (req, res) => {
  try {
    const engineId = "stable-diffusion-xl-beta-v2-2-2";
    const randomID = randomUUID();
    let prompt = req.query.prompt;
    if (!prompt) {
      prompt = "A lighthouse on a cliff";
    }
    res.json({
      id: `${randomID}`,
    });
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();
    console.log(responseJSON);

    const image = responseJSON.artifacts[0];

    const client = new NFTStorage({ token: process.env.IPFS_KEY });

    const imageFile = new File(
      [Buffer.from(image.base64, "base64")],
      "image1.png",
      {
        type: "image/png",
      }
    );

    const result = await client.storeBlob(imageFile);

    const metadata = {
      name: `Gen Tokens`,
      description:
        "The first of its kind AI generated NFTs. Each token is unique and has its own traits and characteristics.",
      image: `ipfs://${result}`,
      attributes: [
        { trait_type: "Prompt", value: `${prompt}` },
        {
          trait_type: "Engine",
          value: "stable-diffusion-xl-beta-v2-2-2",
        },
        {
          trait_type: "Seed",
          value: image.seed,
        },
      ],
    };
    const metadataFile = new File(
      [JSON.stringify(metadata)],
      "testmeta1.json",
      {
        type: "application/json",
      }
    );
    const cid = await client.storeBlob(metadataFile);
    imageMap.set(randomID, {
      image: `ipfs://${result}`,
      metadata: `ipfs://${cid}`,
    });
  } catch (err) {
    console.log(err);
    // res.json({ err: err });
  }
});

app.get("/nft/:id", async (req, res) => {
  const { id } = req.params;
  const image = imageMap.get(id);
  return res.json(image);
});

app.get("/engines", async (req, res) => {
  const response = await fetch("https://api.stability.ai/v1/engines/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  return res.json(responseJSON);
});

// app.put();

const port = 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
