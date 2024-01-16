import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  console.log(url, "url");
  const info = await ytdl.getInfo(url);
  const videoFormats = ytdl.filterFormats(info.formats, "video");
  const format = ytdl.chooseFormat(videoFormats, {
    quality: "highestaudio",
  });
  const fileName = `${info.videoDetails.title}.${format.container}`;

  const responseHeaders = {
    "content-Disposition": "attachment; filename=" + fileName,
  };

  return NextResponse.json({
    format,
    responseHeaders,
    fileName,
  });
}
