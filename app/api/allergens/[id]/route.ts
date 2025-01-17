import { NextRequest, NextResponse } from "next/server";
import { AllergenPartialSchema } from "@/validation/allergen";
import { z } from "zod";
import {
  deleteAllergen,
  getAllergenById,
  updateAllergen,
} from "@/app/service/AllergenService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const allergen = await getAllergenById((await params).id);
    if (!allergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json(allergen);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const validatedData = AllergenPartialSchema.parse(body);

    const updatedAllergen = await updateAllergen(
      (await params).id,
      validatedData,
    );
    if (!updatedAllergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json(updatedAllergen);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const deletedAllergen = await deleteAllergen((await params).id);
    if (!deletedAllergen)
      return NextResponse.json(
        { error: "Allergen not found" },
        { status: 404 },
      );

    return NextResponse.json({ message: "Allergen deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
