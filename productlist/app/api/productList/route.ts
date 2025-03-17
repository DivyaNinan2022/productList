
// import pool from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await pool?.query("SELECT * FROM tasks ORDER BY id DESC;");
//     return NextResponse.json(res?.rows, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return NextResponse.json(
//       { message: "Error fetching tasks" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
    const response = await fetch("http://fakestoreapi.in/api/products", {
      headers: { "Content-Type": "application/json" },
    });
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
    }
  
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  }
  