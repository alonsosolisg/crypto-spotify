import { NextApiRequest, NextApiResponse } from "next";

export default async function playAudioFromUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { audioUrl } = req.query;

  const audioContext = new (window.AudioContext || window.AudioContext)();
  const response = await fetch(audioUrl as string);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();

  res.status(200).json({ message: "Audio played successfully" });
}
