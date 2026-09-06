/*
  Award application PDFs — readable dossiers for jury review.

  A CSV is right for analysis; a jury needs to *read* an application,
  so this lays each one out as a document (one application per page,
  full pitch text, documents and links) rather than a table dump.

  Uses PDFKit's built-in Helvetica so there are no font files to ship —
  which is what makes this work on Vercel's Node runtime without a
  headless browser.
*/

import PDFDocument from "pdfkit";

export interface NominationForPdf {
  id: string;
  nominatorName: string;
  nominatorTitle: string | null;
  nominatorOrganisation: string | null;
  nominatorEmail: string;
  nominatorPhone: string | null;
  nominatorCountry: string | null;
  nominationType: string;
  nomineeName: string | null;
  nomineeTitle: string | null;
  nomineeEmail: string | null;
  nomineePhone: string | null;
  nomineeWebsite: string | null;
  nomineeLinkedin: string | null;
  categories: string[];
  executiveSummary: string;
  keyAchievements: string;
  alignmentStatement: string;
  documents: unknown;
  videoLinks: string[];
  amount: number;
  currency: string;
  paymentStatus: string;
  status: string;
  createdAt: Date;
  paidAt: Date | null;
}

const INK = "#14141F";
const MUTED = "#6E6C7C";
const GOLD = "#8A5A19";
const RULE = "#D9D5CC";

const MARGIN = 54;

function fmtDate(d: Date | null): string {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function money(minor: number, currency: string): string {
  return `${currency} ${(minor / 100).toLocaleString("en-US")}`;
}

type Doc = PDFKit.PDFDocument;

function heading(doc: Doc, text: string) {
  if (doc.y > doc.page.height - 140) doc.addPage();
  doc.moveDown(0.9);
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(GOLD)
    .text(text.toUpperCase(), { characterSpacing: 0.5 });
  doc.moveDown(0.35);
  const y = doc.y;
  doc
    .strokeColor(RULE)
    .lineWidth(0.5)
    .moveTo(MARGIN, y)
    .lineTo(doc.page.width - MARGIN, y)
    .stroke();
  doc.moveDown(0.6);
}

function field(doc: Doc, label: string, value: string | null | undefined) {
  const v = value && String(value).trim() ? String(value) : "—";
  if (doc.y > doc.page.height - 90) doc.addPage();
  doc.font("Helvetica").fontSize(8).fillColor(MUTED).text(label.toUpperCase(), { characterSpacing: 0.6 });
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(v, { width: doc.page.width - MARGIN * 2 });
  doc.moveDown(0.5);
}

function paragraph(doc: Doc, text: string) {
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor(INK)
    .text(text?.trim() || "—", {
      width: doc.page.width - MARGIN * 2,
      align: "left",
      lineGap: 2.5,
    });
  doc.moveDown(0.4);
}

/** Documents are stored as JSON; render defensively. */
function documentLines(documents: unknown): string[] {
  if (!Array.isArray(documents)) return [];
  return documents.map((d) => {
    const rec = (d ?? {}) as Record<string, unknown>;
    const name = typeof rec.name === "string" ? rec.name : "Document";
    const url = typeof rec.url === "string" ? rec.url : "";
    return url ? `${name} — ${url}` : name;
  });
}

function renderOne(doc: Doc, n: NominationForPdf, index: number, total: number) {
  // ── Masthead ──
  doc
    .font("Helvetica-Bold")
    .fontSize(7.5)
    .fillColor(GOLD)
    .text("MYSTICVERSE GLOBAL EXCELLENCE AWARDS 2026", { characterSpacing: 0.5 });
  doc.moveDown(0.5);

  doc
    .font("Helvetica-Bold")
    .fontSize(19)
    .fillColor(INK)
    .text(n.nomineeName?.trim() || n.nominatorName, { width: doc.page.width - MARGIN * 2 });

  doc.moveDown(0.25);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(MUTED)
    .text(
      `Application ${index + 1} of ${total}  ·  Received ${fmtDate(n.createdAt)}  ·  ${n.paymentStatus}`,
    );

  heading(doc, "Categories entered");
  if (n.categories.length === 0) {
    paragraph(doc, "—");
  } else {
    n.categories.forEach((c) =>
      doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`•  ${c}`, { lineGap: 2 }),
    );
    doc.moveDown(0.4);
  }

  heading(doc, "Nominator");
  field(doc, "Name", n.nominatorName);
  field(doc, "Title", n.nominatorTitle);
  field(doc, "Organisation", n.nominatorOrganisation);
  field(doc, "Email", n.nominatorEmail);
  field(doc, "Phone", n.nominatorPhone);
  field(doc, "Country", n.nominatorCountry);
  field(doc, "Nomination type", n.nominationType);

  heading(doc, "Nominee");
  field(doc, "Name", n.nomineeName);
  field(doc, "Title", n.nomineeTitle);
  field(doc, "Email", n.nomineeEmail);
  field(doc, "Phone", n.nomineePhone);
  field(doc, "Website", n.nomineeWebsite);
  field(doc, "LinkedIn", n.nomineeLinkedin);

  heading(doc, "Executive summary");
  paragraph(doc, n.executiveSummary);

  heading(doc, "Key achievements & measurable outcomes");
  paragraph(doc, n.keyAchievements);

  heading(doc, "Alignment with conscious living & human transformation");
  paragraph(doc, n.alignmentStatement);

  const docs = documentLines(n.documents);
  const links = (n.videoLinks ?? []).filter(Boolean);
  if (docs.length || links.length) {
    heading(doc, "Supporting material");
    [...docs, ...links].forEach((line) =>
      doc.font("Helvetica").fontSize(9.5).fillColor(INK).text(`•  ${line}`, {
        width: doc.page.width - MARGIN * 2,
        lineGap: 2,
      }),
    );
    doc.moveDown(0.4);
  }

  heading(doc, "Administration");
  field(doc, "Fee", money(n.amount, n.currency));
  field(doc, "Payment status", n.paymentStatus);
  field(doc, "Paid at", fmtDate(n.paidAt));
  field(doc, "Lead status", n.status);
  field(doc, "Reference", n.id);
}

/** Renders one or many applications into a single PDF buffer. */
export function buildNominationsPdf(nominations: NominationForPdf[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: MARGIN,
      info: {
        Title:
          nominations.length === 1
            ? `Award Application — ${nominations[0].nomineeName || nominations[0].nominatorName}`
            : "MysticVerse Global — Award Applications",
        Author: "MysticVerse Global 2026",
      },
    });

    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    if (nominations.length === 0) {
      doc.font("Helvetica").fontSize(12).fillColor(INK).text("No award applications yet.");
    } else {
      nominations.forEach((n, i) => {
        if (i > 0) doc.addPage();
        renderOne(doc, n, i, nominations.length);
      });
    }

    doc.end();
  });
}
