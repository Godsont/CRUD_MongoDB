import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  // const { newTitle: title, newDescription: description } = await request.json();
  //Please use this in the main, as when we are creating payload in the editForm we are passing title and description not the newTitle and newDescription so it is getting undefined, but usingf title and description directly will solve this issue.
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
