// utils/getTextPixels.ts
export async function getTextPixelPositions({
  text = "HELLO",
  fontSize = 100,
  sampleGap = 4,
  threshold = 50,
}: {
  text?: string;
  fontSize?: number;
  sampleGap?: number;
  threshold?: number;
} = {}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 500;
  canvas.height = 200;

  ctx.fillStyle = "black";
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textBaseline = "top";
  ctx.fillText(text, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const positions: [number, number][] = [];
  for (let y = 0; y < canvas.height; y += sampleGap) {
    for (let x = 0; x < canvas.width; x += sampleGap) {
      const idx = (y * canvas.width + x) * 4;
      const alpha = imageData[idx + 3]; // 투명도
      if (alpha > threshold) {
        positions.push([x / 100, -y / 100]); // scale down
      }
    }
  }

  return positions;
}
