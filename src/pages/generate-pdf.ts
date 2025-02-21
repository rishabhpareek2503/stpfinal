import type { NextApiRequest, NextApiResponse } from "next"
import PDFDocument from "pdfkit"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userData, plantData, equipmentData, totalCost } = req.body

    // Create a new PDF document
    const doc = new PDFDocument()

    // Set response headers
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "attachment; filename=plant_price_calculator_report.pdf")

    // Pipe the PDF document to the response
    doc.pipe(res)

    // Add content to the PDF
    doc.fontSize(18).text("Plant Price Calculator Report", { align: "center" })
    doc.moveDown()
    doc.fontSize(12).text(`User: ${userData.name}`)
    doc.text(`Plant Type: ${plantData.type}`)
    doc.text(`Equipment Count: ${Object.keys(equipmentData).length}`)
    doc.text(`Total Cost: ${totalCost}`)

    // Finalize the PDF and end the stream
    doc.end()
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

