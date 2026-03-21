// src/app/api/contact/route.ts
// API Route Next.js pour recevoir les messages du formulaire
// Deux options : Resend (recommandé) ou Nodemailer (SMTP)

import { NextRequest, NextResponse } from "next/server";

// ─── Option A : Resend (recommandé — simple, gratuit jusqu'à 3000 mails/mois)
// 1. npm install resend
// 2. Crée un compte sur resend.com
// 3. Ajoute RESEND_API_KEY dans ton .env.local
//
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Option B : Nodemailer (SMTP Gmail)
// 1. npm install nodemailer
// 2. Active "App Password" sur ton compte Google
// 3. Ajoute GMAIL_USER et GMAIL_PASS dans ton .env.local
//
// import nodemailer from "nodemailer";

// ─── Validation serveur (toujours valider côté serveur aussi) ────────────────
function validateBody(body: unknown): body is {
  name: string;
  email: string;
  subject: string;
  message: string;
} {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" &&
    b.subject.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length >= 20
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validation
    if (!validateBody(body)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const { name, email, subject, message } = body;

    // ── Option A : Resend ──────────────────────────────────────────────────
    // const { error } = await resend.emails.send({
    //   from: "Portfolio <onboarding@resend.dev>",
    //   to: ["ton-email@gmail.com"],
    //   subject: `[Portfolio] ${subject}`,
    //   html: `
    //     <h2>Nouveau message de ${name}</h2>
    //     <p><strong>Email :</strong> ${email}</p>
    //     <p><strong>Sujet :</strong> ${subject}</p>
    //     <hr />
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // });
    // if (error) throw new Error(error.message);

    // ── Option B : Nodemailer ──────────────────────────────────────────────
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASS, // App Password, pas ton vrai mdp
    //   },
    // });
    // await transporter.sendMail({
    //   from: `"Portfolio" <${process.env.GMAIL_USER}>`,
    //   to: process.env.GMAIL_USER,
    //   replyTo: email,
    //   subject: `[Portfolio] ${subject} — ${name}`,
    //   html: `
    //     <h2>Nouveau message de ${name}</h2>
    //     <p><strong>Email :</strong> ${email}</p>
    //     <p><strong>Sujet :</strong> ${subject}</p>
    //     <hr />
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // });

    // ── Simulation dev (retire en production) ─────────────────────────────
    console.log("Message reçu :", { name, email, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erreur API contact :", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 }
    );
  }
}

// Bonne pratique : rejette les autres méthodes HTTP explicitement
export async function GET() {
  return NextResponse.json({ error: "Méthode non autorisée." }, { status: 405 });
}
